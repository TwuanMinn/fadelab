"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";

export default function Checkout() {
    const router = useRouter();
    const { items, getCartTotal, clearCart } = useCartStore();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');
    const [isEditingShipping, setIsEditingShipping] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        name: "Isabella Anderson",
        phone: "(555) 123-4567",
        address: "1254 Oakwood Avenue",
        apartment: "Suite 4B",
        city: "San Francisco",
        state: "CA",
        zip: "94103",
        country: "United States"
    });
    const [saveCard, setSaveCard] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const subtotal = getCartTotal();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (mounted && items.length === 0) {
        router.push('/cart');
        return null;
    }

    if (!mounted) return null;

    const handlePlaceOrder = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Processing your payment...',
                success: () => {
                    clearCart();
                    router.push('/success');
                    return 'Order placed successfully!';
                },
                error: 'Payment failed. Please try again.',
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-8">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                <Link href="/cart" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Checkout</h1>
                <div className="size-10"></div> {/* Spacer */}
            </header>

            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Progress Stepper */}
                <div className="max-w-3xl mx-auto mb-10">
                    <div className="flex items-center justify-between px-4">
                        <div className="flex flex-col items-center gap-2">
                            <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <span className="material-symbols-outlined text-[20px]">check</span>
                            </div>
                            <span className="text-xs font-bold text-blue-600">Shipping</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 mx-4 mb-6"></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/30">
                                2
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">Payment</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 mx-4 mb-6"></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-base border-2 border-slate-200 dark:border-slate-700">
                                3
                            </div>
                            <span className="text-xs font-bold text-slate-400">Review</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {/* Shipping Info Card */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">local_shipping</span>
                                    Shipping Information
                                </h2>
                                {!isEditingShipping && (
                                    <button
                                        onClick={() => setIsEditingShipping(true)}
                                        className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {isEditingShipping ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.name}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 outline-none focus:border-blue-500 transition-all font-medium"
                                                placeholder="e.g. Alex Johnson"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Phone Number</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.phone}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 outline-none focus:border-blue-500 transition-all font-medium"
                                                placeholder="(555) 000-0000"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Street Address</label>
                                        <input
                                            type="text"
                                            value={shippingInfo.address}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                            className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 outline-none focus:border-blue-500 transition-all font-medium"
                                            placeholder="123 Main St"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Apartment / Suite</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.apartment}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 outline-none focus:border-blue-500 transition-all font-medium"
                                                placeholder="Apt 4B (Optional)"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Zip Code</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.zip}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 outline-none focus:border-blue-500 transition-all font-medium"
                                                placeholder="10001"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">City</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.city}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 outline-none focus:border-blue-500 transition-all font-medium"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">State / Province</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.state}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 outline-none focus:border-blue-500 transition-all font-medium"
                                                placeholder="NY"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Country</label>
                                        <div className="relative">
                                            <select
                                                value={shippingInfo.country}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 outline-none focus:border-blue-500 transition-all font-medium appearance-none"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>United Kingdom</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsEditingShipping(false)}
                                        className="w-full bg-blue-600 text-white font-bold h-12 rounded-2xl hover:bg-blue-700 transition-colors mt-2"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl flex items-start gap-4 border border-slate-100 dark:border-slate-800">
                                    <div className="size-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-slate-900 dark:text-white text-lg">{shippingInfo.name}</p>
                                            <span className="text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">{shippingInfo.country === "United States" ? "US" : shippingInfo.country}</span>
                                        </div>
                                        <p className="text-slate-500 leading-relaxed mt-1">
                                            {shippingInfo.address}{shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ''}<br />
                                            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                                        </p>
                                        <p className="text-sm font-medium text-slate-400 mt-2 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">call</span>
                                            {shippingInfo.phone}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600">payments</span>
                                Payment Method
                            </h2>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                    Card
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('apple')}
                                    className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all ${paymentMethod === 'apple' ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                                    Apple
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-all ${paymentMethod === 'paypal' ? 'border-[#003087] bg-[#003087] text-white shadow-lg shadow-[#003087]/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">payments</span>
                                    PayPal
                                </button>
                            </div>

                            {/* Card Form */}
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Card Number</label>
                                    <div className="h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center px-4 gap-3 focus-within:border-blue-500 ring-4 ring-transparent focus-within:ring-blue-500/10 transition-all">
                                        <span className="material-symbols-outlined text-slate-400">credit_card</span>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="flex-1 bg-transparent outline-none font-medium h-full placeholder:text-slate-400 text-lg" />
                                        <div className="flex gap-1.5 opacity-50 grayscale">
                                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Expiry Date</label>
                                        <div className="h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center px-4 focus-within:border-blue-500 ring-4 ring-transparent focus-within:ring-blue-500/10 transition-all">
                                            <input type="text" placeholder="MM/YY" className="bg-transparent outline-none font-medium w-full h-full placeholder:text-slate-400 text-lg" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">CVC</label>
                                        <div className="h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center px-4 gap-2 focus-within:border-blue-500 ring-4 ring-transparent focus-within:ring-blue-500/10 transition-all">
                                            <input type="text" placeholder="123" className="bg-transparent outline-none font-medium w-full h-full placeholder:text-slate-400 text-lg" />
                                            <span className="material-symbols-outlined text-slate-400 text-[20px] cursor-help">help</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider ml-1">Cardholder Name</label>
                                    <div className="h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center px-4 focus-within:border-blue-500 ring-4 ring-transparent focus-within:ring-blue-500/10 transition-all">
                                        <input type="text" placeholder="Isabella Anderson" className="bg-transparent outline-none font-medium w-full h-full placeholder:text-slate-400 text-lg" />
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 mt-2 cursor-pointer group select-none" onClick={(e) => { e.preventDefault(); setSaveCard(!saveCard); }}>
                                    <div className={`size-6 border-2 rounded-lg flex items-center justify-center transition-all ${saveCard ? "bg-blue-600 border-blue-600" : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:border-blue-500"}`}>
                                        {saveCard && <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>}
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Save this card for future purchases</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-24">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>

                            <div className="flex flex-col gap-6 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex-shrink-0 relative overflow-hidden">
                                            <Image
                                                src={item.img}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 py-6 border-t border-dashed border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-slate-900 dark:text-white">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping</span>
                                    <span className="font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded text-sm">Free</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Estimated Tax</span>
                                    <span className="font-medium text-slate-900 dark:text-white">${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex items-end justify-between mb-2">
                                    <p className="text-slate-500 font-medium">Total Amount</p>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                                </div>
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/10 p-3 rounded-xl mb-6">
                                    <span className="material-symbols-outlined text-[20px] fill-current">lock</span>
                                    <span className="text-xs font-bold uppercase tracking-wider">Secure SSL Checkout</span>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold h-16 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg group"
                                >
                                    Place Order
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
