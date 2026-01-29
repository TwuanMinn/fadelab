"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

export function AuthForm() {
    const { signIn, signUp, signInWithGoogle } = useAuth();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authFullName, setAuthFullName] = useState('');
    const [authError, setAuthError] = useState<string | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(null);
        setIsAuthLoading(true);

        try {
            if (authMode === 'login') {
                const { error } = await signIn(authEmail, authPassword);
                if (error) {
                    setAuthError(error.message || 'Login failed');
                }
            } else {
                const { error } = await signUp(authEmail, authPassword, authFullName);
                if (error) {
                    setAuthError(error.message || 'Sign up failed');
                } else {
                    setAuthError(null);
                    alert('Check your email for verification link!');
                }
            }
        } catch (err: any) {
            setAuthError(err.message || 'An error occurred');
        } finally {
            setIsAuthLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setAuthError(null);
        const { error } = await signInWithGoogle();
        if (error) {
            setAuthError(error.message || 'Google sign in failed');
        }
    };

    return (
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-[#1e293b]/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <h1 className="text-3xl font-black text-white italic tracking-tight">FADELAB</h1>
                        </Link>
                        <p className="text-gray-400 mt-2">
                            {authMode === 'login' ? 'Welcome back! Sign in to continue.' : 'Create your account to get started.'}
                        </p>
                    </div>

                    {/* Auth Form */}
                    <form onSubmit={handleAuth} className="space-y-4">
                        {authMode === 'signup' && (
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={authFullName}
                                    onChange={(e) => setAuthFullName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Email Address</label>
                            <input
                                type="email"
                                value={authEmail}
                                onChange={(e) => setAuthEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Password</label>
                            <input
                                type="password"
                                value={authPassword}
                                onChange={(e) => setAuthPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                                required
                                minLength={6}
                            />
                        </div>

                        {authError && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                                {authError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isAuthLoading}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                        >
                            {isAuthLoading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-gray-500 text-xs uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleAuth}
                        className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Toggle Auth Mode */}
                    <div className="text-center mt-6">
                        <p className="text-gray-400 text-sm">
                            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                            <button
                                onClick={() => {
                                    setAuthMode(authMode === 'login' ? 'signup' : 'login');
                                    setAuthError(null);
                                }}
                                className="text-blue-500 hover:text-blue-400 font-bold ml-2 transition-colors"
                            >
                                {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-4">
                        <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
