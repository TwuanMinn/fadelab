"use client";

import { motion } from "framer-motion";

export function GalleryTab() {
    const galleryItems = [
        { id: 1, title: "Anatomical Fade", date: "Oct 24, 2023", barber: "Jason Miller", img: "https://images.unsplash.com/photo-1503951914875-befea74701c5?auto=format&fit=crop&q=80&w=800", tags: ["SHARP", "TEXTURE"] },
        { id: 2, title: "Beard Sculpt Matrix", date: "Sep 12, 2023", barber: "Sarah Jenkins", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800", tags: ["LINED", "OIL"] },
        { id: 3, title: "Classic Pompadour", date: "Aug 05, 2023", barber: "Mark Davis", img: "https://images.unsplash.com/photo-1599351431202-6e0000a4dbe1?auto=format&fit=crop&q=80&w=800", tags: ["GLOSS", "CLASSIC"] },
        { id: 4, title: "Modern Slick Back", date: "Jul 18, 2023", barber: "James K.", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800", tags: ["CLEAN", "ELITE"] },
    ];

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Visual Archive</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">A high-fidelity record of your styling evolution. Perspective, precision, and performance captures.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryItems.map(item => (
                    <motion.div
                        key={item.id}
                        whileHover={{ y: -10 }}
                        className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden group cursor-pointer"
                    >
                        <div className="aspect-[4/5] relative overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${item.img}')` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute top-6 right-6 flex gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-[8px] font-black text-white uppercase tracking-widest">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1 italic">{item.title}</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.date} • {item.barber}</p>
                                </div>
                            </div>
                            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-white font-black text-[9px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:border-blue-500 transition-all">Rebook This Look</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
