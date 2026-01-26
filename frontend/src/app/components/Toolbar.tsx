"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Toolbar() {
    const [showToolbar, setShowToolbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    return (
        <motion.div
            initial={{ y: 0, x: "-50%" }}
            animate={{
                y: showToolbar ? 0 : 100,
                opacity: showToolbar ? 1 : 0
            }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] flex items-center px-6 py-4 rounded-3xl bg-surface-darker/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
        >
            <div className="flex items-center gap-8 md:gap-12">
                <Link className="text-sm font-bold text-white hover:text-primary transition-all flex flex-col items-center gap-1 group" href="/profile">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">person</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Profile</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-primary transition-all flex flex-col items-center gap-1 group" href="/">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">home</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Home</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-primary transition-all flex flex-col items-center gap-1 group" href="/#services">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">content_cut</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Services</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-primary transition-all flex flex-col items-center gap-1 group" href="/barbers">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">face</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Barbers</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-primary transition-all flex flex-col items-center gap-1 group" href="/#lookbook">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">photo_library</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Lookbook</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-primary transition-all flex flex-col items-center gap-1 group" href="/press">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">perm_media</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Media</span>
                </Link>
                <Link className="text-sm font-bold text-white hover:text-primary transition-all flex flex-col items-center gap-1 group" href="/support">
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">help</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 font-black">Support</span>
                </Link>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <Link href="/barbers" className="bg-primary hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest h-10 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span>Book</span>
                </Link>
            </div>
        </motion.div>
    );
}
