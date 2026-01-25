"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import Image from "next/image";

export default function UserMenu() {
    const { user, signOut, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) {
        return (
            <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
        );
    }

    if (!user) {
        return null; // Parent component should show login button
    }

    const userInitial = user.email?.charAt(0).toUpperCase() || "U";
    const userAvatar = user.user_metadata?.avatar_url;

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <div className="size-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold overflow-hidden">
                    {userAvatar ? (
                        <Image src={userAvatar} alt="Avatar" width={40} height={40} className="object-cover" />
                    ) : (
                        userInitial
                    )}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
                    >
                        {/* User Info */}
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                                    {userAvatar ? (
                                        <Image src={userAvatar} alt="Avatar" width={48} height={48} className="object-cover" />
                                    ) : (
                                        userInitial
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-900 dark:text-white truncate">
                                        {user.user_metadata?.full_name || "User"}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            <Link
                                href="/tracking"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-400">local_shipping</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">My Orders</span>
                            </Link>
                            <Link
                                href="/rewards"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-400">loyalty</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Rewards</span>
                                <span className="ml-auto px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-[10px] font-bold rounded-full">150 pts</span>
                            </Link>
                            <Link
                                href="/notifications"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-400">notifications</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Notifications</span>
                            </Link>
                            <div className="border-t border-slate-100 dark:border-slate-800 my-2" />
                            <button
                                onClick={async () => {
                                    await signOut();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                <span className="text-sm font-medium">Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
