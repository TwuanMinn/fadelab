"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewPage() {
    const router = useRouter();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Edit Mode States
    const [editMode, setEditMode] = useState<{
        shipping: boolean;
        payment: boolean;
    }>({ shipping: false, payment: false });

    // Data States
    const [address, setAddress] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        street: "123 Barber Lane, Suite 4B",
        city: "Shave City",
        state: "NY",
        zip: "10001",
        phone: "+1 (555) 123-4567"
    });

    const [shipping, setShipping] = useState({
        name: "FedEx Express",
        price: 12.00,
        days: "1-2 business days",
        tier: "express"
    });

    const [payment, setPayment] = useState({
        method: "card", // card, paypal, apple
        cardType: "Visa",
        last4: "8899",
        cardNumber: "",
        exp: "12/28",
        cvc: ""
    });

    // Constants
    const SHIPPING_OPTIONS = [
        {
            id: "standard",
            name: "Standard Ground",
            price: 5.00,
            days: "5-7 Business Days",
            icon: "local_shipping",
            recommended: false
        },
        {
            id: "express",
            name: "Priority Express",
            price: 0,
            originalPrice: 15.00,
            days: "1-2 Business Days",
            icon: "flight_takeoff",
            recommended: true,
            badge: "PLATINUM MEMBER"
        },
        {
            id: "eco",
            name: "Eco-Saver",
            price: 0,
            days: "7-10 Business Days",
            icon: "eco",
            recommended: false,
            feature: "Carbon Neutral"
        }
    ];

    const SUBTOTAL = 85.00;
    const TAX = 7.50;
    const TOTAL = SUBTOTAL + shipping.price + TAX;
    const POINTS = Math.floor(TOTAL);

    const toggleEdit = (section: 'shipping' | 'payment') => {
        setEditMode(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handlePlaceOrder = () => {
        setIsPlacingOrder(true);
        setTimeout(() => {
            router.push("/success");
        }, 1500);
    };

    return (
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display min-h-screen flex flex-col transition-colors duration-300">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 bg-transparent px-8 py-6 lg:px-24 sticky top-0 z-50 backdrop-blur-md">
                <Link href="/shop" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                    <span className="material-symbols-outlined text-2xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    <span className="text-lg font-bold">Back to Shop</span>
                </Link>
                <div className="flex items-center gap-2 rounded-xl bg-blue-500/10 px-4 py-3 text-base font-bold text-white border border-blue-500/20">
                    <span className="material-symbols-outlined text-[22px] text-blue-500">lock</span>
                    <span className="hidden sm:inline">Secure Checkout</span>
                </div>
            </header>

            <main className="flex-1 px-6 py-12 lg:px-24 lg:py-16">
                <div className="mx-auto max-w-[1600px]">
                    {/* Progress Bar */}
                    <div className="mb-12 flex flex-col gap-4 max-w-4xl mx-auto">
                        <div className="flex justify-between text-base font-medium text-white/60">
                            <span>Cart</span>
                            <span>Shipping</span>
                            <span>Payment</span>
                            <span className="font-bold text-blue-500">Review</span>
                        </div>
                        <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                                initial={{ width: "75%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, ease: "circOut", delay: 0.2 }}
                                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                            >
                                {/* Shimmering light effect */}
                                <motion.div
                                    animate={{
                                        x: ["-100%", "200%"],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                        repeatDelay: 1
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
                                />
                            </motion.div>
                            {/* Step Markers / Intersections */}
                            <div className="absolute left-[25%] top-0 h-full w-1 bg-[#0B1121] z-10"></div>
                            <div className="absolute left-[50%] top-0 h-full w-1 bg-[#0B1121] z-10"></div>
                            <div className="absolute left-[75%] top-0 h-full w-1 bg-[#0B1121] z-10"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Left Column: Review Details */}
                        <div className="flex flex-col gap-8 lg:col-span-7 xl:col-span-8">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">Review & Confirm</h1>

                            {/* Combined Shipping Details Panel */}
                            <div className="rounded-2xl border border-white/10 bg-[#1e293b]/50 backdrop-blur-md p-8 shadow-lg overflow-hidden">
                                <div className="flex flex-col gap-8">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-6 w-full">
                                            <div className="mt-1 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                                <span className="material-symbols-outlined text-3xl">local_shipping</span>
                                            </div>
                                            <div className="flex flex-col gap-4 w-full">
                                                <p className="text-2xl font-bold text-white">Shipping Details</p>

                                                {/* Address Section */}
                                                {!editMode.shipping ? (
                                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
                                                        <div className="text-white/70 text-base">
                                                            <p className="font-bold text-white mb-2 uppercase tracking-wide text-xs opacity-50">Delivering To:</p>
                                                            <p className="text-lg text-white font-medium">{address.firstName} {address.lastName}</p>
                                                            <p>{address.street}</p>
                                                            <p>{address.city}, {address.state} {address.zip}</p>
                                                            <p className="mt-2 text-white/50">{address.email}</p>
                                                        </div>
                                                        <div className="text-white/70 text-base sm:text-right">
                                                            <p className="font-bold text-white mb-2 uppercase tracking-wide text-xs opacity-50">Method:</p>
                                                            <p className="text-lg text-white font-medium">{shipping.name}</p>
                                                            <p className="text-sm">{shipping.days}</p>
                                                            <p className="font-bold text-blue-400 text-xl mt-2">
                                                                {shipping.price === 0 ? "FREE" : `$${shipping.price.toFixed(2)}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className="flex flex-col gap-6 w-full pr-4"
                                                    >
                                                        {/* Address Fields */}
                                                        <div className="grid gap-5 w-full">
                                                            <div className="grid grid-cols-2 gap-5">
                                                                <label className="block">
                                                                    <span className="text-sm font-medium text-white/80 mb-1 block">First Name</span>
                                                                    <input value={address.firstName} onChange={e => setAddress({ ...address, firstName: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white transition-colors" placeholder="John" />
                                                                </label>
                                                                <label className="block">
                                                                    <span className="text-sm font-medium text-white/80 mb-1 block">Last Name</span>
                                                                    <input value={address.lastName} onChange={e => setAddress({ ...address, lastName: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white transition-colors" placeholder="Doe" />
                                                                </label>
                                                            </div>
                                                            <label className="block">
                                                                <span className="text-sm font-medium text-white/80 mb-1 block">Email</span>
                                                                <input value={address.email} onChange={e => setAddress({ ...address, email: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white transition-colors" placeholder="john@example.com" />
                                                            </label>
                                                            <label className="block">
                                                                <span className="text-sm font-medium text-white/80 mb-1 block">Street Address</span>
                                                                <input value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white transition-colors" placeholder="123 Barber St" />
                                                            </label>
                                                            <div className="grid grid-cols-2 gap-5">
                                                                <label className="block">
                                                                    <span className="text-sm font-medium text-white/80 mb-1 block">Zip Code</span>
                                                                    <input value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white transition-colors" placeholder="10001" />
                                                                </label>
                                                                <label className="block">
                                                                    <span className="text-sm font-medium text-white/80 mb-1 block">City</span>
                                                                    <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white transition-colors" placeholder="New York" />
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="h-px bg-white/10 w-full my-2"></div>

                                                        {/* Method Selection */}
                                                        <div className="flex flex-col gap-4">
                                                            <span className="text-sm font-medium text-white/80">Delivery Method</span>
                                                            {SHIPPING_OPTIONS.map((opt) => (
                                                                <div
                                                                    key={opt.id}
                                                                    onClick={() => setShipping({ ...shipping, name: opt.name, price: opt.price, days: opt.days, tier: opt.id })}
                                                                    className={`relative flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all ${shipping.name === opt.name
                                                                        ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                                                                        : 'bg-white/5 border-white/10 hover:border-blue-500/30'
                                                                        } ${opt.recommended ? 'mt-4' : ''}`}
                                                                >
                                                                    {/* Recommended Badge */}
                                                                    {opt.recommended && (
                                                                        <div className="absolute -top-3 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-900/40">
                                                                            Recommended
                                                                        </div>
                                                                    )}

                                                                    <div className="flex items-center gap-5">
                                                                        <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${shipping.name === opt.name ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/60'}`}>
                                                                            <span className="material-symbols-outlined text-2xl">{opt.icon}</span>
                                                                        </div>
                                                                        <div>
                                                                            <div className="flex items-center gap-3 mb-1">
                                                                                <p className="font-bold text-white text-lg">{opt.name}</p>
                                                                                {opt.badge && (
                                                                                    <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
                                                                                        {opt.badge}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <p className="text-sm text-white/50">{opt.days}</p>
                                                                            {opt.feature && <p className="text-sm text-white/50 mt-0.5">• {opt.feature}</p>}
                                                                            <p className="sm:hidden text-xs text-blue-500 mt-1 font-medium italic">Free for Members</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex flex-col items-end">
                                                                        {opt.originalPrice && (
                                                                            <span className="text-sm text-white/40 line-through decoration-blue-500/50">${opt.originalPrice.toFixed(2)}</span>
                                                                        )}
                                                                        <div className="text-xl font-bold text-white flex items-center gap-3">
                                                                            {opt.price === 0 ? "FREE" : `$${opt.price.toFixed(2)}`}
                                                                            <div className={`size-6 rounded-full border-2 flex items-center justify-center ${shipping.name === opt.name ? 'border-blue-500' : 'border-gray-600'}`}>
                                                                                {shipping.name === opt.name && <div className="size-3 rounded-full bg-blue-500" />}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleEdit('shipping')}
                                            className="group flex items-center gap-1 text-base font-bold text-blue-500 hover:text-blue-400 whitespace-nowrap self-start"
                                        >
                                            {editMode.shipping ? 'Save' : 'Edit'}
                                            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-0.5">
                                                {editMode.shipping ? 'check' : 'arrow_forward'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Panel */}
                            <div className="rounded-2xl border border-white/10 bg-[#1e293b]/50 backdrop-blur-md p-8 shadow-lg overflow-hidden">
                                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                                    <div className="flex gap-6 w-full">
                                        <div className="mt-1 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                            <span className="material-symbols-outlined text-3xl">credit_card</span>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                            <p className="text-2xl font-bold text-white">Payment Method</p>

                                            {!editMode.payment ? (
                                                <div className="mt-1">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-white text-2xl">payments</span>
                                                        <p className="text-lg text-white/80">{payment.cardType} ending in {payment.last4}</p>
                                                    </div>
                                                    <p className="text-base text-white/60 mt-2">Exp: {payment.exp}</p>
                                                </div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="grid gap-6 w-full pr-4 mt-2"
                                                >
                                                    {/* Payment Method Selector */}
                                                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide mb-2">
                                                        {['card', 'paypal', 'apple'].map(m => (
                                                            <button
                                                                key={m}
                                                                onClick={() => setPayment({ ...payment, method: m })}
                                                                className={`flex-1 min-w-[100px] flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${payment.method === m ? "border-blue-500 bg-blue-500/10 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-white/10 text-white/60 hover:bg-white/5"}`}
                                                            >
                                                                <span className="material-symbols-outlined text-3xl">
                                                                    {m === 'card' ? 'credit_card' : m === 'paypal' ? 'account_balance_wallet' : 'payments'}
                                                                </span>
                                                                <span className="text-xs uppercase font-bold tracking-wider">{m}</span>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {/* Saved Cards Visual */}
                                                    {payment.method === 'card' && (
                                                        <>
                                                            <div className="mb-4 p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-black text-white shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform cursor-pointer border border-white/10">
                                                                <div className="absolute right-[-30px] top-[-30px] opacity-10">
                                                                    <span className="material-symbols-outlined text-[180px]">credit_card</span>
                                                                </div>
                                                                <div className="flex justify-between items-start mb-8">
                                                                    <span className="material-symbols-outlined text-3xl">contactless</span>
                                                                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">Primary</span>
                                                                </div>
                                                                <div className="mb-6">
                                                                    <p className="text-2xl tracking-widest font-mono">•••• •••• •••• {payment.last4}</p>
                                                                </div>
                                                                <div className="flex justify-between items-end">
                                                                    <div>
                                                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Card Holder</p>
                                                                        <p className="text-base font-medium">{address.firstName} {address.lastName}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Expires</p>
                                                                        <p className="text-base font-medium">{payment.exp}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="relative flex items-center gap-4 mb-2">
                                                                <div className="h-px bg-white/10 flex-1"></div>
                                                                <span className="text-xs font-bold uppercase text-white/50 tracking-widest">Or Pay with new card</span>
                                                                <div className="h-px bg-white/10 flex-1"></div>
                                                            </div>
                                                        </>
                                                    )}

                                                    <label className="block">
                                                        <span className="text-sm font-medium text-white/80 mb-1 block">Card Number</span>
                                                        <div className="relative">
                                                            <input value={payment.cardNumber} onChange={e => setPayment({ ...payment, cardNumber: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white pl-12 transition-colors" placeholder="0000 0000 0000 0000" />
                                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">credit_card</span>
                                                        </div>
                                                    </label>

                                                    <div className="grid grid-cols-2 gap-5">
                                                        <label className="block">
                                                            <span className="text-sm font-medium text-white/80 mb-1 block">Expiry Date</span>
                                                            <input value={payment.exp} onChange={e => setPayment({ ...payment, exp: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white transition-colors" placeholder="MM/YY" />
                                                        </label>
                                                        <label className="block">
                                                            <span className="text-sm font-medium text-white/80 mb-1 block">CVC</span>
                                                            <div className="relative">
                                                                <input value={payment.cvc} onChange={e => setPayment({ ...payment, cvc: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base focus:border-blue-500 outline-none text-white transition-colors" placeholder="123" />
                                                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl cursor-help">help</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleEdit('payment')}
                                        className="group flex items-center gap-1 text-base font-bold text-blue-500 hover:text-blue-400 whitespace-nowrap self-start"
                                    >
                                        {editMode.payment ? 'Save' : 'Edit'}
                                        <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-0.5">
                                            {editMode.payment ? 'check' : 'arrow_forward'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="rounded-2xl border border-white/10 bg-[#1e293b]/50 backdrop-blur-md p-8 shadow-lg">
                                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-6">
                                    <h3 className="text-2xl font-bold text-white">Your Items (3)</h3>
                                    <button className="group flex items-center gap-2 text-base font-bold text-blue-500 hover:text-blue-400">
                                        Edit Cart
                                        <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-8">
                                    {/* Item 1 */}
                                    <div className="flex gap-6 group">
                                        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 relative">
                                            <Image
                                                width={128} height={128}
                                                alt="Premium Hair Pomade Container"
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Im3VD7a__2Agm6rGgHnCiS4t1WY0KaMTont1hnb7Jb2DunlpBgWB_TgPh9PFEQHTOm3BiiJ1TBVkay8a_yqZCPWtGskpr3-SQ4GKg3uiSdL83r9lhGvdKhFxvzt8tBaApEZGfbgRMdc9X1K0lFTcFJ17k_NX1bBz_ZSULim6YSw20py86x50zsbZM9uCmNuq3nZfxgUBwMZ-kAiRmCHnOTlJhfARz-BpyM6cH8Tgk7yRw_gbEkQnkfc28nTDiPN2VMZTgB2jgOyM"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between sm:flex-row py-2">
                                            <div>
                                                <h4 className="text-lg font-bold text-white mb-2">Deluxe Pomade</h4>
                                                <div className="flex flex-col gap-1 text-sm text-white/60">
                                                    <p>Size: 100ml</p>
                                                    <p>Qty: 2</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end justify-between">
                                                <p className="text-xl font-bold text-white">$50.00</p>
                                                <button className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-wider transition-colors">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Item 2 */}
                                    <div className="flex gap-6 group">
                                        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 relative">
                                            <Image
                                                width={128} height={128}
                                                alt="Classic Safety Razor Kit"
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCOURcZs7euoxCclyPxtzUra1L-l7EXw0aJeWVR2fGlPZfKKzF3NdntAf1V57p-2QTat6TwpF3kiA1lfJ4RVO2nXUVA59ibECnKgEUgEad980wElDmQexNQDJP9WBP8ep3y6vcVxDDQEP1C29YVOU6PNumV1EIcidKQsGGfn_qyjCkbyuxl12C8QgULjdPKoTk-CNl_Seruo80c9Nan365DLPfHR2hOY2qd05eRCbITARNFSjEwAPoKobyT1gVueKwvNKZiPoE0OJm"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between sm:flex-row py-2">
                                            <div>
                                                <h4 className="text-lg font-bold text-white mb-2">Safety Razor Kit</h4>
                                                <div className="flex flex-col gap-1 text-sm text-white/60">
                                                    <p>Material: Chrome</p>
                                                    <p>Qty: 1</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end justify-between">
                                                <p className="text-xl font-bold text-white">$35.00</p>
                                                <button className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-wider transition-colors">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Sticky Summary */}
                        <div className="lg:col-span-5 xl:col-span-4">
                            <div className="sticky top-28 flex flex-col gap-6">
                                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1e293b]/50 backdrop-blur-md shadow-xl">
                                    <div className="bg-white/5 p-5 text-center border-b border-white/5">
                                        <p className="text-base font-bold text-white uppercase tracking-widest">Order Summary</p>
                                    </div>
                                    <div className="flex flex-col gap-5 p-8">
                                        <div className="flex justify-between text-white/70 text-base">
                                            <span>Subtotal</span>
                                            <span className="font-medium text-white">${SUBTOTAL.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-white/70 text-base">
                                            <span>Shipping</span>
                                            <span className="font-medium text-white">{shipping.price === 0 ? "FREE" : `$${shipping.price.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between text-white/70 text-base">
                                            <span>Tax</span>
                                            <span className="font-medium text-white">${TAX.toFixed(2)}</span>
                                        </div>
                                        <div className="my-2 h-px w-full bg-white/10"></div>
                                        <div className="flex items-end justify-between">
                                            <span className="text-2xl font-bold text-white">Total</span>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-white/50 uppercase tracking-widest mb-1">USD</span>
                                                <span className="text-4xl font-black text-white tracking-tight">${TOTAL.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {/* Loyalty Badge */}
                                        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/20 py-3 text-center text-sm font-bold text-blue-400">
                                            <span className="material-symbols-outlined text-xl">loyalty</span>
                                            <span>You'll earn {POINTS} Points</span>
                                        </div>

                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={isPlacingOrder}
                                            className="mt-4 flex w-full items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 py-5 text-lg font-black text-white shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-blue-600/30 active:scale-[0.98] uppercase tracking-widest"
                                        >
                                            {isPlacingOrder ? (
                                                <>
                                                    <span className="size-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></span>
                                                    Processing...
                                                </>
                                            ) : "Place Order"}
                                        </button>

                                        <div className="mt-4 flex justify-center gap-6 text-white/40">
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                                <span className="material-symbols-outlined text-lg">verified_user</span>
                                                Secure
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                                <span className="material-symbols-outlined text-lg">local_shipping</span>
                                                Insured
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="rounded-2xl border border-white/10 bg-[#1e293b]/50 backdrop-blur-md p-6">
                                    <label className="mb-3 block text-xs font-bold uppercase text-white/50 tracking-widest">Promo Code</label>
                                    <div className="flex gap-3">
                                        <input
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder:text-white/30 transition-all font-mono"
                                            placeholder="ENTER CODE"
                                            type="text"
                                        />
                                        <button className="rounded-xl bg-white hover:bg-white/90 text-[#0f172a] px-6 py-2 text-sm font-black uppercase tracking-wider transition-all">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="mt-auto border-t border-white/5 bg-transparent py-10 text-center text-sm text-white/40 font-medium">
                <p>© 2024 Premium Barber. All rights reserved.</p>
            </footer>
        </div>
    );
}
