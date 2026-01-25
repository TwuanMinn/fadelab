"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PaymentsHelpPage() {
    const router = useRouter();

    const paymentMethods = [
        { name: "Visa", icon: "credit_card" },
        { name: "Mastercard", icon: "credit_card" },
        { name: "American Express", icon: "credit_card" },
        { name: "Apple Pay", icon: "account_balance_wallet" },
        { name: "Google Pay", icon: "account_balance_wallet" },
        { name: "PayPal", icon: "payments" }
    ];

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
                    <h2 className="text-[#111418] dark:text-white text-base font-black font-outfit uppercase tracking-tighter flex-1 text-center">Payments & Billing</h2>
                    <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">help_center</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    {/* Breadcrumbs */}
                    <div className="px-8 py-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Link href="/help">Help Center</Link>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span className="text-primary">Payments</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-slate-900 dark:text-white font-black font-outfit text-4xl leading-tight px-8 pt-2 pb-2 tracking-tighter">
                        Payments, Invoices & Refunds
                    </h1>

                    {/* Status Badge */}
                    <div className="flex items-center gap-3 px-8 pb-8">
                        <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[14px] filled">lock</span>
                            Secure Payments
                        </div>
                        <p className="text-slate-400 text-xs font-semibold">PCI-DSS Compliant</p>
                    </div>

                    {/* Hero Stats */}
                    <div className="px-8 pb-10">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 flex flex-col gap-2 shadow-sm">
                                <span className="material-symbols-outlined text-primary text-3xl">receipt_long</span>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Invoices</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Download past receipts anytime.</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 flex flex-col gap-2 shadow-sm">
                                <span className="material-symbols-outlined text-green-500 text-3xl">currency_exchange</span>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Refunds</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Processed in 3-5 bank days.</p>
                            </div>
                        </div>
                    </div>

                    {/* Accepted Methods */}
                    <div className="px-8 pb-12">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Accepted Methods</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {paymentMethods.map((method, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 shadow-sm">
                                    <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined">{method.icon}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{method.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 mx-8 mb-10" />

                    {/* Detailed Content */}
                    <div className="px-8 flex flex-col gap-12 pb-10">
                        <section>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tight mb-4">When am I charged?</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                                For most orders, your payment method is authorized at checkout and charged when your item ships. For custom-made orders, payment is processed at the time of order confirmation to begin production.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tight mb-4">Managing Invoices</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-6">
                                You can access, view, and download all your invoices directly from your Profile dashboard under the "Order History" section.
                            </p>
                            <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-black text-xs uppercase tracking-widest shadow-sm hover:border-primary hover:text-primary transition-all active:scale-95">
                                <span className="material-symbols-outlined text-lg">download</span>
                                Go to My Invoices
                            </button>
                        </section>

                        <section>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tight mb-4">Security & Privacy</h3>
                            <div className="p-6 rounded-[2rem] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 flex flex-col gap-4">
                                <p className="text-slate-900 dark:text-slate-200 text-sm font-bold leading-relaxed">
                                    "Your security is our priority. We use industry-standard SSL encryption and never store your full credit card information on our servers."
                                </p>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 rounded bg-white dark:bg-slate-800 text-[8px] font-black uppercase text-blue-600">Encrypted</span>
                                    <span className="px-2 py-1 rounded bg-white dark:bg-slate-800 text-[8px] font-black uppercase text-blue-600">Shielded</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Refund Track Section */}
                    <div className="px-8 pb-10">
                        <div className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-primary p-1 bg-opacity-10 shadow-xl overflow-hidden">
                            <div className="bg-white dark:bg-[#1c2633] rounded-[2.3rem] p-8 flex flex-col items-center text-center">
                                <h4 className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight font-outfit">Expecting a refund?</h4>
                                <p className="text-slate-400 text-xs font-medium mb-6">Track your return value in real-time as it processes through our banking partners.</p>
                                <button
                                    onClick={() => router.push('/help/refund-status')}
                                    className="w-full py-5 bg-primary hover:bg-blue-600 text-white font-black rounded-full text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 active:scale-95 transition-all">
                                    Track Refund Status
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Help CTA */}
                    <div className="mx-8 mb-12 bg-slate-900 dark:bg-white rounded-[2.5rem] p-10 text-center text-white dark:text-slate-900 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                        <h4 className="font-black text-xl mb-4 uppercase tracking-tight font-outfit">Payment didn't go through?</h4>
                        <p className="text-white/60 dark:text-slate-500 text-sm font-medium mb-8">Our billing team can help resolve any transaction issues within minutes.</p>
                        <button
                            onClick={() => router.push('/help/chat')}
                            className="w-full py-4 bg-primary text-white font-black rounded-2xl text-sm shadow-xl active:scale-95 transition-all">
                            Chat with Billing Expert
                        </button>
                    </div>
                </div>

                {/* Bottom Nav / Close */}
                <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-2xl bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-6 pb-10">
                    <button
                        onClick={() => router.push('/help')}
                        className="w-full border-2 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 rounded-2xl py-4 font-black text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all active:scale-95"
                    >
                        Back to Help Center
                    </button>
                </div>
            </div>
        </div>
    );
}
