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
        <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center text-blue-500 uppercase font-black tracking-widest animate-pulse">Initializing Lab...</div>}>
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

    // Payment states
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cardDetails, setCardDetails] = useState({ number: "", exp: "", cvc: "" });
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
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display min-h-screen antialiased flex flex-col selection:bg-blue-600 selection:text-white">
            <Toolbar />

            {/* Header */}
            <header className="flex items-center justify-between border-b border-white/5 bg-surface-darker/60 backdrop-blur-xl px-6 lg:px-12 py-6 sticky top-0 z-[60]">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:border-primary transition-all duration-300">
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-blue-500 transition-colors">Session Config</span>
                </Link>
                <Link href="/" className="text-gray-500 hover:text-white text-[9px] font-black uppercase tracking-[0.3em] transition-colors border border-white/10 px-4 py-2 rounded-lg bg-white/5">
                    Terminal Exit
                </Link>
            </header>

            <main className="flex-1 flex justify-center w-full px-6 py-12 md:py-20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
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
                                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] bg-blue-600/10 px-3 py-1 rounded-full">Protocol Step 02</span>
                                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Matrix: Booking</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "66%" }}
                                        transition={{ duration: 1.5, ease: "circOut", delay: 0.3 }}
                                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                    >
                                        {/* Shimmering light effect */}
                                        <motion.div
                                            animate={{
                                                x: ["-100%", "200%"],
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                ease: "linear",
                                                repeatDelay: 0.5
                                            }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] italic">
                                ESTABLISH <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 drop-shadow-sm">SESSION</span>
                            </h1>
                        </motion.div>

                        {/* Module: Service */}
                        <div className="bg-[#1e293b]/50 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 shadow-2xl group hover:border-blue-500/20 transition-all duration-500">
                            <label className="flex flex-col gap-6">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
                                    <span className="size-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                                    Primary Operation Selection
                                </span>
                                <div className="relative group">
                                    <select className="appearance-none w-full bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a]/80 border border-white/5 rounded-2xl h-20 px-8 text-lg font-black uppercase tracking-widest text-white focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer hover:bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] active:scale-[0.99]">
                                        <option>Signature Haircut [45 MIN]</option>
                                        <option>Beard Sculpting [30 MIN]</option>
                                        <option>Elite Grooming Package [90 MIN]</option>
                                    </select>
                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                                        <span className="material-symbols-outlined font-black text-3xl">expand_more</span>
                                    </span>
                                </div>
                            </label>
                        </div>

                        {/* Module: Specialist */}
                        <div className="flex flex-col gap-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3 px-2">
                                <span className="size-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                                Deployment Specialist
                            </span>
                            <div className="flex gap-8 overflow-x-auto scrollbar-hide py-4 px-2 -mx-2">
                                <div className="flex flex-col items-center gap-4 cursor-pointer group min-w-[110px]">
                                    <div className="size-24 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-blue-600/5 transition-all group-hover:scale-105 duration-500">
                                        <span className="material-symbols-outlined text-gray-600 group-hover:text-blue-500 text-4xl font-black transition-colors">groups</span>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white">Next Available</span>
                                </div>
                                {BARBERS.map((b) => (
                                    <div key={b.id} onClick={() => setSelectedBarber(b.id)} className="flex flex-col items-center gap-4 cursor-pointer group min-w-[110px]">
                                        <div className={`size-24 rounded-full p-1.5 transition-all duration-500 transform group-hover:scale-110 relative ${selectedBarber === b.id ? 'bg-blue-600 shadow-glow' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                            <div className="w-full h-full rounded-full bg-cover bg-center border-2 border-background-dark" style={{ backgroundImage: `url('${b.img}')` }} />
                                            <AnimatePresence>
                                                {selectedBarber === b.id && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        className="absolute bottom-0 right-0 bg-blue-600 text-white size-8 rounded-full flex items-center justify-center border-2 border-background-dark shadow-xl"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px] font-black">check</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${selectedBarber === b.id ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-300'}`}>{b.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Module: Certifications */}
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3 px-2">
                                <span className="size-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                CERTIFICATIONS
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button className="flex items-center gap-4 p-6 rounded-3xl bg-surface-dark border border-white/5 text-left hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <div className="size-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20 group-hover:scale-110 transition-transform shadow-glow">
                                        <span className="material-symbols-outlined text-2xl font-black">workspace_premium</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-white uppercase tracking-tight group-hover:text-yellow-500 transition-colors">Master License</p>
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">State Board, 2018</p>
                                    </div>
                                </button>
                                <button className="flex items-center gap-4 p-6 rounded-3xl bg-surface-dark border border-white/5 text-left hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <div className="size-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20 group-hover:scale-110 transition-transform shadow-glow">
                                        <span className="material-symbols-outlined text-2xl font-black">stars</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-white uppercase tracking-tight group-hover:text-yellow-500 transition-colors">Fade Specialist</p>
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Moneyspire Academy</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Module: Payment Matrix */}
                        <div className="bg-[#1e293b]/50 backdrop-blur-md border border-white/5 rounded-[3rem] p-10 shadow-2xl transition-all duration-500 hover:border-blue-500/30">
                            <div className="flex flex-col gap-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">Settlement Matrix</span>
                                        <span className="text-xl font-black uppercase tracking-tighter text-white">Select Protocol</span>
                                    </div>
                                    <div className="flex gap-4">
                                        {['card', 'paypal', 'apple'].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setPaymentMethod(m)}
                                                className={`px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${paymentMethod === m ? 'bg-blue-600 border-blue-500 shadow-glow text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'}`}
                                            >
                                                <span className="material-symbols-outlined text-lg">{m === 'card' ? 'credit_card' : m === 'paypal' ? 'account_balance_wallet' : 'payments'}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{m}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                                    {/* Card Visual / Details */}
                                    <div className="flex flex-col gap-8">
                                        <AnimatePresence mode="wait">
                                            {paymentMethod === 'card' ? (
                                                <motion.div
                                                    key="card-face"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="w-full aspect-[1.6/1] bg-gradient-to-br from-blue-600 to-blue-900 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl group"
                                                >
                                                    <div className="absolute top-0 right-0 p-8 opacity-20">
                                                        <span className="material-symbols-outlined text-9xl">contactless</span>
                                                    </div>
                                                    <div className="size-14 bg-white/20 rounded-xl mb-auto flex items-center justify-center backdrop-blur-md border border-white/10">
                                                        <div className="size-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-inner" />
                                                    </div>
                                                    <div className="mt-12">
                                                        <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">Secure Terminal ID</p>
                                                        <p className="text-2xl font-black tracking-[0.2em] text-white font-mono flex gap-4">
                                                            {cardDetails.number.padEnd(16, '•').match(/.{1,4}/g)?.join(' ')}
                                                        </p>
                                                    </div>
                                                    <div className="mt-auto flex justify-between items-end">
                                                        <div>
                                                            <p className="text-[8px] font-black text-white/50 uppercase tracking-[0.3em] mb-1">Specialist Signature</p>
                                                            <p className="text-sm font-black italic text-white uppercase tracking-wider">M. FADELESS</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[8px] font-black text-white/50 uppercase tracking-[0.3em] mb-1">Exp / CVC</p>
                                                            <p className="text-sm font-black text-white">{cardDetails.exp || 'MM/YY'} / {cardDetails.cvc.padEnd(3, '•')}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="alt-face"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="w-full aspect-[1.6/1] bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12"
                                                >
                                                    <div className="size-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 shadow-glow border border-blue-600/20">
                                                        <span className="material-symbols-outlined text-4xl text-blue-500">{paymentMethod === 'paypal' ? 'account_balance_wallet' : 'payments'}</span>
                                                    </div>
                                                    <p className="text-xl font-black text-white uppercase tracking-tighter mb-2">Redirect Protocol</p>
                                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">You will be securely routed to {paymentMethod} for final clearance.</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Input Fields */}
                                    <div className="flex flex-col gap-6 justify-center">
                                        {paymentMethod === 'card' && (
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-2">Card Vector</label>
                                                    <input
                                                        type="text"
                                                        maxLength={16}
                                                        value={cardDetails.number}
                                                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\D/g, '') })}
                                                        placeholder="0000 0000 0000 0000"
                                                        className="h-16 bg-black/40 border border-white/10 rounded-2xl px-6 font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-800"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-2">Temporal Limit</label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            value={cardDetails.exp}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })}
                                                            className="h-16 bg-black/40 border border-white/10 rounded-2xl px-6 font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-800"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-2">Pass-Code</label>
                                                        <input
                                                            type="text"
                                                            maxLength={3}
                                                            placeholder="CVV"
                                                            value={cardDetails.cvc}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, '') })}
                                                            className="h-16 bg-black/40 border border-white/10 rounded-2xl px-6 font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-800"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl flex items-center gap-6">
                                            <div className="size-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                                                <span className="material-symbols-outlined font-black">lock</span>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-white uppercase tracking-tight">End-to-End Encryption Active</p>
                                                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">PCI Level 1 Shield Proxy Enabled</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Module: Enhancements */}
                        <div className="flex flex-col gap-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3 px-2">
                                <span className="size-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                                Tactical Enhancements
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {ADDONS.map((a) => (
                                    <label key={a.id} className={`flex items-center p-8 bg-surface-dark border transition-all duration-500 rounded-[2rem] cursor-pointer group relative overflow-hidden ${selectedAddons.includes(a.id) ? 'border-primary shadow-2xl shadow-primary/10' : 'border-white/5 hover:border-white/10'}`}>
                                        {selectedAddons.includes(a.id) && <motion.div layoutId={`addon-bg-${a.id}`} className="absolute inset-0 bg-blue-600/5 pointer-events-none" />}
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedAddons.includes(a.id)}
                                                onChange={() => toggleAddon(a.id)}
                                                className="size-6 text-blue-500 rounded-lg bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] border-white/10 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="ml-8 flex-1 relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-black text-sm text-white uppercase tracking-tight group-hover:text-blue-500 transition-colors">{a.name}</span>
                                                <span className="text-xs font-black text-blue-500 bg-blue-600/10 px-2 py-1 rounded-lg">+${a.price}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">{a.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>



                        {/* Module: Temporal Alerts */}
                        <div className="flex items-center justify-between p-10 bg-[#1e293b]/50 backdrop-blur-md border border-white/5 rounded-[3rem] group shadow-xl hover:border-blue-500/20 transition-all duration-500">
                            <div className="flex items-center gap-8">
                                <div className="size-16 bg-blue-600/10 rounded-2xl text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glow border border-blue-600/10">
                                    <span className="material-symbols-outlined text-3xl">notifications_active</span>
                                </div>
                                <div>
                                    <p className="font-black text-sm text-white uppercase tracking-widest">Temporal Alerts</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">SMS & Comm-Link Enabled</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input checked readOnly type="checkbox" className="sr-only peer" />
                                <div className="w-16 h-9 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-gray-600 after:rounded-full after:h-6 after:w-6 after:transition-all duration-500 peer-checked:bg-blue-600 shadow-inner"></div>
                            </label>
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
                                <div className="absolute -top-24 -right-24 size-48 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none transition-all duration-1000 group-hover:bg-blue-600/30"></div>

                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-12 pb-8 border-b border-white/5 flex items-center justify-between">
                                    Summary
                                    <span className="text-[10px] font-black text-gray-500 tracking-[0.3em]">REF: LAB-772</span>
                                </h3>

                                <div className="flex flex-col gap-10 mb-12 relative">
                                    <div className="absolute left-[7px] top-6 bottom-6 w-px bg-white/5" />

                                    <div className="flex gap-8 items-start relative z-10">
                                        <div className="size-4 mt-2 rounded-full bg-blue-600 flex-shrink-0 border-4 border-surface-dark shadow-glow" />
                                        <div>
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Service Type</p>
                                            <p className="text-base font-black text-white uppercase tracking-tight">{currentService.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest pl-3 border-l-2 border-primary/30">45 Min Clearance</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-8 items-start relative z-10">
                                        <div className="size-4 mt-2 rounded-full bg-blue-600 flex-shrink-0 border-4 border-surface-dark shadow-glow" />
                                        <div>
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Deployed Specialist</p>
                                            <div className="flex items-center gap-4 mt-2 bg-white/5 p-3 rounded-2xl border border-white/5 pr-6">
                                                <div className="size-10 rounded-full bg-cover bg-center border-2 border-background-dark shadow-xl" style={{ backgroundImage: `url('${BARBERS.find(b => b.id === selectedBarber)?.img}')` }} />
                                                <p className="text-sm font-black text-white uppercase tracking-tight italic">{BARBERS.find(b => b.id === selectedBarber)?.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-8 items-start relative z-10">
                                        <div className="size-4 mt-2 rounded-full bg-blue-600 flex-shrink-0 border-4 border-surface-dark shadow-glow" />
                                        <div>
                                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Established Window</p>
                                            <p className="text-base font-black text-white uppercase tracking-tight">
                                                {selectedFullDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                            <p className="text-[10px] text-blue-500 font-black uppercase mt-2 tracking-[0.2em] bg-blue-600/10 px-3 py-1 rounded-lg w-fit">
                                                {selectedTime}
                                            </p>
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
                                                <span className="text-gray-500 flex items-center gap-2 italic"><span className="size-1 rounded-full bg-blue-600"></span> {addon?.name}</span>
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
                                            <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em]">Total Payload</p>
                                            <p className="text-6xl font-black text-white uppercase tracking-tighter tabular-nums drop-shadow-glow leading-none">${total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-1.5 border border-white/20 rounded-[1.3rem] hover:border-white/40 transition-colors">
                                    <Link
                                        href={`/success?service=${selectedServiceSlug}&barberId=${selectedBarber}&time=${encodeURIComponent(selectedTime)}&date=${encodeURIComponent(selectedFullDate.toISOString())}`}
                                        className="w-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl hover:bg-gray-50 transition-all transform active:scale-[0.98] flex justify-center items-center gap-4 relative z-50 cursor-pointer"
                                    >
                                        CONFIRM BOOKING
                                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                    </Link>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[14px] text-gray-600">security</span>
                                    <p className="text-center text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">Secure Clearance Protocol Active</p>
                                </div>
                            </motion.div>

                            <div className="flex items-center justify-between p-10 bg-[#1e293b]/50 backdrop-blur-md border border-white/5 rounded-[3rem] group shadow-xl hover:border-blue-500/20 transition-all duration-500">
                                <div className="flex items-center gap-8 text-left">
                                    <div className="size-16 bg-blue-600/10 rounded-2xl text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glow border border-blue-600/10">
                                        <span className="material-symbols-outlined text-3xl">verified_user</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-white uppercase tracking-widest">Protocol Secured</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">Encrypted Payment Gateway</p>
                                    </div>
                                </div>
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
