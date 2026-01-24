"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function HelpArticlePage() {
    const router = useRouter();

    const relatedArticles = [
        {
            category: "Maintenance",
            title: "Understanding leather grades and care",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqD0ok0O5T3CMQQGr8_SssGd9CU-dzjKBgxQKD-ByjkrCBe5fYVFAPW09nzC0IFEMt1lGf-pnyVgEvwvGYlkBqUpqsH1ZFTtRvjyafZcPji6Humfzqwv8hEA7MSXqWB62A9462DJm4FjHeeTu7tyghm0I-cJ2BDkekMPq7lgXypIirrL3sNvipD6_JHt4wgRJapmgnjodmd-ZUr0WyYVGymsSAYmvRZ_cKB3IckplRv9J0GAyhtOxBbbBXcXTxt_sAafS1qGUgML8"
        },
        {
            category: "Policy",
            title: "5-Year Warranty Coverage Explained",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYpt0L02IRf4l8ALdLoHDZy1SgJ3fXMMEgTvIPB9r9IXPVbj30iPh3sVDS3m4vW34oH3oVRBA0yhiCrf4TgdIOdf1r8Y-JfD84A1qYOeBec6oEc35gMtSVk5Y1E7EljkkZSHHREL6uW5EKZy_x-vCK8VulZB-Q9RmIAiIC5x95xIfTlCqCrudNkLQ_O-rPi3MxdqeI1f34Ipj3RhzeQcQFVfZIgYhDdJbtqnF1D2CG8OQ3nRkUt05Nj907OJFaaOssYSuEAQt7frA"
        },
        {
            category: "Maintenance",
            title: "Polishing solid wood surfaces",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZw4w41uHmysIkEZGOzu620pA1HOspt1zJUiR8517JQ8y8pfvaMyyvO-ysx3w04PaiQtN_hqr6iN5fRq4BfutkwiQwB7deLnaHnVIYrcPC1Y8DQRBF2RbnAvPR-CoFTAuEt9-O_-U0c1LTpge223O0ECf2HCNxkLeD2Drb-X6qaOQ1pyG8zlpYUosp3kyCEsVM2su8tm1XRNbSh_VYsvjSc_tcu7lpYAo3C5ezsejRcRZXrDXgNPSMJ67IUUtJKyA8dQPseIRdx6c"
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
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-[#111418] dark:text-white text-base font-black font-outfit uppercase tracking-tighter flex-1 text-center">Product Care</h2>
                    <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">ios_share</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    {/* Breadcrumbs */}
                    <div className="px-8 py-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Help Center</span>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span>Furniture</span>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span className="text-primary">Care Guides</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-slate-900 dark:text-white font-black font-outfit text-4xl leading-tight px-8 pt-2 pb-2 tracking-tighter">
                        How to care for your velvet sofa
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 px-8 pb-8">
                        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[14px] filled">check_circle</span>
                            Verified Guide
                        </div>
                        <p className="text-slate-400 text-xs font-semibold">Updated Oct 24, 2023</p>
                    </div>

                    {/* Header Image */}
                    <div className="px-8 pb-10">
                        <div className="w-full relative h-[300px] overflow-hidden rounded-[2.5rem] shadow-lg group">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLPhVA7wmX4HfC2WZ-llVvYW4kc1zs9AkqtpirVOIwFXwWwHEncPnZNTpWtuKaXC3C6K-RaJjPD4PTmtyRdmERCiWHFdFrYrV-0tw6iocS6pHelkUP_QvJr6vwUYuSv4QyHMN4CMf_8CfvbBRk1Vji3XnYI3H2AnmnOE1dInB4xA8hUWXOLWjl1jR53YtoY1qjRWtqmxGfzQMXM4_BCAwswQTnuu6madENu1Ih5aou4kdEkTgUcMEd9dC3gNfuSrf0LEXCyc3oC9s"
                                alt="Velvet Texture"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Intro Text */}
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed pb-8 px-8 font-medium">
                        Velvet is synonymous with luxury, offering a soft texture and rich sheen. While it adds elegance to any room, it does require specific care to prevent crushing and maintain its luster. Follow these simple steps to keep your piece looking brand new.
                    </p>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 mx-8 mb-10" />

                    {/* Step by Step */}
                    <div className="px-8 flex flex-col gap-10 pb-10">
                        {[
                            {
                                step: 1,
                                title: "Vacuum regularly",
                                desc: "Dust can dull the sheen of velvet. Use a vacuum with a soft brush upholstery attachment weekly. Gently glide in the direction of the pile to lift dust without crushing the fibers."
                            },
                            {
                                step: 2,
                                title: "Address spills immediately",
                                desc: "Liquid can flatten velvet instantly. Blot spills with a clean, dry, white cloth. Never rub, as this forces the liquid deeper and damages the weave."
                            },
                            {
                                step: 3,
                                title: "Steam to remove creases",
                                desc: "Pressure marks are common. Use a handheld steamer on a low setting, keeping it 2-3 inches away. Gently brush the pile upwards with a soft bristle brush while steaming."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 relative">
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="size-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black shadow-lg shadow-primary/25 z-10 relative">
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

                    {/* Pro Tip */}
                    <div className="px-8 pb-12">
                        <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-[#1c2633] border border-blue-100 dark:border-blue-900/30 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-primary filled">lightbulb</span>
                                <h3 className="font-black text-primary text-xs uppercase tracking-widest">Expert Tip</h3>
                            </div>
                            <p className="text-slate-900 dark:text-slate-200 text-base font-bold leading-relaxed">
                                Always check your velvet&apos;s cleaning code. If it is marked &quot;S&quot;, use only solvent-based cleaners. Water can permanently stain &quot;S&quot; code fabrics.
                            </p>
                        </div>
                    </div>

                    {/* Feedback Widget */}
                    <div className="mx-8 mb-12 bg-slate-50 dark:bg-[#1c2633] rounded-[2.5rem] p-10 text-center border border-slate-100 dark:border-slate-800">
                        <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight font-outfit">Was this article helpful?</h4>
                        <div className="flex items-center justify-center gap-4">
                            <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-sm text-sm font-black hover:border-primary hover:text-primary transition-all active:scale-95 group">
                                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">thumb_up</span>
                                YES
                            </button>
                            <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-sm text-sm font-black hover:border-red-400 hover:text-red-500 transition-all active:scale-95 group">
                                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">thumb_down</span>
                                NO
                            </button>
                        </div>
                        <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">142 people found this helpful</p>
                    </div>

                    {/* Related Articles */}
                    <div className="px-8 pb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-xl font-outfit uppercase tracking-tighter">Related Articles</h3>
                            <Link href="#" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
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

                {/* Sticky Footer Action */}
                <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-2xl bg-white/90 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-6 pb-10 shadow-2xl">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Still need help?</span>
                            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Talk to an expert</span>
                        </div>
                        <button className="bg-primary hover:bg-blue-600 text-white rounded-2xl px-8 py-4 font-black text-sm shadow-xl shadow-primary/30 transition-all flex items-center gap-3 active:scale-95 group">
                            <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">chat</span>
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
