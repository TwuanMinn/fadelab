"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function SizeGuidePage() {
    const router = useRouter();
    const params = useParams();
    const [unit, setUnit] = useState<"cm" | "in">("cm");

    // Mock data for the demonstration - in a real app, this would be fetched based on params.id
    const measurements = {
        cm: { length: 200, width: 90, height: 76, clearance: 65 },
        in: { length: 78.7, width: 35.4, height: 29.9, clearance: 25.6 }
    };

    const currentStats = measurements[unit];

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] font-jakarta text-[#111418] dark:text-white min-h-screen">
            <div className="relative flex flex-col min-h-screen w-full mx-auto bg-white dark:bg-[#0a0f16] overflow-x-hidden pb-24 max-w-2xl shadow-2xl">
                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center justify-between bg-white/90 dark:bg-[#0a0f16]/90 px-6 py-4 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full active:bg-slate-100 dark:active:bg-slate-800 text-[#111418] dark:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-lg font-black font-outfit uppercase tracking-tighter flex-1 text-center">Size & Dimensions</h1>
                    <button className="flex items-center justify-center w-10 h-10 rounded-full active:bg-slate-100 dark:active:bg-slate-800 text-[#111418] dark:text-white transition-colors">
                        <span className="material-symbols-outlined">share</span>
                    </button>
                </header>

                {/* Hero Visual Section */}
                <div className="relative w-full bg-gradient-to-b from-slate-50 to-white dark:from-[#0a0f16] dark:to-[#121a24] pt-8 pb-12 px-8">
                    <div className="relative aspect-[4/3] w-full mix-blend-multiply dark:mix-blend-normal">
                        <div
                            className="w-full h-full bg-center bg-contain bg-no-repeat transition-all duration-500"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCu25QRwUnPnBVtpD-_wxk_bGk-kqpMtE-FkxDaJxPl9xdNymVRZwMJqNhRA5XNCQ7svbkFnBXxJ9U_H-4OFON1uEE5SKkHFkAZLcnBNjX4xVwZlrzp_q8mnxKxXu__dnS8WLpJ7VncbzCjH47YawvJKVLNYbs5rNIcGPIO_dXKtKNVZKWrN6XJ66YLJSnYKGTjzm2nSwpmnH6taChCHbCCFvbDVSPDWw_JBrD2LTrjeQsh0cZDYo6RseAUBkof7obR4yqn5Y855Wk")' }}
                        />
                        {/* Decorative dimension overlays */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30 flex justify-center items-center">
                            <div className="bg-white dark:bg-[#0a0f16] px-2 py-0.5 text-[10px] font-black text-primary border border-primary/20 rounded-md shadow-sm uppercase tracking-tighter">
                                {currentStats.length} {unit}
                            </div>
                        </div>
                        <div className="absolute top-0 right-10 h-full w-[1px] bg-primary/30 flex justify-center items-center">
                            <div className="bg-white dark:bg-[#0a0f16] px-2 py-0.5 text-[10px] font-black text-primary border border-primary/20 rounded-md shadow-sm rotate-90 uppercase tracking-tighter">
                                {currentStats.height} {unit}
                            </div>
                        </div>
                    </div>
                    {/* Zoom Hint */}
                    <button className="absolute bottom-10 right-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-3 shadow-xl border border-white dark:border-slate-700 hover:scale-110 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-primary text-xl">zoom_in</span>
                    </button>
                </div>

                {/* Segmented Control */}
                <div className="px-6 -mt-8 mb-10 relative z-10">
                    <div className="flex h-14 w-full items-center justify-center rounded-2xl bg-slate-100 dark:bg-[#1c2633] p-1.5 shadow-sm border border-white dark:border-slate-700">
                        <button
                            onClick={() => setUnit("cm")}
                            className={`flex flex-1 items-center justify-center rounded-xl py-2.5 text-sm font-black transition-all ${unit === "cm" ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Metric (cm)
                        </button>
                        <button
                            onClick={() => setUnit("in")}
                            className={`flex flex-1 items-center justify-center rounded-xl py-2.5 text-sm font-black transition-all ${unit === "in" ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Imperial (in)
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="px-6 mb-10">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 pl-1">Key Measurements</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "Length", value: currentStats.length },
                            { label: "Width", value: currentStats.width },
                            { label: "Height", value: currentStats.height }
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="flex flex-col gap-1 rounded-[2rem] p-5 bg-white dark:bg-[#1c2633] border border-slate-100 dark:border-slate-700 shadow-sm items-center text-center group hover:border-primary/30 transition-colors"
                            >
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider group-hover:text-primary transition-colors">{stat.label}</p>
                                <p className="text-slate-900 dark:text-white text-2xl font-black font-outfit">{stat.value}</p>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{unit}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center gap-3 px-2 py-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
                        <span className="material-symbols-outlined text-primary">vertical_align_bottom</span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                            Under-table leg clearance: <span className="text-slate-900 dark:text-white font-black">{currentStats.clearance} {unit}</span>
                        </p>
                    </div>
                </div>

                {/* Seating Capacity */}
                <div className="px-6 mb-10">
                    <div className="rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-[#1c2633] p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-2xl">groups</span>
                            </div>
                            <div>
                                <h2 className="text-slate-900 dark:text-white text-xl font-black font-outfit leading-tight">Seating Capacity</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Ideal for shared spaces</p>
                            </div>
                        </div>

                        <div className="flex justify-center items-center py-6 gap-6">
                            <div className="flex flex-col gap-3">
                                {[1, 2, 3].map(i => (
                                    <span key={i} className="material-symbols-outlined text-slate-800 dark:text-slate-300 text-2xl filled">chair_alt</span>
                                ))}
                            </div>
                            <div className="h-32 w-20 border-4 border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 shadow-inner group">
                                <span className="text-[10px] font-black text-slate-400 -rotate-90 whitespace-nowrap uppercase tracking-widest group-hover:text-primary transition-colors">{currentStats.length} {unit}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                {[1, 2, 3].map(i => (
                                    <span key={i} className="material-symbols-outlined text-slate-800 dark:text-slate-300 text-2xl filled">chair_alt</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <div className="px-4 py-1.5 bg-primary/10 rounded-full">
                                <p className="text-xs font-black text-primary uppercase">Comfortably seats 6 adults</p>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                            <p className="text-xs font-bold text-slate-400">Max 8</p>
                        </div>
                    </div>
                </div>

                {/* Info List */}
                <div className="px-6 space-y-4">
                    {[
                        {
                            title: "Package Dimensions",
                            icon: "inventory_2",
                            content: (
                                <div className="grid grid-cols-2 gap-y-3 pt-2">
                                    <span className="text-slate-500">Box 1 (Tabletop):</span>
                                    <span className="font-black text-right text-slate-900 dark:text-white">210 x 98 x 12 cm</span>
                                    <span className="text-slate-500">Box 2 (Legs):</span>
                                    <span className="font-black text-right text-slate-900 dark:text-white">80 x 75 x 20 cm</span>
                                    <div className="col-span-2 border-t border-slate-100 dark:border-slate-800 mt-2 pt-3 flex justify-between">
                                        <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Total Weight</span>
                                        <span className="font-black text-primary">45 kg</span>
                                    </div>
                                </div>
                            )
                        },
                        {
                            title: "Assembly Details",
                            icon: "handyman",
                            content: (
                                <div className="pt-2">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                        Minimal assembly required. Legs need to be attached to the tabletop. All tools and hardware are included in Box 2.
                                    </p>
                                    <div className="flex gap-3">
                                        <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-black text-slate-700 dark:text-slate-300">
                                            <span className="material-symbols-outlined text-[16px]">schedule</span> 15 min
                                        </span>
                                        <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-black text-slate-700 dark:text-slate-300">
                                            <span className="material-symbols-outlined text-[16px]">person</span> 2 people
                                        </span>
                                    </div>
                                </div>
                            )
                        }
                    ].map((item, idx) => (
                        <details
                            key={idx}
                            className="group rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1c2633] overflow-hidden transition-all duration-300 open:shadow-md"
                        >
                            <summary className="flex cursor-pointer items-center justify-between p-6 text-slate-900 dark:text-white font-black hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none outline-none">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-slate-400 group-open:text-primary transition-colors">{item.icon}</span>
                                    <span className="font-outfit uppercase tracking-tighter">{item.title}</span>
                                </div>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-slate-400">expand_more</span>
                            </summary>
                            <div className="px-8 pb-8 pt-2">
                                {item.content}
                            </div>
                        </details>
                    ))}
                </div>

                {/* Sticky Bottom Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-[#0a0f16]/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 max-w-2xl mx-auto flex gap-4">
                    <button
                        onClick={() => router.push('/design-ai')}
                        className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-primary hover:bg-blue-600 active:bg-blue-700 text-white font-black h-14 shadow-xl shadow-primary/25 transition-all transform active:scale-[0.98] group"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">view_in_ar</span>
                        <span>Visualize in AR</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
