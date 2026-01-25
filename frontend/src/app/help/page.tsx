"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HelpCenterPage() {
    const router = useRouter();
    const [isSignedIn, setIsSignedIn] = useState(true); // Mocking signed in state for development
    const [searchQuery, setSearchQuery] = useState("");

    const topics = [
        { icon: "local_shipping", title: "Shipping", description: "TRACK ORDERS, COSTS", link: "/tracking" },
        { icon: "assignment_return", title: "Returns", description: "POLICY & LABELS", link: "/help/returns" },
        { icon: "currency_exchange", title: "Refunds", description: "STATUS & TRACKING", link: "/help/refund-status" },
        { icon: "chair", title: "Product Care", description: "ASSEMBLY GUIDES", link: "/help/velvet-care" },
        { icon: "credit_card", title: "Payments", description: "INVOICES & BILLING", link: "/help/payments" },
        { icon: "accessibility_new", title: "Accessibility", description: "HELP & HUB", link: "/help/accessibility" },
    ];

    const [formState, setFormState] = useState({ name: "", order: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.message) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
        setFormState({ name: "", order: "", message: "" });

        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-2xl mx-auto bg-white dark:bg-[#0a0f16] shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl p-6 border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 active:scale-95"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    {isSignedIn && (
                        <div className="flex-1 flex justify-center">
                            <div className="size-10 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                    <button className="size-12 rounded-2xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>

                {/* Hero Section */}
                <div className="px-8 pt-10 pb-6">
                    {isSignedIn ? (
                        <div className="flex flex-col gap-2">
                            <p className="text-primary text-xs font-black uppercase tracking-[0.2em]">Hi, Michael R.</p>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-slate-900 dark:text-white tracking-tighter text-4xl font-black font-outfit uppercase leading-[1.1] text-left"
                            >
                                YOUR <span className="text-primary italic">DASHBOARD</span>
                            </motion.h2>
                        </div>
                    ) : (
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-slate-900 dark:text-white tracking-tighter text-4xl font-black font-outfit uppercase leading-[1.1] text-left"
                        >
                            HELLO, HOW CAN WE<br /><span className="text-primary italic">HELP</span> YOU TODAY?
                        </motion.h2>
                    )}
                </div>

                {/* Authenticated Quick Actions */}
                {isSignedIn && (
                    <div className="px-8 py-6">
                        <div className="bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group cursor-pointer" onClick={() => router.push('/tracking')}>
                            {/* Animated Background Glow */}
                            <div className="absolute top-0 right-0 size-40 bg-primary/20 blur-3xl rounded-full translate-x-20 -translate-y-20 group-hover:bg-primary/40 transition-all duration-700" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Current Delivery</span>
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-xl font-black font-outfit uppercase tracking-tight text-white mb-1">Velvet Sectional Sofa</h3>
                                    <div className="flex items-center gap-3">
                                        <p className="text-[11px] font-black text-primary uppercase tracking-[0.1em]">Arriving Today, 6 PM</p>
                                        <div className="h-px w-8 bg-white/20" />
                                        <span className="material-symbols-outlined text-white/40 text-sm">local_shipping</span>
                                    </div>
                                </div>
                                <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Bar */}
                <div className="px-8 py-4">
                    <div className="relative flex items-center h-16 bg-slate-100 dark:bg-slate-800/50 rounded-full border-2 border-transparent focus-within:border-primary focus-within:bg-white dark:focus-within:bg-slate-800 transition-all px-6 shadow-sm group">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 h-full px-4 text-sm font-bold placeholder:text-slate-400 dark:text-white"
                            placeholder="Type a formal question..."
                        />
                    </div>
                </div>

                {/* Browse Topics */}
                <div className="px-4 md:px-8 pt-6 md:pt-8 pb-4">
                    <h3 className="text-xs md:text-sm font-black font-outfit uppercase tracking-[0.2em] text-slate-400 mb-4 md:mb-6">Explore Knowledge</h3>
                    <div className="grid grid-cols-2 gap-2 md:gap-4 pb-10">
                        {topics.map((topic, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => router.push(topic.link)}
                                className={`group flex flex-col items-start gap-2 md:gap-4 p-4 md:p-6 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-2xl md:rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all text-left overflow-hidden relative`}
                            >
                                <div className="flex items-center justify-center size-10 md:size-14 bg-slate-50 dark:bg-slate-800 rounded-xl md:rounded-2xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all relative z-10">
                                    <span className="material-symbols-outlined text-xl md:text-2xl">{topic.icon}</span>
                                </div>
                                <div className="relative z-10">
                                    <p className="text-slate-900 dark:text-white text-sm md:text-base font-black font-outfit uppercase tracking-tight">{topic.title}</p>
                                    <p className="text-slate-400 dark:text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-1 md:mt-1.5 leading-tight">{topic.description}</p>
                                </div>
                                {/* Subtle Background Icon */}
                                <span className="absolute -right-4 -bottom-4 material-symbols-outlined text-6xl md:text-8xl text-slate-50 dark:text-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none">
                                    {topic.icon}
                                </span>
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
                            onClick={() => router.push('/help/chat')}
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
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-8 rounded-[2.5rem] text-center mb-8"
                            >
                                <span className="material-symbols-outlined text-4xl text-green-500 mb-4 filled">check_circle</span>
                                <h4 className="font-black text-green-800 dark:text-green-300 uppercase tracking-tighter text-xl">Request Submitted</h4>
                                <p className="text-green-600 text-sm font-medium mt-2">We've received your message and will reply within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-6"
                            >
                                <div className="flex flex-col gap-3">
                                    <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">Your Name</label>
                                    <input
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-primary focus:border-primary text-sm font-bold py-4 px-6 transition-all"
                                        placeholder="John Doe"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">Order Number <span className="text-slate-300 font-normal">(Optional)</span></label>
                                    <input
                                        value={formState.order}
                                        onChange={(e) => setFormState({ ...formState, order: e.target.value })}
                                        className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-primary focus:border-primary text-sm font-bold py-4 px-6 transition-all"
                                        placeholder="#ORD-12345"
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest ml-1">Message</label>
                                    <textarea
                                        required
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-primary focus:border-primary text-sm font-bold py-4 px-6 resize-none transition-all"
                                        placeholder="Describe your issue..."
                                        rows={4}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-4 w-full py-5 px-8 rounded-full bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 border-2 border-black"
                                >
                                    {isSubmitting ? (
                                        <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "SUBMIT REQUEST"
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

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
