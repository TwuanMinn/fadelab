"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AccessibilityHub() {
    const router = useRouter();

    const videoGuides = [
        {
            title: "Adjusting Text Size",
            duration: "2 min",
            type: "How-to",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEUALjumVTW5oVGSvDzFcIBTZkZS3UCVXI2imLxoZW9U175RBPqwie1XFqjWi16Fnk6bzdLGm8eDqTCw30eqPNLdr9I99Z5NxLglUVLE6HycC5mmq3Ipx-kYVbiktI6ofnUGQ4mD3_z-Or29LJ9P9GTz3Nzj_i31YNKRsL0KmEdVJOQMZopthrjfWYM7j4d4abJWdWehxoSszRf_S53Nh_gWxhwIlHi83ETvrPMWUPojH_m8sYMLD5xP5KW4f-cdc1VVzIqIMryzA"
        },
        {
            title: "Product Dimensions",
            duration: "4 min",
            type: "Guide",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-r9fM2R0OEGOCxPSOfjp0JEpuP4stEfZzP8clfTp76ADHg-O2I-JH3lC4cmbhaojCC51q5hjR8VaMdOJt9XdneQXb21PDlbIgUxFOxQQ7s51TuGBBMuzrIN2ybXJnFl8mmzYcUwjlnt-1OKel3WyKevfXt4smcC71z99z9HKPt5g_XLVWFECeQCSbRBVirOStCyug72S3hqmhUqzc-NH-d7dl5Qvws_8Zvp5bve5Q_CSQgznU5wK4pjlfAioWmNE8GYiBrjEymQE"
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative flex h-auto min-h-screen w-full max-w-2xl mx-auto flex-col bg-white dark:bg-[#0a0f16] overflow-x-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl p-6 justify-between sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-xl font-black font-outfit uppercase tracking-tighter flex-1 text-center pr-12">Accessibility Hub</h2>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col px-8 pt-10 pb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-slate-900 dark:text-white tracking-tighter text-4xl font-black font-outfit leading-tight mb-4 uppercase"
                    >
                        We are here to help you shop comfortably.
                    </motion.h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                        Find guides, request alternative formats, or speak to our dedicated accessibility support team.
                    </p>
                </div>

                {/* Immediate Assistance Card */}
                <div className="p-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-10 shadow-sm border border-blue-100 dark:border-blue-900/30">
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-transform duration-1000 group-hover:scale-125"></div>
                        <div className="flex items-start justify-between gap-6 relative z-10">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest bg-primary/10 w-fit px-4 py-1.5 rounded-full">
                                    <span className="material-symbols-outlined filled text-[20px]">support_agent</span>
                                    Immediate Help
                                </div>
                                <h3 className="text-slate-900 dark:text-white text-2xl font-black font-outfit leading-tight uppercase">Call Accessibility Support</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-base font-bold leading-relaxed">
                                    1-800-555-0199<br />
                                    <span className="text-xs uppercase tracking-widest text-slate-400">Mon-Fri, 9am-5pm EST</span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-primary h-14 px-8 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all">
                                <span className="material-symbols-outlined">call</span>
                                Call Now
                            </button>
                            <button className="flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 h-14 px-8 text-primary shadow-sm hover:border-primary transition-all active:scale-95">
                                <span className="material-symbols-outlined text-2xl mr-2">chat</span>
                                <span className="text-xs font-black uppercase tracking-widest">Message Hub</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="px-8 pb-10">
                    <div className="grid grid-cols-2 gap-6">
                        <button className="flex flex-col items-center justify-center gap-4 rounded-[2.5rem] bg-slate-50 dark:bg-[#1c2633] p-8 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-center h-44 group border border-slate-100 dark:border-slate-800">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-700 text-primary shadow-lg shadow-primary/5 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">visibility</span>
                            </div>
                            <span className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest">Display Settings</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-4 rounded-[2.5rem] bg-slate-50 dark:bg-[#1c2633] p-8 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-center h-44 group border border-slate-100 dark:border-slate-800">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-700 text-primary shadow-lg shadow-primary/5 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">help</span>
                            </div>
                            <span className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest">FAQs</span>
                        </button>
                    </div>
                </div>

                <div className="h-4 bg-slate-50 dark:bg-[#121a24]/30 w-full" />

                {/* Video Guides Section */}
                <div className="flex flex-col py-10">
                    <div className="flex items-center justify-between px-8 mb-8">
                        <h2 className="text-2xl font-black font-outfit uppercase tracking-tighter">Video Guides</h2>
                        <Link href="#" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
                    </div>
                    <div className="flex overflow-x-auto no-scrollbar gap-6 px-8 pb-4 no-scrollbar -mx-8 px-8 snap-x">
                        {videoGuides.map((guide, i) => (
                            <div key={i} className="snap-start flex flex-col gap-4 min-w-[280px] w-[280px] group cursor-pointer">
                                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-md">
                                    <Image src={guide.image} alt={guide.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                        <div className="size-14 rounded-3xl bg-white/95 flex items-center justify-center backdrop-blur-md shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                            <span className="material-symbols-outlined text-primary text-3xl ml-1">play_arrow</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">CC</span>
                                        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">AD</span>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <h3 className="text-slate-900 dark:text-white text-lg font-black font-outfit uppercase tracking-tight">{guide.title}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span>{guide.duration}</span>
                                        <span className="size-1 bg-slate-200 rounded-full" />
                                        <span>{guide.type}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-4 bg-slate-50 dark:bg-[#121a24]/30 w-full" />

                {/* Request Form Section */}
                <div className="p-8 py-12">
                    <h2 className="text-3xl font-black font-outfit uppercase tracking-tighter mb-8">Request Alternative Formats</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-2">Select Format Type</label>
                            <div className="relative">
                                <select className="w-full appearance-none rounded-2xl bg-slate-50 dark:bg-[#1c2633] dark:text-white border-2 border-slate-100 dark:border-slate-800 p-4 pr-12 text-sm font-bold focus:ring-2 focus:ring-primary focus:outline-none transition-all">
                                    <option>Braille</option>
                                    <option>Large Print</option>
                                    <option>Audio CD</option>
                                    <option>Digital Accessible PDF</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-2">Product Information</label>
                            <input
                                className="w-full rounded-2xl bg-slate-50 dark:bg-[#1c2633] dark:text-white border-2 border-slate-100 dark:border-slate-800 p-4 text-sm font-bold placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                placeholder="e.g. Modern Sofa 3000 or ID #1234"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-2">Delivery Email address</label>
                            <input
                                className="w-full rounded-2xl bg-slate-50 dark:bg-[#1c2633] dark:text-white border-2 border-slate-100 dark:border-slate-800 p-4 text-sm font-bold placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                placeholder="name@example.com"
                                type="email"
                            />
                        </div>
                        <button className="mt-4 flex w-full items-center justify-center rounded-2xl bg-primary h-14 px-8 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                            Submit Request
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto p-10 flex flex-col items-center gap-6 bg-slate-950 text-white rounded-t-[3rem]">
                    <Link
                        href="#"
                        className="flex items-center gap-3 text-slate-400 hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">description</span>
                        Read Accessibility Statement
                    </Link>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] text-center max-w-[280px] leading-relaxed">
                        We are committed to providing an inclusive experience for all our customers.
                    </p>
                </div>
            </div>
        </div>
    );
}
