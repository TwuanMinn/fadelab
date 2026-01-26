"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TrackOrderPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display antialiased min-h-screen flex flex-col transition-colors duration-300">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-6 lg:px-10 py-5 bg-transparent sticky top-0 z-50 backdrop-blur-md">
                <Link href="/success" className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors bg-white/10 px-5 py-2.5 rounded-full hover:bg-white/20">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    <span className="text-lg font-bold">Back</span>
                </Link>
                <div className="flex flex-1 justify-end gap-8">
                    {/* Empty Right Side */}
                </div>
            </header>

            <main className="flex-grow px-6 md:px-20 py-8 max-w-[1400px] mx-auto w-full">
                <motion.div
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {/* Page Heading & Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <motion.div variants={itemVariants} className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white">Detailed Order Tracking</h1>
                            <p className="text-white/60 text-base font-medium">Tracking Number: <span className="text-white font-bold select-all">#US-849321</span></p>
                        </motion.div>
                        <motion.button variants={itemVariants} className="flex items-center gap-2 bg-[#1e293b]/50 backdrop-blur-md border border-white/10 text-white px-5 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">content_copy</span>
                            Copy Number
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Map & Timeline */}
                        <div className="lg:col-span-8 flex flex-col gap-8">
                            {/* Status & Map Card */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider mb-2">Status: In Transit</span>
                                        <h2 className="text-3xl font-bold tracking-tight text-white">Arriving by <span className="text-blue-500">Friday, Oct 24th</span></h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="size-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-colors" title="Refresh Status">
                                            <span className="material-symbols-outlined">refresh</span>
                                        </button>
                                        <button className="size-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-colors" title="Contact Support">
                                            <span className="material-symbols-outlined">support_agent</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden group">
                                    <div className="absolute inset-0 bg-center bg-cover filter grayscale contrast-125 brightness-[0.7] group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgD5Fxr5qviPeawU_gootIYuKdL7r-l7xIw5gEuFQfXX3SRb1cjNOPr9rZU4PzCnq3zoKcwgIYsQCaDjWgdV-phG1kOqUHbKIL7VO3XmHS82izRhZ76eLkj3rPJLYu2eWhQFmhF1XxSg9FrklKZtMiC8d0pJ4r4MqSMstfuPzxlelpvxHuuAGdp0dYkyeyoI5mS-pWwxrugiSVemyI5F1TdDvU_MJG548qlJ8-4vEjqBgiciTms6pejVGb2b76nNRUQRRiFVxTxqco")' }}></div>
                                    {/* Map Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                                    {/* Location Pin */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <div className="relative flex items-center justify-center size-12">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full size-4 bg-blue-500 border-4 border-black"></span>
                                        </div>
                                        <div className="mt-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                                            Distribution Center, NY
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4">
                                        <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-white/20 transition">
                                            <span className="material-symbols-outlined text-[16px]">open_in_full</span>
                                            View Full Map
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Timeline Stepper */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10 shadow-sm">
                                <h3 className="text-xl font-bold mb-8 text-white">Shipment Progress</h3>
                                <div className="relative flex flex-col md:flex-row justify-between md:items-center gap-8 md:gap-0">
                                    {/* Progress Bar Background (Desktop) */}
                                    <div className="hidden md:block absolute top-[14px] left-0 w-full h-1 bg-white/10 -z-0"></div>
                                    {/* Active Progress Bar (Desktop) */}
                                    <div className="hidden md:block absolute top-[14px] left-0 w-1/2 h-1 bg-blue-600 -z-0"></div>

                                    {/* Progress Bar (Mobile) */}
                                    <div className="md:hidden absolute left-[15px] top-4 bottom-4 w-1 bg-white/10 -z-0"></div>
                                    <div className="md:hidden absolute left-[15px] top-4 h-1/2 w-1 bg-blue-600 -z-0"></div>

                                    {/* Step 1: Completed */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-white">Order Placed</p>
                                            <p className="text-xs text-white/60">Oct 21, 10:23 AM</p>
                                        </div>
                                    </div>

                                    {/* Step 2: Completed */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-white">Shipped</p>
                                            <p className="text-xs text-white/60">Oct 22, 04:15 PM</p>
                                        </div>
                                    </div>

                                    {/* Step 3: Active */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="relative size-8 rounded-full bg-[#1e293b] border-2 border-blue-500 flex items-center justify-center text-blue-500 shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="animate-pulse absolute inset-0 rounded-full bg-blue-500/20"></span>
                                            <span className="material-symbols-outlined text-sm font-bold">local_shipping</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-blue-500">In Transit</p>
                                            <p className="text-xs text-white/60">Processing..</p>
                                        </div>
                                    </div>

                                    {/* Step 4: Pending */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="material-symbols-outlined text-sm font-bold">inventory_2</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-white/40">Out for Delivery</p>
                                            <p className="text-xs text-white/40 opacity-50">Estimated Oct 24</p>
                                        </div>
                                    </div>

                                    {/* Step 5: Pending */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="material-symbols-outlined text-sm font-bold">home_pin</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-white/40">Delivered</p>
                                            <p className="text-xs text-white/40 opacity-50">Pending</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Details & Notification */}
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            {/* Order Contents */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white">Package Contents</h3>
                                    <span className="text-sm font-medium text-white/60">2 Items</span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {/* Item 1 */}
                                    <div className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                        <div className="size-16 rounded-lg bg-white/10 bg-center bg-cover shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsGEuvAyNAFanVYyQfZi7Sb4RalLFPU71J2PG3RbFhSCnMMClS_33oY5oClkaApwrn_0j6KVsjWTEzAlvZR48mKAPIfNn-9xBCeAD8Sks2zh44czBRVJ3sIXto_KBZuNXweSyL8Ry0kGCbiQo8h6HycrRAVI8-C8IkDrA6AnI_PRA5g98kcAvzuLnZpH0TkaJAab0qXzRP37H-FBfI7oKczQHdc76GqJGBf48wgSdqWEQaEVtAKEH4J7o8h3yK6erObzbsS1qCv4ql")' }}></div>
                                        <div className="flex flex-col flex-1">
                                            <h4 className="font-bold text-sm leading-tight text-white group-hover:text-blue-500 transition-colors">Royal Cut Clippers</h4>
                                            <p className="text-xs text-white/60 mt-1">Professional Series</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm text-white">$120.00</p>
                                            <p className="text-xs text-white/60">Qty: 1</p>
                                        </div>
                                    </div>
                                    {/* Item 2 */}
                                    <div className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                        <div className="size-16 rounded-lg bg-white/10 bg-center bg-cover shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCFWUU3nJ2s4N8vrKmzKAfynQTEtHJiBrhMqvMQMoVMkv_oWEFpIJOTBvnDWRh4tWOzhxzjztObVeu06If64_UkUAE_ST3a2EP73UWLim32BPR2pZtC_RE4VYsWUDAJ0mDnQpQ0j8bHhAKIHXLpiCtu5_gBwGeMilaNqrR_FRnlHLbpr5nJ1Zekto5dLx0OXu1oXQ3lrwx5y_qoTud4XXZqI5WUxfcPLtzZ6-2iMVnterA-l598SUqLwQvq-Yj57cHQQL5mbBNrEjC")' }}></div>
                                        <div className="flex flex-col flex-1">
                                            <h4 className="font-bold text-sm leading-tight text-white group-hover:text-blue-500 transition-colors">Matte Pomade</h4>
                                            <p className="text-xs text-white/60 mt-1">Strong Hold</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm text-white">$25.00</p>
                                            <p className="text-xs text-white/60">Qty: 1</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                                    <span className="font-medium text-white/60">Total Value</span>
                                    <span className="font-black text-lg text-white">$145.00</span>
                                </div>
                            </motion.div>

                            {/* Notifications Toggle */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-blue-500">notifications_active</span>
                                    <h3 className="text-lg font-bold text-white">Get Notified</h3>
                                </div>
                                <p className="text-sm text-white/60 mb-6">Receive updates about your package location and delivery status.</p>
                                <div className="flex flex-col gap-4">
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white/5 p-2 rounded-full text-white">
                                                <span className="material-symbols-outlined text-[18px]">sms</span>
                                            </div>
                                            <span className="font-medium text-sm text-white group-hover:text-blue-500 transition-colors">SMS Updates</span>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input defaultChecked className="sr-only peer" type="checkbox" />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </div>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white/5 p-2 rounded-full text-white">
                                                <span className="material-symbols-outlined text-[18px]">mail</span>
                                            </div>
                                            <span className="font-medium text-sm text-white group-hover:text-blue-500 transition-colors">Email Updates</span>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input className="sr-only peer" type="checkbox" />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </div>
                                    </label>
                                </div>
                            </motion.div>

                            {/* Help Button */}
                            <motion.button variants={itemVariants} className="w-full py-4 rounded-xl border border-transparent bg-white/10 text-white font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">help</span>
                                Need Help with this Order?
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
