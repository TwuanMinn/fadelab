"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState("Privacy");
    const [notifications, setNotifications] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [shareUsage, setShareUsage] = useState(false);
    const [personalizedAds, setPersonalizedAds] = useState(true);
    const [analyticsCookies, setAnalyticsCookies] = useState(true);

    const tabs = ["Security", "Privacy", "Subscriptions"];

    if (!isOpen) return null;

    const renderContent = () => {
        switch (activeTab) {
            case "Security":
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Change Password */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">password</span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Change Password</h4>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Current Password</label>
                                    <div className="relative">
                                        <input type="password" defaultValue="********" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3 text-sm dark:text-white outline-none" />
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg cursor-pointer">visibility</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">New Password</label>
                                    <input type="password" placeholder="Enter new password" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3 text-sm dark:text-white outline-none" />
                                    <p className="text-[10px] text-slate-400 mt-1 ml-1">Must be at least 8 characters.</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Confirm Password</label>
                                    <input type="password" placeholder="Confirm new password" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3 text-sm dark:text-white outline-none" />
                                </div>
                                <button className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                                    Update Password
                                </button>
                            </div>
                        </div>

                        {/* Two-Factor Auth */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-4">
                                    <div className="size-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-2xl">vibration</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Two-Factor Auth</h4>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Secure your account with 2FA using SMS or an authenticator app.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setTwoFactor(!twoFactor)}
                                    className={`w-11 h-6 rounded-full transition-all relative ${twoFactor ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}
                                >
                                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${twoFactor ? "right-1" : "left-1"}`} />
                                </button>
                            </div>
                            <button className="w-full border-2 border-primary/20 text-primary font-bold py-3 rounded-2xl hover:bg-primary/5 transition-all">
                                Enable 2FA
                            </button>
                        </div>

                        {/* Active Sessions */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="size-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">devices</span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Active Sessions</h4>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: "iPhone 14 Pro", location: "San Francisco, CA", date: "Just now", icon: "smartphone", current: true },
                                    { name: "MacBook Pro M2", location: "New York, NY", date: "2 hours ago", icon: "laptop_mac" },
                                    { name: "Chrome on Windows", location: "London, UK", date: "1 day ago", icon: "desktop_windows" }
                                ].map((session, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-slate-400 text-2xl">{session.icon}</span>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-xs dark:text-white">{session.name}</p>
                                                    {session.current && (
                                                        <span className="bg-green-100 dark:bg-green-900/30 text-[8px] text-green-600 dark:text-green-400 font-bold px-1.5 py-0.5 rounded-md">Current</span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-slate-400">{session.location} • {session.date}</p>
                                            </div>
                                        </div>
                                        {!session.current && (
                                            <button className="material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors">logout</button>
                                        )}
                                    </div>
                                ))}
                                <button className="w-full text-center text-red-500 font-bold text-xs mt-4 hover:underline">
                                    Log Out of All Other Sessions
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );

            case "Privacy":
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6 pt-4"
                    >
                        <div className="px-1">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Privacy & Data</h3>
                            <p className="text-xs text-slate-500 mt-1">Manage how your data is used and shared.</p>
                        </div>

                        {/* Data Sharing */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                            <div className="flex items-center gap-3 text-primary font-bold text-sm">
                                <span className="material-symbols-outlined">share_reviews</span>
                                Data Sharing
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">Share usage data</p>
                                        <p className="text-[10px] text-slate-500 w-4/5 leading-relaxed">Help us improve by sharing anonymous usage statistics.</p>
                                    </div>
                                    <button onClick={() => setShareUsage(!shareUsage)} className={`w-11 h-6 rounded-full transition-all relative ${shareUsage ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                                        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${shareUsage ? "right-1" : "left-1"}`} />
                                    </button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">Personalized Ads</p>
                                        <p className="text-[10px] text-slate-500 w-4/5 leading-relaxed">Allow partners to show you ads relevant to your furniture interests.</p>
                                    </div>
                                    <button onClick={() => setPersonalizedAds(!personalizedAds)} className={`w-11 h-6 rounded-full transition-all relative ${personalizedAds ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                                        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${personalizedAds ? "right-1" : "left-1"}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                            <div className="flex items-center gap-3 text-primary font-bold text-sm">
                                <span className="material-symbols-outlined">visibility</span>
                                Visibility
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="font-bold text-sm text-slate-900 dark:text-white block mb-2">Profile Visibility</label>
                                    <div className="relative">
                                        <select className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3.5 text-xs font-semibold appearance-none outline-none dark:text-white">
                                            <option>Friends Only</option>
                                            <option>Public</option>
                                            <option>Private</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 px-1">Controls who can see your saved furniture lists and reviews.</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">Show Online Status</p>
                                        <p className="text-[10px] text-slate-500">Let friends see when you are shopping.</p>
                                    </div>
                                    <button onClick={() => setOnlineStatus(!onlineStatus)} className={`w-11 h-6 rounded-full transition-all relative ${onlineStatus ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                                        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${onlineStatus ? "right-1" : "left-1"}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cookie Preferences */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                            <div className="flex items-center gap-3 text-primary font-bold text-sm">
                                <span className="material-symbols-outlined">cookie</span>
                                Cookie Preferences
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Essential Cookies</p>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Always Active</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Analytics Cookies</p>
                                    <button onClick={() => setAnalyticsCookies(!analyticsCookies)} className={`w-11 h-6 rounded-full transition-all relative ${analyticsCookies ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                                        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${analyticsCookies ? "right-1" : "left-1"}`} />
                                    </button>
                                </div>
                                <button className="w-full text-center text-primary font-bold text-xs mt-2 hover:underline">
                                    Manage All Cookies
                                </button>
                            </div>
                        </div>

                        <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
                            Save Preferences
                        </button>
                    </motion.div>
                );

            case "Subscriptions":
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6 pt-2"
                    >
                        {/* Active Plan Card */}
                        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Plan</p>
                                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Pro Member</h4>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-bold">
                                    Active
                                </div>
                            </div>

                            <p className="text-xs text-slate-500 mb-4 font-semibold">Your next billing date is <span className="text-slate-900 dark:text-white">November 24, 2026.</span></p>

                            <div className="space-y-2 mb-6">
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '75%' }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-400">Usage</span>
                                    <span className="text-slate-600 dark:text-slate-300">75% of 100GB</span>
                                </div>
                            </div>

                            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                                Manage Plan
                            </button>
                        </div>

                        {/* Upgrade Options */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Upgrade Options</h4>
                            {[
                                { name: "Ultimate", price: "$29.99 / month", icon: "star", color: "text-blue-500", bg: "bg-blue-50" },
                                { name: "Enterprise", price: "Custom pricing", icon: "business_center", color: "text-purple-500", bg: "bg-purple-50" }
                            ].map((tier, i) => (
                                <button key={i} className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl group hover:border-primary transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`size-12 ${tier.bg} dark:bg-white/5 rounded-2xl flex items-center justify-center shrink-0`}>
                                            <span className={`material-symbols-outlined ${tier.color} text-2xl`}>{tier.icon}</span>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm dark:text-white">{tier.name}</p>
                                            <p className="text-[10px] text-slate-500">{tier.price}</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </button>
                            ))}
                        </div>

                        {/* Included in Pro */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 space-y-4 border border-slate-100 dark:border-slate-800">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Included in Pro</h4>
                            <div className="space-y-3">
                                {[
                                    "Unlimited projects & designs",
                                    "Priority 24/7 customer support",
                                    "Advanced analytics dashboard",
                                    "Export to 4K resolution"
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                        <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Payment Method</h4>
                            <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md text-[10px] font-black text-slate-400 uppercase italic">Visa</div>
                                    <p className="font-bold text-xs dark:text-white">•••• 4242</p>
                                </div>
                                <button className="text-xs text-primary font-bold">Edit</button>
                            </div>
                        </div>

                        <button className="w-full text-center text-red-500 font-bold text-xs mt-4 hover:underline">
                            Cancel Subscription
                        </button>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-0"
            >
                <motion.div
                    initial={{ y: 50, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 50, scale: 0.95 }}
                    className="relative w-full max-w-md h-[90vh] md:h-[850px] overflow-hidden bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-200 dark:border-slate-900"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0">
                        <button
                            onClick={onClose}
                            className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">arrow_back</span>
                        </button>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Settings</h2>
                        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-slate-400">help</span>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col no-scrollbar">
                        {/* Tabs */}
                        <div className="flex gap-8 overflow-x-auto no-scrollbar py-2 shrink-0 border-b border-slate-100 dark:border-slate-800 mb-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap pb-3 text-[13px] font-bold transition-all relative ${activeTab === tab
                                            ? "text-primary px-1"
                                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.4)]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 pb-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {renderContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom Navigation Mockup - Optional if you want to match screenshot fully, but usually settings is an overlay */}
                    <div className="px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <span className="material-symbols-outlined text-xl">home</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest">Home</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <span className="material-symbols-outlined text-xl">grid_view</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest">Catalog</span>
                        </div>
                        <div className="size-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 -mt-10 border-4 border-slate-50 dark:border-slate-950">
                            <span className="material-symbols-outlined text-3xl font-bold">add</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <span className="material-symbols-outlined text-xl">favorite</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest">Saved</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-primary">
                            <span className="material-symbols-outlined text-xl">person</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest">Profile</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
