"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function OrderSuccess() {
    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-charcoal dark:text-white font-display flex justify-center pb-8">
            <div className="relative flex w-full flex-col max-w-5xl mx-auto bg-background-light dark:bg-background-dark shadow-sm rounded-none md:rounded-3xl md:mt-8 md:border md:border-slate-200 md:dark:border-white/5 md:shadow-xl overflow-hidden">

                {/* Top App Bar */}
                <div className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md md:static">
                    <Link href="/" className="size-12 flex items-center justify-center rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </Link>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12 md:text-xl">Order Confirmed</h2>
                </div>

                <div className="md:p-8 md:pt-2">
                    {/* Success Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center pt-4 pb-8 px-4 border-b border-dashed border-slate-200 dark:border-slate-800 md:border-none md:pb-10"
                    >
                        <div className="flex items-center justify-center size-20 bg-green-50 dark:bg-green-900/20 rounded-full mb-4 ring-8 ring-green-50/50 dark:ring-green-900/10 shadow-lg shadow-green-500/10 scale-110">
                            <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
                        </div>
                        <h2 className="text-[32px] font-bold leading-tight text-center mb-2 tracking-tight md:text-4xl">Thank You!</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center max-w-sm md:text-lg">
                            Your order <span className="text-charcoal dark:text-white font-bold">#ORD-38291</span> has been placed.
                        </p>
                        <p className="text-primary text-sm font-bold mt-3 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full text-blue-600 dark:text-blue-400">
                            Estimated delivery: Jan 24 - Jan 26
                        </p>

                        <div className="mt-8 w-full max-w-xs">
                            <Link href="/tracking" className="flex w-full items-center justify-center gap-2 rounded-xl h-12 px-5 bg-gradient-to-r from-primary to-blue-500 hover:to-blue-600 text-white text-base font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]">
                                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                Track My Order
                            </Link>
                        </div>
                    </motion.div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 px-4 md:px-0">
                        {/* Left Column: Order Items */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold leading-tight md:text-xl md:mb-2">Order Summary</h3>
                            {/* Item 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex gap-4 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm"
                            >
                                <div className="size-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 relative">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv0zdGltID2eiYiwCPgtL-eleC7-9h_uXINyKOzhL33uLSG-RSCXSirw9R6UBviklwOfZllqZ3PM7wr2B9unccMWZKKkCSGGKLdHgDCg1XNdMpYRY6EmjO2o1B3D_DTCCvYzEa_FaSGqAlVtUFQQjUBaPjexg7QTw1SGAkYK4mQzmAo0xzikEZeV10uN1lPjtqkY5pWfMIf7CL2QXxbwV4v8qJiNjBxGQy1ykw-QVU0DS9WnUjupapUTgpskO2JyR8Q1qZD9BgpFQ"
                                        alt="Mid-Century Velvet Sofa"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <h4 className="text-base font-bold leading-tight truncate">Mid-Century Velvet Sofa</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Color: Royal Blue</p>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Qty: 1</span>
                                        <span className="font-bold text-lg">$899.00</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Item 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex gap-4 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm"
                            >
                                <div className="size-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 relative">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI0VWJnjLOgN2HIVdE0UTTlOnDRWX2xFzE9NcXSxtcYqz9dn__0Z63HIRG3JZWX89MBL464peeZH23oCERB6jyXOgapJycPR8I-najdCCAfFzTxOVliC5cjnpPffH-eqo3GjW7JxsK6iKK0Wn9j_l8KfGzCl3eflyIf_DBf1xyaR3Kxg9pjRYfnlgvYUxzmfNSDEZpvk_eShWzahCqhyilpGxhAVDqNEmc9VfFsrM1-aCEPH67jqCtJrlK-khJucmVmuVtuA0ZSFE"
                                        alt="Solid Oak Coffee Table"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                    <h4 className="text-base font-bold leading-tight truncate">Solid Oak Coffee Table</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Finish: Natural Oak</p>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Qty: 1</span>
                                        <span className="font-bold text-lg">$250.00</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Cost & Actions */}
                        <div className="flex flex-col gap-6">
                            {/* Cost Breakdown */}
                            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 flex flex-col gap-4 border border-slate-100 dark:border-slate-800 h-fit">
                                <h3 className="text-lg font-bold leading-tight mb-1">Payment Details</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Subtotal</span>
                                    <span className="font-bold text-sm">$1,149.00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Shipping</span>
                                    <span className="text-green-600 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">Free</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Tax</span>
                                    <span className="font-bold text-sm">$92.00</span>
                                </div>
                                <div className="h-px bg-slate-200 dark:bg-slate-700 my-2 border-dashed"></div>
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-lg">Total</span>
                                    <span className="font-black text-2xl">$1,241.00</span>
                                </div>
                            </div>

                            {/* Secondary Actions */}
                            <div className="flex flex-col gap-3">
                                <button className="flex w-full items-center justify-center rounded-xl h-12 px-5 bg-white dark:bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-charcoal dark:text-white text-sm font-bold transition-colors">
                                    Download Receipt
                                </button>
                                <Link
                                    href="/catalog"
                                    className="flex w-full items-center justify-center rounded-xl h-12 px-5 text-primary text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
