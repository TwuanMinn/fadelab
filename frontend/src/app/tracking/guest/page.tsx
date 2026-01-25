"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GuestTrackingPage() {
    const router = useRouter();

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] min-h-screen font-display flex flex-col items-center">
            {/* TopAppBar Component */}
            <header className="flex w-full items-center bg-white dark:bg-[#101822] p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
                <button
                    onClick={() => router.back()}
                    className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                </button>
                <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12 font-outfit uppercase">Track Order</h2>
            </header>

            <main className="flex-1 flex flex-col max-w-[480px] w-full mx-auto px-4 pb-12">
                {/* Hero Illustration / Icon Area */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex justify-center pt-10 pb-4"
                >
                    <div className="size-24 rounded-full bg-[#136dec]/10 flex items-center justify-center ring-8 ring-[#136dec]/5">
                        <span className="material-symbols-outlined text-[#136dec] text-5xl">local_shipping</span>
                    </div>
                </motion.div>

                {/* HeadlineText Component */}
                <div className="px-4 text-center">
                    <h1 className="text-[#111418] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2 pt-4 font-outfit uppercase">Guest Order Tracking</h1>
                    <p className="text-[#617289] dark:text-gray-400 text-base font-normal leading-normal pb-8 pt-1 max-w-xs mx-auto">
                        Enter your details below to check the real-time status of your furniture delivery.
                    </p>
                </div>

                {/* Form Container */}
                <div className="flex flex-col gap-5 px-4 py-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
                    {/* TextField Component: Order Number */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#111418] dark:text-white text-xs font-black uppercase tracking-widest ml-1">Order Number</label>
                        <input
                            className="flex w-full rounded-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#136dec]/20 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#136dec] h-14 placeholder:text-[#617289] px-4 text-base font-bold transition-all"
                            placeholder="e.g. ORD-772910"
                            type="text"
                        />
                    </div>

                    {/* TextField Component: Email Address */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#111418] dark:text-white text-xs font-black uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            className="flex w-full rounded-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#136dec]/20 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#136dec] h-14 placeholder:text-[#617289] px-4 text-base font-bold transition-all"
                            placeholder="your.email@example.com"
                            type="email"
                        />
                    </div>

                    {/* Help Link */}
                    <div className="flex justify-start pt-1">
                        <button className="text-[#136dec] text-xs font-bold uppercase tracking-wide hover:underline flex items-center gap-1 group">
                            <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">help_outline</span>
                            Where can I find my order number?
                        </button>
                    </div>

                    {/* Primary Action Button */}
                    <button
                        onClick={() => router.push('/tracking')}
                        className="w-full h-14 mt-2 bg-gradient-to-r from-[#136dec] to-[#4a90f5] text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-[#136dec]/20 hover:shadow-[#136dec]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <span>Track Now</span>
                        <span className="material-symbols-outlined text-lg">near_me</span>
                    </button>
                </div>

                {/* Alternative Action Section */}
                <div className="mt-8 px-4 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 w-full">
                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                        <span className="text-[10px] text-[#617289] font-black uppercase tracking-[0.2em]">OR</span>
                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                    </div>

                    <div className="w-full text-center space-y-3">
                        <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">Have an account?</p>
                        <button className="w-full h-12 border-2 border-[#dbe0e6] dark:border-gray-700 rounded-xl text-[#111418] dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Login to see order history
                        </button>
                    </div>

                    <p className="text-xs text-[#617289] dark:text-gray-500 text-center px-6 leading-relaxed font-medium">
                        Need help? <a className="text-[#136dec] font-bold hover:underline cursor-pointer">Contact our support team</a> available 24/7 for delivery inquiries.
                    </p>
                </div>
            </main>

            {/* Decorative Background Glow */}
            <div className="fixed top-0 right-0 -z-10 opacity-30 dark:opacity-10 pointer-events-none">
                <div className="w-96 h-96 bg-[#136dec] blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            </div>
        </div>
    );
}
