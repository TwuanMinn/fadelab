"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState("General");
    const [notifications, setNotifications] = useState(true);

    const tabs = ["General", "Security", "Privacy", "Subscriptions"];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
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
                        className="relative w-full max-w-md h-[90vh] md:h-[800px] overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <button
                                onClick={onClose}
                                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">chevron_left</span>
                            </button>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h2>
                            <div className="w-10"></div> {/* Spacer for symmetry */}
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                            {/* Tabs */}
                            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`whitespace-nowrap pb-2 text-sm font-semibold transition-all relative ${activeTab === tab
                                                ? "text-primary px-1"
                                                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                            }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Profile Section */}
                            <div className="flex flex-col items-center pt-4">
                                <div className="relative group">
                                    <div className="size-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-soft">
                                        <Image
                                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                            alt="Profile"
                                            width={96}
                                            height={96}
                                            className="object-cover"
                                        />
                                    </div>
                                    <button className="absolute bottom-1 right-1 size-8 bg-primary rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-soft hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-white text-base">edit</span>
                                    </button>
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Alex Johnson</h3>
                                <p className="text-sm text-slate-500">alex.johnson@example.com</p>
                            </div>

                            {/* Personal Details */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-4 border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                                    <span className="material-symbols-outlined text-xl">person</span>
                                    Personal Details
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 block uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Alex Johnson"
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 block uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue="alex.johnson@example.com"
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 block uppercase tracking-wider">Phone Number</label>
                                        <input
                                            type="text"
                                            defaultValue="+1 (555) 000-0000"
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">notifications</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">Order Updates</p>
                                            <p className="text-[10px] text-slate-500">Get notified about order status</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(!notifications)}
                                        className={`size-6 rounded-full transition-all relative ${notifications ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"}`}
                                    >
                                        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${notifications ? "right-1" : "left-1"}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Save Changes
                            </button>

                            {/* List items */}
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">language</span>
                                        </div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">Language & Region</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-400">English (US)</span>
                                        <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                                    </div>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">lock_reset</span>
                                        </div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">Change Password</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="py-4 text-center">
                                <button className="text-red-500 font-bold hover:text-red-600 transition-colors text-sm">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
