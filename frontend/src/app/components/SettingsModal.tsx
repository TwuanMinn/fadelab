"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Tab = "General" | "Security" | "Notifications" | "Accessibility" | "Privacy" | "Subscriptions";

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>("General");

    // General States
    const [fullName, setFullName] = useState("Alex Johnson");
    const [bio, setBio] = useState("Interior design enthusiast living in New York. Always looking for the perfect mid-century modern piece.");
    const [language, setLanguage] = useState("English (US)");
    const [timezone, setTimezone] = useState("(GMT-05:00) Eastern Time");

    // Notifications States
    const [pushAllow, setPushAllow] = useState(true);
    const [pushOrderStatus, setPushOrderStatus] = useState(true);
    const [pushPriceDrops, setPushPriceDrops] = useState(false);
    const [pushNewArrivals, setPushNewArrivals] = useState(true);
    const [emailSubscribe, setEmailSubscribe] = useState(true);
    const [emailWeekly, setEmailWeekly] = useState(true);
    const [emailExclusive, setEmailExclusive] = useState(false);
    const [smsDelivery, setSmsDelivery] = useState(true);
    const [smsSecurity, setSmsSecurity] = useState(true);

    // Accessibility States
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);
    const [boldText, setBoldText] = useState(false);
    const [screenReader, setScreenReader] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [colorCorrection, setColorCorrection] = useState("Off");

    // Security States
    const [twoFactor, setTwoFactor] = useState(false);

    // Privacy States
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [shareUsage, setShareUsage] = useState(false);
    const [personalizedAds, setPersonalizedAds] = useState(true);

    if (!isOpen) return null;

    const tabs: Tab[] = ["General", "Security", "Notifications", "Accessibility", "Privacy", "Subscriptions"];

    const renderGeneral = () => (
        <motion.div
            key="general"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            {/* Profile Section */}
            <div className="flex flex-col items-center py-6">
                <div className="relative">
                    <div className="size-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                            alt="Profile"
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                    <button className="absolute bottom-0 right-0 size-8 bg-primary rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-lg text-white hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                    </button>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Alex Johnson</h3>
                <button className="text-primary text-xs font-bold mt-1 hover:underline">Upload new picture</button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 text-[20px]">person</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Bio</label>
                        <div className="relative">
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value.slice(0, 200))}
                                rows={3}
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                            <div className="absolute bottom-3 right-4 text-[10px] font-bold text-slate-300">{bio.length}/200</div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Language</label>
                        <div className="relative">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white outline-none appearance-none"
                            >
                                <option>English (US)</option>
                                <option>French (France)</option>
                                <option>German (Germany)</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Timezone</label>
                        <div className="relative">
                            <select
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white outline-none appearance-none"
                            >
                                <option>(GMT-05:00) Eastern Time</option>
                                <option>(GMT+00:00) London</option>
                                <option>(GMT+01:00) Paris</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">schedule</span>
                        </div>
                    </div>
                </div>
            </div>

            <button className="w-full bg-primary text-white font-black py-4.5 rounded-[1.5rem] shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-[15px]">
                Save Changes
            </button>
        </motion.div>
    );

    const renderAccessibility = () => (
        <motion.div
            key="accessibility"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
        >
            {/* Live Preview Card */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                    <span className="material-symbols-outlined text-primary">visibility</span>
                    <h3 className="text-xl font-black dark:text-white">Live Preview</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm relative group">
                    <div className="aspect-[4/3] relative">
                        <Image
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Live Preview"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <button className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-lg">
                            <span className="material-symbols-outlined text-[20px]">favorite</span>
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className={`font-black text-xl text-slate-900 dark:text-white ${boldText ? 'font-[900]' : ''}`}>Velvet Sectional Sofa</h4>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-amber-400 text-[18px]">star</span>
                                <span className="font-bold text-sm">4.8</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-6">Mid-century modern design</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">$1,299</span>
                            <button className="bg-primary text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 py-3 bg-slate-50/50 dark:bg-slate-800/50 font-bold border-t border-slate-100 dark:border-slate-800">
                        Adjust settings below to see changes above.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Display & Text</label>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden">
                    {/* Font Size Slider */}
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center text-[13px] font-bold text-slate-900 dark:text-white">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">text_fields</span>
                                Font Size
                            </div>
                            <span className="text-primary">{fontSize}%</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[12px] font-bold text-slate-400">A</span>
                            <input
                                type="range"
                                min="80"
                                max="150"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer"
                            />
                            <span className="text-[18px] font-black dark:text-white">A</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">contrast</span>
                            </div>
                            <p className="font-bold text-[14px] dark:text-white">High Contrast</p>
                        </div>
                        <button onClick={() => setHighContrast(!highContrast)} className={`w-11 h-6 rounded-full transition-all relative ${highContrast ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${highContrast ? "right-1" : "left-1"}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">format_bold</span>
                            </div>
                            <p className="font-bold text-[14px] dark:text-white">Bold Text</p>
                        </div>
                        <button onClick={() => setBoldText(!boldText)} className={`w-11 h-6 rounded-full transition-all relative ${boldText ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${boldText ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                </div>

                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Assistive Tech</label>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden">
                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">record_voice_over</span>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-[14px] dark:text-white">Screen Reader Mode</p>
                                <p className="text-[10px] text-slate-500">Simplifies layout for VoiceOver</p>
                            </div>
                        </div>
                        <button onClick={() => setScreenReader(!screenReader)} className={`w-11 h-6 rounded-full transition-all relative ${screenReader ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${screenReader ? "right-1" : "left-1"}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">motion_blur</span>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-[14px] dark:text-white">Reduce Motion</p>
                                <p className="text-[10px] text-slate-500">Minimizes interface animations</p>
                            </div>
                        </div>
                        <button onClick={() => setReduceMotion(!reduceMotion)} className={`w-11 h-6 rounded-full transition-all relative ${reduceMotion ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${reduceMotion ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                </div>

                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Color Filters</label>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all outline-none group">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">palette</span>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-[14px] dark:text-white">Color Correction</p>
                                <p className="text-[10px] text-slate-500">{colorCorrection}</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                </div>

                <div className="flex flex-col items-center pt-4 pb-10 space-y-4">
                    <button className="text-primary font-black text-sm hover:underline">Reset to Default Settings</button>
                    <p className="text-[10px] text-slate-400 text-center max-w-[280px] leading-relaxed">
                        Note: System-wide iOS settings may override some app-specific configurations.
                    </p>
                </div>
            </div>
        </motion.div>
    );

    const renderSecurity = () => (
        <motion.div
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">password</span>
                    </div>
                    <h4 className="font-black text-lg text-slate-900 dark:text-white">Change Password</h4>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Current Password</label>
                        <div className="relative">
                            <input type="password" defaultValue="********" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] dark:text-white outline-none" />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">New Password</label>
                        <input type="password" placeholder="Enter new password" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] dark:text-white outline-none" />
                        <p className="text-[10px] text-slate-400 mt-2 font-medium px-1">Must be at least 8 characters.</p>
                    </div>
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Confirm Password</label>
                        <input type="password" placeholder="Confirm new password" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] dark:text-white outline-none" />
                    </div>
                    <button className="w-full bg-primary text-white font-black py-4 rounded-[1.5rem] shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
                        Update Password
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="size-12 bg-blue-50 dark:bg-white/5 rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[28px]">on_device_training</span>
                    </div>
                    <div>
                        <p className="font-bold text-[14px] dark:text-white">Two-Factor Auth</p>
                        <p className="text-[10px] text-slate-500 max-w-[180px]">Secure your account with 2FA using SMS or an app.</p>
                    </div>
                </div>
                <button onClick={() => setTwoFactor(!twoFactor)} className={`w-11 h-6 rounded-full transition-all relative ${twoFactor ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                    <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${twoFactor ? "right-1" : "left-1"}`} />
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">devices</span>
                    </div>
                    <h4 className="font-black text-lg text-slate-900 dark:text-white">Active Sessions</h4>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-slate-400 text-[26px]">smartphone</span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-[13px] dark:text-white">iPhone 14 Pro</p>
                                    <span className="bg-green-100 dark:bg-green-900/40 text-green-600 text-[9px] font-black px-1.5 py-0.5 rounded-md">Current</span>
                                </div>
                                <p className="text-[11px] text-slate-400">San Francisco, CA • Just now</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-slate-400 text-[26px]">laptop</span>
                            <div>
                                <p className="font-bold text-[13px] dark:text-white">MacBook Pro M2</p>
                                <p className="text-[11px] text-slate-400">New York, NY • 2 hours ago</p>
                            </div>
                        </div>
                        <button className="material-symbols-outlined text-slate-300 hover:text-red-500">logout</button>
                    </div>
                    <button className="w-full py-4 text-center text-red-500 font-bold text-sm mt-2 hover:underline">Log Out of All Other Sessions</button>
                </div>
            </div>
        </motion.div>
    );

    const renderNotifications = () => (
        <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-start gap-4">
                    <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">info</span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <h4 className="text-[12px] font-black text-primary uppercase tracking-wider">System Permissions</h4>
                            <p className="text-[12px] text-slate-500 mt-1 leading-relaxed font-medium">Push notifications are currently disabled in your settings. Tap to enable.</p>
                        </div>
                        <button className="w-full bg-slate-50 dark:bg-slate-800 text-primary font-bold py-3.5 rounded-2xl text-[14px] hover:bg-slate-100 transition-all border border-slate-100 dark:border-slate-700">
                            Open Settings
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Push Notifications</h4>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
                    <div className="flex items-center justify-between p-5">
                        <p className="font-bold text-[14px] dark:text-white">Allow Push Notifications</p>
                        <button onClick={() => setPushAllow(!pushAllow)} className={`w-11 h-6 rounded-full transition-all relative ${pushAllow ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${pushAllow ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-5">
                        <div>
                            <p className="font-bold text-[14px] dark:text-white">Order Status</p>
                            <p className="text-[11px] text-slate-500 font-medium">Get updates on shipping and delivery</p>
                        </div>
                        <button onClick={() => setPushOrderStatus(!pushOrderStatus)} className={`w-11 h-6 rounded-full transition-all relative ${pushOrderStatus ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${pushOrderStatus ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Email Preferences</h4>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
                    <div className="flex items-center justify-between p-5">
                        <p className="font-bold text-[14px] dark:text-white">Subscribe to Newsletter</p>
                        <button onClick={() => setEmailSubscribe(!emailSubscribe)} className={`w-11 h-6 rounded-full transition-all relative ${emailSubscribe ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${emailSubscribe ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center py-6">
                <button className="text-[13px] font-black text-slate-400 hover:text-primary transition-colors">Privacy Policy</button>
            </div>
        </motion.div>
    );

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            >
                <motion.div
                    initial={{ y: 50, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 50, scale: 0.95 }}
                    className="relative w-full max-w-lg h-[90vh] md:h-[850px] overflow-hidden bg-slate-50 dark:bg-slate-950 rounded-[3rem] shadow-2xl flex flex-col border border-white/20 dark:border-slate-900"
                >
                    {/* Header */}
                    <div className="flex flex-col shrink-0 bg-white dark:bg-slate-900 border-b border-slate-50 dark:border-slate-800">
                        <div className="flex items-center justify-between px-8 py-5">
                            <button
                                onClick={onClose}
                                className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">arrow_back</span>
                            </button>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Settings</h2>
                            <button className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 transition-all active:scale-95">
                                <span className="material-symbols-outlined text-slate-400">help</span>
                            </button>
                        </div>

                        {/* Navigation Tabs (Pills) */}
                        <div className="px-6 pb-6 overflow-x-auto no-scrollbar flex gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3.5 rounded-2xl text-[13px] font-black transition-all whitespace-nowrap shadow-sm border ${activeTab === tab
                                            ? "bg-primary text-white border-primary shadow-primary/20 scale-105"
                                            : "bg-white dark:bg-slate-800 text-slate-400 border-slate-50 dark:border-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto px-6 py-8 sub-view-container custom-scroll">
                        <style jsx>{`
              .custom-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background: transparent;
                margin: 20px;
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border: 2px solid transparent;
                border-radius: 100px;
                background-clip: padding-box;
              }
              .dark .custom-scroll::-webkit-scrollbar-thumb {
                background: #334155;
              }
            `}</style>

                        <AnimatePresence mode="wait">
                            {activeTab === "General" && renderGeneral()}
                            {activeTab === "Accessibility" && renderAccessibility()}
                            {activeTab === "Security" && renderSecurity()}
                            {activeTab === "Notifications" && renderNotifications()}
                            {/* Other tabs can be added similarly */}
                            {activeTab === "Privacy" && <div className="text-center py-20 font-black text-slate-200 text-3xl italic">Privacy View</div>}
                            {activeTab === "Subscriptions" && <div className="text-center py-20 font-black text-slate-200 text-3xl italic">Subscriptions View</div>}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
