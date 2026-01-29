"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function Toolbar() {
    const [showToolbar, setShowToolbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();
    const isShopPage = pathname?.startsWith('/shop');
    const { user, profile } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 50) {
                setShowToolbar(currentScrollY < lastScrollY);
            } else {
                setShowToolbar(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Get user's first name or email prefix
    const userName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Profile';

    return (
        <motion.div
            initial={{ y: 0, x: "-50%" }}
            animate={{
                y: showToolbar ? 0 : 100,
                opacity: showToolbar ? 1 : 0
            }}
            className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[90] flex items-center px-3 sm:px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl bg-surface-darker/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 max-w-[95vw] md:max-w-none overflow-x-auto no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group relative" href="/profile">
                    {user ? (
                        <>
                            {/* Authenticated: Show avatar or first letter with green dot */}
                            <div className="relative">
                                {profile?.avatar_url ? (
                                    <div
                                        className="size-6 rounded-full bg-cover bg-center ring-2 ring-blue-500/50 group-hover:ring-blue-500 transition-all group-hover:scale-110"
                                        style={{ backgroundImage: `url('${profile.avatar_url}')` }}
                                    />
                                ) : (
                                    <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white group-hover:scale-110 transition-all ring-2 ring-blue-500/50">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                {/* Online indicator */}
                                <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-green-500 rounded-full border-2 border-[#0a0f16] animate-pulse" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest opacity-80 group-hover:opacity-100 font-black text-blue-400 max-w-[60px] truncate">{userName}</span>
                        </>
                    ) : (
                        <>
                            {/* Not authenticated: Show default profile icon */}
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">person</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Profile</span>
                        </>
                    )}
                </Link>
                <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">home</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Home</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/#services">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">content_cut</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Services</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/barbers">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">face</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Barbers</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/#lookbook">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">photo_library</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Lookbook</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/press">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">perm_media</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Media</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/shop">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">shopping_bag</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Shop</span>
                </Link>

                {isShopPage && (
                    <>
                        <button className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group">
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">search</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Search</span>
                        </button>
                        <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/track">
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">local_shipping</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Track</span>
                        </Link>
                        <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/checkout/review">
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">shopping_cart</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Cart</span>
                        </Link>
                    </>
                )}

                <Link className="text-sm font-bold text-white hover:text-blue-500 transition-all flex flex-col items-center gap-1 group" href="/support">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">help</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Support</span>
                </Link>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <Link href="/barbers" className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest h-10 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span>Book</span>
                </Link>
            </div>
        </motion.div>
    );
}
