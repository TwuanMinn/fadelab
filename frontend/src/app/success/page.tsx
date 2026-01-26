
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";

const BARBERS = [
    { id: 1, name: "James" },
    { id: 2, name: "Marcus" },
    { id: 3, name: "Sarah" },
    { id: 4, name: "Jason" },
];

const SERVICES: Record<string, string> = {
    'quick-trim': "Quick Trim",
    'classic-cut': "Classic Cut",
    'premium': "Premium Experience"
};

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);
    const [serviceName, setServiceName] = useState("Signature Haircut");
    const [barberName, setBarberName] = useState("James");

    useEffect(() => {
        setMounted(true);
        const serviceParam = searchParams.get('service');
        const barberParam = searchParams.get('barberId');

        if (serviceParam && SERVICES[serviceParam]) {
            setServiceName(SERVICES[serviceParam]);
        }
        if (barberParam) {
            const barber = BARBERS.find(b => b.id === parseInt(barberParam));
            if (barber) setBarberName(barber.name);
        }
    }, [searchParams]);

    if (!mounted) return null;

    return (
        <div className="bg-background-dark min-h-screen font-display text-white flex flex-col items-center justify-center p-4">
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[480px] flex flex-col gap-6 relative z-10"
            >
                <div className="flex flex-col items-center text-center space-y-4 pt-4">
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="h-24 w-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] border border-emerald-500/20"
                    >
                        <span className="material-symbols-outlined text-[48px]">check_circle</span>
                    </motion.div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Booking Confirmed!</h1>
                        <p className="text-gray-400 font-medium">We&apos;ve sent a receipt to your email.</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-surface-dark rounded-[2rem] p-8 shadow-2xl border border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-50 font-black text-6xl text-white/5 select-none pointer-events-none -rotate-12 translate-x-4 -translate-y-4">CONFIRMED</div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Appointment Summary</h2>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-glow">Active</span>
                    </div>
                    <div className="space-y-6 relative z-10">
                        <div className="flex gap-5">
                            <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/5 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                <span className="material-symbols-outlined text-3xl">content_cut</span>
                            </div>
                            <div>
                                <h3 className="font-black text-white text-xl leading-tight uppercase tracking-tight italic">{serviceName}</h3>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Specialist: {barberName}</p>
                            </div>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <div className="flex gap-5">
                            <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/5 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                <span className="material-symbols-outlined text-3xl">calendar_today</span>
                            </div>
                            <div>
                                <h3 className="font-black text-white text-xl leading-tight uppercase tracking-tight italic">Wednesday, Oct 11</h3>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">10:45 AM GMT-5</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                >
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-1">Sync Protocol</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button className="flex flex-col items-center justify-center p-3 h-24 rounded-2xl border border-white/5 bg-surface-dark hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                            <span className="material-symbols-outlined text-2xl mb-2 text-gray-500 group-hover:text-primary transition-colors">event</span>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors">Google</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 h-24 rounded-2xl border border-white/5 bg-surface-dark hover:border-[#0078d4] hover:bg-[#0078d4]/10 transition-all duration-300 group">
                            <span className="material-symbols-outlined text-2xl mb-2 text-gray-500 group-hover:text-[#0078d4] transition-colors">mail</span>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors">Outlook</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 h-24 rounded-2xl border border-white/5 bg-surface-dark hover:border-white hover:bg-white/5 transition-all duration-300 group">
                            <span className="material-symbols-outlined text-2xl mb-2 text-gray-500 group-hover:text-white transition-colors">edit_calendar</span>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors">Apple</span>
                        </button>
                    </div>
                </motion.div>

                {/* Grooming Club Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-surface-dark rounded-2xl p-5 flex items-center gap-5 relative overflow-hidden border border-white/10 shadow-xl group hover:border-blue-500/50 transition-all"
                >
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 relative z-10 border border-blue-500/20 shadow-glow group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">diamond</span>
                    </div>
                    <div className="flex-1 relative z-10">
                        <p className="text-sm font-black text-white uppercase tracking-tight italic">Join the Grooming Club</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Earn rewards & get 10% off next.</p>
                    </div>
                    <button className="text-blue-500 text-xs font-black uppercase tracking-widest hover:text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all relative z-10 border border-blue-500/20 hover:border-blue-500">Join</button>
                    <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4 flex flex-col gap-6"
                >
                    <button className="w-full h-16 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-background-dark bg-transparent text-white text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 group">
                        <span className="group-hover:translate-x-1 transition-transform">View Booking Details</span>
                    </button>
                    <div className="text-center">
                        <Link className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-[0.3em] transition-colors" href="/">
                            Return to Base
                        </Link>
                    </div>
                </motion.div>
            </motion.main>

            {/* Global Styles for Icons */}
            <style jsx global>{`
                .material-symbols-outlined {
                  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>
        </div>
    );
}
