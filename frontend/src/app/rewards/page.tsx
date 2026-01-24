"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RewardsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Rewards');

    const rewards = [
        {
            id: 1,
            title: "$10 Off Coupon",
            points: 500,
            description: "Apply this discount to any order over $50.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClTyBxLeqObwqhijPVy04XdKzNs075BfIvWKH7sRnSkdXYNw3zTqa7GkvrGvwAAogEdDxFT1YG5zFY6oJCN8YziVE3FGy3foRepU6Hmg7o-qe3kk4pGK-J92ShTn_v2wwZ_HMwyRlc9BNdTdjs_g4-CDH13tjPwTv5dXAbZudjuwawPZycQZmUbLFM8eBCMDae1-YPXucvP6NWH8Q4Eupo5a7tVxcOc-8JlDmi4MSKQUQTs-vF77jAvxCPLIV3n4sD6VjwThbMkm0",
            canRedeem: true
        },
        {
            id: 2,
            title: "Free Shipping",
            points: 1000,
            description: "Get free standard shipping on your next furniture delivery.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWBzluDUBmCJyXfEPvrDM4qV1q23FA7xskZ3TEHbVWZ9UI7oojVfOVk_yCr0W_NSoW4x8GHfjcxhcNxTCAE8KV4wHZa4wxdKi9W9jUdMxnhNY1Xfm25dpTY2xH4aNRpjur_lCKqw-bXJyOOKsexjmCWCT6lWjdMSKOvxBiytutzACGVBTOIFLj4fAgZz8ReDAAO2CKQ3ez1ZIJiCRSQpdtCj94YggchdDFn1RFUsR3Q-nxEelNLutz4waR4fn-XLYPqqndO1UdaXE",
            canRedeem: true
        },
        {
            id: 3,
            title: "Modern Side Table",
            points: 5000,
            description: "Add a touch of elegance with this exclusive piece.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp_slhJYSw_7O-kLe-zk34Ktuh1VmQ3ZYCNG8uF0TznS1jtvbTJxLyWSYec-SS3DpKi5KbddypSSllsQADB4tPajg7ICQsnH6Rhan9KQyQria3XnvrNxSQXGQgDpsyEcBz2U1q7keiopdSNNmnbAfh0uW5VOLR3PaVfRuSY6fDFcXTLrXM_GQ8jP_gZsy6b9U4z6RRXMfOUkyh1-JlbDmnECWTJWrsahjsdOaAOfXHebe62ZJ4Z0tLLVWsyCAfhjGK23nxiFDtVKQ",
            canRedeem: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#101822] text-[#111418] dark:text-white font-display flex justify-center pb-24 md:pb-8">
            <div className="relative flex w-full flex-col max-w-5xl mx-auto bg-slate-50 dark:bg-[#101822] md:bg-white md:dark:bg-[#101822] md:shadow-xl md:rounded-3xl md:mt-8 md:overflow-hidden md:border md:border-slate-200 md:dark:border-slate-800">

                {/* Header */}
                <div className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-[#101822]/90 backdrop-blur-md p-4 border-b border-slate-100 dark:border-slate-800 md:static md:bg-transparent">
                    <button
                        onClick={() => router.back()}
                        className="size-10 flex shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Rewards</h2>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
                        {/* Left Column: Member Card & Progress */}
                        <div className="space-y-6">
                            {/* Hero Status Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#4b9eff] p-8 text-white shadow-xl shadow-primary/20"
                            >
                                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10 blur-2xl"></div>
                                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white opacity-10 blur-xl"></div>

                                <div className="relative z-10 flex flex-col gap-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-blue-100 text-sm font-medium mb-1">Welcome back, Alex!</p>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-yellow-300 fill-1">workspace_premium</span>
                                                <h1 className="text-2xl md:text-3xl font-black tracking-tight">Gold Member</h1>
                                            </div>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30 text-xs font-black uppercase tracking-widest">
                                            Tier 2 of 3
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-5xl font-black">2,450</p>
                                        <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mt-1">Points Available</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Progress Section */}
                            <div className="bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-soft">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-[#111418] dark:text-white text-lg font-bold">Next Reward: Platinum</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">550 points needed to level up</p>
                                    </div>
                                    <span className="text-primary font-black text-xl">82%</span>
                                </div>
                                <div className="rounded-full bg-slate-100 dark:bg-slate-700 h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '82%' }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full rounded-full bg-gradient-to-r from-primary to-[#60a5fa] shadow-glow"
                                    ></motion.div>
                                </div>
                                <div className="mt-6 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-primary text-xl">info</span>
                                    <p>Earn 1 point for every $1 spent on furniture.</p>
                                </div>
                            </div>

                            {/* Active Coupons Section */}
                            <div className="pt-2">
                                <h3 className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-tight mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">local_activity</span>
                                    Active Coupons
                                </h3>
                                <div className="group relative flex items-center justify-between rounded-2xl border-2 border-dashed border-primary/20 bg-blue-50/30 dark:bg-blue-900/10 p-5 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                                            <span className="material-symbols-outlined text-2xl">confirmation_number</span>
                                        </div>
                                        <div>
                                            <p className="font-black text-lg text-[#111418] dark:text-white leading-tight">20% Off Order</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Expires in 5 days</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <code className="text-xs font-black font-mono text-primary bg-primary/10 px-3 py-1 rounded-lg">SUMMER20</code>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="rounded-xl bg-white dark:bg-slate-800 px-5 py-2.5 text-xs font-black text-primary shadow-lg shadow-black/5 border border-slate-100 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all">
                                        COPY
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Redeem Rewards */}
                        <div className="space-y-6">
                            {/* Tabs (Mobile View Style kept but wider for desktop) */}
                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-1 flex border border-slate-100 dark:border-slate-800 shadow-soft">
                                {['Rewards', 'History', 'Earn'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        {tab.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-tight mt-8 mb-4">Redeem Points</h3>
                            <div className="flex flex-col gap-4 pb-12">
                                {rewards.map((reward) => (
                                    <motion.div
                                        key={reward.id}
                                        whileHover={{ y: -4 }}
                                        className="flex flex-col items-stretch justify-start rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft bg-white dark:bg-slate-800/50 overflow-hidden group transition-all hover:border-primary/20"
                                    >
                                        <div className="flex flex-row items-center p-4 gap-4">
                                            <div className="w-24 h-24 shrink-0 relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700">
                                                <Image
                                                    src={reward.image}
                                                    alt={reward.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 justify-center gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${reward.canRedeem ? 'text-primary bg-primary/10' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
                                                        {reward.points} PTS
                                                    </span>
                                                </div>
                                                <p className="text-[#111418] dark:text-white text-lg font-black leading-tight line-clamp-1">{reward.title}</p>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed line-clamp-2">{reward.description}</p>
                                                <button
                                                    disabled={!reward.canRedeem}
                                                    className={`mt-3 w-full cursor-pointer items-center justify-center rounded-xl h-10 font-black text-xs transition-all active:scale-95 ${reward.canRedeem ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}
                                                >
                                                    {reward.canRedeem ? 'REDEEM NOW' : 'NOT ENOUGH POINTS'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
