"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CareersPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Design", "Marketing", "Logistics"];

    const galleryImages = [
        {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBRKXmjn6n7jLa_9Uq99HZzgWWcwaAYLfGFYypNHEr-Py5WSgMXd66_cUAWY2nsL_-vfDKGPiD2QBlpiGrXuIIEbtyOc6m5lvmifNNtx4nklKqNXvL-tGEYOk3rEsR1fdZq93nPe4Y_hsNiZYJ0Fml5L-PXAHITz2YXfbNmTFenIUMPfWFeue5TmlOUDR7x14YrhIslwQpxE2GOayP8XTE2RSXgN5-94s5WjBlHYXhr1FUXwNaqWvNhByJGGjf4jq7YhxvCvCGt38",
            label: "Design Sprint"
        },
        {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz-_Q4F8dYk-2ZRq7iJlLth3lgGNgM2zAfkJL77AKWxL3abXTRBPKhqWE2m6SF_Wp8aB5fMs129nFfMXWNVFq6jwYsVHUcYI8x1M3V0GGSXFlQ10pPTQl__y_MDe5rwgr1Gq_M8eKeJqoblzMfHtMxePPmwatxrl35FgP3IFBN4zpgh27IXTfDXMT9XB0YZ9perTdSZ2WEfgw1J472UTW61Eg5nAgmZlOT8ZDQs4CBgT8UsCY_LB8n72ufHam6cai1bfCZoYbWOps",
            label: "Friday Socials"
        },
        {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwlE2gMdJ3xhOe3pg9Ge5ol9wGMfiZEdAq2ufAwlDHvKSwGK_Jp9pwHcIU6C1czaZK72PXP8zevsVlRCblUab_EF5URZfZpcI1crTvJvUWN71dXb0zWZkziqcPKYj-jjKpUmlv78R9OGGBNoYBxv2aG40-552E_YO_kb3zpQMeLf7T_lkXutwkUcgSsx6IX8yUvVDjFq8T59seKhbbqSakQkBuIQcWlUrOJOrb39SCYn0PpHO-9idv7ePHI1IhO7Qw3TmAkF5IeMw",
            label: "Focus Time"
        }
    ];

    const jobs = [
        {
            id: 1,
            category: "Design",
            title: "Senior UX Designer",
            location: "Remote",
            type: "Full-time",
            icon: "public"
        },
        {
            id: 2,
            category: "Marketing",
            title: "Social Media Manager",
            location: "London, UK",
            type: "Full-time",
            icon: "location_on"
        },
        {
            id: 3,
            category: "Logistics",
            title: "Supply Chain Analyst",
            location: "Berlin, DE",
            type: "Hybrid",
            icon: "location_on"
        },
        {
            id: 4,
            category: "Design",
            title: "Product Designer",
            location: "New York, USA",
            type: "On-site",
            icon: "location_on"
        }
    ];

    const filteredJobs = activeCategory === "All"
        ? jobs
        : jobs.filter(job => job.category === activeCategory);

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-slate-900 dark:text-white min-h-screen font-jakarta">
            <div className="relative flex h-auto min-h-screen w-full max-w-4xl mx-auto flex-col bg-white dark:bg-[#0a0f16] shadow-2xl overflow-hidden">
                {/* Top Navigation */}
                <header className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl p-6 border-b border-slate-100 dark:border-slate-800 transition-colors">
                    <button
                        onClick={() => router.back()}
                        className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 active:scale-95"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-xl font-black font-outfit uppercase tracking-tighter flex-1 text-center pr-12">Careers</h2>
                </header>

                {/* Hero Section */}
                <div className="relative w-full aspect-[4/5] md:aspect-[16/7] overflow-hidden group">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8Hj9qC2M0KJSWNS12FwCQwefwTF_g8h-f3cJO-CwnuyYcMqEOwlt1V4LPr5jClYsLqfgJRKJsDPwueiWW-StNNmYJfysepqHM-M4LduADY6T7ANWUI_zluW0T0E65uonChwGEZn8eZbluIEii5Rz3rfPvLbH4J66O1JuQdYWbPL2k8qFCOuegOJahLcmZ3a6ltVd-SYzia8V4_XHgiI4nmyqof8lXkz_C3arR4kS57qlkOftHnOc2NWyaLHfjwZ_pGiy5tm_1CXU"
                        alt="Join our team"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-10 w-full">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-4 drop-shadow-2xl font-outfit uppercase"
                        >
                            Build the Future <br /> of Comfort
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-200 text-lg font-bold opacity-90 uppercase tracking-widest"
                        >
                            Join the team redesigning modern living.
                        </motion.p>
                    </div>
                </div>

                {/* Mission Statement */}
                <section className="px-10 py-16 bg-white dark:bg-[#0a0f16]">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter font-outfit uppercase">Our Mission</h2>
                    <p className="text-xl leading-relaxed text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
                        We believe furniture is more than function—it&apos;s about creating spaces where life happens. We are looking for visionaries who want to blend aesthetics with logistics to deliver happiness to every doorstep.
                    </p>
                </section>

                {/* Culture Gallery */}
                <section className="py-16 bg-slate-50 dark:bg-[#121a24]/30 border-y border-slate-100 dark:border-slate-800">
                    <div className="px-10 mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tighter">Life at Lumière</h2>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Gallery</span>
                    </div>
                    <div className="flex overflow-x-auto gap-6 px-10 pb-8 no-scrollbar snap-x">
                        {galleryImages.map((img, i) => (
                            <div key={i} className="snap-center shrink-0 w-80 h-48 rounded-[2.5rem] overflow-hidden relative shadow-xl group cursor-pointer border-4 border-white dark:border-slate-800">
                                <Image src={img.url} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 w-full p-5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                                    <p className="text-white text-xs font-black uppercase tracking-widest">{img.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Open Positions */}
                <section className="px-10 py-16 bg-white dark:bg-[#0a0f16]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tighter">Open Positions</h2>

                        {/* Filters */}
                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                        ? "bg-primary text-white shadow-xl shadow-primary/30 scale-105"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredJobs.map((job) => (
                            <motion.div
                                layout
                                key={job.id}
                                className="group bg-white dark:bg-[#1c2633] rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 ${job.category === 'Design' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                            job.category === 'Marketing' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                                                'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                                            }`}>
                                            {job.category}
                                        </span>
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight font-outfit uppercase tracking-tight">{job.title}</h3>
                                    </div>
                                    <button className="flex items-center justify-center size-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                                        <span className="material-symbols-outlined text-xl">bookmark</span>
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500 dark:text-slate-400 mb-8 font-bold uppercase tracking-tighter">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base text-primary">{job.icon}</span>
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base text-primary">schedule</span>
                                        <span>{job.type}</span>
                                    </div>
                                </div>

                                <button className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-[#0a0f16] text-white font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 group/btn">
                                    View Job Details
                                    <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer Call to Action */}
                <footer className="p-16 text-center bg-slate-950 text-white rounded-t-[3rem] mt-10">
                    <div className="max-w-xs mx-auto">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Don&apos;t see your role?</p>
                        <a
                            href="mailto:careers@lumiere.com"
                            className="text-white hover:text-primary font-black text-xl tracking-tighter flex items-center justify-center gap-2 transition-colors font-outfit uppercase"
                        >
                            Email us at careers@lumiere.com
                            <span className="material-symbols-outlined text-xl">mail</span>
                        </a>
                    </div>
                    <div className="h-10"></div>
                </footer>
            </div>
        </div>
    );
}
