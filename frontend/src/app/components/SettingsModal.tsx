"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type View = "Home" | "General" | "Notifications" | "Security" | "Privacy" | "Subscriptions";

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [view, setView] = useState<View>("Home");

    // Settings States
    const [pushAllow, setPushAllow] = useState(true);
    const [pushOrderStatus, setPushOrderStatus] = useState(true);
    const [pushPriceDrops, setPushPriceDrops] = useState(false);
    const [pushNewArrivals, setPushNewArrivals] = useState(true);
    const [emailSubscribe, setEmailSubscribe] = useState(true);
    const [emailWeekly, setEmailWeekly] = useState(true);
    const [emailExclusive, setEmailExclusive] = useState(false);
    const [smsDelivery, setSmsDelivery] = useState(true);
    const [smsSecurity, setSmsSecurity] = useState(true);
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [shareUsage, setShareUsage] = useState(false);
    const [personalizedAds, setPersonalizedAds] = useState(true);
    const [analyticsCookies, setAnalyticsCookies] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    if (!isOpen) return null;

    const handleBack = () => setView("Home");

    const categories = [
        { id: "General", label: "Account Info", icon: "person", sub: "Name, email, phone" },
        { id: "Notifications", label: "Notifications", icon: "notifications", sub: "Push, email, SMS" },
        { id: "Security", label: "Security", icon: "security", sub: "Password, 2FA, devices" },
        { id: "Privacy", label: "Privacy & Data", icon: "visibility", sub: "Visibility, ads, cookies" },
        { id: "Subscriptions", label: "Subscriptions", icon: "card_membership", sub: "Plans, billing, payments" },
    ];

    const renderHome = () => (
        <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="size-16 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-soft">
                    <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        alt="Profile"
                        width={64}
                        height={64}
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Alex Johnson</h3>
                    <p className="text-xs text-slate-500 font-medium">alex.johnson@example.com</p>
                </div>
                <button onClick={() => setView("General")} className="ml-auto size-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </button>
            </div>

            {/* Categories List */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setView(cat.id as View)}
                        className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left group"
                    >
                        <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary">{cat.icon}</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-[14px] dark:text-white">{cat.label}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{cat.sub}</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                ))}
            </div>

            {/* Log Out */}
            <button className="w-full py-4 text-white font-black text-lg bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl shadow-xl shadow-red-500/30 hover:scale-[1.02] transition-all">
                Log Out
            </button>
        </motion.div>
    );

    const renderGeneral = () => (
        <motion.div
            key="general"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
        >
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Personal Details</h4>
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                        <input type="text" defaultValue="Alex Johnson" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3 text-sm dark:text-white outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Email Address</label>
                        <input type="email" defaultValue="alex.johnson@example.com" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3 text-sm dark:text-white outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Phone Number</label>
                        <input type="text" defaultValue="+1 (555) 000-0000" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3 text-sm dark:text-white outline-none" />
                    </div>
                </div>
            </div>
            <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all">
                Save Changes
            </button>
        </motion.div>
    );

    const renderNotifications = () => (
        <motion.div
            key="notifications"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
        >
            {/* System Permissions */}
            <div className="bg-[#EBF2FF] dark:bg-blue-900/10 rounded-[2rem] p-6 border border-blue-50 dark:border-blue-900/20">
                <div className="flex items-start gap-4">
                    <div className="size-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-primary">info</span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <h4 className="text-[12px] font-black text-primary uppercase tracking-wider">System Permissions</h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">Push notifications are currently disabled. Tap to enable.</p>
                        </div>
                        <button className="w-full bg-white dark:bg-slate-900 text-primary font-bold py-3 rounded-2xl text-[13px] shadow-sm hover:translate-y-[-1px] transition-all">
                            Open Settings
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Push Notifications</h4>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
                    {[
                        { label: "Allow Push Notifications", state: pushAllow, set: setPushAllow },
                        { label: "Order Status", sub: "Shipping and delivery updates", state: pushOrderStatus, set: setPushOrderStatus },
                        { label: "Price Drops", sub: "Wishlist alerts", state: pushPriceDrops, set: setPushPriceDrops }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-5">
                            <div>
                                <p className="font-bold text-[14px] dark:text-white">{item.label}</p>
                                {item.sub && <p className="text-[11px] text-slate-500 font-medium">{item.sub}</p>}
                            </div>
                            <button onClick={() => item.set(!item.state)} className={`w-12 h-7 rounded-full transition-all relative ${item.state ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                                <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${item.state ? "right-1" : "left-1"}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );

    const renderSecurity = () => (
        <motion.div
            key="security"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
        >
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white">Change Password</h4>
                <div className="space-y-4">
                    <input type="password" placeholder="Current Password" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3 text-sm dark:text-white outline-none" />
                    <input type="password" placeholder="New Password" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-4 py-3 text-sm dark:text-white outline-none" />
                    <button className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl transition-all">Update Password</button>
                </div>
            </div>
        </motion.div>
    );

    const renderPrivacy = () => (
        <motion.div
            key="privacy"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
        >
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-sm dark:text-white">Online Status</p>
                        <p className="text-[10px] text-slate-500">Show when you are active</p>
                    </div>
                    <button onClick={() => setOnlineStatus(!onlineStatus)} className={`w-11 h-6 rounded-full transition-all relative ${onlineStatus ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}`}>
                        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${onlineStatus ? "right-1" : "left-1"}`} />
                    </button>
                </div>
            </div>
        </motion.div>
    );

    const renderSubscriptions = () => (
        <motion.div
            key="subscriptions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
        >
            <div className="bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Pro Member</p>
                    <h4 className="text-4xl font-black mt-2">$12<span className="text-lg opacity-80 font-normal">/mo</span></h4>
                    <div className="mt-8 pt-8 border-t border-white/20 flex justify-between items-end">
                        <p className="text-xs font-bold">Renewing on Nov 24</p>
                        <button className="bg-white text-primary font-black px-6 py-2 rounded-xl text-xs">Manage</button>
                    </div>
                </div>
                <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-3xl" />
            </div>
            <button className="w-full py-4 text-white font-black text-sm bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl shadow-lg shadow-red-500/20">
                Cancel Subscription
            </button>
        </motion.div>
    );

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-0"
            >
                <motion.div
                    initial={{ y: 50, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 50, scale: 0.95 }}
                    className="relative w-full max-w-md h-[85vh] md:h-[750px] overflow-hidden bg-slate-50 dark:bg-slate-950 rounded-[3rem] shadow-2xl flex flex-col border border-white/20 dark:border-slate-900"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-6 bg-white dark:bg-slate-900 shrink-0 border-b border-slate-50 dark:border-slate-800">
                        {view !== "Home" ? (
                            <button
                                onClick={handleBack}
                                className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 transition-all"
                            >
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">arrow_back</span>
                            </button>
                        ) : <div className="size-10" />}

                        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider">{view === "Home" ? "Settings" : view}</h2>

                        <button
                            onClick={onClose}
                            className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 transition-all"
                        >
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">close</span>
                        </button>
                    </div>

                    {/* New Approach: Custom Scrollbar Container */}
                    <div className="flex-1 overflow-y-auto px-6 py-8 sub-view-container">
                        <style jsx>{`
              .sub-view-container::-webkit-scrollbar {
                width: 6px;
              }
              .sub-view-container::-webkit-scrollbar-track {
                background: transparent;
                margin: 20px;
              }
              .sub-view-container::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 10px;
              }
              .dark .sub-view-container::-webkit-scrollbar-thumb {
                background: #334155;
              }
            `}</style>

                        <AnimatePresence mode="wait">
                            {view === "Home" && renderHome()}
                            {view === "General" && renderGeneral()}
                            {view === "Notifications" && renderNotifications()}
                            {view === "Security" && renderSecurity()}
                            {view === "Privacy" && renderPrivacy()}
                            {view === "Subscriptions" && renderSubscriptions()}
                        </AnimatePresence>
                    </div>

                    {/* Visual Custom Scrollbar Mockup for the Header/Tabs if they were horizontal */}
                    {/* But since we swapped to vertical list, we'll keep it clean */}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
