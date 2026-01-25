"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Tab = "General" | "Security" | "Notifications" | "Accessibility" | "Privacy" | "Subscriptions" | "Legal";

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>("General");
    const router = useRouter();

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
    // Accessibility States & Persistence
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);
    const [boldText, setBoldText] = useState(false);
    const [screenReader, setScreenReader] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [colorCorrection, setColorCorrection] = useState("Off");

    // Load settings from localStorage on mount
    useEffect(() => {
        const loadSettings = () => {
            const storedFontSize = localStorage.getItem('acc_fontSize');
            if (storedFontSize) setFontSize(parseInt(storedFontSize));

            setHighContrast(localStorage.getItem('acc_highContrast') === 'true');
            setBoldText(localStorage.getItem('acc_boldText') === 'true');
            setScreenReader(localStorage.getItem('acc_screenReader') === 'true');
            setReduceMotion(localStorage.getItem('acc_reduceMotion') === 'true');
            const storedColor = localStorage.getItem('acc_colorCorrection');
            if (storedColor) setColorCorrection(storedColor);
        };
        loadSettings();
    }, []);

    // Apply & Save Settings
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem('acc_fontSize', fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        if (highContrast) document.documentElement.classList.add('high-contrast');
        else document.documentElement.classList.remove('high-contrast');
        localStorage.setItem('acc_highContrast', highContrast.toString());
    }, [highContrast]);

    useEffect(() => {
        if (boldText) document.documentElement.classList.add('bold-text');
        else document.documentElement.classList.remove('bold-text');
        localStorage.setItem('acc_boldText', boldText.toString());
    }, [boldText]);

    useEffect(() => {
        if (reduceMotion) document.documentElement.classList.add('reduce-motion');
        else document.documentElement.classList.remove('reduce-motion');
        localStorage.setItem('acc_reduceMotion', reduceMotion.toString());
    }, [reduceMotion]);

    useEffect(() => {
        // Simple Color Correction Implementation
        if (colorCorrection === "Grayscale") document.documentElement.classList.add('grayscale-mode');
        else document.documentElement.classList.remove('grayscale-mode');
        localStorage.setItem('acc_colorCorrection', colorCorrection);
    }, [colorCorrection]);

    // Security States
    const [twoFactor, setTwoFactor] = useState(false);

    // Privacy States
    const [shareUsage, setShareUsage] = useState(false);
    const [personalizedAds, setPersonalizedAds] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState("Friends Only");
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [analyticsCookies, setAnalyticsCookies] = useState(true);
    const [legalActiveTab, setLegalActiveTab] = useState("Terms");

    if (!isOpen) return null;

    const tabs: Tab[] = ["General", "Security", "Notifications", "Accessibility", "Privacy", "Subscriptions", "Legal"];

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
                    <div className="size-48 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="Profile"
                            width={192}
                            height={192}
                            className="object-cover"
                        />
                    </div>
                    <button className="absolute bottom-2 right-2 size-12 bg-primary rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-lg text-white hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">photo_camera</span>
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

            <button className="w-full bg-[#2563EB] text-white font-black py-7 rounded-[2rem] shadow-xl shadow-blue-500/30 hover:scale-[1.01] active:scale-95 transition-all text-lg font-outfit uppercase tracking-wide">
                Save Preferences
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

                <div className="flex flex-col items-center pt-10 pb-16 space-y-6">
                    <button
                        onClick={() => {
                            onClose();
                            router.push('/help/accessibility');
                        }}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-primary transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary bg-white dark:bg-slate-800 size-12 rounded-2xl flex items-center justify-center shadow-sm">help</span>
                            <div className="text-left">
                                <p className="font-black text-sm uppercase tracking-tighter dark:text-white">Accessibility Help Hub</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Video guides & format requests</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>

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

                    {pushAllow && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50/50 dark:bg-slate-950/30"
                        >
                            <div className="divide-y divide-slate-100 dark:divide-slate-800/50 px-5">
                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="font-bold text-[13px] dark:text-gray-200 font-outfit">New Arrivals</p>
                                        <p className="text-[11px] text-slate-400 font-medium font-outfit">Be the first to see new collections</p>
                                    </div>
                                    <button onClick={() => setPushNewArrivals(!pushNewArrivals)} className={`w-10 h-6 rounded-full transition-all relative ${pushNewArrivals ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                                        <div className={`absolute top-0.5 size-5 bg-white rounded-full shadow-sm transition-all ${pushNewArrivals ? "right-0.5" : "left-0.5"}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="font-bold text-[13px] dark:text-gray-200 font-outfit">Order Status</p>
                                        <p className="text-[11px] text-slate-400 font-medium font-outfit">Shipping, delivery, and returns updates</p>
                                    </div>
                                    <button onClick={() => setPushOrderStatus(!pushOrderStatus)} className={`w-10 h-6 rounded-full transition-all relative ${pushOrderStatus ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                                        <div className={`absolute top-0.5 size-5 bg-white rounded-full shadow-sm transition-all ${pushOrderStatus ? "right-0.5" : "left-0.5"}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="font-bold text-[13px] dark:text-gray-200 font-outfit">Price Drops</p>
                                        <p className="text-[11px] text-slate-400 font-medium font-outfit">Alerts for items in your wishlist</p>
                                    </div>
                                    <button onClick={() => setPushPriceDrops(!pushPriceDrops)} className={`w-10 h-6 rounded-full transition-all relative ${pushPriceDrops ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                                        <div className={`absolute top-0.5 size-5 bg-white rounded-full shadow-sm transition-all ${pushPriceDrops ? "right-0.5" : "left-0.5"}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="font-bold text-[13px] dark:text-gray-200 font-outfit">Promotions</p>
                                        <p className="text-[11px] text-slate-400 font-medium font-outfit">Exclusive sales and special offers</p>
                                    </div>
                                    <button className={`w-10 h-6 rounded-full transition-all relative bg-slate-200 dark:bg-slate-700`}>
                                        <div className={`absolute top-0.5 size-5 bg-white rounded-full shadow-sm transition-all left-0.5`} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
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
                    <button
                        onClick={() => setActiveTab("Legal")}
                        className="w-full text-center text-primary font-black text-[14px] pt-2 hover:underline font-outfit"
                    >
                        View Full Legal Documentation
                    </button>
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

            <div className="text-center py-8 px-4">
                <button className="w-full border-2 border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 font-black py-6 rounded-[2rem] hover:bg-red-100 dark:hover:bg-red-950 hover:border-red-200 transition-all active:scale-95 uppercase tracking-widest text-xs font-outfit">
                    Cancel Subscription
                </button>
            </div>
        </motion.div>
    );

    const renderLegal = () => {
        const legalTabs = ["Terms", "Privacy", "Cookies", "Returns", "Licenses"];

        return (
            <motion.div
                key="legal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
            >
                {/* Meta Information */}
                <div className="pt-2 pb-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-sm text-primary">history</span>
                        <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Last updated: October 24, 2023</span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-outfit">Legal & Privacy</h2>
                    <p className="mt-2 text-slate-500 dark:text-gray-400 text-sm leading-relaxed font-outfit">
                        Please read these terms carefully. By using Furnza, you agree to be bound by these conditions.
                    </p>
                </div>

                {/* Internal Legal Tabs */}
                <div className="flex overflow-x-auto no-scrollbar space-x-6 border-b border-slate-100 dark:border-slate-800">
                    {legalTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setLegalActiveTab(tab)}
                            className="relative flex flex-col items-center justify-center pb-3 pt-4 min-w-fit group outline-none"
                        >
                            <span className={`text-sm font-bold tracking-tight transition-colors ${legalActiveTab === tab ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white"}`}>
                                {tab}
                            </span>
                            {legalActiveTab === tab && (
                                <motion.span layoutId="activeLegalTab" className="absolute bottom-0 h-0.5 w-full bg-primary rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {legalActiveTab === "Terms" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pt-4">
                        {/* Table of Contents */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">On this page</h3>
                                <span className="material-symbols-outlined text-slate-400 text-lg">list</span>
                            </div>
                            <ul className="space-y-3">
                                {["1. Introduction", "2. User Accounts", "3. Purchases & Payments", "4. Shipping Policy"].map((item, i) => (
                                    <li key={i}>
                                        <a className="flex items-center text-slate-600 dark:text-slate-300 text-[13px] font-bold hover:text-primary transition-colors" href={`#sec-${i + 1}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-3 ${i === 0 ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sections */}
                        <div className="space-y-10">
                            <section id="sec-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary text-xs font-black">1</span>
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit">Introduction</h3>
                                </div>
                                <div className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed space-y-4 font-outfit">
                                    <p>
                                        Welcome to Furnza. By accessing our mobile application and website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                                    </p>
                                    <p>
                                        We reserve the right to review and amend any of these Terms of Service at our sole discretion. Any changes will take effect immediately from the date of publication.
                                    </p>
                                </div>
                            </section>

                            <section id="sec-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-black">2</span>
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit">User Accounts</h3>
                                </div>
                                <div className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed space-y-4 font-outfit">
                                    <p>
                                        You must provide accurate and complete information when creating an account. You are responsible for safeguarding your password and all activities under your account.
                                    </p>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border-l-4 border-primary my-6 shadow-sm">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-primary text-xl">gpp_maybe</span>
                                            <p className="text-xs text-blue-800 dark:text-blue-200 font-bold leading-relaxed">
                                                Important: We will never ask for your password via email or SMS. Always ensure you are on the official Furnza platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="sec-3">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-black">3</span>
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit">Purchases & Payments</h3>
                                </div>
                                <div className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed space-y-4 font-outfit">
                                    <p>
                                        We use secure third-party payment processors. We do not store your credit card details on our servers. All transactions are encrypted.
                                    </p>
                                </div>
                            </section>

                            <section id="sec-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-black">4</span>
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white font-outfit">Shipping & Returns</h3>
                                </div>
                                <div className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-outfit">
                                    <p className="mb-4">Standard delivery estimates:</p>
                                    <ul className="space-y-2 mb-4">
                                        {["Standard: 5-7 business days", "White glove: 10-14 business days", "Custom orders: 4-6 weeks"].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <span className="size-1.5 rounded-full bg-primary" />
                                                <span className="font-bold">{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        </div>

                        {/* Contact Box */}
                        <div className="mt-8 bg-slate-50 dark:bg-slate-900/80 rounded-[2.5rem] p-8 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="size-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                                <span className="material-symbols-outlined text-3xl text-primary">support_agent</span>
                            </div>
                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 font-outfit">Still have questions?</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">Our legal team is available to help clarify any concerns.</p>
                            <button className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-black py-4 rounded-2xl shadow-sm hover:scale-[1.02] active:scale-95 transition-all font-outfit uppercase tracking-widest text-xs">
                                Contact Legal Support
                            </button>
                        </div>
                    </motion.div>
                )}

                {legalActiveTab === "Privacy" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pt-4">
                        <div className="space-y-10">
                            <section>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 font-outfit">Data Collection</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support.</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-500 dark:text-slate-400 marker:text-primary">
                                    <li><span className="font-bold text-slate-700 dark:text-slate-300">Personal Data:</span> Name, email, shipping address, and phone number.</li>
                                    <li><span className="font-bold text-slate-700 dark:text-slate-300">Payment Data:</span> Encrypted payment information processed securely.</li>
                                    <li><span className="font-bold text-slate-700 dark:text-slate-300">Usage Data:</span> Device type, browser version, and interaction metrics.</li>
                                </ul>
                            </section>
                            <section>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 font-outfit">How We Use Your Data</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">We use your data to provide, maintain, and improve our services, process transactions, and send you related information including confirmations and invoices.</p>
                            </section>
                        </div>
                    </motion.div>
                )}

                {legalActiveTab === "Cookies" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pt-4">
                        <div className="space-y-6">
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.</p>

                            <div className="grid gap-4">
                                {[
                                    { title: "Essential Cookies", desc: "Necessary for the website to function. Cannot be disabled." },
                                    { title: "Analytics Cookies", desc: "Help us understand how visitors interact with the website." },
                                    { title: "Marketing Cookies", desc: "Used to track visitors across websites for ad targeting." }
                                ].map((cookie, i) => (
                                    <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-900/50">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{cookie.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{cookie.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {legalActiveTab === "Returns" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pt-4">
                        <div className="space-y-10">
                            <section>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/50 mb-6">
                                    <h3 className="text-lg font-black text-blue-900 dark:text-blue-100 mb-2 font-outfit">30-Day Happiness Guarantee</h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">If you're not completely satisfied with your purchase, return it within 30 days for a full refund.</p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 font-outfit">Return Process</h3>
                                <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800">
                                    {[
                                        { title: "Initiate Return", desc: "Log in to your account and select 'Start Return' on your order." },
                                        { title: "Pack Items", desc: "Place items in original packaging with all tags attached." },
                                        { title: "Ship It", desc: "Use the prepaid shipping label sent to your email." },
                                        { title: "Refund", desc: "Funds returned to original payment method within 5-7 days." }
                                    ].map((step, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-8 size-6 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center border-4 border-white dark:border-slate-950 z-10">{i + 1}</span>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{step.title}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </motion.div>
                )}

                {legalActiveTab === "Licenses" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pt-4">
                        <div className="space-y-6">
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Furnza is built using open source software. We are grateful to the detailed contributors of the following projects:</p>

                            <div className="grid gap-3">
                                {[
                                    { name: "React", lic: "MIT License", copyright: "© Meta Platforms, Inc." },
                                    { name: "Next.js", lic: "MIT License", copyright: "© Vercel, Inc." },
                                    { name: "Framer Motion", lic: "MIT License", copyright: "© Framer B.V." },
                                    { name: "Tailwind CSS", lic: "MIT License", copyright: "© Tailwind Labs Inc." }
                                ].map((lib, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{lib.name}</h4>
                                            <p className="text-[10px] text-slate-400">{lib.copyright}</p>
                                        </div>
                                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-1 rounded">
                                            {lib.lic}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        );
    };

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
                            {activeTab === "Legal" && renderLegal()}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
