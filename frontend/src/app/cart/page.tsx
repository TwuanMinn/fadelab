"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";
import { EmptyCart } from "../components/EmptyStates";
import { CartItemSkeleton } from "../components/Skeleton";

export default function Cart() {
    const router = useRouter();
    const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const applyPromo = () => {
        if (promoCode.toUpperCase() === "SAVE10") {
            const discountAmount = getCartTotal() * 0.1;
            setDiscount(discountAmount);
            toast.success("Promo code applied!", {
                description: `You saved $${discountAmount.toFixed(2)}`,
            });
        } else if (promoCode.trim()) {
            setDiscount(0);
            toast.error("Invalid promo code", {
                description: "Please check and try again",
            });
        }
    };

    const handleRemove = (id: number, name: string) => {
        removeFromCart(id);
        toast.info("Removed from cart", { description: name });
    };

    // Show skeleton while hydrating
    if (!mounted) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-8">
                <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
                    <div className="h-6 w-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                </header>
                <div className="px-4 py-8 max-w-5xl mx-auto">
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((i) => (
                            <CartItemSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = getCartTotal();
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal - discount + tax;

    // Show empty state if cart is empty
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white">My Cart</h1>
                    <div className="w-10" />
                </header>
                <EmptyCart />
            </div>
        );
    }

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
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                key={item.id}
                                className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm"
                            >
                                <div className="relative size-24 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                                    <Image src={item.img} alt={item.name} fill className="object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Link href={`/product/${item.id}`}>
                                                <h3 className="font-bold text-slate-900 dark:text-white leading-tight hover:text-primary transition-colors">{item.name}</h3>
                                            </Link>
                                            <p className="text-sm text-slate-500 mt-1">{item.category}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.id, item.name)}
                                            className="text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h4>
                                        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-lg px-2 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="size-6 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                            >
                                                −
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="size-6 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Clear Cart Button */}
                    <button
                        onClick={() => {
                            clearCart();
                            toast.info("Cart cleared");
                        }}
                        className="text-sm text-slate-400 hover:text-red-500 font-medium flex items-center gap-2 self-start mt-2 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                        Clear all items
                    </button>
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
                            <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
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
