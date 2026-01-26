"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Toolbar } from "../components/Toolbar";

const BARBERS = [
    { id: 1, name: "James", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWv5GksqgjiUvlGn9iXiVXfWJtGlKWjTfq43bHxMg0jH9XkcXOHk8Dy-cXCbxaatOP6G_T0WxMZfWFA5LmCU7V1UZQCjwZM-qrBfSDSjoau9V7FU7B3uZiNb-sqkZSx2APGZ44IPDwVdKnHGHseAKQwOghnlRycq_mKtghZ_R3wCcDobfw3Ew7qh2vCxrkJ4ZbGvnhI12OoaxvxHg1g4MgQheRGQAvJ4ksZNgmyHUuZaGO0Qz-aAa0tFTVdNXPlcPk82niEcyfJPqZ" },
    { id: 2, name: "Marcus", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqsVxOkfu3CAg3at396RsEu3Eya1Fp525V09RGYg5zkMqDBoZdUJEqiAc_oN0CV0n3fYqPnY0_PFA4nHgdJ2AO4pV3jh-aHGOayZCmXaEcR9gEEWeQbrIvKV3juK1UUDIKklbeaEP6i7VwSzaUyWrO0FScQqzbVPyTRIriadJXBT18qgC-TyYBrr9ql4W_tMTgVlXiWRD4y7YK0ziUx4aZiYfOHFlsfP9D_N3h9lTB4dcS-TqppeBrDU4d-S7StecQEdRWUSDFxO2z" },
    { id: 3, name: "Sarah", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjv4ApnQ9hGbbk--qsMqy76gMnC-qHDFVTcqs7dXMo4zwOIfVl2fXDvqOx2oDdduDB_w1OJmra8wgFNYbEnoBg3pS60RfYBUDqmKzCf4uSUTrE-nVz8V2CkGY1Gvvs-hw04i1vw9JzXg331_KdOudaf-py-5z1vBViXN9KPT2Q2NCMWKMNf4XexQgyG_Lx26w8qaNrNYiKoWzR1Z5x7QvoQlrY7s1i33BHeTZd4tKLLqSbQzuyKIwzjpdXYpcIETnt6PKUWxdxKkJR" },
    { id: 4, name: "Jason", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2" },
];

const ADDONS = [
    { id: "hot-towel", name: "Hot Towel Shave", price: 15, desc: "Relaxing steam towel treatment" },
    { id: "black-mask", name: "Black Mask", price: 20, desc: "Deep cleansing charcoal facial" },
    { id: "beard-trim", name: "Beard Trim", price: 10, desc: "Precision shaping and lining" },
    { id: "scalp-massage", name: "Scalp Massage", price: 25, desc: "15 min soothing head massage" },
];

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center text-primary uppercase font-black tracking-widest animate-pulse">Initializing Lab...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}

function CheckoutContent() {
    const SERVICES: Record<string, { name: string, price: number }> = {
        'quick-trim': { name: "Quick Trim", price: 30 },
        'classic-cut': { name: "Classic Cut", price: 50 },
        'premium': { name: "Premium Experience", price: 85 }
    };

    const router = useRouter();
    const searchParams = useSearchParams();
    const barberIdParam = searchParams.get('barberId');

    // State
    const [mounted, setMounted] = useState(false);
    const [selectedBarber, setSelectedBarber] = useState(1);
    const [selectedAddons, setSelectedAddons] = useState<string[]>(["hot-towel"]);
    const [selectedServiceSlug, setSelectedServiceSlug] = useState('classic-cut');
    const [payment, setPayment] = useState("now");
    const [selectedTime, setSelectedTime] = useState("11:30 AM");

    // Calendar Engine
    const [viewDate, setViewDate] = useState(new Date(2024, 9, 1));
    const [selectedFullDate, setSelectedFullDate] = useState(new Date(2024, 9, 24));

    // Other states
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (barberIdParam) {
            setSelectedBarber(parseInt(barberIdParam));
        }
        const serviceParam = searchParams.get('service');
        if (serviceParam && SERVICES[serviceParam]) {
            setSelectedServiceSlug(serviceParam);
        }
    }, [searchParams, barberIdParam]);

    // Calendar Helpers
    const changeMonth = (offset: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        setViewDate(newDate);
    };

    const getDaysArray = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const padding = Array(firstDay).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
        return [...padding, ...days];
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("FRESHCUT");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleAddon = (id: string) => {
        setSelectedAddons(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    if (!mounted) return null;

    const currentService = SERVICES[selectedServiceSlug] || SERVICES['classic-cut'];
    const basePrice = currentService.price;
    const addonsTotal = ADDONS.filter(a => selectedAddons.includes(a.id)).reduce((acc, current) => acc + current.price, 0);
    const subtotal = basePrice + addonsTotal;
    const discount = payment === "now" ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    return (
        <div className="bg-background-dark text-white font-display min-h-screen antialiased flex flex-col selection:bg-primary selection:text-white">
            <Toolbar />

            {/* Header */}
            <header className="flex items-center justify-between border-b border-white/5 bg-surface-darker/60 backdrop-blur-xl px-6 lg:px-12 py-6 sticky top-0 z-[60]">
                <button onClick={() => router.back()} type="button" className="flex items-center gap-4 group">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Session Config</span>
                </button>
                <Link href="/" className="text-gray-500 hover:text-white text-[9px] font-black uppercase tracking-[0.3em] transition-colors border border-white/10 px-4 py-2 rounded-lg bg-white/5">
                    Terminal Exit
                </Link>
            </header>

            <main className="flex-1 flex justify-center w-full px-6 py-12 md:py-20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 relative z-10">
                    {/* Left Column: Flow */}
                    <div className="flex-1 flex flex-col gap-16">
                        {/* Title Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] bg-primary/10 px-3 py-1 rounded-full">Protocol Step 02</span>
                                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Matrix: Booking</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "66%" }}
                                        transition={{ duration: 1, ease: "circOut" }}
                                        className="h-full bg-gradient-to-r from-primary to-blue-400 shadow-glow"
                                    />
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] italic">
                                ESTABLISH <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 drop-shadow-sm">SESSION</span>
                            </h1>
                        </motion.div>

                        {/* Module: Service */}
                        <div className="bg-surface-dark/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 shadow-2xl group hover:border-primary/20 transition-all duration-500">
                            <label className="flex flex-col gap-6">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
                                    <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                                    Primary Operation Selection
                                </span>
                                <div className="relative group">
                                    <select className="appearance-none w-full bg-background-dark/80 border border-white/5 rounded-2xl h-20 px-8 text-lg font-black uppercase tracking-widest text-white focus:outline-none focus:border-primary/50 transition-all cursor-pointer hover:bg-background-dark active:scale-[0.99]">
                                        <option>Signature Haircut [45 MIN]</option>
                                        <option>Beard Sculpting [30 MIN]</option>
                                        <option>Elite Grooming Package [90 MIN]</option>
                                    </select>
                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                        <span className="material-symbols-outlined font-black text-3xl">expand_more</span>
                                    </span>
                                </div>
                            </label>
                        </div>

                        {/* Module: Specialist */}
                        <div className="flex flex-col gap-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3 px-2">
                                <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                                Deployment Specialist
                            </span>
                            <div className="flex gap-8 overflow-x-auto scrollbar-hide py-4 px-2 -mx-2">
                                <div className="flex flex-col items-center gap-4 cursor-pointer group min-w-[110px]">
                                    <div className="size-24 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all group-hover:scale-105 duration-500">
                                        <span className="material-symbols-outlined text-gray-600 group-hover:text-primary text-4xl font-black transition-colors">groups</span>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white">Next Available</span>
                                </div>
                                {BARBERS.map((b) => (
                                    <div key={b.id} onClick={() => setSelectedBarber(b.id)} className="flex flex-col items-center gap-4 cursor-pointer group min-w-[110px]">
                                        <div className={`size-24 rounded-full p-1.5 transition-all duration-500 transform group-hover:scale-110 relative ${selectedBarber === b.id ? 'bg-primary shadow-glow' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                            <div className="w-full h-full rounded-full bg-cover bg-center border-2 border-background-dark" style={{ backgroundImage: `url('${b.img}')` }} />
                                            <AnimatePresence>
                                                {selectedBarber === b.id && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        className="absolute bottom-0 right-0 bg-primary text-white size-8 rounded-full flex items-center justify-center border-2 border-background-dark shadow-xl"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px] font-black">check</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${selectedBarber === b.id ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`}>{b.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Module: Temporal Grid */}
                        <div className="bg-surface-dark border border-white/5 rounded-[3rem] p-10 shadow-2xl shadow-black/40 overflow-hidden relative">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 relative z-10">
                                <div className="flex flex-col gap-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">Calendar Matrix</span>
                                            <span className="text-xl font-black uppercase tracking-tighter text-white">
                                                {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => changeMonth(-1)}
                                                className="size-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-primary transition-all duration-300 border border-white/5"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                            </button>
                                            <button
                                                onClick={() => changeMonth(1)}
                                                className="size-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-primary transition-all duration-300 border border-white/5"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-7 text-center gap-3">
                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                            <div key={d} className="text-[10px] font-black text-gray-700 uppercase tracking-widest py-3">{d}</div>
                                        ))}

                                        {getDaysArray().map((date, i) => {
                                            if (!date) return <div key={`empty-${i}`} />;

                                            const isSelected = isSameDay(date, selectedFullDate);
                                            const isToday = isSameDay(date, new Date());

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedFullDate(date)}
                                                    className={`aspect-square flex items-center justify-center rounded-2xl text-[11px] font-black transition-all duration-300 relative group/day ${isSelected
                                                        ? 'bg-blue-600 text-white shadow-glow scale-110 z-10'
                                                        : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/5 hover:border-blue-600/50'
                                                        } ${isToday ? 'ring-1 ring-blue-600/50' : ''}`}
                                                >
                                                    {date.getDate()}
                                                    {isSelected && <motion.div layoutId="calendar-ring" className="absolute -inset-1 rounded-2xl border-2 border-blue-600/30 pointer-events-none" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6 xl:pl-16 xl:border-l border-white/5">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Available Slots ({selectedFullDate.toLocaleString('default', { month: 'short' })} {selectedFullDate.getDate()})</span>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['10:00 AM', '11:30 AM', '2:00 PM', '3:45 PM'].map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-6 rounded-2xl text-sm font-bold transition-all duration-200 ${selectedTime === time
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                                    : 'bg-[#1c2333] text-gray-400 border border-white/5 hover:border-white/10'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Module: Enhancements */}
                        <div className="flex flex-col gap-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3 px-2">
                                <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                                Tactical Enhancements
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {ADDONS.map((a) => (
                                    <label key={a.id} className={`flex items-center p-8 bg-surface-dark border transition-all duration-500 rounded-[2rem] cursor-pointer group relative overflow-hidden ${selectedAddons.includes(a.id) ? 'border-primary shadow-2xl shadow-primary/10' : 'border-white/5 hover:border-white/10'}`}>
                                        {selectedAddons.includes(a.id) && <motion.div layoutId={`addon-bg-${a.id}`} className="absolute inset-0 bg-primary/5 pointer-events-none" />}
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedAddons.includes(a.id)}
                                                onChange={() => toggleAddon(a.id)}
                                                className="size-6 text-primary rounded-lg bg-background-dark border-white/10 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="ml-8 flex-1 relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-black text-sm text-white uppercase tracking-tight group-hover:text-primary transition-colors">{a.name}</span>
                                                <span className="text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded-lg">+${a.price}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">{a.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Module: Protocol Notes */}
                        <div className="flex flex-col gap-6 bg-surface-dark/30 p-10 rounded-[3rem] border border-white/5">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center justify-between">
                                Operational Intelligence
                                <span className="opacity-40 italic font-normal text-[8px] tracking-normal">[OPTIONAL]</span>
                            </span>
                            <textarea className="w-full bg-background-dark/80 border border-white/5 rounded-[2rem] p-8 text-sm font-medium text-white focus:outline-none focus:border-primary/50 transition-all resize-none h-40 placeholder:text-gray-700 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] scrollbar-hide" placeholder="Input specific session telemetry..."></textarea>
                        </div>

                        {/* Module: Payment Selection */}
                        <div className="flex flex-col gap-8 mb-20">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 px-2 flex items-center gap-3">
                                <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                                Payment Protocol
                            </span>
                            <div className="grid grid-cols-1 gap-6">
                                <label onClick={() => setPayment("now")} className={`flex items-center justify-between p-8 bg-surface-dark border rounded-[2.5rem] cursor-pointer transition-all duration-500 relative overflow-hidden ${payment === "now" ? 'border-primary shadow-glow ring-1 ring-primary/50' : 'border-white/5 hover:border-white/10 group'}`}>
                                    {payment === "now" && <motion.div layoutId="payment-active" className="absolute inset-0 bg-primary/5 pointer-events-none" />}
                                    <div className="flex items-center gap-8 relative">
                                        <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${payment === "now" ? 'border-primary bg-primary' : 'border-white/10 group-hover:border-primary/50'}`}>
                                            {payment === "now" && <div className="size-2 bg-white rounded-full" />}
                                        </div>
                                        <div>
                                            <p className="font-black text-base text-white uppercase tracking-tight">Express Checkout</p>
                                            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] mt-2 italic flex items-center gap-2">
                                                <span className="material-symbols-outlined text-xs">offline_bolt</span>
                                                Operational Efficiency Bonus: 10%
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-black text-3xl text-white tracking-tighter tabular-nums">${total.toFixed(2)}</span>
                                </label>
                                <label onClick={() => setPayment("shop")} className={`flex items-center justify-between p-8 bg-surface-dark border rounded-[2.5rem] cursor-pointer transition-all duration-500 relative overflow-hidden ${payment === "shop" ? 'border-primary ring-1 ring-primary/50' : 'border-white/5 hover:border-white/10 group'}`}>
                                    {payment === "shop" && <motion.div layoutId="payment-active" className="absolute inset-0 bg-primary/5 pointer-events-none" />}
                                    <div className="flex items-center gap-8 relative">
                                        <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${payment === "shop" ? 'border-primary bg-primary' : 'border-white/10 group-hover:border-primary/50'}`}>
                                            {payment === "shop" && <div className="size-2 bg-white rounded-full" />}
                                        </div>
                                        <div>
                                            <p className="font-black text-base text-white uppercase tracking-tight">On-Site Settlement</p>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2">Standard Protocol Clearance</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-3xl text-white/20 tracking-tighter tabular-nums">${subtotal.toFixed(2)}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="w-full lg:w-[460px] flex-shrink-0">
                        <div className="sticky top-32 flex flex-col gap-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-surface-dark to-surface-darker rounded-[3.5rem] p-12 border border-white/5 shadow-2xl relative overflow-hidden group"
                            >
                                {/* Card Glow Overlay */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-primary"></div>
                                <div className="absolute -top-24 -right-24 size-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none transition-all duration-1000 group-hover:bg-primary/30"></div>

                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-12 pb-8 border-b border-white/5 flex items-center justify-between">
                                    Summary
                                    <span className="text-[10px] font-black text-gray-500 tracking-[0.3em]">REF: LAB-772</span>
                                </h3>

                                <div className="flex flex-col gap-10 mb-12 relative">
                                    <div className="absolute left-[7px] top-6 bottom-6 w-px bg-white/5" />

                                    <div className="flex gap-8 items-start relative z-10">
                                        <div className="size-4 mt-2 rounded-full bg-primary flex-shrink-0 border-4 border-surface-dark shadow-glow" />
                                        <div>
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Service Type</p>
                                            <p className="text-base font-black text-white uppercase tracking-tight">{currentService.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest pl-3 border-l-2 border-primary/30">45 Min Clearance</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-8 items-start relative z-10">
                                        <div className="size-4 mt-2 rounded-full bg-primary flex-shrink-0 border-4 border-surface-dark shadow-glow" />
                                        <div>
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Deployed Specialist</p>
                                            <div className="flex items-center gap-4 mt-2 bg-white/5 p-3 rounded-2xl border border-white/5 pr-6">
                                                <div className="size-10 rounded-full bg-cover bg-center border-2 border-background-dark shadow-xl" style={{ backgroundImage: `url('${BARBERS.find(b => b.id === selectedBarber)?.img}')` }} />
                                                <p className="text-sm font-black text-white uppercase tracking-tight italic">{BARBERS.find(b => b.id === selectedBarber)?.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-8 items-start relative z-10">
                                        <div className="size-4 mt-2 rounded-full bg-primary flex-shrink-0 border-4 border-surface-dark shadow-glow" />
                                        <div>
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Established Window</p>
                                            <p className="text-base font-black text-white uppercase tracking-tight">WED, OCT 11</p>
                                            <p className="text-[10px] text-primary font-black uppercase mt-2 tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-lg w-fit">10:45 AM GMT-5</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-10 mb-12 flex flex-col gap-5">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                        <span className="text-gray-500 flex items-center gap-2 italic"><span className="size-1 rounded-full bg-gray-500"></span> Base Matrix</span>
                                        <span className="text-white tabular-nums">${basePrice.toFixed(2)}</span>
                                    </div>
                                    {selectedAddons.map(id => {
                                        const addon = ADDONS.find(a => a.id === id);
                                        return (
                                            <div key={id} className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                                <span className="text-gray-500 flex items-center gap-2 italic"><span className="size-1 rounded-full bg-primary"></span> {addon?.name}</span>
                                                <span className="text-white tabular-nums">+${addon?.price}.00</span>
                                            </div>
                                        );
                                    })}
                                    {payment === "now" && (
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 bg-emerald-500/5 px-4 py-3 rounded-xl border border-emerald-500/20">
                                            <span className="flex items-center gap-2 italic">Optimization Bonus</span>
                                            <span className="tabular-nums">-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-10 mb-12">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Tempo</p>
                                            <p className="text-2xl font-black text-white uppercase tracking-tighter tabular-nums italic">45:00</p>
                                        </div>
                                        <div className="text-right flex flex-col gap-1">
                                            <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Total Payload</p>
                                            <p className="text-6xl font-black text-white uppercase tracking-tighter tabular-nums drop-shadow-glow leading-none">${total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-1.5 border border-white/20 rounded-[1.3rem] hover:border-white/40 transition-colors">
                                    <button onClick={() => router.push(`/success?service=${selectedServiceSlug}&barberId=${selectedBarber}&time=${selectedTime}`)} className="w-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl hover:bg-gray-50 transition-all transform active:scale-[0.98] flex justify-center items-center gap-4 relative z-20">
                                        CONFIRM BOOKING
                                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                    </button>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[14px] text-gray-600">security</span>
                                    <p className="text-center text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">Secure Clearance Protocol Active</p>
                                </div>
                            </motion.div>

                            <div className="flex items-center justify-between p-8 bg-surface-dark border border-white/5 rounded-[2.5rem] group shadow-xl">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-primary/10 rounded-2xl text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glow">
                                        <span className="material-symbols-outlined text-2xl">notifications_active</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-xs text-white uppercase tracking-widest">Temporal Alerts</p>
                                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">SMS & Comm-Link Enabled</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input checked readOnly type="checkbox" className="sr-only peer" />
                                    <div className="w-14 h-8 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-gray-600 after:rounded-full after:h-5 after:w-5 after:transition-all duration-500 peer-checked:bg-primary shadow-inner"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .drop-shadow-glow {
                    filter: drop-shadow(0 0 12px rgba(37, 99, 235, 0.4));
                }
            `}</style>
        </div>
    );
}
