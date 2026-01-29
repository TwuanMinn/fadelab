"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface DashboardTabProps {
    userName: string;
}

export function DashboardTab({ userName }: DashboardTabProps) {
    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                    Welcome back, <span className="text-blue-500 italic">{userName.split(' ')[0]}</span>
                </h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">
                    Manage your grooming protocol, track your sessions, and unlock premium rewards.
                </p>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2rem] p-6 border border-white/5"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="size-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-500 text-2xl">calendar_month</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Next Session</p>
                            <p className="text-white font-bold">Oct 24, 2:30 PM</p>
                        </div>
                    </div>
                    <Link href="/profile?tab=bookings" className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">
                        View All Bookings →
                    </Link>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2rem] p-6 border border-white/5"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="size-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-500 text-2xl">stars</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Reward Points</p>
                            <p className="text-white font-bold">2,450 pts</p>
                        </div>
                    </div>
                    <Link href="/profile?tab=rewards" className="text-purple-500 text-xs font-bold uppercase tracking-widest hover:text-purple-400 transition-colors">
                        Redeem Rewards →
                    </Link>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2rem] p-6 border border-white/5"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="size-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-emerald-500 text-2xl">workspace_premium</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Status</p>
                            <p className="text-white font-bold">Elite Member</p>
                        </div>
                    </div>
                    <Link href="/profile?tab=subscriptions" className="text-emerald-500 text-xs font-bold uppercase tracking-widest hover:text-emerald-400 transition-colors">
                        View Benefits →
                    </Link>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-black text-white uppercase italic mb-2">Ready for your next fade?</h3>
                    <p className="text-gray-400 text-sm">Book your session now and earn double points this week.</p>
                </div>
                <Link
                    href="/barbers"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap"
                >
                    Book Now
                </Link>
            </div>
        </>
    );
}
