"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Toolbar } from "../components/Toolbar";

export default function SupportPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const FAQS = [
        { q: "How do I reschedule an appointment less than 24 hours before?", a: "Please call us directly at +1 (555) 123-4567. Online rescheduling is locked 24 hours prior to maintain schedule efficiency." },
        { q: "What is included in the 'Executive Cut' package?", a: "The Executive Cut includes a consultation, precision haircut, hot towel treatment, scalp massage, and a styling session with premium products." },
        { q: "Do you offer gift cards for grooming services?", a: "Yes, digital and physical gift cards are available in-store and online. They can be redeemed for any service or product." },
        { q: "What happens if I'm running late for my booking?", a: "We offer a 10-minute grace period. Beyond that, we may need to reschedule or shorten your service to respect the time of the next client." }
    ];

    return (
        <div className="bg-background-dark text-white font-display min-h-screen pb-32">
            <Toolbar />

            {/* Header / Hero */}
            <div className="pt-32 pb-12 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Support Center</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8">
                        How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">help?</span>
                    </h1>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors">search</span>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-24 py-5 bg-surface-dark border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-xl"
                            placeholder="Search for topics, keywords, or questions..."
                        />
                        <div className="absolute inset-y-2 right-2">
                            <button className="bg-primary hover:bg-primary/90 text-white h-full px-6 rounded-xl font-bold text-sm transition-all">
                                Search
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Categories Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">category</span>
                        Browse by Category
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Booking & Rescheduling", desc: "Late arrivals, cancellations, and appointment edits", icon: "calendar_month" },
                            { title: "Memberships & Rewards", desc: "VIP grooming club benefits and earning reward points", icon: "military_tech" },
                            { title: "Products & Shipping", desc: "Pomades, oils, grooming kits, and delivery tracking", icon: "inventory_2" },
                            { title: "Shop Etiquette", desc: "Dress code, guest policy, and arrival instructions", icon: "info" }
                        ].map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-surface-dark border border-white/5 p-6 rounded-[2rem] hover:border-primary/50 transition-all cursor-pointer group hover:-translate-y-1"
                            >
                                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                                </div>
                                <h3 className="font-bold text-lg text-white mb-2 leading-tight">{cat.title}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-gray-400 transition-colors">{cat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trending Articles */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">trending_up</span>
                                Trending Articles
                            </h2>
                            <Link href="#" className="text-primary text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>

                        <div className="bg-surface-dark border border-white/5 rounded-[2rem] overflow-hidden divide-y divide-white/5">
                            {FAQS.map((faq, i) => (
                                <div key={i} className="group overflow-hidden">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                        className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`size-8 rounded-lg flex items-center justify-center transition-colors ${openIndex === i ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 group-hover:text-primary'}`}>
                                                <span className="material-symbols-outlined text-sm">
                                                    {openIndex === i ? 'remove' : 'add'}
                                                </span>
                                            </div>
                                            <span className={`font-medium transition-colors ${openIndex === i ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                                {faq.q}
                                            </span>
                                        </div>
                                        <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-primary' : 'text-gray-600'}`}>
                                            expand_more
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-6 pt-0 pl-[4.5rem] text-sm text-gray-400 leading-relaxed">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-surface-dark to-[#0f1623] border border-white/5 rounded-[2rem] p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 relative z-10">Still need help?</h3>
                            <p className="text-gray-500 font-medium mb-8 leading-relaxed relative z-10">
                                Our support team is available Monday to Friday, 9am - 6pm. We're here to ensure your experience is flawless.
                            </p>

                            <div className="flex flex-col gap-3 relative z-10">
                                <button className="w-full bg-white text-background-dark font-black uppercase tracking-wider text-xs py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-lg">mail</span>
                                    Contact Email
                                </button>
                                <button className="w-full bg-surface-dark border border-white/10 text-white font-black uppercase tracking-wider text-xs py-4 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-lg">call</span>
                                    +1 (555) 123-4567
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Chat Floating Button */}
            <div className="fixed bottom-32 right-8 z-40">
                <button className="bg-primary hover:bg-primary/90 text-white size-16 rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group relative">
                    <span className="material-symbols-outlined text-3xl group-hover:hidden animate-pulse">chat</span>
                    <span className="hidden group-hover:block font-black text-[10px] uppercase tracking-wider">Chat</span>

                    {/* Status Dot */}
                    <span className="absolute top-0 right-0 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background-dark"></span>
                    </span>
                </button>
            </div>

        </div>
    );
}
