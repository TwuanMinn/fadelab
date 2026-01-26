"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutForm() {
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan') || 'executive';
    const billing = searchParams.get('billing') || 'monthly';

    // Determine price and title based on plan
    const getPlanDetails = () => {
        switch (plan) {
            case 'essential': return { price: 45, title: 'Essential Membership' };
            case 'elite': return { price: 150, title: 'Elite Membership' };
            default: return { price: 85, title: 'Executive Cut Membership' };
        }
    };

    const { price, title } = getPlanDetails();
    const finalPrice = billing === 'annual' ? price * 12 * 0.8 : price;

    return (
        <div className="flex-grow flex flex-col lg:flex-row h-full">
            {/* Left Panel: Plan Summary */}
            <div className="w-full lg:w-5/12 xl:w-4/12 bg-[#2d1525] relative overflow-hidden flex flex-col border-b lg:border-b-0 lg:border-r border-[#49223c]">
                {/* Background Texture/Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#49223c] via-[#23101d] to-[#23101d] opacity-50 z-0"></div>
                <div className="relative z-10 flex flex-col p-8 lg:p-12 h-full justify-center">
                    <div className="mb-8">
                        {plan === 'executive' && (
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">Best Value</span>
                        )}
                        <h2 className="text-white tracking-tight text-3xl lg:text-4xl font-bold leading-tight mb-2 capitalize">{title}</h2>
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-white text-3xl lg:text-[42px] font-bold leading-tight tracking-tight mt-2 mb-6">${finalPrice.toFixed(2)}</h1>
                            <span className="text-[#cb90b7] text-lg">/ {billing === 'annual' ? 'year' : 'month'}</span>
                        </div>
                        <p className="text-[#cb90b7] text-sm leading-relaxed mb-8">
                            Experience the pinnacle of grooming. Our {plan} plan ensures you always look your best with priority access and exclusive perks.
                        </p>
                    </div>
                    {/* Checklist */}
                    <div className="space-y-4 mb-8">
                        <label className="flex gap-x-3 items-start cursor-pointer group">
                            <div className="relative flex items-center justify-center mt-1">
                                <input defaultChecked className="appearance-none h-5 w-5 rounded border-[#49223c] border-2 bg-transparent checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-200" disabled type="checkbox" />
                                <span className="material-symbols-outlined absolute text-white text-sm pointer-events-none hidden checked:block">check</span>
                            </div>
                            <div>
                                <p className="text-white text-base font-medium leading-normal group-hover:text-primary transition-colors">Priority Booking</p>
                                <p className="text-[#cb90b7] text-xs">Skip the waitlist entirely.</p>
                            </div>
                        </label>
                        <label className="flex gap-x-3 items-start cursor-pointer group">
                            <div className="relative flex items-center justify-center mt-1">
                                <input defaultChecked className="appearance-none h-5 w-5 rounded border-[#49223c] border-2 bg-transparent checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-200" disabled type="checkbox" />
                                <span className="material-symbols-outlined absolute text-white text-sm pointer-events-none hidden checked:block">check</span>
                            </div>
                            <div>
                                <p className="text-white text-base font-medium leading-normal group-hover:text-primary transition-colors">Unlimited Trims</p>
                                <p className="text-[#cb90b7] text-xs">Keep it sharp between cuts.</p>
                            </div>
                        </label>
                        <label className="flex gap-x-3 items-start cursor-pointer group">
                            <div className="relative flex items-center justify-center mt-1">
                                <input defaultChecked className="appearance-none h-5 w-5 rounded border-[#49223c] border-2 bg-transparent checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-200" disabled type="checkbox" />
                                <span className="material-symbols-outlined absolute text-white text-sm pointer-events-none hidden checked:block">check</span>
                            </div>
                            <div>
                                <p className="text-white text-base font-medium leading-normal group-hover:text-primary transition-colors">Premium Product Discount</p>
                                <p className="text-[#cb90b7] text-xs">20% off all in-store products.</p>
                            </div>
                        </label>
                        <label className="flex gap-x-3 items-start cursor-pointer group">
                            <div className="relative flex items-center justify-center mt-1">
                                <input defaultChecked className="appearance-none h-5 w-5 rounded border-[#49223c] border-2 bg-transparent checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-200" disabled type="checkbox" />
                                <span className="material-symbols-outlined absolute text-white text-sm pointer-events-none hidden checked:block">check</span>
                            </div>
                            <div>
                                <p className="text-white text-base font-medium leading-normal group-hover:text-primary transition-colors">Guest Passes (2x/yr)</p>
                                <p className="text-[#cb90b7] text-xs">Bring a friend for the full treatment.</p>
                            </div>
                        </label>
                    </div>
                    {/* Meta Text */}
                    <div className="mt-auto border-t border-[#49223c] pt-6">
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[#cb90b7] text-sm mt-0.5">info</span>
                            <p className="text-[#cb90b7] text-xs font-normal leading-relaxed">
                                Billed {billing}. Renews automatically. You can cancel anytime from your account dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Payment Form */}
            <div className="w-full lg:w-7/12 xl:w-8/12 bg-[#23101d] p-6 lg:p-12 flex flex-col items-center justify-start overflow-y-auto">
                <div className="w-full max-w-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-white text-2xl font-bold">Payment Details</h2>
                        <div className="flex gap-2 opacity-60">
                            <span className="material-symbols-outlined text-3xl">credit_card</span>
                            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                        </div>
                    </div>
                    {/* Payment Methods */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-primary bg-primary/10 text-white transition-all">
                            <span className="material-symbols-outlined">credit_card</span>
                            <span className="text-sm font-bold">Card</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-[#49223c] bg-[#2d1525] text-[#cb90b7] hover:border-primary/50 hover:text-white transition-all">
                            <span className="material-symbols-outlined">account_balance</span>
                            <span className="text-sm font-bold">Bank</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-[#49223c] bg-[#2d1525] text-[#cb90b7] hover:border-primary/50 hover:text-white transition-all">
                            <span className="material-symbols-outlined">qr_code_scanner</span>
                            <span className="text-sm font-bold">Apple Pay</span>
                        </button>
                    </div>
                    {/* Form Fields */}
                    <form className="space-y-6">
                        {/* Card Number */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#cb90b7] ml-1">Card Number</label>
                            <div className="relative">
                                <input className="w-full h-12 px-6 rounded-full bg-[#2d1525] border border-[#49223c] text-white placeholder-[#cb90b7]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono" placeholder="0000 0000 0000 0000" type="text" />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                    <span className="material-symbols-outlined text-[#cb90b7]">lock</span>
                                </div>
                            </div>
                        </div>
                        {/* Expiry & CVC & Zip */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#cb90b7] ml-1">Expiry Date</label>
                                <input className="w-full h-12 px-6 rounded-full bg-[#2d1525] border border-[#49223c] text-white placeholder-[#cb90b7]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-center" placeholder="MM/YY" type="text" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#cb90b7] ml-1">CVC</label>
                                <div className="relative">
                                    <input className="w-full h-12 px-6 rounded-full bg-[#2d1525] border border-[#49223c] text-white placeholder-[#cb90b7]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-center" placeholder="123" type="text" />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#cb90b7] text-lg cursor-help">help</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#cb90b7] ml-1">Zip Code</label>
                                <input className="w-full h-12 px-6 rounded-full bg-[#2d1525] border border-[#49223c] text-white placeholder-[#cb90b7]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-center" placeholder="90210" type="text" />
                            </div>
                        </div>
                        {/* Name on Card */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#cb90b7] ml-1">Name on Card</label>
                            <input className="w-full h-12 px-6 rounded-full bg-[#2d1525] border border-[#49223c] text-white placeholder-[#cb90b7]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="John Doe" type="text" />
                        </div>
                        {/* Promo Code */}
                        <div className="pt-2">
                            <label className="text-sm font-bold text-[#cb90b7] ml-1 mb-2 block">Have a referral code?</label>
                            <div className="flex gap-2">
                                <input className="flex-1 h-12 px-6 rounded-full bg-[#2d1525] border border-[#49223c] text-white placeholder-[#cb90b7]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all uppercase" placeholder="PROMO123" type="text" />
                                <button className="px-6 h-12 rounded-full border border-[#49223c] bg-[#2d1525] text-white font-bold hover:bg-[#49223c] transition-colors" type="button">Apply</button>
                            </div>
                        </div>
                    </form>
                    <div className="h-px w-full bg-[#49223c] my-8"></div>
                    {/* Auto-Renewal Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#2d1525] border border-[#49223c] mb-6">
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-sm">Enable Auto-Renewal</span>
                            <span className="text-primary text-xs">Save 10% on your first month</span>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                            <div className="relative w-11 h-6 bg-[#49223c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    {/* Terms & Action */}
                    <div className="space-y-6">
                        <label className="flex gap-x-3 items-start cursor-pointer">
                            <input className="mt-1 appearance-none h-5 w-5 min-w-[20px] rounded border-[#49223c] border-2 bg-transparent checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all" type="checkbox" />
                            <p className="text-[#cb90b7] text-sm leading-tight">
                                I agree to the <Link className="text-white hover:text-primary underline decoration-primary/50 underline-offset-4" href="#">Membership Agreement</Link> and authorize recurring charges.
                            </p>
                        </label>
                        <button className="w-full h-14 bg-primary hover:bg-[#d90b94] active:scale-[0.99] text-white text-lg font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(242,13,166,0.3)] hover:shadow-[0_0_30px_rgba(242,13,166,0.5)]">
                            <span>Activate Membership</span>
                            <span className="w-1 h-1 bg-white rounded-full mx-1"></span>
                            <span>${finalPrice.toFixed(2)}</span>
                            <span className="material-symbols-outlined ml-1">arrow_forward</span>
                        </button>
                        <div className="flex justify-center items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex gap-2 text-xs text-center text-[#cb90b7]">
                                <span className="bg-white/10 px-2 py-1 rounded">VISA</span>
                                <span className="bg-white/10 px-2 py-1 rounded">MC</span>
                                <span className="bg-white/10 px-2 py-1 rounded">AMEX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <div className="bg-[#23101d] text-white font-display antialiased min-h-screen flex flex-col">
            {/* Top Navbar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#49223c] px-6 lg:px-10 py-4 bg-[#23101d] sticky top-0 z-50">
                <div className="flex items-center gap-4 text-white">
                    <Link href="/" className="size-8 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-3xl">content_cut</span>
                    </Link>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-tight">The Executive Barbershop</h2>
                </div>
                <div className="flex items-center gap-2 text-[#cb90b7] text-sm font-medium bg-[#2d1525] py-2 px-4 rounded-full border border-[#49223c]">
                    <span className="material-symbols-outlined text-base text-primary">lock</span>
                    <span>Secure SSL Checkout</span>
                </div>
            </header>

            <Suspense fallback={<div className="flex-grow flex items-center justify-center text-white">Loading checkout options...</div>}>
                <CheckoutForm />
            </Suspense>
        </div>
    );
}
