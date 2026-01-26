"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toolbar } from "../components/Toolbar";
import { BarberProfileModal } from "../components/BarberProfileModal";

const BARBERS = [
    {
        id: 1,
        name: "Mark D.",
        role: "Master Stylist",
        status: "Available Now",
        color: "emerald",
        rating: 5.0,
        exp: "8 Years",
        trait: "The Listener",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0qHa9GG916Tc_uBvB2_hjkpFEhLzoDqkqKuGpYklGdSO2P1mt5UWZTcEqzHrLnFgalJ08ZSDX-ZMMnW6DYCUcadwjk2t_IqzbDPHCSLHEJoqMCqW0uS-99QwT0Kjo4HLo1j23Lz1alIyue4TQOJyIj6w8n5_MxUmL5w3JhLHMFipgdUP2s44ZSX4snDxSmdl1Yr-zAetCbZAvZacCspOplBiaQRJXOmKwasPxHlOQyhl3sSbJlWm9vTfTT-O26ZwwXIrTDe6w3oSd",
        bio: "Mark D. is a veteran in the grooming industry with 8 years of experience. He specializes in bespoke scissor cuts and precision fades. Known as 'The Listener', Mark ensures every client's vision is translated perfectly into their final look.",
        traitIcon: "psychology"
    },
    {
        id: 2,
        name: "James K.",
        role: "Fade Specialist",
        status: "Next: 2:30 PM",
        color: "yellow",
        rating: 4.9,
        exp: "5 Years",
        trait: "The Conversationalist",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWBOlqQi020RlUJunvPdoD2RV26Rade-KRK8ir5mG0DN-bAEi723sSrGDYbc2d9IRJvCiDKE3lBzLDvAWRmhh8xMGl6Iy_vypBaPu5_7A3TH9z0jjuF5mVIdMzIY-7XOnultOErYc59X7bGIMRpOk9xTQeEOvPj7NVO8Fz66EhelEqsxp4nNCvNgN68VlTcirUBzOT8aR92Nb8VoMzRcGj6ouHMeoOWxpZcbxn4ELpM_uX3AxXa7U-AybkhLLXQaLF1Wb5moNL3Hkd",
        bio: "James K. brings energy and sharp technical skills to the FadeLab team. With 5 years of mastery in technical fades and modern urban styles, James is the go-to for anyone looking for the sharpest line-up in the city.",
        traitIcon: "record_voice_over"
    },
    {
        id: 3,
        name: "Sarah M.",
        role: "Beard Expert",
        status: "Fully Booked",
        color: "red",
        rating: 4.9,
        exp: "6 Years",
        trait: "Silent & Focused",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaqYTQ5iC-pnGpVWKxQpRXxr_AZWQhYEuNUwSUm6ikdl8MzxV2SJmWwg5dw8aWba3tE6DGHvEVgmRKwdDIEcUAauYz1OyutyGvfV8bixJY1zdwdgoyI1UrRBCczmEBAtaTDuBKp3gvot_bOjRyDPheTQc-yjy4r1KEx6tizTS4u2Ksn91p7KXL8dfY03pt8bn7OFFMOTGTe0VzPpRqE4aMqB-8VJmJFC8UsOktum2kJYRApkmcCxjBzcs5NYavw5s2gUz4tLyvYAE0",
        bio: "Sarah M. is our resident authority on beard sculpture and maintenance. With 6 years of focused experience, she combines traditional hot towel services with modern grooming products to keep your facial hair looking its absolute best.",
        traitIcon: "volume_off"
    },
    {
        id: 4,
        name: "Jason Miller",
        role: "Texture Pro",
        status: "Next: 4:00 PM",
        color: "emerald",
        rating: 5.0,
        exp: "12 Years",
        trait: "High Energy",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2",
        bio: "With over a decade of precision craft, Jason combines old-school barbering with modern aesthetic science. Starting his career in traditional Italian barbershops, he mastered the straight razor shave before moving into advanced texturizing.",
        traitIcon: "bolt"
    },
    {
        id: 5,
        name: "David L.",
        role: "Senior Barber",
        status: "Available Now",
        color: "emerald",
        rating: 4.8,
        exp: "10 Years",
        trait: "The Listener",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1AofsJTDOCwx04Qy58ckD5-660yfEzK17mAw89h25AtC0JiYDAITpgSdRQ_nG9y_nlvvE3MRQopm0t_iWJ0se42u5xWnrSfgz-ouO4RfdSWJM-VFZe3sAR7sv6OwCUvAmC1Gsn-TciFvhDt8rxzz4rYfdxraWJM9YoAcfTjlAaekvGBlQYmFadeLuG1gf5dJ16ngX5UKfPX3iSgbonEqARAJqwzE3-3BZ3YKSbynFVWHOxCM5IB9OOTbNoD0xsZYDfP8A3m",
        bio: "David L. is a senior master of the craft with 10 years under his belt. He specializes in classic styles and meticulous attention to detail, ensuring every cut is as durable as it is stylish.",
        traitIcon: "psychology"
    },
    {
        id: 6,
        name: "Alex R.",
        role: "Classic Cuts",
        status: "Next: Tomorrow",
        color: "yellow",
        rating: 4.7,
        exp: "4 Years",
        trait: "Chill Vibe",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeqPMNYIkd9EyzBqCl90RzS5YBk-Pk62gw56wnZoyp7Xr4ISTOGXoLxJBDUntebJSWZrm2ezNC7QbEFv-9K0AUClg_Mpx3CHWyV_yN7VhMdSkB4MKtXZGNDummxkgh_t2zSYh3_LwW6vutggQep7NTrY1S7mUuLYK3gmu1_bQKMjff2ODY2jA8mQYcr44QQ2ZzLC-qTUu3ritXoBbxiwBoq3iVGHWOQ2ymtTieiwKplTs6cO2IwcEaOq_0pWQAcJnRGyH0IqWzqGZe",
        bio: "Alex R. brings a signature 'Chill Vibe' to FadeLab. With 4 years of experience, Alex specializes in low-maintenance, high-style classic cuts that grow out beautifully.",
        traitIcon: "record_voice_over"
    },
    {
        id: 7,
        name: "Marcus V.",
        role: "Precision Fade",
        status: "Available Now",
        color: "emerald",
        rating: 4.9,
        exp: "7 Years",
        trait: "Perfectionist",
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
        bio: "Marcus treats every fade like a mathematical equation. His precision is unmatched, ensuring a gradient so smooth it looks like it was airbrushed.",
        traitIcon: "architecture"
    },
    {
        id: 8,
        name: "Elena R.",
        role: "Stylist",
        status: "Next: 1:15 PM",
        color: "yellow",
        rating: 5.0,
        exp: "9 Years",
        trait: "Trendsetter",
        img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800",
        bio: "Elena isn't just a barber; she's a style consultant. If you want to completely reinvent your look, she's the visionary you need in your corner.",
        traitIcon: "auto_awesome"
    },
    {
        id: 9,
        name: "Tyson B.",
        role: "Line-up King",
        status: "Fully Booked",
        color: "red",
        rating: 4.8,
        exp: "6 Years",
        trait: "Sharp Eye",
        img: "https://images.unsplash.com/photo-1534030347209-567808842200?auto=format&fit=crop&q=80&w=800",
        bio: "Tyson is famous for his crisp line-ups. He frames the face with geometric precision that enhances your natural bone structure.",
        traitIcon: "content_cut"
    },
    {
        id: 10,
        name: "Leo C.",
        role: "Classic Gent",
        status: "Available Now",
        color: "emerald",
        rating: 4.7,
        exp: "15 Years",
        trait: "Traditionalist",
        img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=800",
        bio: "Leo keeps the old traditions alive. Hot towels, straight razors, and classic cuts that never go out of style.",
        traitIcon: "history_edu"
    },
    {
        id: 11,
        name: "Sofia M.",
        role: "Texture Queen",
        status: "Next: 3:45 PM",
        color: "yellow",
        rating: 4.9,
        exp: "5 Years",
        trait: "Creative",
        img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800",
        bio: "Sofia specializes in working with natural texture. Whether it's curls, waves, or coils, she knows exactly how to shape them for maximum impact.",
        traitIcon: "brush"
    },
    {
        id: 12,
        name: "Diego F.",
        role: "Razor Expert",
        status: "Available Now",
        color: "emerald",
        rating: 4.8,
        exp: "8 Years",
        trait: "Steady Hand",
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
        bio: "Diego's straight razor skills are legendary. For the closest shave of your life without a hint of irritation, he is the specialist to book.",
        traitIcon: "dry_cleaning"
    },
    {
        id: 13,
        name: "Andre P.",
        role: "Afro Specialist",
        status: "Fully Booked",
        color: "red",
        rating: 5.0,
        exp: "11 Years",
        trait: "Master Sculptor",
        img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=800",
        bio: "Andre views afro hair as a medium for sculpture. His shaping techniques create balanced, powerful silhouettes that command attention.",
        traitIcon: "stat_1"
    },
    {
        id: 14,
        name: "Kenji T.",
        role: "Scissor Master",
        status: "Available Now",
        color: "emerald",
        rating: 4.9,
        exp: "14 Years",
        trait: "Detailed",
        img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800",
        bio: "Kenji's scissor-over-comb technique is mesmerizing. He builds weight and graduation with a level of control that results in perfectly growing-out cuts.",
        traitIcon: "content_cut"
    },
    {
        id: 15,
        name: "Raymond G.",
        role: "Old School",
        status: "Next: Tomorrow",
        color: "yellow",
        rating: 4.6,
        exp: "20 Years",
        trait: "Veteran",
        img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=800",
        bio: "With two decades of experience, Raymond has seen every trend come and go. He sticks to what works: clean cuts, good conversation, and great service.",
        traitIcon: "school"
    },
    {
        id: 16,
        name: "Jamal W.",
        role: "Modern Mullet",
        status: "Available Now",
        color: "emerald",
        rating: 4.8,
        exp: "3 Years",
        trait: "Edgy",
        img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=800",
        bio: "Jamal is the new blood pushing boundaries. He specializes in modern mullets, shags, and edgy alternative cuts for the bold.",
        traitIcon: "flash_on"
    }
];

export default function BarbersPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [selectedBarber, setSelectedBarber] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectionDate, setSelectionDate] = useState<number | null>(null);
    const [selectionTime, setSelectionTime] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const openProfile = (barber: any) => {
        setSelectedBarber(barber);
        setIsModalOpen(true);
    };

    if (!mounted) return null;

    return (
        <div className="bg-background-dark text-white font-display min-h-screen antialiased selection:bg-primary selection:text-white pb-20">
            <Toolbar />
            {/* Minimal Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-xl border-b border-white/5 text-white">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button onClick={() => router.back()} type="button" className="flex items-center gap-2 group">
                        <div className="size-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white group-hover:bg-primary group-hover:border-primary transition-all shadow-glow">
                            <span className="material-symbols-outlined text-sm group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
                        </div>
                        <span className="text-white text-sm font-black uppercase tracking-widest group-hover:text-primary transition-colors">Back</span>
                    </button>
                    <button className="bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest h-9 px-5 rounded-lg transition-all border border-white/10">
                        Login
                    </button>
                </div>
            </div>

            <main className="pt-32">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
                            Select Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Specialist</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl font-medium">
                            Browse our team of master barbers. Filter by expertise or vibe to find the perfect match for your next cut.
                        </p>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-1/4 flex-shrink-0 space-y-6">
                            {/* AI Match Card */}
                            <div className="bg-[#0f1623] border border-white/5 p-6 rounded-[2rem]">
                                <div className="size-10 bg-[#1e293b] rounded-xl flex items-center justify-center mb-6 text-primary shadow-glow">
                                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                                </div>
                                <h3 className="font-black text-lg text-white mb-2 uppercase tracking-tight">AI MATCH</h3>
                                <p className="text-xs text-gray-400 mb-6 font-medium leading-relaxed">Not sure who to pick? Let our algorithm find your perfect barber match.</p>
                                <Link href="/quiz" className="w-full bg-primary hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center justify-center">
                                    Match Me
                                </Link>
                            </div>

                            {/* Availability Card */}
                            <div className="bg-[#0f1623] border border-white/5 rounded-[2rem] p-6">
                                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                                    Availability
                                    <span className="material-symbols-outlined text-primary text-[16px]">schedule</span>
                                </h4>
                                <div className="space-y-4">
                                    {['Anytime', 'Today', 'This Weekend'].map((opt) => (
                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="radio" name="availability" className="peer appearance-none size-4 bg-white/5 border border-white/10 rounded-full checked:bg-white checked:border-white transition-all" />
                                            </div>
                                            <span className="text-gray-500 group-hover:text-white transition-colors text-xs font-bold">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Style Expertise Card */}
                            <div className="bg-[#0f1623] border border-white/5 rounded-[2rem] p-6">
                                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                                    Style Expertise
                                    <span className="material-symbols-outlined text-primary text-[16px]">content_cut</span>
                                </h4>
                                <div className="space-y-4">
                                    {['Skin Fades', 'Scissor Cuts', 'Beard Sculpting', 'Design Work'].map((opt) => (
                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="checkbox" className="peer appearance-none size-4 bg-white/5 border border-white/10 rounded checked:bg-primary checked:border-primary transition-all" />
                                                <span className="material-symbols-outlined text-[10px] text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                                            </div>
                                            <span className="text-gray-500 group-hover:text-white transition-colors text-xs font-bold">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Personality Type Card */}
                            <div className="bg-[#0f1623] border border-white/5 rounded-[2rem] p-6">
                                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                                    Personality
                                    <span className="material-symbols-outlined text-primary text-[16px]">psychology</span>
                                </h4>
                                <div className="space-y-4">
                                    {['The Listener', 'The Conversationalist', 'Silent & Focused', 'High Energy'].map((opt) => (
                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="checkbox" className="peer appearance-none size-4 bg-white/5 border border-white/10 rounded checked:bg-primary checked:border-primary transition-all" />
                                                <span className="material-symbols-outlined text-[10px] text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                                            </div>
                                            <span className="text-gray-500 group-hover:text-white transition-colors text-xs font-bold">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full py-3.5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white border border-white/5 rounded-2xl hover:bg-white/5 transition-all">
                                Reset Parameter Matrix
                            </button>
                        </aside>

                        {/* Barber Grid */}
                        <main className="w-full lg:w-3/4">
                            <div className="flex items-center justify-between mb-10 text-white">
                                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Showing <span className="text-white">16</span> specialists</p>
                                <div className="flex items-center gap-4">
                                    <select className="bg-surface-dark border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl focus:ring-primary focus:border-primary px-4 py-2.5 outline-none cursor-pointer">
                                        <option>Sort: Recommended</option>
                                        <option>Rating (High-Low)</option>
                                        <option>Exp (High-Low)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {BARBERS.map((b, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className={`group bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 shadow-2xl flex flex-col ${b.status === 'Fully Booked' ? 'grayscale opacity-60' : 'hover:border-primary/50'}`}
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => openProfile(b)}>
                                            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${b.img}')` }}></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-${b.color}-500/20 border border-${b.color}-500/30 backdrop-blur-md`}>
                                                    <div className={`size-1.5 rounded-full bg-${b.color}-500 ${b.color === 'emerald' ? 'animate-pulse' : ''}`}></div>
                                                    <span className={`text-[10px] font-black uppercase text-${b.color}-400`}>{b.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => openProfile(b)}>{b.name}</h3>
                                                <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-xl text-yellow-400 text-[10px] font-black uppercase tracking-tighter">
                                                    <span className="material-symbols-outlined text-[14px] fill-current">star</span> {b.rating.toFixed(1)}
                                                </div>
                                            </div>
                                            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">{b.role}</p>

                                            <div className="flex flex-wrap gap-2 mb-8">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-widest text-gray-400 border border-white/5">
                                                    <span className="material-symbols-outlined text-[14px]">verified</span> {b.exp} Exp.
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-widest text-gray-400 border border-white/5">
                                                    <span className="material-symbols-outlined text-[14px]">{b.traitIcon}</span> {b.trait}
                                                </span>
                                            </div>

                                            <div className="mt-auto pt-6 border-t border-white/5 flex gap-3">
                                                <button onClick={() => openProfile(b)} disabled={b.status === 'Fully Booked'} className="flex-1 bg-white text-background-dark font-black text-[10px] uppercase tracking-[0.15em] py-4 rounded-2xl hover:bg-primary hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                                    {b.status === 'Fully Booked' ? 'FULL' : 'BOOK'}
                                                </button>
                                                <button onClick={() => openProfile(b)} className="px-5 border border-white/10 rounded-2xl hover:bg-white/5 text-white transition-all">
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </main>

            {/* Barber Profile Modal */}
            {/* Barber Profile Modal - Componentized */}
            <BarberProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                barber={selectedBarber}
            />

            {/* Footer - Extracted & Updated Fields */}
            <footer className="bg-surface-darker/60 backdrop-blur-xl border-t border-white/5 pt-32 pb-20 mt-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
                        <div className="col-span-1">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="size-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-glow">
                                    <span className="material-symbols-outlined text-2xl">content_cut</span>
                                </div>
                                <span className="text-2xl font-black uppercase tracking-tighter text-white">FadeLab</span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
                                Redefining the modern grooming standard through anatomical precision and tactical aesthetic design.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Location Matrix</h4>
                            <div className="space-y-2 text-sm text-gray-500 font-bold uppercase tracking-tight italic">
                                <p>123 Barber St.</p>
                                <p>Downtown District</p>
                                <p>New York, NY 10001</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Temporal Hours</h4>
                            <div className="space-y-2 text-sm text-gray-500 font-bold uppercase tracking-tight italic">
                                <p>MON - FRI: 0900 - 2000</p>
                                <p>SATURDAY: 1000 - 1800</p>
                                <p>SUNDAY: CLOSED</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Comms Link</h4>
                            <div className="space-y-2 text-sm text-gray-500 font-bold uppercase tracking-tight italic">
                                <p>(555) 123-4567</p>
                                <p>book@fadelab.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">© 2024 FadeLab. Tactical Grooming Unit.</p>
                        <div className="flex gap-12">
                            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">Privacy Protocol</a>
                            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">Operational Terms</a>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(17, 82, 212, 0.2);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(17, 82, 212, 0.4);
                }
            `}</style>
        </div>
    );
}
