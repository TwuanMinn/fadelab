"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ReturnsPolicyPage() {
    const router = useRouter();

    const relatedArticles = [
        {
            category: "Shipping",
            title: "Track your return shipment",
            image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            category: "Policy",
            title: "Warranty vs. Returns: What's the difference?",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            category: "Maintenance",
            title: "How to repack furniture for return",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    return (
        <div className="bg-white dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative mx-auto h-full min-h-screen w-full max-w-2xl flex flex-col bg-white dark:bg-[#0a0f16] shadow-xl overflow-x-hidden">
                {/* Top Navigation */}
                <div className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-[#0a0f16]/90 backdrop-blur-md px-6 py-4 justify-between border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="text-[#111418] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-[#111418] dark:text-white text-base font-black font-outfit uppercase tracking-tighter flex-1 text-center">Returns & Labels</h2>
                    <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">ios_share</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    {/* Breadcrumbs */}
                    <div className="px-8 py-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Link href="/help">Help Center</Link>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span className="text-primary">Returns Policy</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-slate-900 dark:text-white font-black font-outfit text-4xl leading-tight px-8 pt-2 pb-2 tracking-tighter">
                        Returns & Exchanges Policy
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 px-8 pb-8">
                        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[14px] filled">verified</span>
                            Official Policy
                        </div>
                        <p className="text-slate-400 text-xs font-semibold">Effective January 2024</p>
                    </div>

                    {/* Header Image */}
                    <div className="px-8 pb-10">
                        <div className="w-full relative h-[300px] overflow-hidden rounded-[2.5rem] shadow-lg group">
                            <Image
                                src="https://images.unsplash.com/photo-1549194388-f61be84a6e9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Return Package"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Intro Text */}
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed pb-8 px-8 font-medium">
                        We want you to love your furniture. If a piece isn't quite right for your space, we offer a 30-day return window. Our goal is to make the process as seamless as possible so you can focus on finding the perfect match.
                    </p>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 mx-8 mb-10" />

                    {/* Step by Step */}
                    <div className="px-8 flex flex-col gap-10 pb-10">
                        {[
                            {
                                step: 1,
                                title: "Check your window",
                                desc: "Returns must be initiated within 30 days of delivery. Items must be in their original condition and packaging. Custom-made orders are final sale but covered by our standard warranty."
                            },
                            {
                                step: 2,
                                title: "Generate your label",
                                desc: "Visit your Order History and select the item you wish to return. Click 'Generate Return Label' to receive a prepaid shipping label via email instantly."
                            },
                            {
                                step: 3,
                                title: "Package and ship",
                                desc: "Securely repack the item (ideally in original boxes). Attach the printed label and drop it off at any authorized shipping center or schedule a complimentary home pickup."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 relative">
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="size-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black shadow-lg z-10 relative">
                                        {item.step}
                                    </div>
                                    {item.step < 3 && <div className="w-[2px] h-full bg-slate-100 dark:bg-slate-800 absolute top-10" />}
                                </div>
                                <div className="pb-2">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 font-outfit uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pro Tip - Box */}
                    <div className="px-8 pb-12">
                        <div className="rounded-[2.5rem] bg-slate-50 dark:bg-[#1c2633] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-primary">priority_high</span>
                                <h3 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-widest">Important Note</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-base font-bold leading-relaxed italic">
                                "Please keep all original packaging for at least 30 days. Most of our carriers require original boxes to ensure safe transit back to our warehouse."
                            </p>
                        </div>
                    </div>

                    {/* Start Return Button */}
                    <div className="px-8 pb-10">
                        <button
                            onClick={() => router.push('/help/returns/request')}
                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] py-6 font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-4">
                            <span className="material-symbols-outlined text-2xl">assignment_return</span>
                            Start Return Request
                        </button>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 mx-8 mb-10" />

                    {/* FAQ Quick Links */}
                    <div className="mx-8 mb-12 bg-primary/10 rounded-[2.5rem] p-10 text-center border border-primary/20">
                        <h4 className="font-black text-primary mb-6 uppercase tracking-tight font-outfit">Need a refund status?</h4>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => router.push('/help/refund-status')}
                                className="w-full py-4 bg-primary text-white font-black rounded-2xl text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                Track Refund Status
                            </button>
                            <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Average processing time: 5-7 business days</p>
                        </div>
                    </div>

                    {/* Related Articles */}
                    <div className="px-8 pb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-xl font-outfit uppercase tracking-tighter">Related Topics</h3>
                            <Link href="/help" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-8 px-8 snap-x">
                            {relatedArticles.map((article, i) => (
                                <div key={i} className="snap-start shrink-0 w-64 flex flex-col gap-3 group">
                                    <div className="w-full h-40 rounded-[2rem] overflow-hidden relative shadow-md border border-slate-100 dark:border-slate-800">
                                        <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="px-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{article.category}</span>
                                        <h4 className="font-black text-slate-900 dark:text-white text-sm mt-1 leading-snug line-clamp-2 hover:text-primary transition-colors cursor-pointer">{article.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-2xl bg-white/90 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-6 pb-10 shadow-2xl">
                    <button
                        onClick={() => router.push('/help/chat')}
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl py-5 font-black text-sm shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 group">
                        <span className="material-symbols-outlined text-[20px]">contact_support</span>
                        Speak with Returns Agent
                    </button>
                </div>
            </div>
        </div>
    );
}
