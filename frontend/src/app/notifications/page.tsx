"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NotificationsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Shopping", "AI Assistant", "System"];

    const notifications = [
        {
            id: 1,
            type: "Shopping",
            status: "Shipped",
            title: "Your Eames Chair has shipped!",
            description: "Track your package now to see when it arrives at your doorstep.",
            time: "2h ago",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiFeU9NRCaqYxukCx4bl_pppf_emr2DQxl4_8O2QlPpJA8N4dbIAF4L9pB4gb99ZlzByqIaiJ8rghrVyR8tVY9Zei7uDPv5HVJL7nkbhZ41W7lXkjyMpxAfkj73k6g_2gvaYM20xfOI7aYC--VVsAqwcb0wh1sVYkVCi1hl5boCDvmQPYJU_Dh5yTvVDq4LHL_vDGUU8T7ABeWKTA8Vv1CyZZAaRahvswg4_rEsM_FtPf4rqf3bj7mZL5HtUCkUlnZpNb4luEz3dk",
            icon: "local_shipping",
            unread: true,
            section: "Today"
        },
        {
            id: 2,
            type: "AI Assistant",
            status: "Suggestion",
            title: "New Layout Suggestion",
            description: "Based on your recent likes, here is a living room arrangement specially designed for you.",
            time: "5h ago",
            ai: true,
            unread: true,
            section: "Today"
        },
        {
            id: 3,
            type: "Shopping",
            status: "Price Drop",
            title: "Price Drop Alert",
            description: "The velvet sofa you liked is now 20% off. Don't miss out on this deal.",
            time: "1d ago",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcnl5AM_VFeKi0w3QbPBrD702gDpaS_ztIzs-U8xfmx41jbKUB_qjo30NM0BcMVPYdEUNZjaw5qg8tRRX7yGS_dsnlk-sE6a-3-OgLafIpkzB2qmd9ORKWJvyIzlm9TGUjwZ9iOQcU_ERs0fxL78LYMNVgso2FfswNFjWNyihQ34Pdxj5pQYunv2GoyfixAV_5S9xpJz-Bt29ESN5NBetHO-3p8IYajk-0yF5EKDrdzimfuRqGkf6lFFxu8CFeqcZSnb-XjmIHZmg",
            icon: "percent",
            unread: false,
            section: "Yesterday"
        },
        {
            id: 4,
            type: "System",
            status: "Security",
            title: "Security Alert",
            description: "New login detected from Chrome on MacOS. Was this you?",
            time: "1d ago",
            icon: "security",
            unread: false,
            section: "Yesterday"
        }
    ];

    const filteredNotifications = activeFilter === "All"
        ? notifications
        : notifications.filter(n => n.type === activeFilter);

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-2xl mx-auto bg-white dark:bg-[#0a0f16] shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-50 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center px-6 py-4 justify-between">
                        <h1 className="text-2xl font-black font-outfit uppercase tracking-tighter">Notifications</h1>
                        <button className="flex items-center justify-center size-10 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-900 dark:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="sticky top-[68px] z-40 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
                    <div className="flex gap-3 px-6 py-4 overflow-x-auto no-scrollbar">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter
                                        ? "bg-primary text-white shadow-xl shadow-primary/25 scale-105"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    {["Today", "Yesterday"].map((section) => {
                        const sectionNotifications = filteredNotifications.filter(n => n.section === section);
                        if (sectionNotifications.length === 0) return null;

                        return (
                            <div key={section}>
                                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/20">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{section}</p>
                                </div>
                                <div className="flex flex-col">
                                    {sectionNotifications.map((notif) => (
                                        <motion.div
                                            key={notif.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`group relative flex gap-6 px-6 py-7 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer ${notif.ai ? "bg-primary/[0.03] dark:bg-primary/[0.05]" : ""}`}
                                        >
                                            <div className="relative shrink-0">
                                                {notif.image ? (
                                                    <div className="size-16 rounded-2xl overflow-hidden shadow-md border border-white dark:border-slate-700 relative">
                                                        <Image src={notif.image} alt="Package" fill className="object-cover" />
                                                    </div>
                                                ) : notif.ai ? (
                                                    <div className="size-16 rounded-2xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                                        <span className="material-symbols-outlined text-[28px] filled">auto_awesome</span>
                                                    </div>
                                                ) : (
                                                    <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-700">
                                                        <span className="material-symbols-outlined text-[28px]">{notif.icon}</span>
                                                    </div>
                                                )}
                                                {notif.icon && notif.image && (
                                                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full size-6 flex items-center justify-center border-2 border-white dark:border-[#0a0f16] shadow-sm">
                                                        <span className="material-symbols-outlined text-white text-[14px]">local_shipping</span>
                                                    </div>
                                                )}
                                                {notif.unread && (
                                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                                )}
                                            </div>

                                            <div className="flex flex-1 flex-col justify-center min-w-0">
                                                <div className="flex justify-between items-start w-full mb-1">
                                                    <h3 className={`text-base leading-tight pr-4 font-outfit uppercase tracking-tight ${notif.unread ? "font-black text-slate-900 dark:text-white" : "font-bold text-slate-600 dark:text-slate-400"}`}>
                                                        {notif.title}
                                                    </h3>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter whitespace-nowrap mt-1">{notif.time}</span>
                                                </div>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium mb-3">
                                                    {notif.description}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1.5 group/btn">
                                                        {notif.type === "AI Assistant" ? "View Design" : "View Details"}
                                                        <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">chevron_right</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {filteredNotifications.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-32 px-10 text-center">
                            <div className="size-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-5xl text-slate-200 dark:text-slate-700">notifications_off</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-outfit">You&apos;re all caught up!</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2 max-w-[240px]">
                                Check back later for updates on your orders and custom design tips.
                            </p>
                        </div>
                    )}
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto z-50 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 pb-8 px-6">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex flex-col items-center justify-center flex-1 gap-1 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[26px]">home</span>
                            <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
                        </Link>
                        <Link href="/catalog" className="flex flex-col items-center justify-center flex-1 gap-1 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[26px]">grid_view</span>
                            <span className="text-[9px] font-black uppercase tracking-widest">Shop</span>
                        </Link>
                        <div className="flex-1 flex justify-center -mt-10">
                            <Link href="/design-ai" className="size-16 rounded-[1.5rem] bg-gradient-to-br from-primary to-blue-600 shadow-2xl shadow-primary/40 flex flex-col items-center justify-center text-white border-4 border-white dark:border-[#0a0f16] transform hover:scale-110 active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-[28px] filled">auto_awesome</span>
                            </Link>
                        </div>
                        <button className="flex flex-col items-center justify-center flex-1 gap-1 text-primary">
                            <div className="relative">
                                <span className="material-symbols-outlined text-[26px] filled">notifications</span>
                                <span className="absolute -top-1 -right-1 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0f16]"></span>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest">Inbox</span>
                        </button>
                        <button className="flex flex-col items-center justify-center flex-1 gap-1 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[26px]">person</span>
                            <span className="text-[9px] font-black uppercase tracking-widest">Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
