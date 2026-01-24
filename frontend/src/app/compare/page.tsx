"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CompareLandingPage() {
    const router = useRouter();

    const steps = [
        {
            number: 1,
            title: "Browse Items",
            description: "Explore our wide catalog and find pieces you love."
        },
        {
            number: 2,
            title: "Select to Compare",
            description: "Tap the compare icon on any product card to add it to your selection."
        },
        {
            number: 3,
            title: "View Side-by-Side",
            description: "See features, dimensions, and materials next to each other instantly."
        }
    ];

    const categories = [
        { icon: "chair", label: "Chairs" },
        { icon: "weekend", label: "Sofas" },
        { icon: "table_restaurant", label: "Tables" },
        { icon: "bed", label: "Beds" }
    ];

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-2xl mx-auto bg-white dark:bg-[#0a0f16] shadow-2xl">
                {/* Header */}
                <div className="flex items-center bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl p-6 justify-between sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-xl font-black font-outfit uppercase tracking-tighter flex-1 text-center pr-12">Comparison Tool</h2>
                </div>

                {/* Hero Illustration */}
                <div className="px-8 pt-10 pb-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 group"
                    >
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD6mz4h6MHlAAN7IeQQiTmhm3ZIn1-hslaOzczJ_BhuGHLwZkZCA0IioiEBkda6dR23X0AKEYN_sTq-V5CaWVM4emISjHHhjMmOwBYt0EsZxRns84D50Isy-tmgoxcrXk3hHF_VNbwodx_JbC8vw5T_hTIua8HNzDTvwIqKDQMZMW3tpBOkjgjnIVb0qOv4U1NgjcYDcI74QNNQpMxlvlEt8D-713l8BSYK1bzY7jbh0cuxhLqKEXVRTZdS2M5psErlPw0tsla47A"
                            alt="Comparison Illustration"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">
                                <span className="material-symbols-outlined text-white text-4xl filled">compare</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Headlines */}
                <div className="px-8 text-center flex flex-col gap-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-slate-900 dark:text-white tracking-tighter text-4xl font-black font-outfit uppercase leading-tight"
                    >
                        Find the <span className="text-primary italic">Perfect</span> Fit
                    </motion.h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-sm mx-auto">
                        Don&apos;t guess. Compare specs, prices, and materials of up to 4 items instantly to find your match.
                    </p>
                </div>

                {/* Quick Select Categories */}
                <div className="px-8 py-12">
                    <div className="grid grid-cols-4 gap-4">
                        {categories.map((cat, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => router.push(`/catalog?category=${cat.label.toLowerCase()}`)}
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className="size-16 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-primary/25 border border-slate-100 dark:border-slate-700">
                                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">{cat.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="px-8 pb-32 flex flex-col gap-10">
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Advanced Compare Engine</span>
                        <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1" />
                    </div>

                    <div className="grid gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-6 group"
                            >
                                <div className="size-10 shrink-0 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-sm font-black transition-all group-hover:bg-primary group-hover:text-white">
                                    {step.number}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tight">{step.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sticky Bottom Actions */}
                <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto p-8 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50 rounded-t-[3rem]">
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => router.push('/catalog')}
                            className="w-full bg-primary hover:bg-blue-600 transition-all text-white h-16 rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95"
                        >
                            <span className="material-symbols-outlined font-black">add_circle</span>
                            <span className="text-sm font-black uppercase tracking-widest">Start Comparing</span>
                        </button>
                        <button className="w-full text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors py-2">
                            View Saved Comparisons
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
