"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
    const router = useRouter();
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Eames Lounge Chair",
            variant: "Black Leather",
            price: 3500.00,
            image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            quantity: 1
        },
        {
            id: 2,
            name: "Nordic Coffee Table",
            variant: "Oak Finish",
            price: 450.00,
            image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            quantity: 1
        },
        {
            id: 3,
            name: "Geometric Rug",
            variant: "8x10, Wool",
            price: 200.00,
            image: "https://images.unsplash.com/photo-1575414003591-ece8d14161bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
            quantity: 2
        },
        {
            id: 4,
            name: "Ceramic Minimalist Vase",
            variant: "Matte White",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
            quantity: 1
        },
        {
            id: 5,
            name: "Velvet Throw Pillow",
            variant: "Emerald Green",
            price: 35.00,
            image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            quantity: 2
        }
    ]);

    const updateQuantity = (id: number, change: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);

    const applyPromo = () => {
        if (promoCode.toUpperCase() === "SAVE10") {
            setDiscount(subtotal * 0.1);
        } else {
            setDiscount(0);
        }
    };

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal - discount + tax;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-8">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                <Link href="/" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">My Cart ({items.length})</h1>
                <Link href="/" className="text-sm font-bold text-blue-600 hover:text-blue-700">Keep Shopping</Link>
            </header>

            {/* Cart Content */}
            <div className="px-4 py-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Items List (Left Column) */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {items.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={item.id}
                            className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm"
                        >
                            <div className="relative size-24 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h3>
                                        <p className="text-sm text-slate-500 mt-1">{item.variant}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h4>
                                    <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-lg px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="size-6 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                        >
                                            −
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="size-6 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sidebar (Right Column) */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Promo Code */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Have a promo code?</h3>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center px-4 h-12">
                                <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2">sell</span>
                                <input
                                    type="text"
                                    placeholder="Try SAVE10"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-900 dark:text-white"
                                />
                            </div>
                            <button
                                onClick={applyPromo}
                                className="px-6 h-12 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold text-sm rounded-xl transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                        {discount > 0 && <p className="text-xs text-green-600 font-bold mt-2 ml-1">Promo code applied!</p>}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col gap-4 sticky top-24">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Order Summary</h3>

                        <div className="flex justify-between text-slate-500 text-sm">
                            <span>Subtotal</span>
                            <span className="font-medium text-slate-900 dark:text-white">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-green-600 text-sm">
                                <span>Discount</span>
                                <span className="font-bold">-${discount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-slate-500 text-sm">
                            <span>Shipping Estimate</span>
                            <span className="font-bold text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-sm pb-4 border-b border-slate-100 dark:border-white/10">
                            <span>Tax</span>
                            <span className="font-medium text-slate-900 dark:text-white">${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total to Pay</span>
                            <span className="text-3xl font-black text-slate-900 dark:text-white">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <button
                            onClick={() => router.push('/checkout')}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Proceed to Checkout
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
