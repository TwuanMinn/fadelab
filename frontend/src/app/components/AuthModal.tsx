"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { signIn, signUp, signInWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            if (mode === "login") {
                const { error } = await signIn(email, password);
                if (error) {
                    setError(error.message);
                } else {
                    onClose();
                }
            } else {
                const { error } = await signUp(email, password);
                if (error) {
                    setError(error.message);
                } else {
                    setSuccess("Check your email for confirmation link!");
                }
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const { error } = await signInWithGoogle();
        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-x-4 top-[15%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[61] w-auto md:w-full md:max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative bg-gradient-to-br from-primary to-blue-400 p-8 text-center">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 size-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                            <div className="size-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-white text-3xl">person</span>
                            </div>
                            <h2 className="text-2xl font-black text-white">
                                {mode === "login" ? "Welcome Back" : "Create Account"}
                            </h2>
                            <p className="text-white/80 text-sm mt-1">
                                {mode === "login" ? "Sign in to your account" : "Join the Furnza community"}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm p-3 rounded-xl flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                    {success}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm font-medium outline-none border-2 border-transparent focus:border-primary transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm font-medium outline-none border-2 border-transparent focus:border-primary transition"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                ) : mode === "login" ? (
                                    <>Sign In</>
                                ) : (
                                    <>Create Account</>
                                )}
                            </button>

                            <div className="relative flex items-center justify-center my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                                </div>
                                <span className="relative bg-white dark:bg-slate-900 px-4 text-xs font-bold text-slate-400 uppercase">or</span>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-4 rounded-xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-3"
                            >
                                <svg className="size-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <p className="text-center text-sm text-slate-500 mt-4">
                                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMode(mode === "login" ? "signup" : "login");
                                        setError("");
                                        setSuccess("");
                                    }}
                                    className="text-primary font-bold hover:underline"
                                >
                                    {mode === "login" ? "Sign up" : "Sign in"}
                                </button>
                            </p>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
