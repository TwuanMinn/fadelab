"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function ProfileSettingsPage() {
    const searchParams = useSearchParams();
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
        const tabParam = searchParams.get('tab');
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

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
        { id: "dashboard", label: "Dashboard", icon: "grid_view" },
        { id: "bookings", label: "My Bookings", icon: "calendar_month" },
        { id: "history", label: "Style History", icon: "history" },
        { id: "gallery", label: "Visual Archive", icon: "photo_library" },
        { id: "subscriptions", label: "Membership Plans", icon: "workspace_premium" },
        { id: "rewards", label: "Rewards & Status", icon: "stars" },
        { id: "payments", label: "Payment Methods", icon: "account_balance_wallet" },
        { id: "giftcards", label: "Gift Modules", icon: "redeem" },
        { id: "referrals", label: "Refer a Friend", icon: "group_add" },
        { id: "shop", label: "Lab Shop", icon: "shopping_bag" },
        { id: "preferences", label: "Service Vibe", icon: "tune" },
        { id: "settings", label: "Profile Settings", icon: "settings" },
        { id: "security", label: "Clearance & Auth", icon: "lock" },
        { id: "notifications", label: "Signal History", icon: "notifications" },
        { id: "legal", label: "Legal & Policies", icon: "policy" },
        { id: "help", label: "Help Center", icon: "help" },
    ];

    const timeOptions = [
        "Weekday Evenings", "Early Morning", "Lunch Break", "Fridays", "Weekends"
    ];

    return (
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display overflow-x-hidden min-h-screen flex flex-row transition-colors duration-300">
            {/* Side Navigation */}
            <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-white/10 bg-black/20 backdrop-blur-xl p-6 overflow-y-auto z-20 h-screen sticky top-0">
                <div className="flex flex-col gap-8">
                    {/* User Profile Summary */}
                    <div className="flex items-center gap-4 p-2 rounded-xl bg-[#1e293b]/50 backdrop-blur-md border border-white/5">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-lg ring-2 ring-blue-500/20"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY7i0hUIrYB7hfMD2NCDQ0fgkWk5BpB1gi1joR4vJV_ab3mDVRzTQUpoKBmLDHG-FJAkmYiaBw43z5DuK5OMQEUtBTwQQ8SZ-RvRABEz2zrKqph5UwEiLru1yAeLQ5guZovWkKzUIHVXkfxJzrhBAXRlmA_izSluXou2MHR7qBBWc89dCmFHO_TJskJuoQwPHBtkXIIXhNvoofdN8LlkxziZyFxUjZ38sTzlGdpLtSXipTUR90XuvwukMF902mwTgyM16nHUHoOb8k")',
                            }}
                        ></div>
                        <div className="flex flex-col">
                            <h2 className="text-base font-bold leading-tight">Alex Sterling</h2>
                            <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider">
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
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-2xl ${activeTab === item.id ? "fill-1" : "group-hover:text-blue-500 transition-colors"}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-sm ${activeTab === item.id ? "font-bold" : "font-medium group-hover:text-blue-500 transition-colors"}`}>
                                    {item.label}
                                </span>
                            </button>
                        ))}

                        <Link
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors group mt-4 w-full text-left"
                            href="/"
                        >
                            <span className="material-symbols-outlined text-2xl group-hover:text-blue-500 transition-colors">
                                home
                            </span>
                            <span className="text-sm font-medium group-hover:text-blue-500 transition-colors">
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
                            <Link href="/" className="bg-[#1e293b]/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                                <span className="material-symbols-outlined text-white">arrow_back</span>
                            </Link>
                            <span className="font-bold text-lg capitalize">{activeTab}</span>
                        </div>
                        <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-blue-500/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY7i0hUIrYB7hfMD2NCDQ0fgkWk5BpB1gi1joR4vJV_ab3mDVRzTQUpoKBmLDHG-FJAkmYiaBw43z5DuK5OMQEUtBTwQQ8SZ-RvRABEz2zrKqph5UwEiLru1yAeLQ5guZovWkKzUIHVXkfxJzrhBAXRlmA_izSluXou2MHR7qBBWc89dCmFHO_TJskJuoQwPHBtkXIIXhNvoofdN8LlkxziZyFxUjZ38sTzlGdpLtSXipTUR90XuvwukMF902mwTgyM16nHUHoOb8k")' }}></div>
                    </div>

                    {/* Content Area Based on Active Tab */}
                    {activeTab === 'gallery' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Visual Archive</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">A high-fidelity record of your styling evolution. Perspective, precision, and performance captures.</p>
                            </header>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    { id: 1, title: "Anatomical Fade", date: "Oct 24, 2023", barber: "Jason Miller", img: "https://images.unsplash.com/photo-1503951914875-befea74701c5?auto=format&fit=crop&q=80&w=800", tags: ["SHARP", "TEXTURE"] },
                                    { id: 2, title: "Beard Sculpt Matrix", date: "Sep 12, 2023", barber: "Sarah Jenkins", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800", tags: ["LINED", "OIL"] },
                                    { id: 3, title: "Classic Pompadour", date: "Aug 05, 2023", barber: "Mark Davis", img: "https://images.unsplash.com/photo-1599351431202-6e0000a4dbe1?auto=format&fit=crop&q=80&w=800", tags: ["GLOSS", "CLASSIC"] },
                                    { id: 4, title: "Modern Slick Back", date: "Jul 18, 2023", barber: "James K.", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800", tags: ["CLEAN", "ELITE"] },
                                ].map(item => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ y: -10 }}
                                        className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden group cursor-pointer"
                                    >
                                        <div className="aspect-[4/5] relative overflow-hidden">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${item.img}')` }} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                            <div className="absolute top-6 right-6 flex gap-2">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-[8px] font-black text-white uppercase tracking-widest">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1 italic">{item.title}</h3>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.date} • {item.barber}</p>
                                                </div>
                                            </div>
                                            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-white font-black text-[9px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:border-blue-500 transition-all">Rebook This Look</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : activeTab === 'subscriptions' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Membership Plans</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Access curated grooming protocols and priority clearance levels.</p>
                            </header>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { name: "Standby", price: "$0", desc: "Basic tactical grooming", features: ["Online Booking", "History Archive", "Basic Rewards"], active: false },
                                    { name: "Elite", price: "$45", desc: "Priority execution protocol", features: ["2 Priority Cuts / Mo", "Scalp Massage Matrix", "10% Product Discount", "Unlimited Wash & Style"], active: true },
                                    { name: "Legendary", price: "$85", desc: "Absolute style dominance", features: ["4 Priority Cuts / Mo", "Full Facial Treatment", "20% Product Discount", "VIP Event Access", "Dedicated Concierge"], active: false }
                                ].map(plan => (
                                    <div
                                        key={plan.name}
                                        className={`flex flex-col p-10 rounded-[3rem] border transition-all duration-500 ${plan.active ? 'bg-blue-600/10 border-blue-500 shadow-2xl shadow-blue-500/10' : 'bg-[#1e293b]/50 border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex justify-between items-start mb-8">
                                            <h3 className="text-2xl font-black text-white uppercase italic">{plan.name}</h3>
                                            {plan.active && <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Active Plan</span>}
                                        </div>
                                        <div className="flex items-baseline gap-2 mb-8">
                                            <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                                            <span className="text-gray-500 font-bold text-xs uppercase">/ month</span>
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium mb-10">{plan.desc}</p>
                                        <ul className="flex flex-col gap-4 mb-12 flex-1">
                                            {plan.features.map(f => (
                                                <li key={f} className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                                    <span className="material-symbols-outlined text-blue-500 text-lg">check_circle</span>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${plan.active ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'}`}>
                                            {plan.active ? 'Manage Plan' : 'Initiate Upgrade'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : activeTab === 'giftcards' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Gift Modules</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Deploy style credits to your tactical network. Digital transmission or physical deployment.</p>
                            </header>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-8 space-y-8">
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl">
                                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform">
                                            <span className="material-symbols-outlined text-[150px]">redeem</span>
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] mb-8">Active Credit Vector</p>
                                            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">$150.00</h2>
                                            <p className="text-white font-bold text-sm tracking-widest uppercase">FADELAB-GIFT-VAL-092x</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5">
                                        <h3 className="text-white font-black uppercase text-sm mb-6 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-500">history</span>
                                            Transmission History
                                        </h3>
                                        <div className="space-y-4">
                                            {[
                                                { to: "Michael S.", val: "$50.00", status: "Delivered", date: "Sep 20" },
                                                { to: "Chris P.", val: "$100.00", status: "Active", date: "Oct 02" }
                                            ].map((g, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                                    <div>
                                                        <p className="text-white font-bold text-sm">To: {g.to}</p>
                                                        <p className="text-[10px] text-gray-500 font-bold uppercase">{g.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-white font-black">{g.val}</p>
                                                        <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest">{g.status}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 h-fit">
                                    <h3 className="text-white font-black uppercase text-sm mb-8 italic">New Transmission</h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-2">Amount</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['$25', '$50', '$100', 'Custom'].map(v => (
                                                    <button key={v} className="py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white hover:text-black transition-all">{v}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-2">Recipient Matrix</label>
                                            <input type="email" placeholder="Input target email..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-800" />
                                        </div>
                                        <button className="w-full py-5 bg-blue-600 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-all">Initiate Deployment</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'preferences' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Service Vibe</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Calibrate your in-chair atmosphere. These parameters are deployed to the specialist terminal upon your arrival.</p>
                            </header>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section className="p-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5">
                                    <h3 className="text-white font-black uppercase text-sm mb-8 flex items-center gap-3 italic">
                                        <span className="material-symbols-outlined text-blue-500">graphic_eq</span>
                                        Auditory Matrix
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { id: 'lofi', label: 'Lo-Fi / Beats', sub: 'Low intensity atmospheric' },
                                            { id: 'jazz', label: 'Jazz / Blues', sub: 'Classic barbershop vibe' },
                                            { id: 'techno', label: 'Minimal / Deep', sub: 'High focus energy' },
                                            { id: 'silence', label: 'Zero Signal', sub: 'No music during session' }
                                        ].map(vibe => (
                                            <button key={vibe.id} className="w-full p-6 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl flex items-center justify-between group transition-all">
                                                <div className="text-left">
                                                    <p className="text-white font-bold text-sm uppercase">{vibe.label}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase">{vibe.sub}</p>
                                                </div>
                                                <div className="size-4 rounded-full border-2 border-white/10 group-hover:border-blue-500 transition-colors"></div>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                                <section className="p-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5">
                                    <h3 className="text-white font-black uppercase text-sm mb-8 flex items-center gap-3 italic">
                                        <span className="material-symbols-outlined text-blue-500">coffee</span>
                                        Refreshment protocol
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { label: 'Black Coffee', icon: 'coffee' },
                                            { label: 'Sparkling Water', icon: 'water_drop' },
                                            { label: 'Craft Brew', icon: 'sports_bar' },
                                            { label: 'Refuse Refreshment', icon: 'block' }
                                        ].map(item => (
                                            <button key={item.label} className="flex items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-blue-600/10 hover:border-blue-500/30 transition-all text-left group">
                                                <span className="material-symbols-outlined text-gray-500 group-hover:text-blue-500 transition-colors">{item.icon}</span>
                                                <span className="text-white font-black uppercase text-xs tracking-widest">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                                <section className="md:col-span-2 p-10 bg-blue-600/10 border border-blue-500/20 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Social Interaction Level</h3>
                                        <p className="text-gray-400 text-sm font-medium">Define the conversational depth for your session.</p>
                                    </div>
                                    <div className="flex bg-black/40 p-2 rounded-2xl border border-white/10">
                                        {['Quiet', 'Moderate', 'Chatty'].map(level => (
                                            <button key={level} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${level === 'Moderate' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:text-white'}`}>{level}</button>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </>
                    ) : activeTab === 'security' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Clearance & Auth</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">High-level encryption controls and terminal access logs. Keep your profile secured.</p>
                            </header>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-12">
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center gap-6 mb-8">
                                        <div className="size-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                                            <span className="material-symbols-outlined font-black">shield_person</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-sm uppercase tracking-tight">Biometric Shield Active</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Your data is synced with end-to-end multi-vector encryption.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-8 space-y-6">
                                    <div className="p-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5">
                                        <h3 className="text-white font-black uppercase text-sm mb-8 italic">Active Access Sessions</h3>
                                        <div className="space-y-4">
                                            {[
                                                { device: "MacBook Pro M3", loc: "New York, US", ip: "192.168.1.1", active: true },
                                                { device: "iPhone 15 Pro", loc: "New York, US", ip: "172.16.0.4", active: false }
                                            ].map((session, i) => (
                                                <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group">
                                                    <div className="flex items-center gap-6">
                                                        <span className="material-symbols-outlined text-gray-500 text-3xl group-hover:text-blue-500 transition-colors">{session.device.includes('iPhone') ? 'smartphone' : 'laptop_mac'}</span>
                                                        <div>
                                                            <p className="text-white font-bold text-sm tracking-tight">{session.device}</p>
                                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{session.loc} • IP: {session.ip}</p>
                                                        </div>
                                                    </div>
                                                    {session.active ? (
                                                        <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">Current</span>
                                                    ) : (
                                                        <button className="text-[9px] font-black text-red-500 hover:text-white transition-colors uppercase tracking-widest">Terminate</button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 space-y-6">
                                    <div className="p-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5">
                                        <h3 className="text-white font-black uppercase text-sm mb-8 italic">Auth Toggles</h3>
                                        <div className="space-y-6">
                                            {[
                                                { label: "2-Factor Vector", active: true },
                                                { label: "Biometric Link", active: false },
                                                { label: "Session Alert", active: true }
                                            ].map(t => (
                                                <div key={t.label} className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-white uppercase">{t.label}</span>
                                                    <div className={`w-12 h-6 rounded-full relative p-1 transition-colors cursor-pointer ${t.active ? 'bg-blue-600' : 'bg-white/10'}`}>
                                                        <div className={`size-4 bg-white rounded-full transition-transform ${t.active ? 'translate-x-6' : 'translate-x-0'}`} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-8 bg-red-600/5 border border-red-600/10 rounded-[2.5rem] text-center">
                                        <p className="text-[10px] text-red-500/60 font-black uppercase tracking-[0.2em] mb-4">Critical Action</p>
                                        <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-600/10">Purge Acccount Matrix</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'notifications' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Signal History</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Full transmission log of all tactical session alerts and system protocols.</p>
                            </header>
                            <div className="space-y-4">
                                {[
                                    { type: 'confirm', label: 'Session Confirmed', desc: 'Protocol #BK-7782 validated for Oct 24.', time: '2m ago', active: true },
                                    { type: 'payment', label: 'Payment Success', desc: 'Settlement for FadeLab Elite Plan processed.', time: '1h ago', active: false },
                                    { type: 'security', label: 'New Access Vector', desc: 'Login detected from MacBook Pro M3 in NY.', time: '4h ago', active: false },
                                    { type: 'promo', label: 'Reward Unlocked', desc: 'You are now 500pts away from Legendary status.', time: '1d ago', active: false },
                                ].map((n, i) => (
                                    <div key={i} className={`p-6 rounded-2xl border transition-all flex gap-6 items-start ${n.active ? 'bg-blue-600/10 border-blue-500/30' : 'bg-white/5 border-white/5 opacity-70 hover:opacity-100'}`}>
                                        <div className={`size-10 rounded-full flex items-center justify-center ${n.type === 'confirm' ? 'bg-emerald-500/20 text-emerald-500' : n.type === 'payment' ? 'bg-blue-500/20 text-blue-500' : n.type === 'security' ? 'bg-red-500/20 text-red-500' : 'bg-purple-500/20 text-purple-500'}`}>
                                            <span className="material-symbols-outlined text-xl">
                                                {n.type === 'confirm' ? 'check_circle' : n.type === 'payment' ? 'account_balance_wallet' : n.type === 'security' ? 'security' : 'stars'}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-white font-black uppercase text-xs tracking-tight">{n.label}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">{n.time}</p>
                                            </div>
                                            <p className="text-gray-400 text-xs font-medium">{n.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : activeTab === 'referrals' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Referral Protocol</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Expand the network and earn session credits for every successful deployment.</p>
                            </header>
                            <div className="p-10 bg-blue-600/10 border border-blue-500/20 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="max-w-md">
                                    <h3 className="text-2xl font-black text-white uppercase italic mb-4">Tactical Invite Matrix</h3>
                                    <p className="text-gray-400 mb-8 font-medium italic select-none">Share your unique clearance code. When they book, you both receive $15 in protocol credits.</p>
                                    <div className="flex items-center gap-4 bg-black/40 p-2 pl-6 rounded-2xl border border-white/10">
                                        <span className="font-mono text-xl font-black text-white tracking-[0.3em]">FADE-ALEX-01</span>
                                        <button className="bg-blue-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Copy</button>
                                    </div>
                                </div>
                                <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 w-full md:w-80">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6">Network Growth</p>
                                    <div className="flex justify-between items-end mb-4">
                                        <p className="text-3xl font-black text-white">4</p>
                                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-1">+2 This Month</p>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-4">
                                        <div className="h-full bg-blue-600 w-[80%] shadow-glow-blue"></div>
                                    </div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">1 more for Legendary Status</p>
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'shop' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Lab Shop</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Professional grade styling tools and anatomical care products.</p>
                            </header>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { name: "Matte Clay Matrix", price: "$24", img: "https://images.unsplash.com/photo-1590439471364-192aa70c7c53?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Beard Oil Vector-01", price: "$18", img: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=400" },
                                    { name: "High-Gloss Fiber", price: "$22", img: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Scalp Detox Serum", price: "$32", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Precision Razor", price: "$45", img: "https://images.unsplash.com/photo-1599351431202-6e0000a4dbe1?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Clear Shave Gel", price: "$15", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Menthol Shampoo", price: "$28", img: "https://images.unsplash.com/photo-1506003094569-70183d29385b?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Cologne Vector-08", price: "$85", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Carbon Fiber Comb", price: "$22", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Titanium Scissors", price: "$65", img: "https://images.unsplash.com/photo-1503951914875-befea74701c5?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Exfoliating Scrub", price: "$34", img: "https://images.unsplash.com/photo-1542382257-80dee9ad74b6?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Growth Serum", price: "$48", img: "https://images.unsplash.com/photo-1554372702-0ca73e9f4c3c?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Beard Balm Prime", price: "$24", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400" },
                                    { name: "Aloe Conditioner", price: "$26", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400" }
                                ].map(p => (
                                    <div key={p.name} className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden group hover:border-blue-500/30 transition-all">
                                        <div className="aspect-square bg-white/5 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${p.img}')` }} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <button className="absolute bottom-4 right-4 size-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">
                                                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                                            </button>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-1 italic">{p.name}</h3>
                                            <p className="text-blue-500 font-black text-lg">{p.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : activeTab === 'rewards' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Rewards & Status</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Manage your loyalty points and unlock exclusive member benefits.</p>
                            </header>
                            <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-10 flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-6xl text-blue-500 mb-4">military_tech</span>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Elite Status Module</h2>
                                <p className="text-gray-400 max-w-md mb-8">You are 500 points away from reaching 'Legendary' status which unlocks 20% off all sessions.</p>
                                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                                    <div className="h-full bg-blue-500 w-[75%] shadow-glow"></div>
                                </div>
                                <button className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors">Redeem Points</button>
                            </div>
                        </>
                    ) : activeTab === 'payments' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Payment Methods</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Securely manage your archived cards and settlement protocols.</p>
                            </header>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="size-12 bg-white/10 rounded-xl flex items-center justify-center font-bold italic">VISA</div>
                                        <span className="text-[10px] font-black text-blue-500 bg-blue-600/10 px-3 py-1 rounded-full uppercase">Archived</span>
                                    </div>
                                    <p className="text-2xl font-black tracking-[0.2em] text-white mb-2">•••• •••• •••• 4242</p>
                                    <div className="flex justify-between items-end">
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Alex Sterling</p>
                                        <p className="font-mono text-sm text-white">12/25</p>
                                    </div>
                                </div>
                                <button className="border-2 border-dashed border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 text-gray-500 hover:text-blue-500 hover:border-blue-500/50 transition-all">
                                    <span className="material-symbols-outlined text-4xl">add_card</span>
                                    <span className="font-black text-xs uppercase tracking-widest">Connect New Vector</span>
                                </button>
                            </div>
                        </>
                    ) : activeTab === 'help' ? (
                        <>
                            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Help Center</h1>
                                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Technical support and session troubleshooting terminal.</p>
                            </header>
                            <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-4 mb-8 border border-white/5 flex items-center gap-4">
                                <span className="material-symbols-outlined text-gray-500 ml-4">search</span>
                                <input type="text" placeholder="Search support archive..." className="flex-1 bg-transparent border-none focus:outline-none text-white font-bold text-sm py-4" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6 pl-2">Top Solutions</h3>
                                    {[
                                        "How do I cancel my Elite protocol?",
                                        "Can I change my specialist after booking?",
                                        "Where do I find my styling history?",
                                        "Is the Lab Shop available for international shipping?"
                                    ].map(q => (
                                        <button key={q} className="w-full text-left p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all group flex justify-between items-center">
                                            <span className="text-gray-300 font-bold text-sm">{q}</span>
                                            <span className="material-symbols-outlined text-gray-700 group-hover:text-blue-500 transition-colors">chevron_right</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="space-y-8">
                                    <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-[3rem] relative overflow-hidden group">
                                        <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:rotate-12 transition-transform">
                                            <span className="material-symbols-outlined text-[120px]">support_agent</span>
                                        </div>
                                        <h3 className="text-xl font-black text-white uppercase italic mb-2">Live Specialist</h3>
                                        <p className="text-gray-400 text-sm mb-6 max-w-[200px]">Real-time encrypted connection to our support network.</p>
                                        <button className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all">Initiate Link</button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: 'mail', label: 'Email Archive' },
                                            { icon: 'terminal', label: 'Discord Node' }
                                        ].map(s => (
                                            <div key={s.label} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 cursor-pointer transition-all">
                                                <span className="material-symbols-outlined text-blue-500 mb-2">{s.icon}</span>
                                                <span className="text-[10px] font-black text-white uppercase tracking-tighter">{s.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'settings' ? (
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
                                <section className="col-span-1 lg:col-span-8 flex flex-col bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 lg:p-8 shadow-sm border border-white/5">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                        <span className="material-symbols-outlined text-blue-500 text-3xl">badge</span>
                                        <h2 className="text-xl font-bold">Personal Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                            <input type="text" defaultValue="Alex Sterling" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                            <input type="tel" defaultValue="(555) 123-4567" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-colors" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                            <input type="email" defaultValue="alex.sterling@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-colors" />
                                        </div>
                                    </div>
                                </section>

                                {/* 2. Notification Settings (Moved) */}
                                <section className="col-span-1 lg:col-span-4 flex flex-col bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 shadow-sm border border-white/5">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="material-symbols-outlined text-blue-500 text-2xl">notifications_active</span>
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
                                                    className={`relative w-11 h-6 rounded-full transition-colors ${notificationPreferences[item.id as keyof typeof notificationPreferences] ? 'bg-blue-600' : 'bg-white/10'}`}
                                                >
                                                    <span className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${notificationPreferences[item.id as keyof typeof notificationPreferences] ? 'translate-x-full' : 'translate-x-0'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* 3. Booking Preferences (Existing) */}
                                <section className="col-span-1 lg:col-span-8 flex flex-col bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 lg:p-8 shadow-sm border border-white/5">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                        <span className="material-symbols-outlined text-blue-500 text-3xl">content_cut</span>
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
                                                                className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 opacity-100 blur-sm"
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                    <div
                                                        className={`relative size-20 rounded-full border-4 bg-cover bg-center transition-all duration-300 ${selectedBarber === barber.id
                                                            ? "border-transparent grayscale-0"
                                                            : "border-transparent grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                                                            }`}
                                                        style={{ backgroundImage: `url('${barber.img}')` }}
                                                    ></div>
                                                    <span className={`text-sm font-bold transition-colors ${selectedBarber === barber.id ? "text-blue-500" : "text-gray-400 group-hover:text-white"}`}>
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
                                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
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
                                <section className="col-span-1 lg:col-span-4 flex flex-col bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 lg:p-8 shadow-sm h-full border border-white/5">
                                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-blue-500 text-3xl">account_balance_wallet</span>
                                            <h2 className="text-xl font-bold">Wallet</h2>
                                        </div>
                                        <button className="text-blue-500 hover:text-blue-500/80 transition-colors">
                                            <span className="material-symbols-outlined">add_circle</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-1">
                                        <div className="relative group p-4 rounded-xl bg-gradient-to-br from-slate-800 to-black border border-white/10 text-white shadow-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
                                            <div className="absolute right-0 top-0 p-3 opacity-20"><span className="material-symbols-outlined text-6xl">credit_card</span></div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="bg-white/20 p-1.5 rounded w-12 h-8 flex items-center justify-center"><span className="text-xs font-bold italic">VISA</span></div>
                                                <span className="bg-blue-600/20 text-blue-500 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-500/30">DEFAULT</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col"><p className="text-xs text-slate-400 mb-1">Card Number</p><p className="font-mono text-lg tracking-wider">•••• 4242</p></div>
                                                <div className="flex flex-col text-right"><p className="text-xs text-slate-400 mb-1">Expires</p><p className="font-mono text-sm">12/25</p></div>
                                            </div>
                                        </div>
                                        <button className="mt-auto w-full py-3 rounded-xl border-2 border-dashed border-white/20 text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all font-medium flex items-center justify-center gap-2 group">
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
                                    className="bg-blue-600 hover:bg-blue-600/90 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-500/40 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                                <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-6xl text-blue-500">stars</span>
                                    </div>
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Loyalty Points</h3>
                                    <p className="text-4xl font-black text-white">2,450</p>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-green-400 font-bold">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        <span>+150 last visit</span>
                                    </div>
                                </div>
                                <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-6xl text-blue-500">savings</span>
                                    </div>
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Savings</h3>
                                    <p className="text-4xl font-black text-white">$120</p>
                                    <div className="mt-4 text-xs text-gray-500 font-medium">
                                        Lifetime membership value
                                    </div>
                                </div>
                                <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
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
                                {/* Next Appointment Card - Premium Redesign */}
                                <div className="group relative bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-1 border border-white/5 overflow-hidden transition-all hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.3rem] p-8 h-full relative z-10 flex flex-col">
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                    Confirmed
                                                </div>
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tight italic">
                                                    Classic Fade <br /> Protocol
                                                </h3>
                                            </div>
                                            <div className="flex flex-col items-center bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                                                <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">OCT</span>
                                                <span className="text-4xl font-black text-white tracking-tighter leading-none">24</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mb-8 bg-black/40 p-4 rounded-2xl border border-white/5">
                                            <div
                                                className="size-12 rounded-full bg-cover bg-center ring-2 ring-white/10"
                                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2")' }}
                                            ></div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Execution By</p>
                                                <p className="text-sm font-bold text-white">Jason Miller</p>
                                            </div>
                                            <div className="h-8 w-px bg-white/10 mx-2"></div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Time</p>
                                                <p className="text-sm font-bold text-white">2:00 PM</p>
                                            </div>
                                        </div>

                                        <div className="mt-auto flex gap-3">
                                            <Link
                                                href="/profile?tab=bookings"
                                                className="flex-1 py-4 rounded-xl bg-white text-background-dark font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group/btn shadow-lg"
                                            >
                                                View Details
                                                <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                            </Link>
                                            <button className="size-14 rounded-xl border border-white/10 text-white flex items-center justify-center hover:bg-white/5 hover:text-blue-500 transition-all group/icon">
                                                <span className="material-symbols-outlined text-xl group-hover/icon:rotate-90 transition-transform">settings</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity - Modern Timeline */}
                                <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden">
                                    <div className="flex justify-between items-end mb-8 relative z-10">
                                        <div>
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Recent Activity</h3>
                                            <p className="text-gray-500 text-xs font-medium">Your latest moves at FadeLab.</p>
                                        </div>
                                        <button className="text-blue-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                                            View All
                                        </button>
                                    </div>

                                    <div className="space-y-0 relative z-10">
                                        {/* Timeline Line */}
                                        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/5 -z-10"></div>

                                        {[
                                            { icon: "content_cut", color: "text-blue-400", bg: "bg-blue-400/10", title: "Haircut Completed", time: "2 days ago", points: "+50 pts" },
                                            { icon: "redeem", color: "text-blue-500", bg: "bg-blue-600/10", title: "Reward Redeemed", time: "1 week ago", points: "-500 pts" },
                                            { icon: "favorite", color: "text-red-500", bg: "bg-red-500/10", title: "Review Posted", time: "2 weeks ago", points: "+75 pts" }
                                        ].map((activity, i) => (
                                            <div key={i} className="flex gap-4 py-4 group cursor-default">
                                                <div className={`size-10 rounded-full ${activity.bg} flex items-center justify-center ${activity.color} ring-4 ring-surface-dark z-10 relative group-hover:scale-110 transition-transform`}>
                                                    <span className="material-symbols-outlined text-lg">{activity.icon}</span>
                                                </div>
                                                <div className="flex-1 bg-white/[0.02] p-4 rounded-2xl border border-white/5 group-hover:bg-white/[0.04] transition-colors">
                                                    <div className="flex justify-between items-start">
                                                        <p className="text-white font-bold text-sm">{activity.title}</p>
                                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{activity.time}</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <span className="text-xs font-mono font-bold text-blue-500 bg-blue-600/10 px-2 py-1 rounded-md border border-blue-500/20">{activity.points}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Analytics Matrix - NEW */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5">
                                    <h3 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-8 italic">Grooming Frequency Matrix</h3>
                                    <div className="flex items-end justify-between h-32 gap-3">
                                        {[40, 70, 45, 90, 65, 80, 50, 60, 85, 40, 75, 95].map((h, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                                <div className="w-full bg-white/5 rounded-t-xl relative overflow-hidden h-full">
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${h}%` }}
                                                        transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
                                                        className="absolute bottom-0 inset-x-0 bg-blue-600/40 group-hover:bg-blue-500 transition-colors"
                                                    />
                                                </div>
                                                <span className="text-[8px] font-black text-gray-600 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:col-span-4 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10">
                                        <span className="material-symbols-outlined text-4xl text-blue-500 mb-4 animate-pulse">analytics</span>
                                        <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-2">Style Consistency</h3>
                                        <p className="text-5xl font-black text-white italic tracking-tighter mb-1">94%</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Top 2% of Global Members</p>
                                    </div>
                                </div>
                            </div>


                            {/* Referral Program (Moved from Settings) */}
                            <section className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-blue-600/10 dark:bg-gradient-to-r dark:from-[#2d1526] dark:to-[#4a1c35] rounded-2xl p-8 border border-blue-500/20 shadow-sm relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl opacity-50"></div>
                                <div className="relative z-10 max-w-xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="material-symbols-outlined text-blue-500 text-3xl">redeem</span>
                                        <h2 className="text-2xl font-black text-white">Refer &amp; Earn Discounts</h2>
                                    </div>
                                    <p className="text-gray-300 font-medium text-lg mb-6">
                                        Give friends <span className="text-blue-500 font-bold">$10 off</span> their first cut, and receive <span className="text-blue-500 font-bold">$10 credit</span> for each successful referral.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-3 bg-black/30 p-2 pl-5 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                                            <span className="font-mono font-bold text-xl text-white tracking-[0.2em]">FRESHCUT</span>
                                            <button
                                                onClick={handleCopy}
                                                className="bg-blue-600 hover:bg-blue-600/90 text-white p-2.5 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                                            >
                                                <span className="material-symbols-outlined text-xl">{copied ? 'check' : 'content_copy'}</span>
                                            </button>
                                        </div>
                                        <div className="hidden md:block h-px w-12 bg-white/10"></div>
                                        <div className="hidden md:flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-400">Your Progress</span>
                                            <span className="text-blue-500 font-bold">2/5 Referrals</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-10 bg-[#1e293b]/50 backdrop-blur-md border border-white/10 p-4 rounded-xl rotate-3 shadow-2xl hidden lg:block">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="size-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500"><span className="material-symbols-outlined text-sm">person_add</span></div>
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

                            <div className="space-y-8">
                                {[
                                    {
                                        status: "Confirmed",
                                        color: "emerald",
                                        dateObj: { m: "OCT", d: "24", w: "Thursday" },
                                        time: "2:00 PM",
                                        duration: "45 MIN",
                                        service: "Classic Fade Protocol",
                                        barber: "Jason Miller",
                                        barberImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2",
                                        price: "$50.00",
                                        ref: "BK-7782"
                                    },
                                    {
                                        status: "Pending",
                                        color: "yellow",
                                        dateObj: { m: "NOV", d: "15", w: "Friday" },
                                        time: "4:30 PM",
                                        duration: "30 MIN",
                                        service: "Beard Sculpt & Trim",
                                        barber: "Sarah Jenkins",
                                        barberImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaqYTQ5iC-pnGpVWKxQpRXxr_AZWQhYEuNUwSUm6ikdl8MzxV2SJmWwg5dw8aWba3tE6DGHvEVgmRKwdDIEcUAauYz1OyutyGvfV8bixJY1zdwdgoyI1UrRBCczmEBAtaTDuBKp3gvot_bOjRyDPheTQc-yjy4r1KEx6tizTS4u2Ksn91p7KXL8dfY03pt8bn7OFFMOTGTe0VzPpRqE4aMqB-8VJmJFC8UsOktum2kJYRApkmcCxjBzcs5NYavw5s2gUz4tLyvYAE0",
                                        price: "$35.00",
                                        ref: "BK-8821"
                                    }
                                ].map((booking, i) => (
                                    <div key={i} className="group relative bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5">
                                        {/* Background Detail */}
                                        <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                            <span className="material-symbols-outlined text-[180px] text-white">calendar_clock</span>
                                        </div>

                                        <div className="relative p-8 lg:p-10 flex flex-col md:flex-row gap-8 z-10">
                                            {/* Date Widget */}
                                            <div className="flex flex-col items-center justify-center bg-white/5 rounded-3xl p-6 min-w-[120px] border border-white/5 backdrop-blur-sm self-start">
                                                <span className="text-red-500 font-black text-xs uppercase tracking-[0.3em] mb-1">{booking.dateObj.m}</span>
                                                <span className="text-5xl font-black text-white tracking-tighter mb-1">{booking.dateObj.d}</span>
                                                <span className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">{booking.dateObj.w}</span>
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 flex flex-col justify-center gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] bg-${booking.color}-500/10 text-${booking.color}-500 border border-${booking.color}-500/20 flex items-center gap-2 shadow-glow-${booking.color}`}>
                                                        <span className={`size-1.5 rounded-full bg-${booking.color}-500 animate-pulse`}></span>
                                                        {booking.status}
                                                    </div>
                                                    <span className="text-white/10 text-[10px] font-bold uppercase tracking-widest">•</span>
                                                    <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Ref: #{booking.ref}</span>
                                                </div>

                                                <div>
                                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight italic group-hover:text-blue-500 transition-colors duration-300">
                                                        {booking.service}
                                                    </h3>
                                                    <div className="h-1 w-12 bg-blue-600/20 mt-3 rounded-full group-hover:w-24 group-hover:bg-blue-600 transition-all duration-500" />
                                                </div>

                                                <div className="flex flex-wrap items-center gap-6 mt-2">
                                                    <div className="flex items-center gap-3 bg-white/5 py-2 px-3 rounded-xl border border-white/5">
                                                        <div
                                                            className="size-8 rounded-full bg-cover bg-center ring-2 ring-white/10"
                                                            style={{ backgroundImage: `url('${booking.barberImg}')` }}
                                                        />
                                                        <div>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Specialist</p>
                                                            <p className="text-xs font-bold text-white">{booking.barber}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 bg-white/5 py-2 px-3 rounded-xl border border-white/5">
                                                        <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-blue-500">
                                                            <span className="material-symbols-outlined text-lg">schedule</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Execution Time</p>
                                                            <p className="text-xs font-bold text-white">{booking.time} ({booking.duration})</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price & Quick Actions */}
                                            <div className="flex flex-col justify-between items-end gap-6 pl-8 border-l border-white/5">
                                                <div className="text-right">
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Value</p>
                                                    <span className="text-4xl font-black text-white tracking-tighter">{booking.price}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => alert("Added to calendar")}
                                                        title="Add to Calendar"
                                                        className="size-12 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all border border-white/10 group/btn shadow-xl"
                                                    >
                                                        <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">edit_calendar</span>
                                                    </button>
                                                    <button
                                                        onClick={() => window.open("https://maps.google.com", "_blank")}
                                                        title="Get Directions"
                                                        className="size-12 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all border border-white/10 group/btn shadow-xl"
                                                    >
                                                        <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">directions</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText("Check out my booking at FadeLab!");
                                                            alert("Link copied to clipboard");
                                                        }}
                                                        title="Share"
                                                        className="size-12 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all border border-white/10 group/btn shadow-xl"
                                                    >
                                                        <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">ios_share</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Footer */}
                                        <div className="relative z-10 bg-black/40 backdrop-blur-md p-4 flex gap-4 md:pl-[170px] border-t border-white/5">
                                            <Link
                                                href={`/checkout?reschedule=${booking.ref}`}
                                                className="flex-1 py-4 rounded-xl bg-white text-background-dark font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 group/act shadow-lg hover:shadow-white/20"
                                            >
                                                <span className="material-symbols-outlined text-lg group-hover/act:-rotate-12 transition-transform">edit_square</span>
                                                Modify Session
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to cancel this appointment?")) {
                                                        alert("Booking cancelled successfully.");
                                                    }
                                                }}
                                                className="flex-1 py-4 rounded-xl border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-colors flex items-center justify-center gap-3 group/act"
                                            >
                                                <span className="material-symbols-outlined text-lg">cancel</span>
                                                Cancel Protocol
                                            </button>
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
                                    <div key={i} className="group bg-[#1e293b]/30 backdrop-blur-md hover:bg-[#1e293b]/60 border border-white/5 rounded-2xl p-6 transition-colors flex flex-col md:flex-row gap-6 items-center">
                                        <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-blue-500 transition-colors">
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
                                            <button className="px-5 py-2 rounded-lg bg-blue-600/10 text-blue-500 border border-blue-500/20 font-bold text-xs uppercase tracking-wide hover:bg-blue-600 hover:text-white transition-all">
                                                Rebook
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* My Reviews Section (Moved from Settings) */}
                            <div className="mt-10">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500">rate_review</span>
                                    My Reviews
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="bg-[#1e293b]/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex text-yellow-400 gap-1">
                                                    {[1, 2, 3, 4, 5].map(s => <span key={s} className="material-symbols-outlined text-sm fill-1">star</span>)}
                                                </div>
                                                <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 uppercase font-bold">{i === 0 ? '2 days ago' : i === 1 ? '1 month ago' : '3 months ago'}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm leading-relaxed">"Great service! Best fade in the city hands down. The atmosphere is always top notch."</p>
                                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 text-[10px] font-bold">JM</div>
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
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeLegalTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                            <span className={`text-sm ${activeLegalTab === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Legal Content */}
                                <div className="col-span-1 lg:col-span-3 bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-8 border border-white/5">
                                    <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                                        <div>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/10 text-blue-500 text-xs font-bold mb-4 tracking-wider uppercase">
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
                                            <button className="flex items-center justify-center size-10 rounded-lg bg-blue-600 text-white hover:bg-blue-600/90 transition-colors shadow-lg shadow-blue-500/20" title="Download">
                                                <span className="material-symbols-outlined text-xl">download</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-12 text-gray-300 leading-relaxed min-h-[400px]">
                                        {activeLegalTab === 'terms' && (
                                            <>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">1.0</span>
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
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">2.0</span>
                                                        Appointment Bookings
                                                    </h3>
                                                    <div className="bg-white/5 p-6 rounded-xl border-l-4 border-blue-500 mb-4">
                                                        <h4 className="text-white font-bold mb-2 text-sm">2.1 Reservation System</h4>
                                                        <p className="text-sm">All services must be booked through our official online portal or verified mobile app. We do not accept bookings via third-party social media platforms.</p>
                                                    </div>
                                                    <p>
                                                        To secure a premium slot, a valid credit card must be kept on file. We reserve the right to verify the validity of the payment method before confirming any appointment.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">3.0</span>
                                                        Payment Terms
                                                    </h3>
                                                    <p className="mb-4">
                                                        Prices are subject to change without notice. Payment is due upon completion of the service. We accept all major credit cards, Apple Pay, and Google Pay. Cash payments are accepted but a credit card is still required for booking.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">4.0</span>
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
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">1.0</span>
                                                        Data Collection
                                                    </h3>
                                                    <p className="mb-4">
                                                        We collect information you provide directly to us, such as when you create an account, book an appointment, or communicate with us. This includes your name, email, phone number, payment information, and service preferences/history.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">2.0</span>
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
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">3.0</span>
                                                        Sharing of Information
                                                    </h3>
                                                    <p className="mb-4">
                                                        We do not sell your personal data. We may share your information with third-party vendors who need access to such information to carry out work on our behalf (e.g., payment processors, email service providers), subject to strict confidentiality obligations.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">4.0</span>
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
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">1.0</span>
                                                        What Are Cookies?
                                                    </h3>
                                                    <p className="mb-4">
                                                        Cookies are small data files stored on your device that help us improve our services and your experience, see which areas and features of our services are popular, and count visits.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">2.0</span>
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
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">3.0</span>
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
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">1.0</span>
                                                        24-Hour Notice
                                                    </h3>
                                                    <p className="mb-4">
                                                        We require at least 24 hours notice for any cancellation or rescheduling of appointments. This allows us the opportunity to offer the slot to another client.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">2.0</span>
                                                        Late Fees
                                                    </h3>
                                                    <p className="mb-4">
                                                        Cancellations made within 24 hours of the scheduled appointment will be subject to a fee equal to 50% of the reserved service amount. No-shows (failure to arrive without notice) will be charged 100% of the service price.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">3.0</span>
                                                        Emergency Exception
                                                    </h3>
                                                    <p className="mb-4">
                                                        We understand that life happens. Essential emergencies, severe weather conditions, and illness may be considered as valid reasons for late cancellations. Please contact our front desk immediately if you cannot make your appointment due to an emergency. Exceptions are made at the manager's discretion.
                                                    </p>
                                                </section>
                                                <section>
                                                    <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                                                        <span className="text-blue-500 font-mono mr-3 text-lg opacity-80">4.0</span>
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
