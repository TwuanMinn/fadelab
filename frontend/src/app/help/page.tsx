"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HelpCenterPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const topics = [
        { icon: "local_shipping", title: "Shipping", description: "Track orders, costs", link: "/help/shipping" },
        { icon: "assignment_return", title: "Returns", description: "Policy & labels", link: "/help/returns" },
        { icon: "chair", title: "Product Care", description: "Assembly guides", link: "/help/velvet-care" },
        { icon: "credit_card", title: "Payments", description: "Invoices, refunds", link: "/help/payments" },
        { icon: "accessibility_new", title: "Accessibility", description: "Help & Hub", link: "/help/accessibility" }
    ];

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-2xl mx-auto bg-white dark:bg-[#0a0f16] shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl p-6 justify-between border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 active:scale-95"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-xl font-black font-outfit uppercase tracking-tighter flex-1 text-center pr-12">Help Center</h2>
                </div>

                {/* Hero Section */}
                <div className="px-8 pt-10 pb-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-slate-900 dark:text-white tracking-tighter text-4xl font-black font-outfit uppercase leading-[1.1] text-left"
                    >
                        Hello, how can we<br /><span className="text-primary italic">help</span> you today?
                    </motion.h2>
                </div>

                {/* Search Bar */}
                <div className="px-8 py-4">
                    <div className="relative flex items-center h-16 bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] border-2 border-transparent focus-within:border-primary focus-within:bg-white dark:focus-within:bg-slate-800 transition-all px-6 shadow-sm group">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 h-full px-4 text-sm font-bold placeholder:text-slate-400 dark:text-white"
                            placeholder="Search for answers..."
                        />
                    </div>
                </div>

                {/* Browse Topics */}
                <div className="px-8 pt-8 pb-4">
                    <h3 className="text-sm font-black font-outfit uppercase tracking-[0.2em] text-slate-400 mb-6">Browse Topics</h3>
                    <div className="grid grid-cols-2 gap-4 pb-10">
                        {topics.map((topic, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => router.push(topic.link)}
                                className="group flex flex-col items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all text-left"
                            >
                                <div className="flex items-center justify-center size-14 bg-white dark:bg-slate-800 rounded-2xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-2xl">{topic.icon}</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-white text-base font-black font-outfit uppercase tracking-tight">{topic.title}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{topic.description}</p>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800 mx-8 mb-10" />

                {/* Live Chat Section */}
                <div className="px-8 pb-10">
                    <div className="flex flex-col gap-6 rounded-[3rem] bg-gradient-to-br from-slate-900 to-black p-8 items-center text-center shadow-2xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 size-32 bg-primary/10 blur-3xl rounded-full translate-x-10 -translate-y-10" />

                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="size-12 rounded-full border-4 border-slate-900 overflow-hidden relative shadow-xl">
                                    <Image
                                        src={`https://images.unsplash.com/photo-${i === 1 ? '1494790108377-be9c29b29330' : i === 2 ? '1507003211169-0a1dd7228f2d' : '1534528741775-53994a69daeb'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`}
                                        alt="Agent"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            <div className="flex items-center justify-center size-12 text-xs font-black text-white bg-primary rounded-full border-4 border-slate-900 shadow-xl">
                                +5
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white text-2xl font-black font-outfit uppercase tracking-tighter">Need instant answers?</h3>
                            <p className="text-slate-400 text-sm font-medium mt-2 max-w-[240px]">Our furniture experts are available 24/7 to assist you.</p>
                        </div>

                        <button
                            onClick={() => router.push('/design-ai/assistant')}
                            className="w-full py-5 px-8 rounded-2xl bg-primary hover:bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px] filled">chat_bubble</span>
                            Start Live Chat
                        </button>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="px-8 pb-32">
                    <h3 className="text-slate-900 dark:text-white text-2xl font-black font-outfit uppercase tracking-tighter mb-8">Send us a message</h3>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">Your Name</label>
                            <input
                                className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-primary focus:border-primary text-sm font-bold py-4 px-6 transition-all"
                                placeholder="John Doe"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">Order Number <span className="text-slate-300 font-normal">(Optional)</span></label>
                            <input
                                className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-primary focus:border-primary text-sm font-bold py-4 px-6 transition-all"
                                placeholder="#ORD-12345"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">Message</label>
                            <textarea
                                className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-primary focus:border-primary text-sm font-bold py-4 px-6 resize-none transition-all"
                                placeholder="Describe your issue..."
                                rows={4}
                            ></textarea>
                        </div>
                        <button className="mt-4 w-full py-5 px-8 rounded-2xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white bg-transparent font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all active:scale-95">
                            Send Message
                        </button>
                    </div>

                    <div className="flex justify-center gap-8 py-10 border-t border-slate-100 dark:border-slate-800 mt-10">
                        <Link className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors" href="#">Terms</Link>
                        <Link className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors" href="#">Privacy</Link>
                        <Link className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors" href="#">Support</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
