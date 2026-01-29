'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { useCartStore } from './cart-store';

// Suppress Supabase AbortError in development (caused by React Strict Mode double-mounting)
if (typeof window !== 'undefined') {
    // Helper to check if error is AbortError
    const isAbortError = (error: any): boolean => {
        if (!error) return false;
        const errorStr = error?.toString?.() || '';
        const message = error?.message || '';
        const name = error?.name || '';
        const stack = error?.stack || '';
        return (
            name === 'AbortError' ||
            errorStr.includes('AbortError') ||
            errorStr.includes('signal is aborted') ||
            message.includes('aborted') ||
            message.includes('signal is aborted') ||
            message.includes('locks.js') ||
            stack.includes('@supabase/auth-js') ||
            stack.includes('locks.js')
        );
    };

    // Suppress console.error for AbortError
    const originalConsoleError = console.error;
    console.error = (...args) => {
        if (args.some(arg => isAbortError(arg))) return;
        // Also suppress hydration warnings related to dynamic content
        const firstArg = args[0]?.toString?.() || '';
        if (firstArg.includes('Text content did not match') && firstArg.includes('LAB-')) return;
        originalConsoleError.apply(console, args);
    };

    // Suppress unhandled promise rejections - use capture phase
    window.addEventListener('unhandledrejection', (event) => {
        if (isAbortError(event.reason)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return false;
        }
    }, true);

    // Suppress global errors - use capture phase
    window.addEventListener('error', (event) => {
        if (isAbortError(event.error) || isAbortError(event.message)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return false;
        }
    }, true);
}

// ==================== TYPES ====================

export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    phone?: string;
    avatar_url?: string;
    created_at: string;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signInWithGoogle: () => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<{ error: any }>;
    resetPassword: (email: string) => Promise<{ error: any }>;
}

// ==================== CONTEXT ====================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==================== PROVIDER ====================

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    // Get cart store sync function
    const setCartUserId = useCartStore(state => state.setUserId);

    // Fetch user profile from Supabase
    const fetchProfile = useCallback(async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                return null;
            }

            return data as UserProfile;
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    }, []);

    // Initialize auth state
    useEffect(() => {
        let mounted = true;

        // Timeout fallback - ensure loading is set to false even if auth fails
        const timeoutId = setTimeout(() => {
            if (mounted) {
                setLoading(false);
            }
        }, 3000);

        // Get initial session with AbortError handling
        const initializeAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                // Handle potential errors - but still continue to set loading false
                if (error) {
                    // Ignore AbortError console spam but still set loading to false
                    if (!(error.name === 'AbortError' || error.message?.includes('aborted'))) {
                        console.error('Error getting session:', error);
                    }
                    if (mounted) setLoading(false);
                    return;
                }

                if (!mounted) return;

                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    const userProfile = await fetchProfile(session.user.id);
                    if (mounted) {
                        setProfile(userProfile);
                        setCartUserId(session.user.id);
                    }
                }

                if (mounted) setLoading(false);
            } catch (error: any) {
                // Ignore AbortError console spam but still set loading to false
                if (!(error?.name === 'AbortError' || error?.message?.includes('aborted'))) {
                    console.error('Error during auth initialization:', error);
                }
                if (mounted) setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (!mounted) return;

                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    const userProfile = await fetchProfile(session.user.id);
                    if (mounted) {
                        setProfile(userProfile);
                        setCartUserId(session.user.id);
                    }
                } else {
                    setProfile(null);
                    setCartUserId(null);
                }

                if (mounted) setLoading(false);
            }
        );

        return () => {
            mounted = false;
            clearTimeout(timeoutId);
            subscription.unsubscribe();
        };
    }, [fetchProfile, setCartUserId]);

    // ==================== AUTH METHODS ====================

    const signUp = async (email: string, password: string, fullName: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });
        return { error };
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`,
            },
        });
        return { error };
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
        } catch (error: any) {
            // Suppress AbortError from Supabase auth cleanup
            if (error?.name !== 'AbortError' && !error?.message?.includes('aborted')) {
                console.error('Sign out error:', error);
            }
        }
        // Clear state immediately
        setUser(null);
        setProfile(null);
        setSession(null);
        setCartUserId(null);
    };

    const updateProfile = async (data: Partial<UserProfile>) => {
        if (!user) {
            return { error: new Error('Not authenticated') };
        }

        const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id);

        if (!error) {
            setProfile(prev => prev ? { ...prev, ...data } : null);
        }

        return { error };
    };

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        return { error };
    };

    // ==================== RENDER ====================

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            session,
            loading,
            signUp,
            signIn,
            signInWithGoogle,
            signOut,
            updateProfile,
            resetPassword,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// ==================== HOOK ====================

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// ==================== UTILITY HOOKS ====================

/**
 * Hook that requires authentication and redirects if not authenticated
 */
export function useRequireAuth(redirectTo = '/profile') {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            window.location.href = redirectTo;
        }
    }, [user, loading, redirectTo]);

    return { user, loading };
}
