"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileSettingsPage() {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("settings");
    const [activeLegalTab, setActiveLegalTab] = useState("terms");

    // Settings State
    const [selectedBarber, setSelectedBarber] = useState("James");
    const [notificationPreferences, setNotificationPreferences] = useState({
        sms: true,
        email: false,
        push: true
    });
    const [selectedTimes, setSelectedTimes] = useState(["Weekday Evenings", "Fridays"]);
    const [copied, setCopied] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText("FRESHCUT");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleTime = (time: string) => {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter(t => t !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            alert("Preferences Saved Successfully!");
        }, 1000);
    };

    if (!mounted) return null;

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: "dashboard" },
        { id: "bookings", label: "My Bookings", icon: "calendar_month" },
        { id: "history", label: "History", icon: "history" },
        { id: "settings", label: "Settings", icon: "settings" },
        { id: "legal", label: "Legal & Policies", icon: "policy" },
    ];

    const timeOptions = [
        "Weekday Evenings", "Early Morning", "Lunch Break", "Fridays", "Weekends"
    ];

    return (
        <div className="bg-background-dark text-white font-display overflow-x-hidden min-h-screen flex flex-row">
            {/* Side Navigation */}
            <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-white/5 bg-background-dark p-6 overflow-y-auto z-20 h-screen sticky top-0">
                <div className="flex flex-col gap-8">
                    {/* User Profile Summary */}
                    <div className="flex items-center gap-4 p-2 rounded-xl bg-surface-dark border border-white/5">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-lg ring-2 ring-primary/20"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY7i0hUIrYB7hfMD2NCDQ0fgkWk5BpB1gi1joR4vJV_ab3mDVRzTQUpoKBmLDHG-FJAkmYiaBw43z5DuK5OMQEUtBTwQQ8SZ-RvRABEz2zrKqph5UwEiLru1yAeLQ5guZovWkKzUIHVXkfxJzrhBAXRlmA_izSluXou2MHR7qBBWc89dCmFHO_TJskJuoQwPHBtkXIIXhNvoofdN8LlkxziZyFxUjZ38sTzlGdpLtSXipTUR90XuvwukMF902mwTgyM16nHUHoOb8k")',
                            }}
                        ></div>
                        <div className="flex flex-col">
                            <h2 className="text-base font-bold leading-tight">Alex Sterling</h2>
                            <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                                VIP Member
                            </p>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left group ${activeTab === item.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-2xl ${activeTab === item.id ? "fill-1" : "group-hover:text-primary transition-colors"}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-sm ${activeTab === item.id ? "font-bold" : "font-medium group-hover:text-primary transition-colors"}`}>
                                    {item.label}
                                </span>
                            </button>
                        ))}

                        <Link
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors group mt-4 w-full text-left"
                            href="/"
                        >
                            <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">
                                home
                            </span>
                            <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                Back to Home
                            </span>
                        </Link>
                    </nav>
                </div>
                {/* Bottom Action */}
                <Link
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors mt-auto"
                    href="#"
                >
                    <span className="material-symbols-outlined text-2xl">logout</span>
                    <span className="text-sm font-medium">Logout</span>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-y-auto scroll-smooth w-full">
                <div className="container mx-auto max-w-[1200px] p-4 md:p-6 lg:p-10 pb-24">
                    {/* Mobile Header */}
                    <div className="lg:hidden flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="bg-surface-dark p-2 rounded-full border border-white/10">
                                <span className="material-symbols-outlined text-white">arrow_back</span>
                            </Link>
                            <span className="font-bold text-lg capitalize">{activeTab}</span>
                        </div>
                        <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY7i0hUIrYB7hfMD2NCDQ0fgkWk5BpB1gi1joR4vJV_ab3mDVRzTQUpoKBmLDHG-FJAkmYiaBw43z5DuK5OMQEUtBTwQQ8SZ-RvRABEz2zrKqph5UwEiLru1yAeLQ5guZovWkKzUIHVXkfxJzrhBAXRlmA_izSluXou2MHR7qBBWc89dCmFHO_TJskJuoQwPHBtkXIIXhNvoofdN8LlkxziZyFxUjZ38sTzlGdpLtSXipTUR90XuvwukMF902mwTgyM16nHUHoOb8k")' }}></div>
                    </div>

                    {/* Content Area Based on Active Tab */}
                    {activeTab === 'settings' ? (
                        <>
                            {/* Page Header */}
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                                    Settings &amp; Preferences
                                </h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">
                                    Customize your grooming experience, manage payment methods, and control how we connect with you.
                                </p>
                            </header>

                            {/* Grid Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* 1. Personal Information (New) */}
                                <section className="col-span-1 lg:col-span-8 flex flex-col bg-surface-dark rounded-xl p-6 lg:p-8 shadow-sm border border-white/5">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                        <span className="material-symbols-outlined text-primary text-3xl">badge</span>
                                        <h2 className="text-xl font-bold">Personal Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                            <input type="text" defaultValue="Alex Sterling" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-primary/50 transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                            <input type="tel" defaultValue="(555) 123-4567" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-primary/50 transition-colors" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                            <input type="email" defaultValue="alex.sterling@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-primary/50 transition-colors" />
                                        </div>
                                    </div>
                                </section>

                                {/* 2. Notification Settings (Moved) */}
                                <section className="col-span-1 lg:col-span-4 flex flex-col bg-surface-dark rounded-xl p-6 shadow-sm border border-white/5">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="material-symbols-outlined text-primary text-2xl">notifications_active</span>
                                        <h2 className="text-lg font-bold">Notifications</h2>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        {[
                                            { id: 'sms', label: 'SMS Reminders', sub: '24h before appointment' },
                                            { id: 'email', label: 'Email Marketing', sub: 'Promos & tips' },
                                            { id: 'push', label: 'App Push', sub: 'Status updates' }
                                        ].map((item) => (
                                            <div key={item.id} className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">{item.label}</span>
                                                    <span className="text-xs text-gray-400">{item.sub}</span>
                                                </div>
                                                <button
                                                    onClick={() => setNotificationPreferences(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notificationPreferences] }))}
                                                    className={`relative w-11 h-6 rounded-full transition-colors ${notificationPreferences[item.id as keyof typeof notificationPreferences] ? 'bg-primary' : 'bg-white/10'}`}
                                                >
                                                    <span className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${notificationPreferences[item.id as keyof typeof notificationPreferences] ? 'translate-x-full' : 'translate-x-0'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* 3. Booking Preferences (Existing) */}
                                <section className="col-span-1 lg:col-span-8 flex flex-col bg-surface-dark rounded-xl p-6 lg:p-8 shadow-sm border border-white/5">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                        <span className="material-symbols-outlined text-primary text-3xl">content_cut</span>
                                        <h2 className="text-xl font-bold">Booking Preferences</h2>
                                    </div>

                                    {/* Default Barber Selection */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Default Barber</label>
                                        <div className="flex flex-wrap gap-6">
                                            {[
                                                { id: "James", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPVuo7e7d42cZ8SVF5yBaWZ4WxcRqUIY2rfQAdWtliyxf-75tgSZcDKUxfHXgIjsjsM3Ph2KqaU_1Xp4TWcHYnbmgr83BPp7SsVZfX6LkuEw-yDpRQBUHyYpTUY5wE_FoD4nUFK0vpOpR1U1qxI8Tk6kORzl6y-PqLNZo6NDwwor1Vj0QgSTxbJMI563r0-dPS6lVxRytPTBb_hfsyy58q-8lp0czIk83UuTwsiaxM2rTTFm6ramjF2nbc8wRfkmTtt6SlZF7IjAp7" },
                                                { id: "Sarah", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbsUr6yVAj5lZiRQbGsD6SYm45N5uATtoqNEw2Z18wV7vnm9GeE1U-6atIJ_DfS-EbaBiXcq93Qa4nkOBM0KOehDVKiFdL84d7OlkAMTZqAYOFvpZukD3H7x8xUevwcA7HiLF2b0CUdN5fiAI1YPHV0GSSwJ0OiyOAVGAmt3PvDcoDJqdLOorFRt4-GKoYqRgtgAtFz7-UmAVQ3vmaU9dlid92hteW53XLqxuA4e7LWQMqV7TwAWnO4pX5F_XyGd92YLW45zM5FRqL" },
                                                { id: "David", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKYkGWRAj5alGr7xZRoSNLakW_Zv6wo3_B2kmiwrqJ11Eey4-XyYKo2roRCl86flTCuj6XUNkNw-NlsBgUSxVWbd7XFyQAd2UGu_yQpX46-Vem1HzqhcHDBw8wE3tqPjJq0kvp9_LWs7dtFvlJS-ZK8N0FrYt9y0QuQteJmo1ohmJZ-pFRpoCTvtyDe06e3Ejk9UmbjrxehPNdvWmpEMpQAw0Vesvmvkucq6bc8IbA91gVvoNd3NoqPi850VGtdnrTnFTPPMIufe_e" }
                                            ].map((barber) => (
                                                <div
                                                    key={barber.id}
                                                    onClick={() => setSelectedBarber(barber.id)}
                                                    className="group relative flex flex-col items-center gap-2 cursor-pointer"
                                                >
                                                    <AnimatePresence>
                                                        {selectedBarber === barber.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.8 }}
                                                                className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-purple-500 opacity-100 blur-sm"
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                    <div
                                                        className={`relative size-20 rounded-full border-4 bg-cover bg-center transition-all duration-300 ${selectedBarber === barber.id
                                                            ? "border-background-dark grayscale-0"
                                                            : "border-transparent grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                                                            }`}
                                                        style={{ backgroundImage: `url('${barber.img}')` }}
                                                    ></div>
                                                    <span className={`text-sm font-bold transition-colors ${selectedBarber === barber.id ? "text-primary" : "text-gray-400 group-hover:text-white"}`}>
                                                        {barber.id} {barber.id === "James" && "(You)"}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Preferred Times */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
                                            Preferred Times
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {timeOptions.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => toggleTime(time)}
                                                    className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all active:scale-95 ${selectedTimes.includes(time)
                                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                {/* 4. Payment Methods (Existing) */}
                                <section className="col-span-1 lg:col-span-4 flex flex-col bg-surface-dark rounded-xl p-6 lg:p-8 shadow-sm h-full border border-white/5">
                                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
                                            <h2 className="text-xl font-bold">Wallet</h2>
                                        </div>
                                        <button className="text-primary hover:text-primary/80 transition-colors">
                                            <span className="material-symbols-outlined">add_circle</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-1">
                                        <div className="relative group p-4 rounded-xl bg-gradient-to-br from-slate-800 to-black border border-white/10 text-white shadow-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
                                            <div className="absolute right-0 top-0 p-3 opacity-20"><span className="material-symbols-outlined text-6xl">credit_card</span></div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="bg-white/20 p-1.5 rounded w-12 h-8 flex items-center justify-center"><span className="text-xs font-bold italic">VISA</span></div>
                                                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full border border-primary/30">DEFAULT</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col"><p className="text-xs text-slate-400 mb-1">Card Number</p><p className="font-mono text-lg tracking-wider">•••• 4242</p></div>
                                                <div className="flex flex-col text-right"><p className="text-xs text-slate-400 mb-1">Expires</p><p className="font-mono text-sm">12/25</p></div>
                                            </div>
                                        </div>
                                        <button className="mt-auto w-full py-3 rounded-xl border-2 border-dashed border-white/20 text-gray-400 hover:border-primary hover:text-primary transition-all font-medium flex items-center justify-center gap-2 group">
                                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add</span>
                                            Add Payment Method
                                        </button>
                                    </div>
                                </section>
                            </div>

                            {/* Footer Action Area */}
                            <div className="mt-8 flex justify-end">
                                <button className="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-3 rounded-full font-bold text-sm mr-4 transition-colors">
                                    Discard Changes
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/40 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSaving ? <span className="material-symbols-outlined animate-spin text-sm">refresh</span> : null}
                                    {isSaving ? "Saving..." : "Save Preferences"}
                                </button>
                            </div>
                        </>
                    ) : activeTab === 'dashboard' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                                    Command Center
                                </h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">
                                    Overview of your grooming status, membership tiers, and rewards.
                                </p>
                            </header>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-surface-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-6xl text-primary">stars</span>
                                    </div>
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Loyalty Points</h3>
                                    <p className="text-4xl font-black text-white">2,450</p>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-green-400 font-bold">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        <span>+150 last visit</span>
                                    </div>
                                </div>
                                <div className="bg-surface-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-6xl text-blue-500">savings</span>
                                    </div>
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Savings</h3>
                                    <p className="text-4xl font-black text-white">$120</p>
                                    <div className="mt-4 text-xs text-gray-500 font-medium">
                                        Lifetime membership value
                                    </div>
                                </div>
                                <div className="bg-surface-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-6xl text-purple-500">verified</span>
                                    </div>
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Member Status</h3>
                                    <p className="text-4xl font-black text-white">Elite</p>
                                    <div className="mt-4 w-full bg-white/10 rounded-full h-1.5">
                                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity / Next Up */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-surface-dark rounded-2xl p-8 border border-white/5">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">event_upcoming</span>
                                        Next Appointment
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-6 items-center bg-background-dark/50 p-6 rounded-2xl border border-white/5">
                                        <div className="flex flex-col items-center bg-white/5 p-4 rounded-xl min-w-[80px]">
                                            <span className="text-red-500 font-black text-xs uppercase tracking-widest mb-1">OCT</span>
                                            <span className="text-4xl font-black text-white tracking-tighter">24</span>
                                        </div>
                                        <div className="text-center sm:text-left flex-1">
                                            <p className="text-2xl font-black text-white uppercase tracking-tight">Classic Fade</p>
                                            <p className="text-gray-400 text-sm font-medium mb-1">with Jason Miller</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-2 text-primary text-xs font-bold uppercase tracking-wide">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                2:00 PM • 45 MIN
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex gap-4">
                                        <button className="flex-1 py-3 rounded-xl bg-white text-background-dark font-bold text-sm hover:bg-gray-200 transition-colors">View Details</button>
                                        <button className="flex-1 py-3 rounded-xl border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-colors">Manage</button>
                                    </div>
                                </div>

                                <div className="bg-surface-dark rounded-2xl p-8 border border-white/5">
                                    <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                                    <div className="space-y-6">
                                        {[
                                            { icon: "content_cut", color: "text-blue-400", title: "Haircut Completed", time: "2 days ago", points: "+50 pts" },
                                            { icon: "redeem", color: "text-primary", title: "Reward Redeemed", time: "1 week ago", points: "-500 pts" },
                                            { icon: "favorite", color: "text-red-500", title: "Review Posted", time: "2 weeks ago", points: "+75 pts" }
                                        ].map((activity, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className={`size-10 rounded-full bg-white/5 flex items-center justify-center ${activity.color}`}>
                                                    <span className="material-symbols-outlined text-xl">{activity.icon}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-bold text-sm">{activity.title}</p>
                                                    <p className="text-gray-500 text-xs">{activity.time}</p>
                                                </div>
                                                <span className="text-xs font-mono font-bold text-gray-400">{activity.points}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Referral Program (Moved from Settings) */}
                            <section className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-primary/10 dark:bg-gradient-to-r dark:from-[#2d1526] dark:to-[#4a1c35] rounded-2xl p-8 border border-primary/20 shadow-sm relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                                <div className="relative z-10 max-w-xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="material-symbols-outlined text-primary text-3xl">redeem</span>
                                        <h2 className="text-2xl font-black text-white">Refer &amp; Earn Discounts</h2>
                                    </div>
                                    <p className="text-gray-300 font-medium text-lg mb-6">
                                        Give friends <span className="text-primary font-bold">$10 off</span> their first cut, and receive <span className="text-primary font-bold">$10 credit</span> for each successful referral.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-3 bg-black/30 p-2 pl-5 rounded-xl border border-primary/20 backdrop-blur-sm">
                                            <span className="font-mono font-bold text-xl text-white tracking-[0.2em]">FRESHCUT</span>
                                            <button
                                                onClick={handleCopy}
                                                className="bg-primary hover:bg-primary/90 text-white p-2.5 rounded-lg transition-colors shadow-lg shadow-primary/20"
                                            >
                                                <span className="material-symbols-outlined text-xl">{copied ? 'check' : 'content_copy'}</span>
                                            </button>
                                        </div>
                                        <div className="hidden md:block h-px w-12 bg-white/10"></div>
                                        <div className="hidden md:flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-400">Your Progress</span>
                                            <span className="text-primary font-bold">2/5 Referrals</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-10 bg-surface-dark border border-white/10 p-4 rounded-xl rotate-3 shadow-2xl hidden lg:block">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-sm">person_add</span></div>
                                        <div><p className="text-xs text-white font-bold">New Referral</p><p className="text-[10px] text-gray-400">Just now</p></div>
                                    </div>
                                    <p className="text-xs text-green-400 font-bold">+ $10.00 Credit Added</p>
                                </div>
                            </section>
                        </>
                    ) : activeTab === 'bookings' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                                    My Bookings
                                </h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">
                                    Manage your upcoming appointments and view status.
                                </p>
                            </header>

                            <div className="space-y-6">
                                {[
                                    { status: "Confirmed", color: "emerald", date: "Oct 24", time: "2:00 PM", service: "Classic Fade Protocol", barber: "Jason Miller", price: "$50" },
                                    { status: "Pending", color: "yellow", date: "Nov 15", time: "4:30 PM", service: "Beard Sculpt & Trim", barber: "Sarah Jenkins", price: "$35" }
                                ].map((booking, i) => (
                                    <div key={i} className="bg-surface-dark rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row gap-6 md:items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-${booking.color}-500/10 text-${booking.color}-500 border-${booking.color}-500/20`}>
                                                    {booking.status}
                                                </span>
                                                <span className="text-gray-500 text-xs font-bold uppercase">{booking.date} @ {booking.time}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-1">{booking.service}</h3>
                                            <p className="text-gray-400 font-medium text-sm flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">person</span>
                                                {booking.barber}
                                            </p>
                                        </div>
                                        <div className="text-white font-black text-2xl md:text-right min-w-[80px]">{booking.price}</div>
                                        <div className="flex gap-3 md:flex-col lg:flex-row w-full md:w-auto">
                                            <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white text-background-dark font-bold text-xs uppercase tracking-wide hover:bg-gray-200 transition-colors">Reschedule</button>
                                            <button className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-white/10 text-white font-bold text-xs uppercase tracking-wide hover:bg-white/5 transition-colors">Cancel</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : activeTab === 'history' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                                    History
                                </h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">
                                    Your style archive. Rebook your favorites in seconds.
                                </p>
                            </header>

                            <div className="space-y-4">
                                {[
                                    { date: "Sep 10, 2024", service: "Full Service Cut", barber: "Mark D.", rating: 5, price: "$50" },
                                    { date: "Aug 15, 2024", service: "Beard Sculpt", barber: "Sarah J.", rating: 5, price: "$35" },
                                    { date: "Jul 22, 2024", service: "Quick Line-up", barber: "Jason M.", rating: 4, price: "$25" },
                                    { date: "Jun 01, 2024", service: "The Works", barber: "James K.", rating: 5, price: "$85" },
                                ].map((item, i) => (
                                    <div key={i} className="group bg-surface-dark/50 hover:bg-surface-dark border border-white/5 rounded-2xl p-6 transition-colors flex flex-col md:flex-row gap-6 items-center">
                                        <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">history</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between md:justify-start items-center gap-4 mb-1">
                                                <h4 className="text-white font-bold text-lg">{item.service}</h4>
                                                <div className="flex text-yellow-500 text-sm">
                                                    {[...Array(item.rating)].map((_, r) => <span key={r} className="material-symbols-outlined fill-1" style={{ fontSize: '14px' }}>star</span>)}
                                                </div>
                                            </div>
                                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">{item.date} • {item.barber}</p>
                                        </div>
                                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                            <span className="text-white font-black text-xl">{item.price}</span>
                                            <button className="px-5 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-bold text-xs uppercase tracking-wide hover:bg-primary hover:text-white transition-all">
                                                Rebook
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* My Reviews Section (Moved from Settings) */}
                            <div className="mt-10">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">rate_review</span>
                                    My Reviews
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="bg-surface-dark border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex text-yellow-400 gap-1">
                                                    {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined text-sm fill-1">star</span>)}
                                                </div>
                                                <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 uppercase font-bold">{i === 0 ? '2 days ago' : i === 1 ? '1 month ago' : '3 months ago'}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm leading-relaxed">"Great service! Best fade in the city hands down. The atmosphere is always top notch."</p>
                                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">JM</div>
                                                <span className="text-xs text-gray-400">Jason Miller</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'legal' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                                    Legal & Privacy Hub
                                </h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">
                                    Review our policies regarding your data, bookings, and service usage.
                                </p>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                {/* Inner Sidebar for Legal Nav */}
                                <div className="col-span-1 hidden lg:flex flex-col gap-2">
                                    {[
                                        { id: 'terms', label: 'Terms of Service', icon: 'description' },
                                        { id: 'privacy', label: 'Privacy Policy', icon: 'shield_person' },
                                        { id: 'cookies', label: 'Cookie Policy', icon: 'cookie' },
                                        { id: 'cancellation', label: 'Cancellation', icon: 'event_busy' }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveLegalTab(item.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeLegalTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                            <span className={`text-sm ${activeLegalTab === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Legal Content */}
                                <div className="col-span-1 lg:col-span-3 bg-surface-dark rounded-2xl p-8 border border-white/5">
                                    <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                                        <div>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 tracking-wider uppercase">
                                                Legal Document
                                            </div>
                                            <h2 className="text-3xl font-black text-white mb-2">
                                                {activeLegalTab === 'terms' && "Terms of Service"}
                                                {activeLegalTab === 'privacy' && "Privacy Policy"}
                                                {activeLegalTab === 'cookies' && "Cookie Policy"}
                                                {activeLegalTab === 'cancellation' && "Cancellation Policy"}
                                            </h2>
                                            <p className="text-gray-400 text-sm">
                                                Last updated: Oct 2023 • Ref: {activeLegalTab.toUpperCase()}-2023-V5
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="flex items-center justify-center size-10 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors" title="Print">
                                                <span className="material-symbols-outlined text-xl">print</span>
                                            </button>
                                            <button className="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" title="Download">
                                                <span className="material-symbols-outlined text-xl">download</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-12 text-gray-300 leading-relaxed min-h-[400px]">
                                        {activeLegalTab === 'terms' && (
                                            <>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">1.0</span>
                                                        Introduction
                                                    </h3>
                                                    <p className="mb-4">
                                                        Welcome to The Royal Cut. These Terms of Service ("Terms") govern your access to and use of our website, mobile application, and in-person grooming services.
                                                    </p>
                                                    <p>
                                                        By accessing our services, you confirm that you are at least 18 years of age or have legal parental/guardian consent.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">2.0</span>
                                                        Appointment Bookings
                                                    </h3>
                                                    <div className="bg-white/5 p-6 rounded-xl border-l-4 border-primary mb-4">
                                                        <h4 className="text-white font-bold mb-2 text-sm">2.1 Reservation System</h4>
                                                        <p className="text-sm">All services must be booked through our official online portal or verified mobile app. We do not accept bookings via third-party social media platforms.</p>
                                                    </div>
                                                    <p>
                                                        To secure a premium slot, a valid credit card must be kept on file. We reserve the right to verify the validity of the payment method before confirming any appointment.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">3.0</span>
                                                        Payment Terms
                                                    </h3>
                                                    <p className="mb-4">
                                                        Prices are subject to change without notice. Payment is due upon completion of the service. We accept all major credit cards, Apple Pay, and Google Pay. Cash payments are accepted but a credit card is still required for booking.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">4.0</span>
                                                        Liability Limitation
                                                    </h3>
                                                    <p className="mb-4">
                                                        The Royal Cut is not responsible for lost or stolen personal items. Our liability for any service-related claim is limited to the cost of the service provided.
                                                    </p>
                                                </section>
                                            </>
                                        )}

                                        {activeLegalTab === 'privacy' && (
                                            <>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">1.0</span>
                                                        Data Collection
                                                    </h3>
                                                    <p className="mb-4">
                                                        We collect information you provide directly to us, such as when you create an account, book an appointment, or communicate with us. This includes your name, email, phone number, payment information, and service preferences/history.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">2.0</span>
                                                        How We Use Your Data
                                                    </h3>
                                                    <ul className="list-disc pl-5 space-y-2">
                                                        <li>To provide, maintain, and improve our services and appointment scheduling.</li>
                                                        <li>To process transactions and send you related information, including confirmations and receipts.</li>
                                                        <li>To send you technical notices, updates, security alerts, and support messages.</li>
                                                        <li>To respond to your comments and questions.</li>
                                                    </ul>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">3.0</span>
                                                        Sharing of Information
                                                    </h3>
                                                    <p className="mb-4">
                                                        We do not sell your personal data. We may share your information with third-party vendors who need access to such information to carry out work on our behalf (e.g., payment processors, email service providers), subject to strict confidentiality obligations.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">4.0</span>
                                                        Your Rights
                                                    </h3>
                                                    <p className="mb-4">
                                                        You have the right to access, correct, or delete your personal information. You can manage your account settings directly in the app or contact support for assistance with data deletion requests.
                                                    </p>
                                                </section>
                                            </>
                                        )}

                                        {activeLegalTab === 'cookies' && (
                                            <>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">1.0</span>
                                                        What Are Cookies?
                                                    </h3>
                                                    <p className="mb-4">
                                                        Cookies are small data files stored on your device that help us improve our services and your experience, see which areas and features of our services are popular, and count visits.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">2.0</span>
                                                        Types of Cookies We Use
                                                    </h3>
                                                    <div className="space-y-4">
                                                        <div className="bg-white/5 p-4 rounded-lg">
                                                            <h4 className="font-bold text-white mb-1">Essential Cookies</h4>
                                                            <p className="text-sm">Necessary for the website to function. You cannot switch these off.</p>
                                                        </div>
                                                        <div className="bg-white/5 p-4 rounded-lg">
                                                            <h4 className="font-bold text-white mb-1">Analytics Cookies</h4>
                                                            <p className="text-sm">Allow us to count visits and traffic sources so we can measure and improve performance.</p>
                                                        </div>
                                                        <div className="bg-white/5 p-4 rounded-lg">
                                                            <h4 className="font-bold text-white mb-1">Marketing Cookies</h4>
                                                            <p className="text-sm">Used to track visitors across websites to display relevant ads.</p>
                                                        </div>
                                                    </div>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">3.0</span>
                                                        Managing Cookies
                                                    </h3>
                                                    <p className="mb-4">
                                                        Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies. Please note that removing or rejecting cookies could affect the availability and functionality of our services.
                                                    </p>
                                                </section>
                                            </>
                                        )}

                                        {activeLegalTab === 'cancellation' && (
                                            <>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">1.0</span>
                                                        24-Hour Notice
                                                    </h3>
                                                    <p className="mb-4">
                                                        We require at least 24 hours notice for any cancellation or rescheduling of appointments. This allows us the opportunity to offer the slot to another client.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">2.0</span>
                                                        Late Fees
                                                    </h3>
                                                    <p className="mb-4">
                                                        Cancellations made within 24 hours of the scheduled appointment will be subject to a fee equal to 50% of the reserved service amount. No-shows (failure to arrive without notice) will be charged 100% of the service price.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">3.0</span>
                                                        Emergency Exception
                                                    </h3>
                                                    <p className="mb-4">
                                                        We understand that life happens. Essential emergencies, severe weather conditions, and illness may be considered as valid reasons for late cancellations. Please contact our front desk immediately if you cannot make your appointment due to an emergency. Exceptions are made at the manager's discretion.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-primary font-mono mr-3 text-lg opacity-80">4.0</span>
                                                        Rebooking Policy
                                                    </h3>
                                                    <p className="mb-4">
                                                        Clients with repeated late cancellations or no-shows may be required to prepay 100% of their service fee at the time of booking for future appointments.
                                                    </p>
                                                </section>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="hidden"></div>
                    )}
                </div>
            </main>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100,100,100,0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(100,100,100,0.4); }
      `}</style>
        </div>
    );
}
