"use client";

import { useState } from "react";

export function LegalTab() {
    const [activeLegalTab, setActiveLegalTab] = useState("terms");

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Legal & Policies</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Review our terms, privacy practices, and operational policies.</p>
            </header>

            {/* Legal Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {[
                    { id: 'terms', label: 'Terms of Service' },
                    { id: 'privacy', label: 'Privacy Policy' },
                    { id: 'refund', label: 'Refund Policy' },
                    { id: 'cookies', label: 'Cookie Policy' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveLegalTab(tab.id)}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeLegalTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Legal Content */}
            <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5">
                {activeLegalTab === 'terms' && (
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-xl font-black text-white uppercase mb-4">Terms of Service</h2>
                        <p className="text-gray-400 mb-4">Last updated: January 2026</p>
                        <p className="text-gray-300 mb-4">Welcome to FadeLab. By accessing our services, you agree to be bound by these terms...</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">1. Use of Services</h3>
                        <p className="text-gray-300 mb-4">You must be at least 16 years old to use our booking services. All appointments are subject to availability and may be modified or cancelled in accordance with our cancellation policy.</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">2. Payment Terms</h3>
                        <p className="text-gray-300 mb-4">Payment is required at the time of service unless otherwise agreed. We accept all major credit cards and digital payment methods.</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">3. Cancellation Policy</h3>
                        <p className="text-gray-300">Appointments cancelled less than 2 hours before the scheduled time may incur a cancellation fee of up to 50% of the service cost.</p>
                    </div>
                )}
                {activeLegalTab === 'privacy' && (
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-xl font-black text-white uppercase mb-4">Privacy Policy</h2>
                        <p className="text-gray-400 mb-4">Last updated: January 2026</p>
                        <p className="text-gray-300 mb-4">Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">Data Collection</h3>
                        <p className="text-gray-300 mb-4">We collect information you provide directly, such as name, email, phone number, and appointment preferences.</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">Data Usage</h3>
                        <p className="text-gray-300">We use your data to provide and improve our services, process bookings, and communicate with you about appointments.</p>
                    </div>
                )}
                {activeLegalTab === 'refund' && (
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-xl font-black text-white uppercase mb-4">Refund Policy</h2>
                        <p className="text-gray-400 mb-4">Last updated: January 2026</p>
                        <p className="text-gray-300 mb-4">We strive for 100% satisfaction. If you're not happy with your service, please let us know within 48 hours.</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">Service Refunds</h3>
                        <p className="text-gray-300 mb-4">Refunds for services are evaluated on a case-by-case basis. We may offer a complimentary correction service or partial refund.</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">Product Refunds</h3>
                        <p className="text-gray-300">Unopened products may be returned within 30 days for a full refund. Opened products are non-refundable.</p>
                    </div>
                )}
                {activeLegalTab === 'cookies' && (
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-xl font-black text-white uppercase mb-4">Cookie Policy</h2>
                        <p className="text-gray-400 mb-4">Last updated: January 2026</p>
                        <p className="text-gray-300 mb-4">We use cookies and similar technologies to enhance your browsing experience.</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">Essential Cookies</h3>
                        <p className="text-gray-300 mb-4">These cookies are necessary for the website to function and cannot be switched off.</p>
                        <h3 className="text-lg font-bold text-white mt-6 mb-2">Analytics Cookies</h3>
                        <p className="text-gray-300">We use analytics cookies to understand how visitors interact with our website.</p>
                    </div>
                )}
            </div>
        </>
    );
}
