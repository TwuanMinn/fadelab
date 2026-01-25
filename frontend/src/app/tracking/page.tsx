"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TrackingPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0f172a] text-slate-900 dark:text-white font-jakarta pb-12">
            <div className="max-w-5xl mx-auto md:pt-10">
                <div className="bg-white dark:bg-[#1e293b] md:rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none min-h-screen md:min-h-0 flex flex-col border border-white dark:border-slate-800 overflow-hidden">

                    {/* Top Bar */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50 dark:border-slate-800/50 sticky top-0 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl z-50">
                        <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                        </button>
                        <h1 className="text-lg font-black uppercase tracking-tighter">Track Order</h1>
                        <button className="size-10 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-slate-900 dark:text-white">more_horiz</span>
                        </button>
                    </div>

                    <div className="flex-1 p-6 md:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* Left Column: Product & Status (7 cols) */}
                            <div className="lg:col-span-6 space-y-6">
                                {/* Order Card */}
                                <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-5 border border-slate-100 dark:border-slate-800 flex gap-5 shadow-sm">
                                    <div className="size-24 rounded-2xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                                        <Image
                                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                                            alt="Sofa"
                                            width={96}
                                            height={96}
                                            className="object-cover h-full w-full"
                                        />
                                    </div>
                                    <div className="flex-1 py-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="bg-blue-50 dark:bg-blue-900/30 text-[#136dec] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">In Transit</span>
                                            <span className="text-[10px] font-bold text-slate-400">#402-221</span>
                                        </div>
                                        <h3 className="font-black text-slate-900 dark:text-white text-lg font-outfit uppercase tracking-tight">Velvet Sectional Sofa</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Navy Blue • Sectional</p>
                                        <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-slate-900 dark:text-white">
                                            <span className="material-symbols-outlined text-green-500 text-[18px]">schedule</span>
                                            Arriving Today by 6 PM
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Card */}
                                <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Order Status</h3>

                                    <div className="space-y-0">
                                        {/* Status Item: Placed */}
                                        <div className="relative flex gap-6 pb-10">
                                            <div className="absolute left-4 top-8 bottom-0 w-1 bg-green-500 rounded-full" />
                                            <div className="size-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/20 z-10">
                                                <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-sm uppercase tracking-tight dark:text-white">Order Placed</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Oct 24, 10:00 AM</p>
                                            </div>
                                        </div>

                                        {/* Status Item: Processing */}
                                        <div className="relative flex gap-6 pb-10">
                                            <div className="absolute left-4 top-8 bottom-0 w-1 bg-blue-500 rounded-full" />
                                            <div className="size-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/20 z-10">
                                                <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-sm uppercase tracking-tight dark:text-white">Processing</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Oct 24, 2:00 PM</p>
                                            </div>
                                        </div>

                                        {/* Status Item: Shipped */}
                                        <div className="relative flex gap-6 pb-10">
                                            <div className="absolute left-4 top-8 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                            <div className="size-8 rounded-full bg-[#136dec] flex items-center justify-center text-white shrink-0 shadow-xl shadow-blue-500/40 z-10 animate-pulse">
                                                <span className="material-symbols-outlined text-[18px] filled">local_shipping</span>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-sm uppercase tracking-tight text-[#136dec]">Shipped</h4>
                                                <p className="text-[10px] font-black text-[#136dec]/60 uppercase tracking-widest mt-1">Oct 25, 9:00 AM - ON THE WAY</p>
                                            </div>
                                        </div>

                                        {/* Status Item: Delivered */}
                                        <div className="relative flex gap-6">
                                            <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 border border-slate-200 dark:border-slate-700 z-10">
                                                <span className="material-symbols-outlined text-[18px]">home</span>
                                            </div>
                                            <div>
                                                <h4 className="font-black text-sm uppercase tracking-tight text-slate-300">Delivered</h4>
                                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">EST. TODAY 6:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Map & Details (5 cols) */}
                            <div className="lg:col-span-6 space-y-6">
                                {/* Map Card */}
                                <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Live Location</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="size-2 bg-green-500 rounded-full animate-pulse shadow-glow" />
                                            <span className="text-[10px] font-black uppercase text-green-500">Live</span>
                                        </div>
                                    </div>
                                    <div className="h-48 bg-slate-200 relative overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Map"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                                        {/* Truck Pin */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                            <div className="bg-[#136dec] text-white p-2 rounded-full shadow-2xl border-2 border-white transform -translate-y-2 pulse-blue">
                                                <span className="material-symbols-outlined text-sm filled">local_shipping</span>
                                            </div>
                                            <div className="size-3 bg-blue-500/40 rounded-full blur-[2px]" />
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center justify-between bg-white dark:bg-slate-900/80">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-full overflow-hidden border border-slate-100 shadow-sm">
                                                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Driver" width={40} height={40} className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm dark:text-white">Michael R.</p>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Ford Transit • 4.9 ★</p>
                                            </div>
                                        </div>
                                        <button className="size-10 bg-blue-50 dark:bg-blue-900/30 text-[#136dec] rounded-full flex items-center justify-center hover:bg-blue-100 transition-all active:scale-95 shadow-sm">
                                            <span className="material-symbols-outlined text-lg filled">call</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Details Card */}
                                <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Shipping Details</h3>

                                    <div className="flex gap-5">
                                        <div className="size-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                                            <span className="material-symbols-outlined text-slate-400">location_on</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Shipping Address</p>
                                            <p className="font-bold text-sm leading-snug dark:text-white">123 Design Avenue, Apt 4B<br />Brooklyn, NY 11201</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5">
                                        <div className="size-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                                            <span className="material-symbols-outlined text-slate-400">payments</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Payment Method</p>
                                            <p className="font-bold text-sm dark:text-white">Visa ending in 4242</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Button */}
                                <button className="w-full py-5 px-8 rounded-[1.5rem] bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95">
                                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
