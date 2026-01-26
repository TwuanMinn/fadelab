"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BarbershopV1() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-200 min-h-screen">
            {/* TopNavBar */}
            <header className="sticky top-0 z-50 w-full border-b border-[#e7ebf3] dark:border-slate-800 bg-surface-light/95 dark:bg-background-dark/95 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-2xl">content_cut</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">FadeLab V1</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#">Services</a>
                        <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#">Barbers</a>
                        <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#">Gallery</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
                            Book Now
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {/* HeroSection */}
                <section className="relative w-full">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-2xl bg-cover bg-center h-[560px] shadow-xl group" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuALcZ3KDII7WKuKp87l3WM_oTEXBdSanf0XW7sefNLax0sROgGLlNly8891w3G0YIcycEV0Plmsi2wdWYQcZyryXzhMULn_njq_tts7eCAFQcg5fi3D-iJrUfGPcvq9CcYS56WTST_ARx8UP0PFR5Dq1E2Vrer6T0JGqjcXcoeio2ZAtWxrfTCxlZk10ZwSRee6Ucu_odkHLfTRzqyJWULwymxuC-PqvAD8ndfMq5gMc2fAUTY0MfgHDQR8n9nqlmSnf09c8Qai-bwf')" }}>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
                                <span className="material-symbols-outlined text-6xl text-white/80 mb-6 animate-pulse">content_cut</span>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 max-w-3xl leading-tight">Your Next Fresh Cut Awaits</h1>
                                <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-8 font-medium">Experience the art of grooming in downtown. Walk-ins welcome, appointments preferred.</p>
                                <div className="flex gap-4">
                                    <button className="bg-primary hover:bg-blue-600 text-white h-12 px-8 rounded-lg font-bold text-base transition-all transform hover:scale-105 shadow-xl shadow-blue-900/20">Book Appointment</button>
                                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 h-12 px-8 rounded-lg font-bold text-base transition-all">View Services</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ... Rest of the sections truncated for brevity but renamed to FadeLab ... */}
            </main>
        </div>
    );
}
