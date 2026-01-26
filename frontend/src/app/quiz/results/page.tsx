"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Toolbar } from "../../components/Toolbar";

const RECOMMENDED_STYLES = [
    { title: "Textured Fringe", desc: "Best for balancing your forehead width.", match: "98%", tags: ["Low Maint", "Scissor Work"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKco7BXs__7M96meRaTIZ60e2tng4U-w6Qp5unJTmrmhEHZKiE4_LNhE2FF-f8KAa_lzndbrQ0Kb6M_g7Kqy91jeBuamTr2omGYt2IZIGcGXJXjh0IaTPZKMLh3uDHwA7A_m_yZ4wB--BKd8zhqDWiEvsEC8zdD9on1odYTGI_EJK70tKAF1N8MRCf9z9fweJsZnGS4phvVGVBdJ46IBd5n16v4V7gATq69tirFDO96Wf28J5ySmxTWbx5NY8lUchh0OrjhkjpSP3f" },
    { title: "Executive Contour", desc: "Classic, professional, and timeless.", match: "94%", tags: ["Medium Hold", "Clipper Cut"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZexrLqYBiLYdDAXdNmncNeVYR4eoHtslq1-VZEXvuRRvGpVatW8e2ABMufyzSnLdliI00NzJWANLpktCjZq9D1ZvyKXUKQpbUGF50zW7tqEguV9iCr7jrrMlHW2BQTyeZPDlc8zpUVjS1dc7IPTxtGjWFJ9ojnbB-4pwPQrPiFZ6Y4nnMoOCdNBUGoP1g2RyXp0E391mgq9yiSbYdSKAJiD65Upmi53sFcwffNnkcpwVBoQezK1GDWQiHqT1rDZYqcftY0OtvB08I" },
    { title: "Textured Crop", desc: "Trending now. Edgy yet refined.", match: "88%", tags: ["Textured", "Skin Fade"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEWQKilPfxm0L2pSsfQwU89XTGX6dFN7HZL1t_Dp4-AESv6Pc8sqTVXklpL5wkUWJynLGw3ajJIWD_qaybkcxc7_6hc12n1tcbvkJ5PWoIX8M6hia98ev1OdN93S1bl_H0etNpRZ5Ebd_d-AQF-ro5L8QobPSAydP39DqlEOiZsb0dYp_qYI88f36ssEhkslide0zQeSzJnfhFaXCMkkLEsdkXs-JOSywraokRM3edBDNVnk7McYo8WdtjQC4__wnGoNbSDX83Mu-2" },
];

const BARBER_MATCHES = [
    { name: "Marcus Thompson", role: "Senior Stylist • Scissor Cut Specialist", match: "99%", rating: 4.9, reviews: 320, available: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPSjA0gclXiiyezg2KXgw4jMd1BtElNZQeHUtQ3Pfd5yp0JdNPRLrrF752ZeVIQ1sOZ9oNNGoxMceK66zp9wFv3oYQPn4gJ-VSnSfkpD0CkW9fpEI2m3kN2prD_hMb6vefvsNNXDb2qqWqT-8ZchQpL7SlIlBurN9cuRzCq8k_eUp5LZtu_WDWUVh-YYsOpjqroJgZE-M__5Kedh0-bGNcy57af8hhrwRgSms9OJOlKdf674aDF3XsfhBQcrheWPpdb52lnY4BLwfh" },
    { name: "David Chen", role: "Master Barber • Fade Specialist", match: "95%", rating: 4.8, reviews: 195, available: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIlOCOsjDGipGMr_-Mo8ybLau0gh9lzjHp9UFcslVOOV4OEVu42FeqvkeA0IerNwm-oc_0ji134lXs5PU6MOEo1AHGD2-cq7yNLf6OQGCf0ifXgqX0swauXZ4TGQHR3jB0HHalgrA2mQXy7g9_R7v4KrvJYY1A_sPeCMQlWQ5p02bJHhCBFoqES_iWMEVqE9_31gu2yw-3cibrnx9YBDX2CJw3_qCZRg-GL-1tRHu_KD5yzH7ipnP5A_bDiCLIV0ysk0fC8iC4WDFG" },
    { name: "Sarah Jenkins", role: "Stylist • Texture Expert", match: "92%", rating: 4.9, reviews: 110, available: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh8_vTLqzuCUoxl-TXvNNtLWpRs9jlVgr02Yg5Ctx5aIxOkaz_SmZN-suu6QNEc96BTWEpYDaU5b5ITz3ftruDviTqBu0x0f9XFtJ7jGWnM4bvOX6C2vWH3Lkgr3HllyzIrlg1bBtRAbF4N-5HfjoCZdIRUhKGVlcwgmRyvJPFqMD4ZqQl5apYKaQl-9nT5f2BPl93FfCK0kkvMgTURFlbyaAKRiBfRxxcbtB_PqNeVPhXpgGbVKl9YLhEKRPB2KKImAwRMMfZhUOQ" },
];

const PRODUCTS = [
    { name: "Matte Clay", price: "$22", desc: "Strong hold, no shine", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhaE4cWF_tL8frp5_VtiXZhquQach7LdWfve9uetofvPvb4ONm24ZJuBBh0uDOWu99ZGVbhQ3pIWwO4a90twNhegGtGihCDTk79jBxUqAtY4k0UfGGZleC2rlGvjnG8WdguOtw8C7LOAe8V2sflLurD9tmCOzElk_3oGtddFS4u3gYWzvFZjKpQoi_jIouQj2qFwGkTooG1-w20l_gbIeBfhRuwYAzULP91gIqtypQEiAQECU2yBE2M6kdHQ5mPClsQjwiJkAxJ2oI" },
    { name: "Sea Salt Spray", price: "$18", desc: "Adds texture & volume", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZURMqt-JkMW7Wjgz8vmyQ691OT0Rt7W2mK6cpZJ5OonS95izWd_eGyiEvJOktE90zuLHZEsNhKMZ3CpnvpMsG68zlC6pGXfh_ANb_LdcQmkvDFSAJRcBkJ9C1YFjIzRbzHlBwKStdbUSeURwe7_kJB1H7wPHuNeOuUnfQQeso9W5t-YBWmFGGg8pMm11XUeim0P0GfeNeumozGmLCRkkddEs1jIYlsfTy7YXSo0tPzFdahw_hdQYgBrr3mQRh7BRXbXN_Xn9A-_HX" },
    { name: "Styling Comb", price: "$12", desc: "Wide tooth, anti-static", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtf5FUuw2x24_gygZPN2_fMeza7F1lPALhwml9syE9rx6HrVgUxJzmh26clWYQ-dnt2gqFPpGLNqeA2321h3bwiSJJ48z-mV3HCxdAgHiYs8GWOH6gbjUqoB8hiCnHcGfKmt_b-hwACOBm40KAl8mdEiQJGhxuKjAIsqFvxsUfg4cRMd47t4iQnvsZTAjfcGnEi1u_5hQYGrLIRco1bGQob8rQx-cEBCA8ea8S-NltV_qTarzWJBi7NJdq_z6w_E5rJfJvHgfi1-ly" },
];

export default function ResultsPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-background-dark text-white font-display min-h-screen antialiased flex flex-col pb-40">
            <Toolbar />

            {/* Header branding */}
            <header className="w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-xl z-20 sticky top-0">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-xl">content_cut</span>
                        </div>
                        <span className="font-black text-xl tracking-tighter uppercase">FadeLab</span>
                    </Link>
                    <Link href="/quiz" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Retake Analysis</Link>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-20 w-full flex flex-col gap-24">
                {/* Hero Results Selection Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 w-fit">
                        <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                        <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Analysis Complete</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter">
                        Your Style Match: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">The Modern Gentleman</span>
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
                        Based on your square face shape and thick hair texture, we've curated these specific cuts to enhance your jawline while keeping maintenance manageable.
                    </p>
                </motion.section>

                {/* Recommended Styles Blueprints */}
                <section>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Recommended Styles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {RECOMMENDED_STYLES.map((style, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl hover:border-primary/50 transition-all duration-500 flex flex-col"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${style.img}')` }} />
                                    <div className="absolute top-6 right-6 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-black text-[10px] font-black tracking-widest uppercase shadow-xl">
                                        {style.match} Match
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent opacity-60" />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{style.title}</h3>
                                    <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed flex-grow">{style.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {style.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1.5 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Assigned Barber Specialists */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-10">Your Top Barber Matches</h2>
                    <div className="flex flex-col gap-6">
                        {BARBER_MATCHES.map((barber, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 10 }}
                                className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-[2.5rem] bg-surface-dark border border-white/5 hover:border-primary/30 transition-all group"
                            >
                                <div className="relative">
                                    <div className="size-20 md:size-24 rounded-full bg-cover bg-center border-4 border-white/5 shadow-2xl" style={{ backgroundImage: `url('${barber.img}')` }} />
                                    {barber.available && (
                                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full border-4 border-[#121826] shadow-xl uppercase">
                                            Live
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{barber.name}</h3>
                                        <span className="material-symbols-outlined text-primary text-[20px] font-black">verified</span>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest mb-4">{barber.role}</p>
                                    <div className="flex items-center justify-center md:justify-start gap-6">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-yellow-500 text-[16px] fill-current">star</span>
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">{barber.rating} ({barber.reviews})</span>
                                        </div>
                                        <div className="text-primary text-[10px] font-black uppercase tracking-widest">{barber.match} Style Match</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <Link href="/barbers" className="flex-1 md:flex-none border border-white/10 text-white font-black text-[10px] uppercase tracking-widest h-12 px-8 rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                        Profile
                                    </Link>
                                    <Link href="/barbers" className="flex-1 md:flex-none bg-primary/10 text-primary hover:bg-primary hover:text-white font-black text-[10px] uppercase tracking-widest h-12 px-10 rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-primary/10">
                                        Select
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Maintain the Look - Recommended Products */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-10">Maintain the Look</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {PRODUCTS.map((product, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="flex flex-col p-4 bg-surface-dark rounded-[2rem] border border-white/5 group"
                            >
                                <div className="aspect-square w-full rounded-2xl bg-white/5 mb-6 overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${product.img}')` }} />
                                </div>
                                <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">{product.name}</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-6">{product.desc}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-black text-white">{product.price}</span>
                                    <button className="size-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all text-gray-400">
                                        <span className="material-symbols-outlined text-xl">add</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        {/* More products trigger */}
                        <div className="flex flex-col p-4 bg-white/5 rounded-[2rem] border border-dashed border-white/10 items-center justify-center text-center group cursor-pointer hover:border-primary/50 transition-colors opacity-50 hover:opacity-100">
                            <span className="material-symbols-outlined text-3xl mb-3 text-gray-600 group-hover:text-primary">shopping_bag</span>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">View Shop</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Floating CTA Bar (Sticky Footer) */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 w-full bg-surface-darker/95 backdrop-blur-2xl border-t border-white/5 p-6 z-[100] shadow-2xl"
            >
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="hidden sm:flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Selected Blueprint</span>
                        <div className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-2">
                            Textured Fringe
                            <span className="text-primary size-1.5 rounded-full bg-primary" />
                            Marcus Thompson
                        </div>
                    </div>
                    <Link href="/barbers" className="w-full sm:w-auto bg-primary text-white h-14 px-12 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-2xl shadow-primary/30 active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        Book Recommended Cut
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
