"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Checkout() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-8">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                <Link href="/cart" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Checkout</h1>
                <div className="size-10"></div> {/* Spacer */}
            </header>

            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Progress Stepper */}
                <div className="max-w-3xl mx-auto mb-10">
                    <div className="flex items-center justify-between px-4">
                        <div className="flex flex-col items-center gap-2">
                            <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <span className="material-symbols-outlined text-[20px]">check</span>
                            </div>
                            <span className="text-xs font-bold text-blue-600">Shipping</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 mx-4 mb-6"></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/30">
                                2
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">Payment</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 mx-4 mb-6"></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-base border-2 border-slate-200 dark:border-slate-700">
                                3
                            </div>
                            <span className="text-xs font-bold text-slate-400">Review</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {/* Shipping Info Card */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">local_shipping</span>
                                    Shipping Information
                                </h2>
                                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">Edit</button>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl flex items-start gap-4 border border-slate-100 dark:border-slate-800">
                                <div className="size-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-lg">Isabella Anderson</p>
                                    <p className="text-slate-500 leading-relaxed mt-1">1254 Oakwood Avenue, Suite 4B<br />San Francisco, CA 94103</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600">payments</span>
                                Payment Method
                            </h2>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                    Card
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('apple')}
                                    className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all ${paymentMethod === 'apple' ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                                    Apple
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all ${paymentMethod === 'paypal' ? 'border-[#003087] bg-[#003087] text-white shadow-lg shadow-[#003087]/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">payments</span>
                                    PayPal
                                </button>
                            </div>

                            {/* Card Form */}
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Card Number</label>
                                    <div className="h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center px-4 gap-3 focus-within:border-blue-500 ring-4 ring-transparent focus-within:ring-blue-500/10 transition-all">
                                        <span className="material-symbols-outlined text-slate-400">credit_card</span>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="flex-1 bg-transparent outline-none font-medium h-full placeholder:text-slate-400 text-lg" />
                                        <div className="flex gap-1.5 opacity-50 grayscale">
                                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Expiry Date</label>
                                        <div className="h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center px-4 focus-within:border-blue-500 ring-4 ring-transparent focus-within:ring-blue-500/10 transition-all">
                                            <input type="text" placeholder="MM/YY" className="bg-transparent outline-none font-medium w-full h-full placeholder:text-slate-400 text-lg" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">CVC</label>
                                        <div className="h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center px-4 gap-2 focus-within:border-blue-500 ring-4 ring-transparent focus-within:ring-blue-500/10 transition-all">
                                            <input type="text" placeholder="123" className="bg-transparent outline-none font-medium w-full h-full placeholder:text-slate-400 text-lg" />
                                            <span className="material-symbols-outlined text-slate-400 text-[20px] cursor-help">help</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Cardholder Name</label>
                                    <div className="h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center px-4 focus-within:border-blue-500 ring-4 ring-transparent focus-within:ring-blue-500/10 transition-all">
                                        <input type="text" placeholder="Isabella Anderson" className="bg-transparent outline-none font-medium w-full h-full placeholder:text-slate-400 text-lg" />
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 mt-2 cursor-pointer group">
                                    <div className="size-6 border-2 border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-center group-hover:border-blue-500 transition-colors bg-white dark:bg-slate-900">
                                        {/* Checkmark placeholder */}
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Save this card for future purchases</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-24">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>

                            <div className="flex gap-4 mb-6">
                                <div className="size-24 bg-slate-100 dark:bg-slate-800 rounded-2xl flex-shrink-0 relative overflow-hidden">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv0zdGltID2eiYiwCPgtL-eleC7-9h_uXINyKOzhL33uLSG-RSCXSirw9R6UBviklwOfZllqZ3PM7wr2B9unccMWZKKkCSGGKLdHgDCg1XNdMpYRY6EmjO2o1B3D_DTCCvYzEa_FaSGqAlVtUFQQjUBaPjexg7QTw1SGAkYK4mQzmAo0xzikEZeV10uN1lPjtqkY5pWfMIf7CL2QXxbwV4v8qJiNjBxGQy1ykw-QVU0DS9WnUjupapUTgpskO2JyR8Q1qZD9BgpFQ"
                                        alt="Lowe Armchair"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">Lowe Armchair</h4>
                                    <p className="text-sm text-slate-500 mt-1">Beige Woven Fabric</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white mt-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md w-fit">Qty: 1</p>
                                </div>
                                <div className="ml-auto font-bold text-slate-900 dark:text-white text-lg">$899.00</div>
                            </div>

                            <div className="space-y-3 py-6 border-t border-dashed border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-slate-900 dark:text-white">$899.00</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping</span>
                                    <span className="font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded text-sm">Free</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Estimated Tax</span>
                                    <span className="font-medium text-slate-900 dark:text-white">$72.00</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex items-end justify-between mb-2">
                                    <p className="text-slate-500 font-medium">Total Amount</p>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">$971.00</h3>
                                </div>
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/10 p-3 rounded-xl mb-6">
                                    <span className="material-symbols-outlined text-[20px] fill-current">lock</span>
                                    <span className="text-xs font-bold uppercase tracking-wider">Secure SSL Checkout</span>
                                </div>

                                <button
                                    onClick={() => router.push('/success')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold h-16 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg group"
                                >
                                    Place Order
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
