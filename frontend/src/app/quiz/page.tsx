"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Toolbar } from "../components/Toolbar";

const HAIR_LENGTHS = [
    { id: "short", label: "Short / Buzz", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBtRGwwO1ZP3fC7Ay3G5ImYu-ucHQUX3LqmuHgyOOwyKepNtrD3aywIHEnh9rNjMaavg2kSU4TBjl-y_eQsDc3LhLYQ9M6gYEbmviSQKIP1A4kGQa_wQRmpKlrE5mF8jHVSUf4C2OgGp7_5hEKk8_rqhgvNeIUSmejyUXXscUyDG2vgH52UgGCH0jyLgFAR8xv7YVOePt_J0eKX1LxK6_gfupFGlA6olwCxoz6skh_ftY3RHY-7TjMadbCR2e5iqXLHNEt0cCteFN6" },
    { id: "medium", label: "Medium / Taper", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCTTGpd0rDJpW9vtemuxxph12EI0mc5wBs1c_P2bH-djL6lKpQpyiC9-e8F7agP83qNCiS6lMwxHAjGjVOxmbqTAtmDV5JQqEzVx60mV-NdFur1PNgbfJCNh3tyQDyFSGcMzGMDvJ74pMncSSkABzS9pExZBBqRL6AaCiA0b4wB_rESpq2avQ2k5D2UeV53qavdAb2bsy2du2zRuj2VA8UiZT9V6Zwm1RWh9qktYeoX7ScUD-a2vEij82GnyDqa_0f0wVfK01sQpJM" },
    { id: "long", label: "Long", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB12cLaO-QqHiD7QQRJTovnU7ATvex8IV2MdmGrU7ZyVgdp8r6UrReqyS_-ho47HBsRn6uZ9V9Q6wCFhPVRR2skaI90yQgBxspmdwJFx49bZjnJijyP3S0vj5511NZyJ3Yn8IuhXhacqkqq0ME4v1WuM0pBQT5P83Pr-PqARlF1BBpgRZ1ucXsvCYcWxpc1mqEDuUldDJnWS7wK59hxMpcsGXIPuJ7N8eV0nGJTF7pUQlUkgR_cPIEL1v8x35HzbhTw6l1FV5LX4n1m" },
    { id: "very-long", label: "Very Long", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6N650f5JaiJ08c6g0A7KKT8mTYi-zwQXvYqW2-K4IDy9-YdOMFUYFHkS8pCC5193HqVDMz82-LAhMJ8mfW9JCXyH4OB1aJIf5WZYGDK--XHTZyhNucr-6FxCTdvpzKDENtyPbQTqGpW_vClHf9Oz1fh3lRNjumvcBj4FWTxZswWDnXL4CU9e8UzRSm5ca9jOMIbDAcpHDmPdBNSnk1K4T3SZvnZ3JgD4TCxf5lrrG-FRT3RS36n98YCgg-Db2Zh_hseUm_knxnS72" },
];

export default function QuizPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedLength, setSelectedLength] = useState("long");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-background-dark text-white font-display min-h-screen antialiased flex flex-col">
            <Toolbar />

            {/* Top Navigation */}
            <header className="w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-xl z-20 sticky top-0">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-xl">content_cut</span>
                        </div>
                        <span className="font-black text-xl tracking-tighter uppercase">FadeLab</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Style Analysis</span>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex justify-center py-20 px-6">
                <div className="w-full max-w-4xl flex flex-col">
                    {/* Progress Section */}
                    <div className="flex flex-col gap-4 mb-16">
                        <div className="flex items-end justify-between">
                            <h3 className="text-white text-sm font-black uppercase tracking-widest">Step 1 of 5</h3>
                            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Hair Profile</p>
                        </div>
                        <div className="rounded-full bg-white/5 h-2 overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "20%" }}
                                className="h-full rounded-full bg-primary shadow-glow"
                            />
                        </div>
                    </div>

                    {/* Quiz Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center mb-6 leading-none">
                            Current <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Hair Length?</span>
                        </h1>
                        <p className="text-gray-500 text-lg font-medium text-center mb-12 max-w-xl">
                            Select the baseline for your current style. This helps our lab specialists recommend the best transition for you.
                        </p>

                        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            {HAIR_LENGTHS.map((opt) => (
                                <label key={opt.id} className="group relative flex flex-col gap-4 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="hair_length"
                                        className="sr-only"
                                        checked={selectedLength === opt.id}
                                        onChange={() => setSelectedLength(opt.id)}
                                    />
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className={`relative aspect-[3/4] rounded-[2rem] overflow-hidden border-2 transition-all duration-300 ${selectedLength === opt.id ? 'border-primary shadow-2xl shadow-primary/20 scale-105' : 'border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url('${opt.img}')` }}
                                        />
                                        <div className={`absolute inset-0 bg-primary/20 transition-opacity duration-300 ${selectedLength === opt.id ? 'opacity-100' : 'opacity-0'}`} />

                                        {/* Selection Indicator */}
                                        <div className={`absolute top-4 right-4 size-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform duration-300 ${selectedLength === opt.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                            <span className="material-symbols-outlined text-[20px] font-black">check</span>
                                        </div>
                                    </motion.div>
                                    <p className={`text-center text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${selectedLength === opt.id ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`}>
                                        {opt.label}
                                    </p>
                                </label>
                            ))}
                        </div>

                        {/* Footer / Controls */}
                        <div className="w-full flex items-center justify-between border-t border-white/5 pt-10">
                            <Link href="/barbers" className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white/5">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Cancel
                            </Link>
                            <div className="flex items-center gap-4">
                                <button className="text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all">
                                    Skip Analysis
                                </button>
                                <Link
                                    href="/quiz/results"
                                    className="bg-primary hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center gap-3 active:scale-95"
                                >
                                    Proceed TO PHASE 2
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
