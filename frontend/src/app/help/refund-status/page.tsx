"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RefundStatusPage() {
    const router = useRouter();

    return (
        <div className="bg-white dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative mx-auto h-full min-h-screen w-full max-w-2xl flex flex-col bg-white dark:bg-[#0a0f16] shadow-xl overflow-x-hidden">
                {/* Top Navigation */}
                <div className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-[#0a0f16]/90 backdrop-blur-md px-6 py-4 justify-between border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="text-[#111418] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-[#111418] dark:text-white text-sm font-black font-outfit uppercase tracking-tighter">Refund Tracker</h2>
                    <div className="size-10" />
                </div>

                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="size-32 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8"
                    >
                        <span className="material-symbols-outlined text-6xl filled">currency_exchange</span>
                    </motion.div>

                    <h1 className="text-3xl font-black font-outfit uppercase leading-tight tracking-tighter mb-4 text-slate-900 dark:text-white">
                        Refund in <span className="text-primary italic">Progress</span>
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-xs leading-relaxed">
                        We've received your returned item. Our team is currently verifying the condition before releasing your funds.
                    </p>

                    {/* Simple Progress Bar */}
                    <div className="w-full max-w-sm space-y-6">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Returned</span>
                            <span>Verifying</span>
                            <span>Processed</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "30%" }}
                                animate={{ width: "65%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-primary rounded-full"
                            />
                        </div>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest">Est. Completion: 2-3 Business Days</p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-4 w-full max-w-sm">
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-left flex gap-4">
                            <span className="material-symbols-outlined text-primary">receipt</span>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Refund Amount</p>
                                <p className="font-black text-xl text-slate-900 dark:text-white">$890.00</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-left flex gap-4">
                            <span className="material-symbols-outlined text-primary">account_balance</span>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                                <p className="font-bold text-sm text-slate-900 dark:text-white">Visa ending in 4242</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.push('/help')}
                        className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl"
                    >
                        Back to Help Center
                    </button>
                </div>
            </div>
        </div>
    );
}
