"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function BlogPost() {
    const { slug } = useParams();
    const router = useRouter();

    // Mock data based on slug
    const isSustainable = slug === "sustainable-furniture";

    const post = {
        title: isSustainable ? "The Future of Sustainable Furniture: 2024 Trends" : "Design Insights",
        date: "Oct 12, 2023",
        author: "Sarah Jenkins",
        readTime: "5 min read",
        image: isSustainable
            ? "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
            : "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        content: `
            <p>Sustainability is no longer just a buzzword; it's a necessity in modern design. As we move into 2024, the furniture industry is seeing a massive shift towards eco-friendly materials and ethical production methods.</p>
            <br/>
            <h3>1. Recycled Materials</h3>
            <p>From ocean plastics to reclaimed wood, designers are finding innovative ways to give new life to old materials. Brands are now proudly displaying the 'scars' of recycled materials as a badge of honor.</p>
            <br/>
            <h3>2. Bamboo & Rattan</h3>
            <p>Fast-growing grasses like bamboo continue to dominate the market due to their renewability and durability. Rattan brings a natural, organic feel that perfectly complements the 'Japandi' aesthetic.</p>
            <br/>
            <h3>3. Modular Design</h3>
            <p>Furniture that adapts to your life is inherently sustainable. Modular sofas and shelving units reduce the need to buy new pieces when you move or your needs change.</p>
            <br/>
            <p>Investing in sustainable furniture isn't just about saving the planet; it's about creating a healthier home environment free from VOCs and harmful chemicals.</p>
        `
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0f16] text-slate-900 dark:text-white font-jakarta pb-32">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0f16]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4"
            >
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Journal
                    </button>
                    <div className="flex gap-2">
                        <button className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            <article className="max-w-3xl mx-auto px-6 py-12">
                {/* Meta */}
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider">
                    <span>{post.date}</span>
                    <span className="size-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-black font-outfit leading-tight mb-8 text-slate-900 dark:text-white">
                    {post.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-3 mb-12">
                    <div className="size-12 rounded-full overflow-hidden bg-slate-100">
                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPYkZ8EV_1dMz4XffISVHQhmv2d_LGGVEa_JoZZjpk-JVgdtDCRXiEDoQgwb3sRAv_X8ogwqEbMU9LYWT91OIpYD2oLx6Y_I4CPU3sc__bVvgkyEG1hVG9surm2V3zN29-Lukl-YyIg8B5vhNun8zDpsdZlDYzMjX-e8iwRxLRh60GvIwth71mTpR8h3_A_l2bw9knY7XsLpFfDIlbtk5kh42PeCQdPLOtwTUzQah0lpiBz4ptzAaunXyY7DV4yfawcMKUjACfILo" alt="Author" width={48} height={48} className="object-cover" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</p>
                        <p className="text-xs font-bold text-primary">Senior Editor</p>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden mb-12 shadow-xl">
                    <Image src={post.image} alt="Hero" fill className="object-cover" priority />
                </div>

                {/* Content */}
                <div
                    className="prose prose-lg prose-slate dark:prose-invert max-w-none font-outfit"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="flex gap-2 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                    {["Trends", "Sustainability", "2024", "Interior Design"].map(tag => (
                        <span key={tag} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            #{tag}
                        </span>
                    ))}
                </div>
            </article>

            {/* Newsletter CTA */}
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 border border-primary/10 text-center">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Enjoyed this article?</h3>
                    <p className="text-sm text-slate-500 mb-6">Subscribe to our newsletter for more design insights.</p>
                    <div className="flex gap-2 max-w-sm mx-auto">
                        <input type="email" placeholder="Email" className="flex-1 bg-white dark:bg-slate-900 rounded-xl px-4 py-3 text-sm border-none outline-none" />
                        <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition">Join</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
