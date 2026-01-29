"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HelpTab() {
    const helpCategories = [
        { id: 'payments', label: 'Payment Issues', icon: 'account_balance_wallet', href: '/help/payments' },
        { id: 'bookings', label: 'Booking Help', icon: 'calendar_month', href: '/help' },
        { id: 'account', label: 'Account Settings', icon: 'manage_accounts', href: '/help' },
        { id: 'returns', label: 'Returns & Refunds', icon: 'assignment_return', href: '/help' },
    ];

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Help Center</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Get support for your account, bookings, and payments.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {helpCategories.map((category) => (
                    <motion.div key={category.id} whileHover={{ y: -5 }}>
                        <Link
                            href={category.href}
                            className="block bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                                    <span className="material-symbols-outlined text-blue-500 text-2xl">{category.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors">{category.label}</h3>
                                    <p className="text-gray-500 text-xs">Click to view help articles</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Contact Support */}
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-8 text-center">
                <span className="material-symbols-outlined text-5xl text-blue-500 mb-4">support_agent</span>
                <h3 className="text-xl font-black text-white uppercase mb-2">Need More Help?</h3>
                <p className="text-gray-400 mb-6">Our support team is available 24/7 to assist you.</p>
                <Link
                    href="/support"
                    className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all"
                >
                    Contact Support
                </Link>
            </div>
        </>
    );
}
