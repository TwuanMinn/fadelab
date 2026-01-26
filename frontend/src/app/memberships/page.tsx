"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function MembershipsPage() {
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    const handleSelectPlan = (plan: string) => {
        router.push(`/memberships/checkout?plan=${plan}&billing=${billingCycle}`);
    };

    return (
        <div className="bg-background-dark text-white font-display antialiased overflow-x-hidden min-h-screen flex flex-col">
            {/* Navbar */}
            <header className="w-full border-b border-white/5 sticky top-0 z-50 bg-surface-darker/80 backdrop-blur-xl">
                <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="p-2.5 rounded-xl bg-primary text-white shadow-glow group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[28px]">content_cut</span>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter hidden sm:block">FadeLab</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors" href="/">Home</Link>
                        <Link className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors" href="/#services">Services</Link>
                        <Link className="text-[10px] font-black uppercase tracking-widest text-primary" href="/memberships">Memberships</Link>
                        <Link className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors" href="/help">Support</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/barbers" className="flex items-center justify-center rounded-2xl h-12 px-8 bg-primary hover:bg-primary/90 transition-all text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-glow active:scale-95">
                            Book Now
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center pt-20 pb-32 px-4 md:px-8 relative overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -translate-y-1/2 -z-10"></div>
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[128px] translate-x-1/2 -z-10"></div>

                {/* Header & Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center gap-6 mb-16 max-w-3xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Elite Protocols</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                        SELECT YOUR <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">MEMBERSHIP</span>
                    </h1>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xl">
                        Elevate your grooming routine with our premium subscription tiers. Consistency is the foundation of excellence.
                    </p>
                </motion.div>

                {/* Toggle Switch */}
                <div className="mb-20 flex justify-center w-full">
                    <div className="bg-surface-dark/50 backdrop-blur-md border border-white/5 rounded-2xl p-1.5 flex items-center shadow-2xl">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-primary text-white shadow-glow' : 'text-gray-500 hover:text-white'}`}
                        >
                            Monthly Cycle
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${billingCycle === 'annual' ? 'bg-primary text-white shadow-glow' : 'text-gray-500 hover:text-white'}`}
                        >
                            Annual Optimization
                            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${billingCycle === 'annual' ? 'bg-white text-primary' : 'bg-primary/20 text-primary'}`}>-20%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1280px] w-full"
                >
                    {/* Card 1: Essential */}
                    <motion.div variants={itemVariants} className="flex flex-col h-full rounded-[2.5rem] border border-white/5 bg-surface-dark/40 backdrop-blur-sm p-10 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                        <div className="mb-8">
                            <p className="text-[10px] font-black text-primary tracking-[0.2em] uppercase mb-2">Protocol 01</p>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Essential</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase mt-1 tracking-widest">Professional baseline</p>
                        </div>
                        <div className="mb-10 flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white tracking-tighter tabular-nums">${billingCycle === 'monthly' ? 45 : Math.floor(45 * 12 * 0.8)}</span>
                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                        </div>
                        <button onClick={() => handleSelectPlan('essential')} className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary hover:border-primary text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all mb-10 active:scale-95">
                            Initialize Protocol
                        </button>
                        <div className="flex flex-col gap-5">
                            {[
                                "1 Signature Haircut / Month",
                                "Basic Precision Beard Trim",
                                "Standard Lab Craft Beverage",
                                "Digital Record Access"
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <span className="material-symbols-outlined text-primary text-xl font-black">check_circle</span>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Card 2: Executive (Highlighted) */}
                    <motion.div variants={itemVariants} className="flex flex-col h-full rounded-[2.5rem] border-2 border-primary bg-surface-dark shadow-2xl shadow-primary/10 p-10 relative transform lg:-translate-y-6 hover:transform lg:hover:-translate-y-8 transition-all duration-500 z-10 overflow-hidden">
                        <div className="absolute top-0 right-10 bg-primary text-white text-[8px] font-black px-4 py-2 rounded-b-xl uppercase tracking-[0.2em] shadow-glow">
                            Most Deployed
                        </div>
                        <div className="mb-8">
                            <p className="text-[10px] font-black text-primary tracking-[0.2em] uppercase mb-2">Protocol 02</p>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Executive</h3>
                            <p className="text-primary text-[10px] font-black uppercase mt-1 tracking-widest">Master performance</p>
                        </div>
                        <div className="mb-10 flex items-baseline gap-2">
                            <span className="text-6xl font-black text-white tracking-tighter tabular-nums shadow-glow">${billingCycle === 'monthly' ? 85 : Math.floor(85 * 12 * 0.8)}</span>
                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                        </div>
                        <button onClick={() => handleSelectPlan('executive')} className="w-full h-16 rounded-2xl bg-primary hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-glow transition-all mb-10 active:scale-95">
                            Establish Master Access
                        </button>
                        <div className="flex flex-col gap-5">
                            {[
                                "Unlimited Signature Cuts",
                                "Priority Grid Scheduling",
                                "Hot Towel Shave Protocol",
                                "15% Inventory Discount",
                                "Premium Private Selection Refreshments"
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="size-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[11px] font-black uppercase tracking-widest text-white">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Card 3: Elite */}
                    <motion.div variants={itemVariants} className="flex flex-col h-full rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-surface-dark/60 to-black p-10 hover:border-white/10 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400 opacity-50"></div>
                        <div className="mb-8">
                            <p className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase mb-2">Protocol 03</p>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Elite Lab</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase mt-1 tracking-widest">Zero compromise</p>
                        </div>
                        <div className="mb-10 flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white tracking-tighter tabular-nums">${billingCycle === 'monthly' ? 150 : Math.floor(150 * 12 * 0.8)}</span>
                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                        </div>
                        <button onClick={() => handleSelectPlan('elite')} className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 hover:border-white text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all mb-10 active:scale-95">
                            Authorize Full Spectrum
                        </button>
                        <div className="flex flex-col gap-5">
                            {[
                                "All Executive Privileges",
                                "Monthly Mobile Lab Service",
                                "2 Guest Session Passes / Month",
                                "Curated Lab Product Kit Quarterly",
                                "Private Vault Storage"
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <span className="material-symbols-outlined text-gray-500 text-xl font-black">verified</span>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Features Section */}
                <div className="w-full max-w-[1280px] mt-40">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "event_available", title: "Smart Scheduling", desc: "Our Al-driven grid ensures your sessions are optimized for your lifestyle." },
                            { icon: "diamond", title: "Lab Products", desc: "Exclusive access to small-batch grooming essentials developed in our labs." },
                            { icon: "published_with_changes", title: "Dynamic Terms", desc: "Pause, upgrade, or modify your protocol at any time through the terminal." }
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-surface-dark/30 border border-white/5 p-8 rounded-[2rem] flex flex-col gap-6"
                            >
                                <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl font-black">{f.icon}</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-sm uppercase tracking-widest mb-2">{f.title}</h4>
                                    <p className="text-gray-500 text-[11px] font-bold uppercase leading-relaxed tracking-wider">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-white/5 bg-surface-darker py-12 mt-auto">
                <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4 text-gray-500">
                        <div className="size-8 flex items-center justify-center rounded-lg bg-white/5 text-white/20">
                            <span className="material-symbols-outlined text-xl">content_cut</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">© 2024 FadeLab Operation. All rights reserved.</span>
                    </div>
                    <div className="flex gap-10">
                        <Link className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors" href="#">Privacy</Link>
                        <Link className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors" href="#">Standard Terms</Link>
                        <Link className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors" href="#">Terminal Help</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
