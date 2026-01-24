"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("All Stories");

    const categories = ["All Stories", "Trends", "Living Room", "DIY", "Care"];

    const latestArticles = [
        {
            category: "STYLING",
            title: "5 Ways to Style a Blue Velvet Sofa",
            excerpt: "From minimalist chic to bold eclectic, see how versatility meets luxury.",
            readTime: "3 min read",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ0OKIkIYsdLF7fbcCBbmdnTdpGlbuyR0F0CNic1k-S4C0FkN5fQ0ukU0Zm11Zs4y2rJwby0SYDN6YuNrcSmH8jgLuUTyNCoeyYjX_-qJVtPk6KYVyNsylbK0PXblnUKFfzutRzI6AuHDXeeWtwVfYrM3B-UyO-yObrtFrganzUjZRepfEw-5yH0HxpqseRvDgvdusyEmUVRY9Y4YvE9mL6VaooV75brLoJVcBdJ731hsSLWup6bq98zN3ON_S4euSlUb86hrsEKI"
        },
        {
            category: "DESIGN THEORY",
            title: "Minimalism vs. Maximalism: Finding Balance",
            excerpt: "Can these two opposing styles coexist in your modern home?",
            readTime: "7 min read",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYNtGl0I4Db-MZ8w98XyKbbN5oPi_yvtZtrjRTYIbqTCn7nux8Njl02HrWUfdHo-gIgU7YA_a3K8b-tfuoqyfu8m6CDxqKqtsAFGiXGri588PYwF55pRJUERjYqnUqqF7-JP5tyvlSim4N0ekExRRUn3U64bgPkvRmDnxn1LU7Ya-ePykYAXxHzn_uQNKyi5PkJXq6SGNJpb5aiDJLaPfE4fwflsDxa5xRG0izCqrqDjH2pGM1ZUXv4aJS_X_I0sUdRWmlpDTtGkQ"
        },
        {
            category: "MAINTENANCE",
            title: "Wood Care 101: Preserve Your Oak Table",
            excerpt: "Simple oils and routines to keep your solid wood furniture lasting forever.",
            readTime: "4 min read",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelctOQQoK5mni0NJdBcze7fPaibOZUVSu_V9R1ZxVEzY1UhvxRf4eupv8HLOGvbeSTj0Wwttzq6JaaTGQ75ELYE4f7lt0yZ9CC9SIx0pleIukOnkrbDG8PvfvMbXMKMXLkhGndrhm4s4uxbw5TS7BHrnJwbFugyy0dTNEICWNIV5qwGt-tey9Qz5uIfFKnmpQtSXartRMcKGJk4UXivRtOETuYMBWCLi1YeHj3Rfuje33nZJ1pxwZS-WmZIeIfuVJhMkppDIkugc"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f16] text-slate-900 dark:text-white font-jakarta pb-32">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0f16]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <button onClick={() => router.back()} className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-black font-outfit uppercase tracking-tighter">Design Journal</h1>
                    <button className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-6 py-8">
                {/* Category Filters */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-black whitespace-nowrap transition-all ${activeCategory === cat
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-primary/30"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured Post */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm mb-12"
                >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                            alt="Featured"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-lg ring-1 ring-black/5">
                            Featured
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 uppercase tracking-wider">
                            <span>Oct 12, 2023</span>
                            <span className="size-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                            <span>5 min read</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-primary transition-colors font-outfit">
                            The Future of Sustainable Furniture: 2024 Trends
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                            Discover how eco-friendly materials are reshaping modern interiors without compromising on style or luxury.
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full overflow-hidden bg-slate-100 relative grayscale group-hover:grayscale-0 transition-all">
                                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPYkZ8EV_1dMz4XffISVHQhmv2d_LGGVEa_JoZZjpk-JVgdtDCRXiEDoQgwb3sRAv_X8ogwqEbMU9LYWT91OIpYD2oLx6Y_I4CPU3sc__bVvgkyEG1hVG9surm2V3zN29-Lukl-YyIg8B5vhNun8zDpsdZlDYzMjX-e8iwRxLRh60GvIwth71mTpR8h3_A_l2bw9knY7XsLpFfDIlbtk5kh42PeCQdPLOtwTUzQah0lpiBz4ptzAaunXyY7DV4yfawcMKUjACfILo" alt="Author" fill className="object-cover" />
                                </div>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">By Sarah Jenkins</span>
                            </div>
                            <button className="flex items-center gap-2 bg-primary text-white font-black px-6 py-3 rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 group/btn">
                                <span>Read More</span>
                                <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Latest Articles */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black font-outfit italic tracking-tight">Latest Articles</h3>
                        <Link href="#" className="text-sm font-bold text-primary hover:underline">View All</Link>
                    </div>

                    <div className="grid gap-6">
                        {latestArticles.map((article, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="group bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex gap-5 hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="relative size-32 shrink-0 rounded-2xl overflow-hidden">
                                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="flex flex-col justify-center flex-1">
                                    <span className="text-[10px] font-black tracking-widest text-primary mb-1 uppercase">{article.category}</span>
                                    <h4 className="text-base font-black text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-primary transition-colors font-outfit">
                                        {article.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 mb-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400">{article.readTime}</span>
                                        <button className="size-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">bookmark</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-16 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 text-center shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors" />

                    <div className="size-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
                        <span className="material-symbols-outlined text-3xl">mail</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 font-outfit">Join our Design Club</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                        Get the latest trends and exclusive furniture care tips delivered to your inbox.
                    </p>
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                        <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10">
                            Subscribe
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
