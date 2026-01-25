"use client";

import { useState } from "react";
import Link from "next/link";

export default function MaintenancePage() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle notification logic here
        setEmail("");
        alert("We'll notify you when we're back!");
    };

    return (
        <div className="bg-background-light dark:bg-[#101822] transition-colors duration-300 min-h-screen font-jakarta">
            {/* Main Wrapper */}
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-[#101822]">

                {/* Top Navigation Area */}
                <div className="flex items-center bg-transparent p-4 pb-2 justify-between safe-top sticky top-0 z-10">
                    <div className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">architecture</span>
                    </div>
                    <h2 className="text-[#111418] dark:text-white text-sm font-semibold leading-tight tracking-wide flex-1 text-center pr-12 uppercase opacity-60 font-outfit">Status: Updating</h2>
                </div>

                {/* Hero Section: Illustration */}
                <div className="flex w-full container mx-auto p-6 pt-2 justify-center">
                    <div className="w-full max-w-lg aspect-[4/3] rounded-[2rem] flex items-center justify-center relative border border-gray-100 dark:border-gray-800 shadow-sm bg-white dark:bg-[#1a232e] overflow-hidden group">
                        {/* Abstract "Room Renovation" Representation */}
                        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                            <div className="absolute top-10 left-10 w-24 h-24 rounded-2xl bg-[#136dec]/20 animate-pulse"></div>
                            <div className="absolute bottom-10 right-10 w-32 h-48 rounded-2xl bg-[#136dec]/10 delay-700 animate-pulse"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-[#136dec]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        </div>

                        <div className="z-10 text-[#136dec] flex flex-col items-center transform transition-transform duration-700 group-hover:scale-110">
                            <span className="material-symbols-outlined text-8xl mb-4">weekend</span>
                            <div className="bg-[#136dec]/10 p-3 rounded-full">
                                <span className="material-symbols-outlined text-4xl animate-bounce">handyman</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Headline & Text */}
                <div className="flex flex-col px-6 items-center">
                    <h1 className="text-[#111418] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-3 font-outfit max-w-md">
                        Refining the Experience
                    </h1>
                    <p className="text-[#617289] dark:text-gray-400 text-base font-normal leading-relaxed text-center px-2 max-w-md mx-auto">
                        We're currently updating our catalog with new seasonal pieces. We'll be back online shortly with a fresh new look and curated collections.
                    </p>
                </div>

                {/* Newsletter Signup Section */}
                <div className="mt-auto pb-10 px-6 pt-10 w-full max-w-md mx-auto">
                    <div className="bg-[#136dec]/5 dark:bg-[#136dec]/10 rounded-[2rem] p-8 border border-[#136dec]/10">
                        <p className="text-[#111418] dark:text-white text-center font-bold mb-6 font-outfit">Be the first to know when we're back.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className="flex-1">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    required
                                    className="flex w-full rounded-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#136dec]/50 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-[#1a232e] h-14 placeholder:text-[#617289] px-4 text-base font-normal transition-all text-center"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <button className="w-full h-14 rounded-xl text-white font-bold text-base shadow-lg shadow-[#136dec]/20 active:scale-[0.98] transition-all bg-gradient-to-r from-[#136dec] to-[#4a90f5] flex items-center justify-center gap-2">
                                <span>Notify Me</span>
                                <span className="material-symbols-outlined text-lg">notifications_active</span>
                            </button>
                        </form>
                        <p className="text-[10px] text-center text-[#617289] dark:text-gray-500 mt-6 uppercase tracking-widest font-bold">
                            Stay connected • @furniture_co
                        </p>
                    </div>
                </div>

                {/* Footer / Social Links */}
                <div className="flex justify-center gap-8 pb-8 text-[#617289] dark:text-gray-400">
                    <Link href="#" className="hover:text-[#136dec] transition-colors p-2 bg-white dark:bg-[#1a232e] rounded-full shadow-sm hover:shadow-md hover:-translate-y-1">
                        <span className="material-symbols-outlined">brand_awareness</span>
                    </Link>
                    <Link href="#" className="hover:text-[#136dec] transition-colors p-2 bg-white dark:bg-[#1a232e] rounded-full shadow-sm hover:shadow-md hover:-translate-y-1">
                        <span className="material-symbols-outlined">share</span>
                    </Link>
                    <Link href="#" className="hover:text-[#136dec] transition-colors p-2 bg-white dark:bg-[#1a232e] rounded-full shadow-sm hover:shadow-md hover:-translate-y-1">
                        <span className="material-symbols-outlined">alternate_email</span>
                    </Link>
                </div>

                {/* Decorative Progress Bar (Subtle) */}
                <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
                    <div className="h-full bg-[#136dec] w-2/3 opacity-50 shadow-[0_0_10px_#136dec]"></div>
                </div>
            </div>
        </div>
    );
}
