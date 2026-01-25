"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Suspense } from 'react';

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "Velvet art deco sofa");

    const categories = ["Sofas", "Lamps", "Rugs", "Tables", "Chairs"];

    return (
        <div className="bg-white dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-2xl mx-auto shadow-2xl">
                {/* Top Navigation */}
                <div className="flex items-center px-6 py-4 justify-between sticky top-0 z-50 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="flex size-12 shrink-0 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <h2 className="text-xl font-black font-outfit uppercase tracking-tighter flex-1 text-center pr-12">Search</h2>
                </div>

                {/* Search Bar Area */}
                <div className="px-6 py-6 group">
                    <div className="relative flex items-center h-16 bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] border-2 border-transparent focus-within:border-primary focus-within:bg-white dark:focus-within:bg-slate-800 transition-all px-6 shadow-sm">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 h-full px-4 text-sm font-bold placeholder:text-slate-400 dark:text-white"
                            placeholder="Search for perfection..."
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="size-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400"
                            >
                                <span className="material-symbols-outlined text-[20px]">cancel</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Empty State / Content Area */}
                <div className="flex flex-col px-6 py-10 items-center justify-center flex-1">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="flex flex-col items-center gap-8 w-full"
                    >
                        {/* Illustration Container */}
                        <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-[3rem] overflow-hidden bg-slate-50 dark:bg-slate-800/20 group">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVleqFqZq-_6hpbRrHKmYiRuXSLwpsFgfFrhtLBMN2AE0SWeZ8csmynAnLz1U_pFW4Mmv_uU6SJqep9bDzgELKNRQMsN6c_DRfphB_cl3Kv9rv3GbgmimL4jJiXukOOrFR3rBvwjFmHq90xXKzSmfWfEqd7yhxBExQtUoZmMfPuYonoeTzNjkOdtro-tdaFqDF5j7aU5xDq5-U7qOo5XcrXJEuLLCH7E6cilE-2-wfm0i3bDqHeVOgwm4flpFLukcfDBNP1StFn9w"
                                alt="Search Off"
                                fill
                                className="object-cover opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-primary/10 backdrop-blur-md rounded-3xl p-10 border border-primary/20 shadow-2xl">
                                    <span className="material-symbols-outlined text-primary text-6xl animate-pulse">search_off</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 text-center px-10">
                            <h3 className="text-2xl font-black font-outfit uppercase tracking-tighter">No matches found</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                We couldn&apos;t find exactly what you&apos;re looking for. Try checking for typos or use fewer keywords.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Suggestions Section */}
                <div className="flex flex-col gap-10 w-full pb-32">
                    {/* Categories */}
                    <div className="flex flex-col gap-6">
                        <h3 className="px-6 text-sm font-black font-outfit uppercase tracking-widest text-slate-400">Try these categories</h3>
                        <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar pb-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className="flex h-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary hover:bg-white dark:hover:bg-slate-800 px-8 text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI Stylist CTA */}
                    <div className="px-6">
                        <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 group cursor-pointer active:scale-[0.98] transition-all duration-300 bg-gradient-to-br from-primary to-blue-400">
                            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                            <div className="relative flex flex-row items-center justify-between p-8">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-[8px] font-black uppercase tracking-widest text-white border border-white/20">Experimental</span>
                                        <div className="h-px w-8 bg-white/30" />
                                    </div>
                                    <h3 className="text-white text-xl font-black font-outfit uppercase tracking-tighter">Talk to our AI Stylist</h3>
                                    <p className="text-white/80 text-xs font-bold leading-relaxed max-w-[200px]">Can&apos;t describe it? Let AI help you find your perfect match.</p>
                                </div>
                                <div className="flex items-center justify-center size-16 bg-white/20 backdrop-blur-md rounded-[1.5rem] border border-white/30 shadow-xl group-hover:rotate-12 transition-transform">
                                    <span className="material-symbols-outlined text-white text-3xl filled animate-pulse">auto_awesome</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto z-50 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 pb-8">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex flex-col items-center justify-center flex-1 gap-1 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[26px]">home</span>
                            <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
                        </Link>
                        <button className="flex flex-col items-center justify-center flex-1 gap-1 text-primary">
                            <span className="material-symbols-outlined text-[26px] filled">search</span>
                            <span className="text-[9px] font-black uppercase tracking-widest">Search</span>
                        </button>
                        <Link href="/cart" className="flex flex-col items-center justify-center flex-1 gap-1 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[26px]">shopping_cart</span>
                            <span className="text-[9px] font-black uppercase tracking-widest">Cart</span>
                        </Link>
                        <button className="flex flex-col items-center justify-center flex-1 gap-1 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[26px]">person</span>
                            <span className="text-[9px] font-black uppercase tracking-widest">Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense>
            <SearchContent />
        </Suspense>
    );
}
