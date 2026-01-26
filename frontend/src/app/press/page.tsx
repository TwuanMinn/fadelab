
"use client";

import Link from "next/link";
import { useState } from "react";

export default function PressPage() {
    return (
        <div className="bg-background-dark font-display text-white transition-colors duration-300 min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Back Button */}
                <Link href="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all group">
                    <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform text-lg">arrow_back</span>
                    <span className="text-sm font-bold uppercase tracking-wide">Back</span>
                </Link>

                <div className="layout-container flex h-full grow flex-col">

                    {/* Hero Section */}
                    <div className="px-4 md:px-20 lg:px-40 flex justify-center py-8 pt-24">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            <div className="@container">
                                <div className="@[480px]:p-0">
                                    <div className="flex min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-[2.5rem] items-start justify-end px-6 pb-12 @[480px]:px-12 relative overflow-hidden group shadow-2xl border border-white/5" style={{ backgroundImage: 'linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.2) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAWS_yWzRdmC1B3kXpwTbJXyoZoQ4I4txejo7orJdLB8iLthQcCRFIRtwOBS8Tv5-AUuog-vwzh2dYDjOHLFeho0w9ICftkRU_hVNL9QXqAzmPzhvyyILIrsqM92C1B6-v8HpLT3vy4EGzrk3vsMZ1DaMthGnSBXBC661gC4M0A_yJGeB7JFgh4hZWRkwNPrC5WCXIT4U5I6S8TevF9oOe1FsTZd33wZ08dXoJMyEaQQpR4JPpBajF8ETBGn09sDiyImw8yLdDY0hP")' }}>
                                        <div className="flex flex-col gap-3 text-left relative z-10">
                                            <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-[10px] font-black w-fit uppercase tracking-[0.2em]">Resource Center</span>
                                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tighter uppercase italic max-w-2xl">
                                                Press &amp; Media Kit
                                            </h1>
                                            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                                                Official assets, detailed brand guidelines, and high-resolution media resources for our partners and members of the press.
                                            </p>
                                        </div>
                                        <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white text-background-dark text-sm font-black uppercase tracking-widest transition-all hover:bg-primary hover:text-white shadow-xl hover:shadow-primary/20 relative z-10 gap-2 group/btn">
                                            <span className="material-symbols-outlined text-xl">download_for_offline</span>
                                            <span className="truncate">Download Assets</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Brand Story & PDF */}
                    <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            <div className="grid md:grid-cols-2 gap-8 items-center bg-surface-dark p-10 rounded-[2rem] border border-white/5 shadow-sm">
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tight italic">The FadeLab Story</h2>
                                    <p className="text-gray-400 leading-relaxed font-medium">
                                        Founded in 2024, FadeLab was born from a passion for traditional grooming and modern technology. We connect world-class artisans with clients seeking a premium, personalized experience through our seamless digital infrastructure.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                        <button className="flex items-center gap-2 px-6 py-4 bg-primary/10 border border-primary/20 text-primary rounded-xl font-bold uppercase tracking-wide text-xs hover:bg-primary hover:text-white transition-all">
                                            <span className="material-symbols-outlined">picture_as_pdf</span>
                                            Brand Story.pdf
                                        </button>
                                        <button className="flex items-center gap-2 px-6 py-4 border border-white/10 text-white rounded-xl font-bold uppercase tracking-wide text-xs hover:bg-white/5 transition-all">
                                            <span className="material-symbols-outlined">description</span>
                                            Fact Sheet 2024
                                        </button>
                                    </div>
                                </div>
                                <div className="h-80 rounded-2xl bg-surface-darker overflow-hidden relative group border border-white/5" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_djp5F-FsADwCsZIptzqNHrkg9DkiGvnRneF9pMYOJubhTSYmJ9upQa9YkOeJ8Ob3ktExtr1Id9qG-Byo3lkw012cQuloUKXFunnT4K1WDkvvet_6YNM-OcoPGII9A6lfCga9lkx4yGPWGgIzByncAzluhS4rYgmBLQevJUovUK4vD3-5zFs3Uw4mT9ODWX8T7stsFyRnzmRbVr_i0tXUWgj-igFofidyO591voroLp-FSTB-xJ53O6Ev-QYjY86NOQsU9vGpYnCS')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-bold bg-black/50 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full uppercase tracking-widest text-xs">Executive Team</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Brand Guidelines Section */}
                    <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            <h2 className="text-4xl font-black px-4 pb-6 text-white uppercase tracking-tight italic">Brand Assets</h2>
                            <p className="text-gray-400 text-lg px-4 mb-10 max-w-3xl font-medium">
                                Consistent visual branding is essential. Please adhere to these guidelines when using our logos and colors.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                                {/* Logo Light */}
                                <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-surface-dark p-8 group hover:border-primary/50 transition-all">
                                    <div className="bg-white aspect-video flex items-center justify-center rounded-2xl border border-dashed border-gray-300">
                                        <span className="text-black font-black text-2xl uppercase tracking-tighter">FADE<span className="text-primary">LAB</span></span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold text-white">Logo (Light Background)</h3>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Use on white or light gray surfaces.</p>
                                        <div className="flex gap-2 mt-4">
                                            <button className="text-[10px] font-black border border-primary/20 px-3 py-1.5 rounded bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors uppercase">SVG</button>
                                            <button className="text-[10px] font-black border border-primary/20 px-3 py-1.5 rounded bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors uppercase">PNG</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Logo Dark */}
                                <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-surface-dark p-8 group hover:border-primary/50 transition-all">
                                    <div className="bg-black aspect-video flex items-center justify-center rounded-2xl border border-dashed border-white/20">
                                        <span className="text-white font-black text-2xl uppercase tracking-tighter">FADE<span className="text-primary">LAB</span></span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold text-white">Logo (Dark Background)</h3>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">Use on black or primary dark backgrounds.</p>
                                        <div className="flex gap-2 mt-4">
                                            <button className="text-[10px] font-black border border-white/20 px-3 py-1.5 rounded bg-white/5 text-white hover:bg-white hover:text-black transition-colors uppercase">SVG</button>
                                            <button className="text-[10px] font-black border border-white/20 px-3 py-1.5 rounded bg-white/5 text-white hover:bg-white hover:text-black transition-colors uppercase">PNG</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Brand Colors */}
                                <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-surface-dark p-8">
                                    <h3 className="font-bold mb-4 text-white">Primary Palette</h3>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg bg-primary border border-white/10 shadow-lg shadow-primary/20"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white">Primary Blue</span>
                                                    <span className="text-[10px] font-mono uppercase text-gray-500">#3B82F6</span>
                                                </div>
                                            </div>
                                            <button className="material-symbols-outlined text-gray-500 hover:text-white transition-colors text-lg">content_copy</button>
                                        </div>
                                        <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg bg-[#0F172A] border border-white/10"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white">Dark Surface</span>
                                                    <span className="text-[10px] font-mono uppercase text-gray-500">#0F172A</span>
                                                </div>
                                            </div>
                                            <button className="material-symbols-outlined text-gray-500 hover:text-white transition-colors text-lg">content_copy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* High-Res Photo Gallery */}
                    <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            <div className="flex justify-between items-end px-4 mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tight italic">Image Gallery</h2>
                                    <p className="text-gray-400 font-medium">High-resolution interior and lifestyle photography.</p>
                                </div>
                                <button className="hidden sm:flex items-center gap-2 text-primary font-bold hover:text-white transition-colors text-sm uppercase tracking-wider">
                                    <span className="material-symbols-outlined">grid_view</span>
                                    View All (42)
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                                {[
                                    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV_MKRrWrmwQvG4iL4Mcz3q3NS4C8olUbUB8qZfCmH9I0XMUx7cZcFV40Ys6CQT5jAXb00mtAIBMFDb1149S4JvYIQmeDoIKsBsfv0nbpJDtQ3xS3-r3KLQhAiFUtxTQ3rqKnv6jj-_iaOSKT-CvtPjGetZo6kWe9xHr15HLGd1yAH5zXJ2-UeR1f_Dx5CBi6Rh9Jba3WcaYEpY9yK46oEanSVsrBEtJ0d78z7kP0_LilErWCUIlKvCEjLHaDOTIBa6NDEmimbik5w' },
                                    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb7-p8HbefJ_m0jvRdYDi2Q3TSEbFPUYlvaToRySTbpejoK7FjvR5yKxTLD6e22iW_g1dppF6LzgLpXcSlKC7ZEiinwxXpLO9a8wemXe8Lv_B8nPDsEJGViD15wobBPOXAoATnuOFP2QZk54IHowneDnpVUPkMBk8OKnG9HwXmLLdbVM7rDUp457J_mxyWK1Sz6oFIADA6_2h13Gsh9G4MDFlK9WFk3-N-IkhhOYJ98GzFjY_2UNoxwgAmEbnWGAt22idUczyvem8j' },
                                    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm3IrQhg2A3jVpsLm1Hsz-FlyAmW6X1XCzD1Mu8_TmKesMbBwyDRtm06e8FVvVcJ14vE6rm2y0f4TY2Nvvkyt3n0Y_dMp5IkxBG48SCLzYkNRgDs3aKAHLlETgcm3QTFDPGIeCKG-kolP6KTwKXR8a7osKJaUZw3kzlcav56FhjkfUN-RFhPH6PlMKTQJRYNXjexwsaOuC2vuuW1MhXJC4kuMBPPNgnCN22g-fLvq-84dfxx_IWq1JSTt1XIWdITs2WhkcaEUBZU6w' },
                                    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe9NQFuDBJ3n0mBBLwj2t61302yxuhaAPIFJKoxolA2c7UodILQbZeyCsHGwuTl9izCInc-jva_cLzC3ks4kEEAZ5OZEiUJfn7Rw9Hm4zi9sXn48gjEAhe3b4y7H6DYUVdAS-g0cRLbkWQiQjz5w14FEc5lCQFubfPWyAIRdC_7d6D0Y1Z-PFLb938mgDpQLdZWHN8LZxBDeArtpbR9U1OOTWLDP51aGYfqg7L-aos_pyVyzMhZSPdu3hLwprHxXPrYrKpi6jHq8sN' }
                                ].map((item, i) => (
                                    <div key={i} className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-white/5">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${item.img}')` }}></div>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                            <button className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-base">download</span> Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* In the News Section */}
                    <div className="px-4 md:px-20 lg:px-40 flex justify-center py-20">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            <h2 className="text-3xl font-black px-4 mb-10 text-center md:text-left text-white uppercase tracking-tight italic">In The News</h2>
                            <div className="flex flex-col gap-6 px-4">
                                {[
                                    { source: "GQ", title: "How FadeLab is Redefining the Grooming Experience", date: "March 15, 2024", color: "text-white" },
                                    { source: "Forbes", title: "The Future of Local Services: A $2B Marketplace Opportunity", date: "Jan 22, 2024", color: "text-white" },
                                    { source: "Vogue", title: "Inside the Most Aesthetic Barber Shops Across the Country", date: "Nov 10, 2023", color: "text-white" }
                                ].map((article, i) => (
                                    <div key={i} className="flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-surface-dark rounded-[2rem] border border-white/5 group transition-all hover:border-primary/30 hover:bg-surface-darker">
                                        <div className="flex items-center gap-8 mb-4 md:mb-0">
                                            <div className="text-3xl font-black text-gray-700 italic min-w-[80px] group-hover:text-white transition-colors">{article.source}</div>
                                            <div className="flex flex-col gap-1">
                                                <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{article.title}</h4>
                                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{article.date}</span>
                                            </div>
                                        </div>
                                        <a className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest group-hover:gap-3 transition-all p-3 rounded-full hover:bg-primary/10" href="#">
                                            Read <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Media Contact Section */}
                    <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10 mb-20">
                        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                            <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-12 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl shadow-primary/20 relative overflow-hidden ring-4 ring-white/5">
                                <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4">
                                    <span className="material-symbols-outlined text-[300px]">mail</span>
                                </div>
                                <div className="flex flex-col gap-4 relative z-10 text-center md:text-left">
                                    <h2 className="text-4xl font-black tracking-tighter uppercase italic">Media Inquiries</h2>
                                    <p className="text-white/80 text-lg max-w-md font-medium">For interviews, high-res custom assets, or more information, please contact our PR department.</p>
                                    <div className="flex flex-col gap-2 mt-6 font-bold">
                                        <div className="flex items-center gap-3 justify-center md:justify-start">
                                            <div className="size-8 rounded-full bg-white/20 flex items-center justify-center"><span className="material-symbols-outlined text-sm">person</span></div>
                                            <span>Julian Vance</span>
                                        </div>
                                        <div className="flex items-center gap-3 justify-center md:justify-start">
                                            <div className="size-8 rounded-full bg-white/20 flex items-center justify-center"><span className="material-symbols-outlined text-sm">badge</span></div>
                                            <span>Director of Communications</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 w-full md:w-auto relative z-10">
                                    <a className="flex items-center justify-center gap-3 bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all group" href="mailto:press@fadelab.com">
                                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">alternate_email</span>
                                        press@fadelab.com
                                    </a>
                                    <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/60">Response time: &lt; 4 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="px-4 md:px-20 lg:px-40 py-12 border-t border-white/5 bg-background-dark">
                        <div className="layout-content-container flex flex-col max-w-[1200px] mx-auto flex-1">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="flex flex-col items-center md:items-start gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                                            <span className="material-symbols-outlined text-xl">content_cut</span>
                                        </div>
                                        <span className="font-black text-2xl uppercase tracking-tighter text-white">FadeLab</span>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-600">© 2024 FadeLab Inc. All rights reserved.</p>
                                </div>
                                <div className="flex gap-12">
                                    <div className="flex flex-col gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Resources</span>
                                        <a className="text-sm font-bold text-gray-400 hover:text-white transition-colors" href="#">Press Kit</a>
                                        <a className="text-sm font-bold text-gray-400 hover:text-white transition-colors" href="#">Brand Book</a>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Follow</span>
                                        <a className="text-sm font-bold text-gray-400 hover:text-white transition-colors" href="#">Twitter</a>
                                        <a className="text-sm font-bold text-gray-400 hover:text-white transition-colors" href="#">Instagram</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
