"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const BARBERS = [
    { id: 1, name: "James", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWv5GksqgjiUvlGn9iXiVXfWJtGlKWjTfq43bHxMg0jH9XkcXOHk8Dy-cXCbxaatOP6G_T0WxMZfWFA5LmCU7V1UZQCjwZM-qrBfSDSjoau9V7FU7B3uZiNb-sqkZSx2APGZ44IPDwVdKnHGHseAKQwOghnlRycq_mKtghZ_R3wCcDobfw3Ew7qh2vCxrkJ4ZbGvnhI12OoaxvxHg1g4MgQheRGQAvJ4ksZNgmyHUuZaGO0Qz-aAa0tFTVdNXPlcPk82niEcyfJPqZ" },
    { id: 2, name: "Marcus", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqsVxOkfu3CAg3at396RsEu3Eya1Fp525V09RGYg5zkMqDBoZdUJEqiAc_oN0CV0n3fYqPnY0_PFA4nHgdJ2AO4pV3jh-aHGOayZCmXaEcR9gEEWeQbrIvKV3juK1UUDIKklbeaEP6i7VwSzaUyWrO0FScQqzbVPyTRIriadJXBT18qgC-TyYBrr9ql4W_tMTgVlXiWRD4y7YK0ziUx4aZiYfOHFlsfP9D_N3h9lTB4dcS-TqppeBrDU4d-S7StecQEdRWUSDFxO2z" },
    { id: 3, name: "Sarah", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjv4ApnQ9hGbbk--qsMqy76gMnC-qHDFVTcqs7dXMo4zwOIfVl2fXDvqOx2oDdduDB_w1OJmra8wgFNYbEnoBg3pS60RfYBUDqmKzCf4uSUTrE-nVz8V2CkGY1Gvvs-hw04i1vw9JzXg331_KdOudaf-py-5z1vBViXN9KPT2Q2NCMWKMNf4XexQgyG_Lx26w8qaNrNYiKoWzR1Z5x7QvoQlrY7s1i33BHeTZd4tKLLqSbQzuyKIwzjpdXYpcIETnt6PKUWxdxKkJR" },
    { id: 4, name: "Jason", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2" },
];

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-blue-500 font-bold">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const service = searchParams.get('service');
    const isBooking = !!service;

    // Booking Data
    const barberId = searchParams.get('barberId');
    const timeParam = searchParams.get('time');
    const time = timeParam ? decodeURIComponent(timeParam) : null;
    const dateParam = searchParams.get('date');
    const dateStr = dateParam ? decodeURIComponent(dateParam) : null;
    const date = dateStr ? new Date(dateStr) : null;
    const barber = BARBERS.find(b => b.id.toString() === barberId);

    const [isDownloading, setIsDownloading] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [hasJoined, setHasJoined] = useState(false);

    // Booking Action State
    const [isAddingCalendar, setIsAddingCalendar] = useState(false);

    const handleDownload = () => {
        setIsDownloading(true);

        // Generate a text invoice
        const invoiceContent = `FADELAB - OFFICIAL RECEIPT
--------------------------------
Ref: #LAB-772
Date: ${new Date().toLocaleDateString()}
--------------------------------

Item:                 Price
Signature Haircut     $50.00
Hot Towel Shave       $15.00
Optimization Bonus   -$6.50

--------------------------------
TOTAL PAID:           $38.50
--------------------------------

Specialist: ${barber?.name || "Assigned"}
Session: ${date?.toLocaleDateString()} @ ${time}

Thank you for your business.
FadeLab - Tactical Grooming`;

        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice_LAB-772.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setTimeout(() => {
            setIsDownloading(false);
        }, 1000);
    };

    const handleJoinClub = () => {
        setIsJoining(true);
        setTimeout(() => {
            setIsJoining(false);
            setHasJoined(true);
        }, 1500);
    };

    const handleAddToCalendar = () => {
        setIsAddingCalendar(true);

        // Parse date and time to creates start/end times
        if (date && time) {
            const [timeStr, modifier] = time.split(' ');
            let [hours, minutes] = timeStr.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;

            const startDate = new Date(date);
            startDate.setHours(hours, minutes);

            const endDate = new Date(startDate);
            endDate.setMinutes(startDate.getMinutes() + 45); // 45 min duration

            // Format for ICS (YYYYMMDDTHHmmSS)
            const formatICSDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FadeLab//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${Date.now()}@fadelab.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:FadeLab Session with ${barber?.name || 'Specialist'}
DESCRIPTION:Premium grooming session at FadeLab.
LOCATION:123 Barber Lane, NY 10001
END:VEVENT
END:VCALENDAR`;

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'fadelab-session.ics';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }

        setTimeout(() => {
            setIsAddingCalendar(false);
        }, 1000);
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
    };

    const iconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 10,
                delay: 0.2
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display antialiased min-h-screen flex flex-col transition-colors duration-300">
            {/* Navbar */}
            <header className="w-full flex justify-start py-6 px-6 lg:px-10 border-b border-transparent bg-transparent sticky top-0 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href={isBooking ? "/" : "/shop"} className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#1e293b]/50 backdrop-blur-md border border-white/10 text-white hover:bg-blue-600 hover:text-white transition-all duration-300">
                        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="text-xs font-black uppercase tracking-widest">
                            {isBooking ? "Back to Home" : "Back to Shop"}
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-10 sm:py-16 gap-12">

                {/* Hero Confirmation */}
                <motion.div
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="flex flex-col items-center text-center max-w-2xl w-full"
                >
                    <motion.div
                        variants={iconVariants}
                        className="size-40 rounded-full bg-blue-500/10 flex items-center justify-center mb-8 border-[12px] border-black/20 shadow-2xl relative"
                    >
                        <div className="absolute inset-2 rounded-full border border-blue-500/20"></div>
                        <span
                            className="material-symbols-outlined text-7xl text-blue-500 leading-none drop-shadow-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            verified
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight">
                        {isBooking ? "Session Established" : "Order Confirmed"}
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-white/60 text-lg mb-8 font-light">
                        {isBooking
                            ? "Your appointment has been successfully secured."
                            : "Thank you for choosing Premium Barber."}
                    </motion.p>

                    <motion.div variants={itemVariants} className="w-full h-px bg-white/10 max-w-xs mb-8"></motion.div>

                    {isBooking && date ? (
                        <>
                            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                                {date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </motion.h2>
                            <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                                <span className="text-4xl font-black text-blue-500 tracking-tighter">{time}</span>
                                <div className="flex items-center gap-2 text-white/60 bg-white/5 px-4 py-2 rounded-full mt-2">
                                    <span className="material-symbols-outlined text-sm">content_cut</span>
                                    <span className="text-sm uppercase tracking-widest font-bold">Specialist: {barber?.name || "Next Available"}</span>
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-white mb-2">
                                Order #8492-B
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-white/60">
                                We’ve sent a receipt to <span className="font-medium text-white">alex.smith@example.com</span>
                            </motion.p>
                        </>
                    )}
                </motion.div>

                {/* Action Grid */}
                <motion.div
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
                >
                    {isBooking ? (
                        // Booking Specific Actions
                        <>
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-blue-500 transition-colors">event</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-white">Add to Calendar</h3>
                                <p className="text-sm text-white/50 mb-6">Don't miss your session.</p>
                                <button
                                    onClick={handleAddToCalendar}
                                    disabled={isAddingCalendar}
                                    className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors disabled:opacity-50"
                                >
                                    {isAddingCalendar ? "Downloading..." : <>Add Event <span className="material-symbols-outlined text-sm">add_circle</span></>}
                                </button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-blue-500 transition-colors">location_on</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-white">Get Directions</h3>
                                <p className="text-sm text-white/50 mb-6">123 Barber Lane, NY 10001</p>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=123+Barber+Lane,+NY+10001"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                                >
                                    Open Maps <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[#8b5cf6] group-hover:text-blue-500 transition-colors">receipt</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-white">Invoice</h3>
                                <p className="text-sm text-white/50 mb-6">Booking reference: #LAB-772</p>
                                <button
                                    onClick={handleDownload}
                                    className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                                >
                                    Download <span className="material-symbols-outlined text-sm">download</span>
                                </button>
                            </motion.div>
                        </>
                    ) : (
                        // Product Specific Actions (Original)
                        <>
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-blue-500 transition-colors">local_shipping</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-white">Track Your Package</h3>
                                <p className="text-sm text-white/50 mb-6">Estimated delivery: <span className="text-white font-medium">Friday</span></p>
                                <Link href="/track" className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                                    Track now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[#8b5cf6] group-hover:text-blue-500 transition-colors">receipt_long</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-white">Download Invoice</h3>
                                <p className="text-sm text-white/50 mb-6">Get your purchase PDF for records.</p>
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDownloading ? (
                                        <>Downloading...</>
                                    ) : (
                                        <>Download <span className="material-symbols-outlined text-sm">download</span></>
                                    )}
                                </button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[#f59e0b] group-hover:text-blue-500 transition-colors">hotel_class</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-white">Join the Club</h3>
                                <p className="text-sm text-white/50 mb-6">Get 10% off your next cut or product.</p>
                                <button
                                    onClick={handleJoinClub}
                                    disabled={isJoining || hasJoined}
                                    className={`text-sm font-bold flex items-center gap-1 transition-colors ${hasJoined ? 'text-green-500 cursor-default' : 'text-blue-500 hover:text-blue-400'}`}
                                >
                                    {isJoining ? (
                                        "Joining..."
                                    ) : hasJoined ? (
                                        <>Welcome VIP <span className="material-symbols-outlined text-sm">check</span></>
                                    ) : (
                                        <>Join VIP <span className="material-symbols-outlined text-sm">chevron_right</span></>
                                    )}
                                </button>
                            </motion.div>
                        </>
                    )}
                </motion.div>

                {/* Footer / Upsell - Only for Products or Generic */}
                {!isBooking && (
                    <motion.div
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="w-full max-w-4xl mt-12 bg-[#1e293b]/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
                        <div className="absolute inset-0 bg-center bg-cover ease-out scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCFWUU3nJ2s4N8vrKmzKAfynQTEtHJiBrhMqvMQMoVMkv_oWEFpIJOTBvnDWRh4tWOzhxzjztObVeu06If64_UkUAE_ST3a2EP73UWLim32BPR2pZtC_RE4VYsWUDAJ0mDnQpQ0j8bHhAKIHXLpiCtu5_gBwGeMilaNqrR_FRnlHLbpr5nJ1Zekto5dLx0OXu1oXQ3lrwx5y_qoTud4XXZqI5WUxfcPLtzZ6-2iMVnterA-l598SUqLwQvq-Yj57cHQQL5mbBNrEjC")' }}></div>

                        <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-lg">
                                <h3 className="font-bold text-2xl text-white mb-2">Master the Look</h3>
                                <p className="text-white/70">Learn how to use your new pomade with our master barber tutorial series. Included free with your purchase.</p>
                            </div>
                            <button className="whitespace-nowrap bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined">play_circle</span>
                                Watch Tutorial
                            </button>
                        </div>
                    </motion.div>
                )}

            </main>
        </div>
    );
}
