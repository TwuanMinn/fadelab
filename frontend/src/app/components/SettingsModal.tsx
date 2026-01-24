"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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
    const [shareUsage, setShareUsage] = useState(false);
    const [personalizedAds, setPersonalizedAds] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState("Friends Only");
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [analyticsCookies, setAnalyticsCookies] = useState(true);

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
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all font-outfit"
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
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-outfit"
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
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white outline-none appearance-none font-outfit"
                            >
                                <option>English (US)</option>
                                <option>French (France)</option>
                                <option>German (Germany)</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">language</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Timezone</label>
                        <div className="relative">
                            <select
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white outline-none appearance-none font-outfit"
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

            <button className="w-full bg-[#2563EB] text-white font-black py-4.5 rounded-[1.5rem] shadow-xl shadow-blue-500/30 hover:scale-[1.01] active:scale-95 transition-all text-[15px] font-outfit">
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
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                    <span className="material-symbols-outlined text-[#2563EB]">visibility</span>
                    <h3 className="text-xl font-black dark:text-white font-outfit">Live Preview</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm relative group">
                    <div className="aspect-[4/3] relative">
                        <Image
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Live Preview"
                            fill
                            className="object-cover"
                        />
                        <button className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg">
                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className={`text-xl text-slate-900 dark:text-white font-outfit ${boldText ? 'font-black' : 'font-bold'}`}>Velvet Sectional Sofa</h4>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-amber-400 text-[18px]">star</span>
                                <span className="font-bold text-sm">4.8</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-6">Mid-century modern design</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">$1,299</span>
                            <button className="bg-[#2563EB] text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-500/20">
                                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 py-3 bg-slate-50/50 dark:bg-slate-800/50 font-bold border-t border-slate-100 dark:border-slate-800 uppercase tracking-tighter">
                        Adjust settings below to see changes above.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Display & Text</label>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden">
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center text-[13px] font-bold text-slate-900 dark:text-white">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#2563EB] bg-blue-50 dark:bg-blue-900/20 p-2 rounded-xl">text_fields</span>
                                Font Size
                            </div>
                            <span className="text-[#2563EB]">{fontSize}%</span>
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
                            <div className="text-left py-0.5">
                                <p className="font-bold text-[14px] dark:text-white font-outfit">High Contrast</p>
                                <p className="text-[10px] text-slate-400 font-medium tracking-tight">Increase color distinction</p>
                            </div>
                        </div>
                        <button onClick={() => setHighContrast(!highContrast)} className={`w-12 h-7 rounded-full transition-all relative ${highContrast ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${highContrast ? "right-1" : "left-1"}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">format_bold</span>
                            </div>
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Bold Text</p>
                        </div>
                        <button onClick={() => setBoldText(!boldText)} className={`w-12 h-7 rounded-full transition-all relative ${boldText ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${boldText ? "right-1" : "left-1"}`} />
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
                                <p className="font-bold text-[14px] dark:text-white font-outfit">Screen Reader Mode</p>
                                <p className="text-[10px] text-slate-500 font-medium">Simplifies layout for VoiceOver</p>
                            </div>
                        </div>
                        <button onClick={() => setScreenReader(!screenReader)} className={`w-12 h-7 rounded-full transition-all relative ${screenReader ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${screenReader ? "right-1" : "left-1"}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">motion_blur</span>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-[14px] dark:text-white font-outfit">Reduce Motion</p>
                                <p className="text-[10px] text-slate-500 font-medium">Minimizes interface animations</p>
                            </div>
                        </div>
                        <button onClick={() => setReduceMotion(!reduceMotion)} className={`w-12 h-7 rounded-full transition-all relative ${reduceMotion ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${reduceMotion ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                </div>

                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Color Filters</label>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all outline-none group text-left">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">palette</span>
                            </div>
                            <div>
                                <p className="font-bold text-[14px] dark:text-white font-outfit">Color Correction</p>
                                <p className="text-[10px] text-slate-500 font-medium">{colorCorrection}</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                </div>

                <div className="flex flex-col items-center pt-10 pb-16 space-y-4">
                    <button className="text-[#2563EB] font-black text-[14px] hover:underline">Reset to Default Settings</button>
                    <p className="text-[11px] text-slate-400 text-center max-w-[280px] leading-relaxed font-medium">
                        Note: System-wide settings may override some configuration.
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
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#2563EB]">password</span>
                    </div>
                    <h4 className="font-black text-lg text-slate-900 dark:text-white font-outfit">Change Password</h4>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Current Password</label>
                        <div className="relative">
                            <input type="password" defaultValue="********" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] dark:text-white outline-none font-outfit" />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block font-outfit">New Password</label>
                        <input type="password" placeholder="Enter new password" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] dark:text-white outline-none font-outfit" />
                        <p className="text-[11px] text-slate-400 mt-2 font-medium px-1">Must be at least 8 characters.</p>
                    </div>
                    <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block font-outfit">Confirm Password</label>
                        <input type="password" placeholder="Confirm new password" className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] dark:text-white outline-none font-outfit" />
                    </div>
                    <button className="w-full bg-[#2563EB] text-white font-black py-4 rounded-[1.5rem] shadow-lg shadow-blue-500/20 hover:scale-[1.01] transition-all font-outfit">
                        Update Password
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-12 bg-blue-50 dark:bg-white/5 rounded-2xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#2563EB] text-[28px]">on_device_training</span>
                        </div>
                        <div>
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Two-Factor Auth</p>
                            <p className="text-[11px] text-slate-500 font-medium max-w-[180px]">Secure your account with 2FA using SMS or an app.</p>
                        </div>
                    </div>
                    <button onClick={() => setTwoFactor(!twoFactor)} className={`w-12 h-7 rounded-full transition-all relative ${twoFactor ? "bg-[#2563EB]" : "bg-slate-200 dark:bg-slate-700"}`}>
                        <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${twoFactor ? "right-1" : "left-1"}`} />
                    </button>
                </div>
                <button className="w-full py-3.5 border-2 border-primary/20 text-primary font-black rounded-2xl hover:bg-primary/5 transition-all text-sm font-outfit">
                    Enable 2FA
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-50 dark:bg-white/5 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#2563EB]">devices</span>
                    </div>
                    <h4 className="font-black text-lg text-slate-900 dark:text-white font-outfit">Active Sessions</h4>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-slate-400 text-[26px]">smartphone</span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-[14px] dark:text-white font-outfit">iPhone 14 Pro</p>
                                    <span className="bg-green-100 dark:bg-green-900/40 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-md">Current</span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium font-outfit">San Francisco, CA • Just now</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-slate-400 text-[26px]">laptop</span>
                            <div>
                                <p className="font-bold text-[14px] dark:text-white font-outfit">MacBook Pro M2</p>
                                <p className="text-[11px] text-slate-400 font-medium font-outfit">New York, NY • 2 hours ago</p>
                            </div>
                        </div>
                        <button className="material-symbols-outlined text-slate-300 hover:text-red-500 px-2">logout</button>
                    </div>
                    <button className="w-full py-4 text-center text-red-500 font-black text-sm mt-2 hover:underline font-outfit">Log Out of All Other Sessions</button>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <div className="size-14 bg-white dark:bg-slate-900 rounded-full shadow-xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-[24px]">dark_mode</span>
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
                    <div className="size-10 bg-[#2563EB]/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">info</span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <h4 className="text-[12px] font-black text-primary uppercase tracking-wider font-outfit">System Permissions</h4>
                            <p className="text-[12px] text-slate-500 mt-1 leading-relaxed font-medium font-outfit">Push notifications are currently disabled in your device settings. Tap to enable them to receive updates.</p>
                        </div>
                        <button className="w-full bg-[#EBF2FF] dark:bg-blue-900/20 text-primary font-bold py-3.5 rounded-2xl text-[14px] hover:bg-blue-100 transition-all font-outfit">
                            Open Settings
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2 font-outfit">Push Notifications</h4>
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
                    <div className="flex items-center justify-between p-5">
                        <p className="font-bold text-[14px] dark:text-white font-outfit">Allow Push Notifications</p>
                        <button onClick={() => setPushAllow(!pushAllow)} className={`w-12 h-7 rounded-full transition-all relative ${pushAllow ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${pushAllow ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-5">
                        <div>
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Order Status</p>
                            <p className="text-[11px] text-slate-500 font-medium font-outfit">Get updates on shipping and delivery</p>
                        </div>
                        <button onClick={() => setPushOrderStatus(!pushOrderStatus)} className={`w-12 h-7 rounded-full transition-all relative ${pushOrderStatus ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${pushOrderStatus ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-5">
                        <div>
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Price Drops</p>
                            <p className="text-[11px] text-slate-500 font-medium font-outfit">Alerts when items in your wishlist go on sale</p>
                        </div>
                        <button onClick={() => setPushPriceDrops(!pushPriceDrops)} className={`w-12 h-7 rounded-full transition-all relative ${pushPriceDrops ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${pushPriceDrops ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2 font-outfit">Email Preferences</h4>
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
                    <div className="flex items-center justify-between p-5">
                        <p className="font-bold text-[14px] dark:text-white font-outfit">Subscribe to Newsletter</p>
                        <button onClick={() => setEmailSubscribe(!emailSubscribe)} className={`w-12 h-7 rounded-full transition-all relative ${emailSubscribe ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${emailSubscribe ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-5">
                        <div>
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Weekly Newsletter</p>
                            <p className="text-[11px] text-slate-500 font-medium font-outfit">Design tips, trends, and inspiration</p>
                        </div>
                        <button onClick={() => setEmailWeekly(!emailWeekly)} className={`w-12 h-7 rounded-full transition-all relative ${emailWeekly ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${emailWeekly ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2 font-outfit">SMS Notifications</h4>
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
                    <div className="flex items-center justify-between p-5 bg-slate-50/50 dark:bg-slate-800/20">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-600 shadow-sm">
                                <span className="material-symbols-outlined text-slate-400 text-[20px]">smartphone</span>
                            </div>
                            <div>
                                <p className="font-bold text-[14px] dark:text-white font-outfit">+1 (555) 123-4567</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="size-1.5 bg-green-500 rounded-full" />
                                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-[0.05em] font-outfit">Verified</p>
                                </div>
                            </div>
                        </div>
                        <button className="text-[14px] font-black text-primary hover:underline font-outfit">Edit</button>
                    </div>
                    <div className="flex items-center justify-between p-5">
                        <div>
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Delivery Updates</p>
                            <p className="text-[11px] text-slate-500 font-medium font-outfit">Real-time driver tracking and arrival times</p>
                        </div>
                        <button onClick={() => setSmsDelivery(!smsDelivery)} className={`w-12 h-7 rounded-full transition-all relative ${smsDelivery ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                            <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${smsDelivery ? "right-1" : "left-1"}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center py-12 space-y-4">
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed px-10 font-outfit">
                    Notifications may still be sent for critical account updates regardless of your settings.
                </p>
                <button className="text-[13px] font-black text-slate-400 hover:text-primary transition-colors font-outfit">Privacy Policy</button>
            </div>
        </motion.div>
    );

    const renderPrivacy = () => (
        <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
        >
            <div className="px-1 text-center py-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white font-outfit">Privacy & Data</h3>
                <p className="text-xs text-slate-500 font-medium mt-1 font-outfit">Manage how your data is used and shared.</p>
            </div>

            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                    <div className="flex items-center gap-3 text-primary font-black text-[15px] font-outfit">
                        <span className="material-symbols-outlined text-[24px]">share_reviews</span>
                        Data Sharing
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-[14px] dark:text-white font-outfit">Share usage data</p>
                                <p className="text-[11px] text-slate-500 max-w-[240px] leading-relaxed font-outfit">Help us improve by sharing anonymous usage statistics.</p>
                            </div>
                            <button onClick={() => setShareUsage(!shareUsage)} className={`w-12 h-7 rounded-full transition-all relative ${shareUsage ? "bg-primary" : "bg-slate-200 dark:bg-slate-700 shadow-inner"}`}>
                                <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${shareUsage ? "right-1" : "left-1"}`} />
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-[14px] dark:text-white font-outfit">Personalized Ads</p>
                                <p className="text-[11px] text-slate-500 max-w-[240px] leading-relaxed font-outfit">Allow partners to show you ads relevant to your furniture interests.</p>
                            </div>
                            <button onClick={() => setPersonalizedAds(!personalizedAds)} className={`w-12 h-7 rounded-full transition-all relative ${personalizedAds ? "bg-primary" : "bg-slate-200 dark:bg-slate-700 shadow-inner"}`}>
                                <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${personalizedAds ? "right-1" : "left-1"}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                    <div className="flex items-center gap-3 text-primary font-black text-[15px] font-outfit">
                        <span className="material-symbols-outlined text-[24px]">visibility</span>
                        Visibility
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Profile Visibility</p>
                            <div className="relative">
                                <select
                                    value={profileVisibility}
                                    onChange={(e) => setProfileVisibility(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-[14px] font-medium dark:text-white appearance-none outline-none font-outfit"
                                >
                                    <option>Friends Only</option>
                                    <option>Public</option>
                                    <option>Invisible</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed font-outfit">Controls who can see your saved furniture lists and reviews.</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-[14px] dark:text-white font-outfit">Show Online Status</p>
                                <p className="text-[11px] text-slate-500 font-outfit">Let friends see when you are shopping.</p>
                            </div>
                            <button onClick={() => setOnlineStatus(!onlineStatus)} className={`w-12 h-7 rounded-full transition-all relative ${onlineStatus ? "bg-primary" : "bg-slate-200 dark:bg-slate-700 shadow-inner"}`}>
                                <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${onlineStatus ? "right-1" : "left-1"}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                    <div className="flex items-center gap-3 text-primary font-black text-[15px] font-outfit">
                        <span className="material-symbols-outlined text-[24px]">cookie</span>
                        Cookie Preferences
                    </div>

                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Essential Cookies</p>
                            <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full uppercase tracking-widest font-outfit">Always Active</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-[14px] dark:text-white font-outfit">Analytics Cookies</p>
                            <button onClick={() => setAnalyticsCookies(!analyticsCookies)} className={`w-12 h-7 rounded-full transition-all relative ${analyticsCookies ? "bg-primary" : "bg-slate-200 dark:bg-slate-700 shadow-inner"}`}>
                                <div className={`absolute top-1 size-5 bg-white rounded-full shadow-sm transition-all ${analyticsCookies ? "right-1" : "left-1"}`} />
                            </button>
                        </div>
                    </div>
                    <button className="w-full text-center text-primary font-black text-[14px] pt-2 hover:underline font-outfit">Manage All Cookies</button>
                </div>
            </div>

            <button className="w-full bg-[#2563EB] text-white font-black py-4.5 rounded-[1.5rem] shadow-xl shadow-blue-500/30 hover:scale-[1.01] active:scale-95 transition-all text-[15px] font-outfit">
                <span className="material-symbols-outlined text-[20px] mr-2 inline-block align-middle">save</span>
                Save Preferences
            </button>
        </motion.div>
    );

    const renderSubscriptions = () => (
        <motion.div
            key="subscriptions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
        >
            {/* Current Plan Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-outfit">Current Plan</p>
                        <h4 className="text-3xl font-black text-slate-900 dark:text-white mt-1 font-outfit">Pro Member</h4>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/40 text-green-600 text-[11px] font-black px-4 py-1.5 rounded-full font-outfit">Active</span>
                </div>

                <p className="text-[13px] text-slate-500 font-medium font-outfit">Your next billing date is <span className="text-slate-900 dark:text-white font-bold">November 24, 2026.</span></p>

                <div className="space-y-3">
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            className="h-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                        />
                    </div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
                        <span className="text-slate-400 font-outfit">Usage</span>
                        <span className="text-slate-900 dark:text-white font-outfit">75% of 100GB</span>
                    </div>
                </div>

                <button className="w-full bg-[#2563EB] text-white font-black py-4 rounded-[1.5rem] shadow-lg shadow-blue-500/20 hover:scale-[1.01] transition-all font-outfit">
                    Manage Plan
                </button>
            </div>

            <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2 font-outfit">Upgrade Options</label>
                <div className="space-y-3">
                    <button className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-5 flex items-center justify-between group hover:border-primary transition-all text-left">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#2563EB] text-[24px]">grade</span>
                            </div>
                            <div>
                                <p className="font-bold text-[15px] dark:text-white font-outfit">Ultimate</p>
                                <p className="text-[11px] text-slate-500 font-medium font-outfit">$29.99 / month</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                    <button className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-5 flex items-center justify-between group hover:border-primary transition-all text-left">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-purple-600 text-[24px]">business_center</span>
                            </div>
                            <div>
                                <p className="font-bold text-[15px] dark:text-white font-outfit">Enterprise</p>
                                <p className="text-[11px] text-slate-500 font-medium font-outfit">Custom pricing</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                </div>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-900 rounded-[2.5rem] p-7 border border-slate-100 dark:border-slate-800 space-y-6">
                <h4 className="font-black text-[15px] dark:text-white font-outfit">Included in Pro</h4>
                <div className="grid gap-4">
                    {[
                        "Unlimited projects & designs",
                        "Priority 24/7 customer support",
                        "Advanced analytics dashboard",
                        "Export to 4K resolution"
                    ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="size-6 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-white text-[16px] font-black">check</span>
                            </div>
                            <span className="text-[13px] font-bold text-slate-600 dark:text-slate-300 font-outfit">{feat}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2 font-outfit">Payment Method</label>
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-[11px] font-black text-slate-400 uppercase italic font-outfit">Visa</div>
                        <p className="font-bold text-[15px] dark:text-white font-outfit">•••• 4242</p>
                    </div>
                    <button className="text-[14px] font-black text-primary hover:underline font-outfit">Edit</button>
                </div>
            </div>

            <div className="text-center py-8">
                <button className="text-[14px] font-black text-red-500 hover:text-red-600 transition-colors font-outfit">Cancel Subscription</button>
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
                                className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 transition-all active:scale-95 shadow-sm"
                            >
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">arrow_back</span>
                            </button>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] font-outfit">Settings</h2>
                            <button className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 transition-all active:scale-95 shadow-sm">
                                <span className="material-symbols-outlined text-slate-400">help</span>
                            </button>
                        </div>

                        {/* Navigation Tabs (Pills) */}
                        <div
                            className="px-6 pb-6 overflow-x-auto hide-scrollbar flex gap-3 cursor-grab active:cursor-grabbing select-none"
                            onMouseDown={(e) => {
                                const slider = e.currentTarget;
                                const startX = e.pageX - slider.offsetLeft;
                                const scrollLeft = slider.scrollLeft;
                                let isDragging = false;

                                const onMouseMove = (moveEvent: MouseEvent) => {
                                    moveEvent.preventDefault();
                                    const x = moveEvent.pageX - slider.offsetLeft;
                                    const walk = (x - startX) * 2;
                                    if (Math.abs(walk) > 5) isDragging = true;
                                    slider.scrollLeft = scrollLeft - walk;
                                };

                                const onMouseUp = () => {
                                    window.removeEventListener('mousemove', onMouseMove);
                                    window.removeEventListener('mouseup', onMouseUp);
                                    if (isDragging) {
                                        // Prevent the next click event if we dragged
                                        const preventClick = (clickEvent: MouseEvent) => {
                                            clickEvent.stopImmediatePropagation();
                                            slider.removeEventListener('click', preventClick, true);
                                        };
                                        slider.addEventListener('click', preventClick, true);
                                    }
                                };

                                window.addEventListener('mousemove', onMouseMove);
                                window.addEventListener('mouseup', onMouseUp);
                            }}
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3.5 rounded-2xl text-[13px] font-black transition-all whitespace-nowrap shadow-sm border font-outfit ${activeTab === tab
                                        ? "bg-[#2563EB] text-white border-blue-600 shadow-blue-500/20 scale-105"
                                        : "bg-white dark:bg-slate-800 text-slate-400 border-slate-50 dark:border-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div
                        className="flex-1 overflow-y-auto px-6 py-8 sub-view-container hide-scrollbar cursor-grab active:cursor-grabbing select-none"
                        onMouseDown={(e) => {
                            const slider = e.currentTarget;
                            const startY = e.pageY - slider.offsetTop;
                            const scrollTop = slider.scrollTop;

                            const onMouseMove = (moveEvent: MouseEvent) => {
                                const y = moveEvent.pageY - slider.offsetTop;
                                const walk = (y - startY) * 2;
                                slider.scrollTop = scrollTop - walk;
                            };

                            const onMouseUp = () => {
                                window.removeEventListener('mousemove', onMouseMove);
                                window.removeEventListener('mouseup', onMouseUp);
                            };

                            window.addEventListener('mousemove', onMouseMove);
                            window.addEventListener('mouseup', onMouseUp);
                        }}
                    >

                        <AnimatePresence mode="wait">
                            {activeTab === "General" && renderGeneral()}
                            {activeTab === "Accessibility" && renderAccessibility()}
                            {activeTab === "Security" && renderSecurity()}
                            {activeTab === "Notifications" && renderNotifications()}
                            {activeTab === "Privacy" && renderPrivacy()}
                            {activeTab === "Subscriptions" && renderSubscriptions()}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
