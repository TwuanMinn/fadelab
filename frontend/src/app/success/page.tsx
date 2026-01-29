"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getBarberById } from "@/lib/supabase";
import { services } from "@/lib/services-data";
import { useAuth } from "@/lib/auth-context";
import { SupportModal } from "@/components/ui/SupportModal";

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-blue-500 font-bold">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const serviceSlug = searchParams.get('service');
    const isBooking = !!serviceSlug;

    // Booking Data from URL params
    const barberId = searchParams.get('barberId');
    const timeParam = searchParams.get('time');
    const time = timeParam ? decodeURIComponent(timeParam) : null;
    const dateParam = searchParams.get('date');
    const appointmentId = searchParams.get('appointmentId');

    // Parse date carefully to avoid timezone issues
    // The date param can be either:
    // 1. YYYY-MM-DD format (legacy)
    // 2. Full ISO string (new format - preserves exact date)
    const parseBookingDate = (dateStr: string | null): Date | null => {
        if (!dateStr) return null;
        try {
            // Check if it's YYYY-MM-DD format (legacy)
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                const [year, month, day] = dateStr.split('-').map(Number);
                return new Date(year, month - 1, day);
            }
            // Check if it's ISO string (new format)
            if (dateStr.includes('T') && dateStr.includes('-')) {
                return new Date(dateStr);
            }
            // Fallback: try as any date string
            return new Date(dateStr);
        } catch {
            return null;
        }
    };

    const date = parseBookingDate(dateParam);

    // Dynamic barber data from database
    const [barberName, setBarberName] = useState<string | null>(null);
    const [barberImage, setBarberImage] = useState<string | null>(null);
    const [loadingBarber, setLoadingBarber] = useState(true);

    // Get service details from services data
    const serviceDetails = services.find(s => s.id === serviceSlug);
    const serviceName = serviceDetails?.name || "Grooming Session";
    const servicePrice = serviceDetails?.price || 50;
    // Duration is a string like "30-45 min" - extract the first number
    const durationStr = serviceDetails?.duration || "45";
    const durationMatch = durationStr.match(/\d+/);
    const serviceDuration = durationMatch ? parseInt(durationMatch[0], 10) : 45;

    // Fetch barber details from database
    useEffect(() => {
        async function fetchBarber() {
            if (!barberId) {
                setLoadingBarber(false);
                return;
            }

            try {
                const barber = await getBarberById(barberId);
                if (barber) {
                    setBarberName(barber.name);
                    setBarberImage(barber.image);
                }
            } catch (error) {
                console.error('Error fetching barber:', error);
            } finally {
                setLoadingBarber(false);
            }
        }

        fetchBarber();
    }, [barberId]);

    const [isDownloading, setIsDownloading] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [hasJoined, setHasJoined] = useState(false);
    const [isAddingCalendar, setIsAddingCalendar] = useState(false);

    // Generate unique reference number - client-side only to avoid hydration mismatch
    const [refNumber, setRefNumber] = useState<string>('');

    useEffect(() => {
        if (appointmentId) {
            setRefNumber(`LAB-${appointmentId.slice(-6).toUpperCase()}`);
        } else {
            // Generate random ref only on client to avoid hydration mismatch
            setRefNumber(`LAB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
        }
    }, [appointmentId]);

    const handleDownload = async () => {
        setIsDownloading(true);

        try {
            // Generate professional PDF invoice via API
            const invoiceData = {
                type: 'booking',
                reference: refNumber,
                details: {
                    serviceName,
                    servicePrice,
                    specialist: barberName,
                    date: date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
                    time,
                    duration: serviceDuration,
                    customerEmail: user?.email,
                    addons: [
                        { name: "Hot Towel Treatment", description: "Relaxing steam towel treatment", price: 15 }
                    ]
                }
            };

            const response = await fetch('/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData),
            });

            if (response.ok) {
                const { invoice } = await response.json();
                
                // Generate HTML for professional invoice
                const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>FadeLab Invoice - ${refNumber}</title>
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .invoice { background: white; max-width: 800px; margin: 0 auto; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .header h1 { font-size: 32px; margin: 0; color: #333; }
        .header p { font-size: 14px; color: #666; margin: 5px 0; }
        .info { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .info-section { flex: 1; }
        .info-section h3 { font-size: 16px; margin: 0 0 10px 0; color: #333; }
        .info-section p { font-size: 14px; margin: 5px 0; color: #666; }
        .items { margin-bottom: 30px; }
        .items table { width: 100%; border-collapse: collapse; }
        .items th, .items td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .items th { background: #f8f8f8; font-weight: bold; }
        .items td:last-child { text-align: right; }
        .summary { text-align: right; margin-top: 20px; }
        .summary p { font-size: 14px; margin: 5px 0; color: #666; }
        .summary .total { font-size: 24px; font-weight: bold; color: #333; margin-top: 10px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        @media print { body { background: white; } .invoice { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <h1>FADELAB</h1>
            <p>Official Receipt</p>
            <p><strong>Reference:</strong> #${invoice.reference}</p>
            <p><strong>Date:</strong> ${invoice.date}</p>
        </div>

        <div class="info">
            <div class="info-section">
                <h3>BILLING INFORMATION</h3>
                <p><strong>Service:</strong> ${invoice.service.name}</p>
                <p><strong>Specialist:</strong> ${invoice.service.specialist}</p>
                <p><strong>Date:</strong> ${invoice.service.date}</p>
                <p><strong>Time:</strong> ${invoice.service.time}</p>
                <p><strong>Duration:</strong> ${invoice.service.duration} minutes</p>
            </div>
            <div class="info-section">
                <h3>COMPANY INFORMATION</h3>
                <p><strong>FadeLab</strong></p>
                <p>${invoice.company.address}</p>
                <p>${invoice.company.phone}</p>
                <p>${invoice.company.email}</p>
            </div>
        </div>

        <div class="items">
            <table>
                <thead>
                    <tr>
                        <th>Service Description</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.items.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.unitPrice.toFixed(2)}</td>
                        <td>$${item.total.toFixed(2)}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="summary">
            <p>Subtotal: $${invoice.summary.subtotal.toFixed(2)}</p>
            <p>Discount (10%): -$${invoice.summary.discount.toFixed(2)}</p>
            <p>Tax: $${invoice.summary.tax.toFixed(2)}</p>
            <p class="total">Total Paid: $${invoice.summary.total.toFixed(2)}</p>
        </div>

        <div class="footer">
            <p>Thank you for choosing FadeLab - Tactical Grooming Excellence</p>
            <p>This is a computer-generated receipt and does not require a signature</p>
        </div>
    </div>
</body>
</html>`;

                // Create blob and download
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Invoice_${refNumber}.html`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                // Open print dialog for PDF generation
                setTimeout(() => {
                    window.print();
                }, 500);
            } else {
                throw new Error('Failed to generate invoice');
            }
        } catch (error) {
            console.error('Error generating invoice:', error);
            
            // Fallback to simple text invoice
            const invoiceItems = [
                { name: serviceName, price: servicePrice },
                { name: "Hot Towel Treatment", price: 15 },
            ];
            const subtotal = invoiceItems.reduce((sum, item) => sum + item.price, 0);
            const discount = subtotal * 0.1;
            const total = subtotal - discount;

            const invoiceContent = `FADELAB - OFFICIAL RECEIPT
===============================
Reference: #${refNumber}
Date: ${new Date().toLocaleDateString()}
===============================

BOOKING DETAILS:
Service: ${serviceName}
Specialist: ${barberName || "Assigned"}
Appointment: ${date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
Time: ${time}
Duration: ${serviceDuration} minutes

--------------------------------
CHARGES:
${invoiceItems.map(item => `${item.name.padEnd(25)} $${item.price.toFixed(2)}`).join('\n')}

--------------------------------
Subtotal:                  $${subtotal.toFixed(2)}
Loyalty Discount (10%):   -$${discount.toFixed(2)}
--------------------------------
TOTAL PAID:               $${total.toFixed(2)}
===============================

Thank you for choosing FadeLab.
Tactical Grooming Excellence.
Location: 123 Barber Lane, NY 10001
`;

            const blob = new Blob([invoiceContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice_${refNumber}.txt`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } finally {
            setTimeout(() => {
                setIsDownloading(false);
            }, 1000);
        }
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

        if (date && time) {
            // Enhanced time parsing
            const parseTime = (timeStr: string): { hours: number; minutes: number } => {
                const [mainTime, modifier] = timeStr.trim().split(' ');
                const [hours, minutes] = mainTime.split(':').map(Number);
                
                let parsedHours = hours;
                if (modifier === 'PM' && hours < 12) parsedHours += 12;
                if (modifier === 'AM' && hours === 12) parsedHours = 0;
                
                return { hours: parsedHours, minutes: minutes || 0 };
            };

            const { hours, minutes } = parseTime(time);

            // Create start date using the parsed date and time
            const startDate = new Date(date);
            startDate.setHours(hours, minutes, 0, 0);
            startDate.setSeconds(0, 0); // Clear seconds and milliseconds

            const endDate = new Date(startDate);
            endDate.setMinutes(startDate.getMinutes() + serviceDuration);

            // Format for ICS (YYYYMMDDTHHmmSS) - using UTC to avoid timezone issues
            const formatICSDate = (d: Date) => {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const hour = String(d.getHours()).padStart(2, '0');
                const min = String(d.getMinutes()).padStart(2, '0');
                const sec = String(d.getSeconds()).padStart(2, '0');
                return `${year}${month}${day}T${hour}${min}${sec}`;
            };

            // Create comprehensive ICS content
            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FadeLab//NONSGML v1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VTIMEZONE
TZID:America/New_York
BEGIN:STANDARD
DTSTART:20071104T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20070311T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:${appointmentId || Date.now()}@fadelab.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART;TZID=America/New_York:${formatICSDate(startDate)}
DTEND;TZID=America/New_York:${formatICSDate(endDate)}
SUMMARY:FadeLab: ${serviceName} with ${barberName || 'Specialist'}
DESCRIPTION:Premium grooming session at FadeLab.\\n\\nService: ${serviceName}\\nSpecialist: ${barberName || 'Assigned'}\\nDuration: ${serviceDuration} minutes\\nReference: ${refNumber}\\n\\nPlease arrive 5 minutes early.\\n\\nLocation: 123 Barber Lane, NY 10001\\nPhone: (555) 123-4567
LOCATION:123 Barber Lane, NY 10001
STATUS:CONFIRMED
SEQUENCE:0
TRANSP:OPAQUE
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder: FadeLab appointment in 30 minutes
TRIGGER:-PT30M
END:VALARM
END:VEVENT
END:VCALENDAR`;

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `fadelab-${refNumber}.ics`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Also add to Google Calendar option
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=FadeLab:+${encodeURIComponent(serviceName)}+with+${encodeURIComponent(barberName || 'Specialist')}&dates=${formatICSDate(startDate)}/${formatICSDate(endDate)}&details=Premium+grooming+session+at+FadeLab.%0A%0AService:+${encodeURIComponent(serviceName)}%0ASpecialist:+${encodeURIComponent(barberName || 'Assigned')}%0ADuration:+${serviceDuration}+minutes%0AReference:+${refNumber}%0A%0APlease+arrive+5+minutes+early.%0A%0ALocation:+123+Barber+Lane,+NY+10001&location=123+Barber+Lane,+NY+10001&sf=true&output=xml`;
            
            // Open Google Calendar in a new tab as an alternative
            setTimeout(() => {
                window.open(googleCalendarUrl, '_blank');
            }, 500);
        }

        setTimeout(() => {
            setIsAddingCalendar(false);
        }, 1000);
    };

const [showSupportModal, setShowSupportModal] = useState(false);

    const handleNeedHelp = () => {
        setShowSupportModal(true);
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
            <header className="w-full flex justify-between py-6 px-6 lg:px-10 border-b border-transparent bg-transparent sticky top-0 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href={isBooking ? "/" : "/shop"} className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#1e293b]/50 backdrop-blur-md border border-white/10 text-white hover:bg-blue-600 hover:text-white transition-all duration-300">
                        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="text-xs font-black uppercase tracking-widest">
                            {isBooking ? "Back to Home" : "Back to Shop"}
                        </span>
                    </Link>
                </div>
                {isBooking && (
                    <div className="pointer-events-auto">
                        <Link href="/profile?tab=bookings" className="group flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                            <span className="material-symbols-outlined text-lg">calendar_month</span>
                            <span className="text-xs font-black uppercase tracking-widest">
                                View My Bookings
                            </span>
                        </Link>
                    </div>
                )}
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

                    <motion.p variants={itemVariants} className="text-white/60 text-lg mb-4 font-light">
                        {isBooking
                            ? "Your appointment has been successfully secured."
                            : "Thank you for choosing FadeLab."}
                    </motion.p>

                    <motion.p variants={itemVariants} className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-8" suppressHydrationWarning>
                        Reference: #{refNumber || 'Loading...'}
                    </motion.p>

                    <motion.div variants={itemVariants} className="w-full h-px bg-white/10 max-w-xs mb-8"></motion.div>

                    {isBooking && date ? (
                        <>
                            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                                {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </motion.h2>
                            <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                                <span className="text-4xl font-black text-blue-500 tracking-tighter">{time}</span>
                                <div className="flex items-center gap-2 text-white/60 bg-white/5 px-4 py-2 rounded-full mt-2">
                                    <span className="material-symbols-outlined text-sm">content_cut</span>
                                    <span className="text-sm uppercase tracking-widest font-bold">
                                        {loadingBarber ? "Loading..." : `Specialist: ${barberName || "Next Available"}`}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-white/40 mt-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span className="text-xs uppercase tracking-widest font-medium">
                                        {serviceName} • {serviceDuration} min
                                    </span>
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-white mb-2" suppressHydrationWarning>
                                Order #{refNumber || 'Loading...'}
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-white/60">
                                We've sent a receipt to <span className="font-medium text-white">{user?.email || "your email"}</span>
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
                        <>
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-blue-500 transition-colors">event</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-white">Add to Calendar</h3>
                                <p className="text-sm text-white/50 mb-6">Don't miss your session.</p>
                                <button
                                    onClick={handleAddToCalendar}
                                    disabled={isAddingCalendar || !date}
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
                                <p className="text-sm text-white/50 mb-6">Ref: #{refNumber}</p>
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors disabled:opacity-50"
                                >
                                    {isDownloading ? "Downloading..." : <>Download <span className="material-symbols-outlined text-sm">download</span></>}
                                </button>
                            </motion.div>
                        </>
                    ) : (
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
                                <p className="text-sm text-white/50 mb-6">Get your purchase receipt.</p>
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

                {/* Need Help Button - Always visible */}
                <motion.div
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="w-full max-w-4xl"
                >
                    <motion.button
                        variants={itemVariants}
                        onClick={handleNeedHelp}
                        className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-blue-600 hover:border-blue-500 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">help</span>
                        Need Help with this {isBooking ? "Booking" : "Order"}?
                    </motion.button>
                </motion.div>

                {/* Footer / Upsell - Only for Products */}
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

            {/* Support Modal */}
            <SupportModal
                isOpen={showSupportModal}
                onClose={() => setShowSupportModal(false)}
                type={isBooking ? 'booking' : 'order'}
                reference={refNumber}
                details={{
                    serviceName: isBooking ? serviceName : undefined,
                    date: isBooking && date ? date.toISOString() : undefined,
                    time: isBooking ? time : undefined,
                    specialist: isBooking ? barberName : undefined,
                    userEmail: user?.email
                }}
            />
        </div>
    );
}
