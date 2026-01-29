"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface OrderItem {
    id: number;
    name: string;
    price: number;
    img: string;
    quantity: number;
    category: string;
}

interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    subtotal: number;
    tax: number;
    shipping: number;
    status: string;
    tracking_number?: string;
    created_at: string;
    shipping_address?: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
    };
}

// Fallback demo items if no order found
const DEMO_ITEMS: OrderItem[] = [
    { id: 1, name: "Royal Cut Clippers", category: "Professional Series", price: 120, quantity: 1, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsGEuvAyNAFanVYyQfZi7Sb4RalLFPU71J2PG3RbFhSCnMMClS_33oY5oClkaApwrn_0j6KVsjWTEzAlvZR48mKAPIfNn-9xBCeAD8Sks2zh44czBRVJ3sIXto_KBZuNXweSyL8Ry0kGCbiQo8h6HycrRAVI8-C8IkDrA6AnI_PRA5g98kcAvzuLnZpH0TkaJAab0qXzRP37H-FBfI7oKczQHdc76GqJGBf48wgSdqWEQaEVtAKEH4J7o8h3yK6erObzbsS1qCv4ql" },
    { id: 2, name: "Matte Pomade", category: "Strong Hold", price: 25, quantity: 1, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCFWUU3nJ2s4N8vrKmzKAfynQTEtHJiBrhMqvMQMoVMkv_oWEFpIJOTBvnDWRh4tWOzhxzjztObVeu06If64_UkUAE_ST3a2EP73UWLim32BPR2pZtC_RE4VYsWUDAJ0mDnQpQ0j8bHhAKIHXLpiCtu5_gBwGeMilaNqrR_FRnlHLbpr5nJ1Zekto5dLx0OXu1oXQ3lrwx5y_qoTud4XXZqI5WUxfcPLtzZ6-2iMVnterA-l598SUqLwQvq-Yj57cHQQL5mbBNrEjC" }
];

export default function TrackOrderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-blue-500 font-bold">Loading...</div>}>
            <TrackOrderContent />
        </Suspense>
    );
}

function TrackOrderContent() {
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const orderId = searchParams.get('orderId');

    const [mounted, setMounted] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Fetch order from database
    useEffect(() => {
        async function fetchOrder() {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                let query = supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                // If specific order ID provided, fetch that one
                if (orderId) {
                    query = query.eq('id', orderId);
                }

                const { data, error: fetchError } = await query.limit(1).single();

                if (fetchError) {
                    if (fetchError.code !== 'PGRST116') { // Not found
                        console.error('Error fetching order:', fetchError);
                        setError('Failed to load order details.');
                    }
                } else if (data) {
                    setOrder(data as Order);
                }
            } catch (err) {
                console.error('Error fetching order:', err);
                setError('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [user, orderId]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use order items if available, otherwise show demo items
    const orderItems = order?.items || DEMO_ITEMS;
    const orderTotal = order?.total || orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate tracking number only on client-side to avoid hydration mismatch
    // Use order data as source of truth
    const [trackingNumber, setTrackingNumber] = useState<string>('');

    useEffect(() => {
        if (order?.tracking_number) {
            setTrackingNumber(order.tracking_number);
        } else if (orderId) {
            // Fallback: use orderId to generate a stable tracking number
            setTrackingNumber(`US-${orderId.slice(-8).toUpperCase()}`);
        } else {
            // For demo, generate a random tracking number only on client
            setTrackingNumber(`US-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
        }
    }, [order, orderId]);

    const orderDate = order ? new Date(order.created_at) : new Date();

    // Calculate estimated delivery (5 days from order)
    const estimatedDelivery = new Date(orderDate);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const handleCopyTracking = async () => {
        try {
            await navigator.clipboard.writeText(trackingNumber);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownloadInvoice = () => {
        setIsDownloading(true);

        const invoiceContent = `FADELAB - ORDER INVOICE
================================
Order ID: ${order?.id || 'DEMO-ORDER'}
Tracking: #${trackingNumber}
Date: ${orderDate.toLocaleDateString()}
================================

ITEMS ORDERED:
${orderItems.map(item => `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

--------------------------------
Subtotal:    $${(order?.subtotal || orderTotal * 0.9).toFixed(2)}
Tax:         $${(order?.tax || orderTotal * 0.08).toFixed(2)}
Shipping:    $${(order?.shipping || 0).toFixed(2)}
--------------------------------
TOTAL:       $${orderTotal.toFixed(2)}
================================

${order?.shipping_address ? `
SHIPPING TO:
${order.shipping_address.firstName} ${order.shipping_address.lastName}
${order.shipping_address.address}
${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.zipCode}
` : ''}

Thank you for shopping with FadeLab!
`;

        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice_${trackingNumber}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setTimeout(() => setIsDownloading(false), 1000);
    };

    const handleNeedHelp = () => {
        const subject = encodeURIComponent(`Help with Order #${trackingNumber}`);
        const body = encodeURIComponent(`Hi FadeLab Support,

I need assistance with my order:

Order ID: ${order?.id || 'N/A'}
Tracking Number: ${trackingNumber}
Order Date: ${orderDate.toLocaleDateString()}
Total: $${orderTotal.toFixed(2)}

Items:
${orderItems.map(item => `- ${item.name} (x${item.quantity})`).join('\n')}

My issue:
[Please describe your issue here]

Thank you,
${user?.email || 'Customer'}`);

        window.location.href = `mailto:support@fadelab.com?subject=${subject}&body=${body}`;
    };

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display antialiased min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display antialiased min-h-screen flex flex-col transition-colors duration-300">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-6 lg:px-10 py-5 bg-transparent sticky top-0 z-50 backdrop-blur-md">
                <Link href="/success" className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors bg-white/10 px-5 py-2.5 rounded-full hover:bg-white/20">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    <span className="text-lg font-bold">Back</span>
                </Link>
                <div className="flex gap-3">
                    <button
                        onClick={handleDownloadInvoice}
                        disabled={isDownloading}
                        className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-lg">receipt</span>
                        <span className="text-sm font-bold hidden md:inline">{isDownloading ? 'Downloading...' : 'Invoice'}</span>
                    </button>
                </div>
            </header>

            <main className="flex-grow px-6 md:px-20 py-8 max-w-[1400px] mx-auto w-full">
                <motion.div
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {/* Page Heading & Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <motion.div variants={itemVariants} className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white">Detailed Order Tracking</h1>
                            <p className="text-white/60 text-base font-medium">
                                Tracking Number: <span className="text-white font-bold select-all" suppressHydrationWarning>#{trackingNumber || 'Loading...'}</span>
                            </p>
                            {!order && (
                                <p className="text-yellow-500 text-sm">
                                    <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                                    Showing demo data. Log in to view your actual orders.
                                </p>
                            )}
                        </motion.div>
                        <motion.button
                            variants={itemVariants}
                            onClick={handleCopyTracking}
                            className={`flex items-center gap-2 backdrop-blur-md border px-5 py-3 rounded-full font-bold transition-colors ${copySuccess
                                ? 'bg-green-600 border-green-500 text-white'
                                : 'bg-[#1e293b]/50 border-white/10 text-white hover:bg-blue-600 hover:border-blue-500'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {copySuccess ? 'check' : 'content_copy'}
                            </span>
                            {copySuccess ? 'Copied!' : 'Copy Number'}
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Map & Timeline */}
                        <div className="lg:col-span-8 flex flex-col gap-8">
                            {/* Status & Map Card */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${order?.status === 'delivered'
                                            ? 'bg-green-500/10 text-green-500'
                                            : order?.status === 'shipped'
                                                ? 'bg-blue-500/10 text-blue-500'
                                                : 'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            Status: {order?.status || 'In Transit'}
                                        </span>
                                        <h2 className="text-3xl font-bold tracking-tight text-white">
                                            Arriving by <span className="text-blue-500">{estimatedDelivery.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                                        </h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="size-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-colors" title="Refresh Status">
                                            <span className="material-symbols-outlined">refresh</span>
                                        </button>
                                        <button
                                            onClick={handleNeedHelp}
                                            className="size-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-colors"
                                            title="Contact Support"
                                        >
                                            <span className="material-symbols-outlined">support_agent</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden group">
                                    <div className="absolute inset-0 bg-center bg-cover filter grayscale contrast-125 brightness-[0.7] group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgD5Fxr5qviPeawU_gootIYuKdL7r-l7xIw5gEuFQfXX3SRb1cjNOPr9rZU4PzCnq3zoKcwgIYsQCaDjWgdV-phG1kOqUHbKIL7VO3XmHS82izRhZ76eLkj3rPJLYu2eWhQFmhF1XxSg9FrklKZtMiC8d0pJ4r4MqSMstfuPzxlelpvxHuuAGdp0dYkyeyoI5mS-pWwxrugiSVemyI5F1TdDvU_MJG548qlJ8-4vEjqBgiciTms6pejVGb2b76nNRUQRRiFVxTxqco")' }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                                    {/* Location Pin */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <div className="relative flex items-center justify-center size-12">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full size-4 bg-blue-500 border-4 border-black"></span>
                                        </div>
                                        <div className="mt-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                                            Distribution Center, NY
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4">
                                        <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-white/20 transition">
                                            <span className="material-symbols-outlined text-[16px]">open_in_full</span>
                                            View Full Map
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Timeline Stepper */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10 shadow-sm">
                                <h3 className="text-xl font-bold mb-8 text-white">Shipment Progress</h3>
                                <div className="relative flex flex-col md:flex-row justify-between md:items-center gap-8 md:gap-0">
                                    {/* Progress Bar Background (Desktop) */}
                                    <div className="hidden md:block absolute top-[14px] left-0 w-full h-1 bg-white/10 -z-0"></div>
                                    {/* Active Progress Bar (Desktop) */}
                                    <div className="hidden md:block absolute top-[14px] left-0 w-1/2 h-1 bg-blue-600 -z-0"></div>

                                    {/* Progress Bar (Mobile) */}
                                    <div className="md:hidden absolute left-[15px] top-4 bottom-4 w-1 bg-white/10 -z-0"></div>
                                    <div className="md:hidden absolute left-[15px] top-4 h-1/2 w-1 bg-blue-600 -z-0"></div>

                                    {/* Step 1: Completed */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-white">Order Placed</p>
                                            <p className="text-xs text-white/60">{orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    {/* Step 2: Completed */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-white">Shipped</p>
                                            <p className="text-xs text-white/60">{new Date(orderDate.getTime() + 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    {/* Step 3: Active */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="relative size-8 rounded-full bg-[#1e293b] border-2 border-blue-500 flex items-center justify-center text-blue-500 shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="animate-pulse absolute inset-0 rounded-full bg-blue-500/20"></span>
                                            <span className="material-symbols-outlined text-sm font-bold">local_shipping</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-blue-500">In Transit</p>
                                            <p className="text-xs text-white/60">Processing..</p>
                                        </div>
                                    </div>

                                    {/* Step 4: Pending */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="material-symbols-outlined text-sm font-bold">inventory_2</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-white/40">Out for Delivery</p>
                                            <p className="text-xs text-white/40 opacity-50">Estimated {estimatedDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    {/* Step 5: Pending */}
                                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                                        <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 shadow-[0_0_0_4px_#1e293b] z-10">
                                            <span className="material-symbols-outlined text-sm font-bold">home_pin</span>
                                        </div>
                                        <div className="md:text-center pt-1 md:pt-2">
                                            <p className="text-sm font-bold text-white/40">Delivered</p>
                                            <p className="text-xs text-white/40 opacity-50">Pending</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Details & Notification */}
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            {/* Order Contents */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white">Package Contents</h3>
                                    <span className="text-sm font-medium text-white/60">{orderItems.reduce((sum, item) => sum + item.quantity, 0)} Items</span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {orderItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                            <div className="size-16 rounded-lg bg-white/10 bg-center bg-cover shrink-0" style={{ backgroundImage: `url("${item.img}")` }}></div>
                                            <div className="flex flex-col flex-1">
                                                <h4 className="font-bold text-sm leading-tight text-white group-hover:text-blue-500 transition-colors">{item.name}</h4>
                                                <p className="text-xs text-white/60 mt-1">{item.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-sm text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-xs text-white/60">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                                    <span className="font-medium text-white/60">Total Value</span>
                                    <span className="font-black text-lg text-white">${orderTotal.toFixed(2)}</span>
                                </div>
                            </motion.div>

                            {/* Notifications Toggle */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b]/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-blue-500">notifications_active</span>
                                    <h3 className="text-lg font-bold text-white">Get Notified</h3>
                                </div>
                                <p className="text-sm text-white/60 mb-6">Receive updates about your package location and delivery status.</p>
                                <div className="flex flex-col gap-4">
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white/5 p-2 rounded-full text-white">
                                                <span className="material-symbols-outlined text-[18px]">sms</span>
                                            </div>
                                            <span className="font-medium text-sm text-white group-hover:text-blue-500 transition-colors">SMS Updates</span>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input defaultChecked className="sr-only peer" type="checkbox" />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </div>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white/5 p-2 rounded-full text-white">
                                                <span className="material-symbols-outlined text-[18px]">mail</span>
                                            </div>
                                            <span className="font-medium text-sm text-white group-hover:text-blue-500 transition-colors">Email Updates</span>
                                        </div>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input className="sr-only peer" type="checkbox" />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </div>
                                    </label>
                                </div>
                            </motion.div>

                            {/* Help Button */}
                            <motion.button
                                variants={itemVariants}
                                onClick={handleNeedHelp}
                                className="w-full py-4 rounded-xl border border-transparent bg-white/10 text-white font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">help</span>
                                Need Help with this Order?
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
