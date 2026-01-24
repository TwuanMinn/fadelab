"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function MoodboardWorkspace() {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<number | null>(4);

    const items = [
        {
            id: 1,
            type: "sofa",
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-GWO__toXOJT0vmZYwNVqoj3rehqfV6eLdI-14GMFmXZsWLXjBZ6v5vE-3gzIiy1mb5xk-4xpSJ0YkLu6DGtZmW6VRPsk7Mh31dDcx8kEdz5KBFRAP1n4bkoCJvFdWQQgbEcS6SyUX7jLPXJrJeEZ83EO3VbfUkSuNi9stTUuNmaVKGojlgAo6PT7Ni3_TdKgGCv2eNFwQDvVfg8fqDJubbYqYjD8e4h--C5Mas0wXO4CX_Sw9s9rgN_2azZSHa7pUzUVBRaUoE",
            top: "30%",
            left: "25%",
            width: 320,
            zIndex: 10
        },
        {
            id: 2,
            type: "rug",
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK888AHn3mdlJr3uYLscVFansD6irXWekJtkMqZD00hRHusWqrGD6hOkAvmQQHJDn1psk9Jkz13_AZZLheL_QetZxQQQPEqqTLoYfSKYOXxjQTaUdGgs6uZ3hjhA2dgItqkYAexHrEy-pv93xEHdW02H3nbsyvjFAAKcbLDnSSXqmNef4hIaEv2yfd7oF_-yhFUllRY7aB6N93ngzwekz885LPn8CNTEKr8b6cGPFfGNHdmjbQeKTt8BG0CLV8AyqMacBTNmZ0eUQ",
            top: "45%",
            left: "20%",
            width: 384,
            zIndex: 0,
            rotate: 3,
            opacity: 0.8
        },
        {
            id: 3,
            type: "table",
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYjlTLseJ9nfGp_kyB5t0RiC14Zh0Ievlk17bPaeE_UKPSoLJZnFsNtuMqRFzuQAkIl-vP-qEZEk7YLBa-VnhnCh53BeF7ISWWET3unrC8hJK2iy8bkVeYHJWqUgjF3cLuIvxih4hEiQ7mNAuiEQz5zuYkQkKgmAjsiTzRleKRDfdgJfx0vFfYu9DOKZ33nf82oaipuUlN-BsKSoXFqm7HTdO4YQO4RJd__BQHN8xHHtkojwgDs47J7Zaiff8Jj5Z9JXW3pkbc2B0",
            top: "42%",
            left: "40%",
            width: 160,
            zIndex: 20
        },
        {
            id: 4,
            type: "lamp",
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKNSqsWCsgOvEgSEpuX0fqF9Vs2Jur7vUGIwtFD3_NeIMVsZa751bZtc-6gTZ8BIllXtqPhlphI2BTt74tLvX9nkI5x8dOGtYi1EcAVRDUG6DsQs3KV2mCsxoGjjMTznOlELGkIhsPJNo30EuujvSOWVWCf_sVTTlGgN5pVd9ngQ3bZa8a8EUZNhXLMb2YPZjp7MAWUWL5vFbDrEuDleJdOzQWEpVCbs4curtYKZxQYVlQI7ukmlWwmmvt9Si9Yw6WTGf-_eiVgBw",
            top: "20%",
            left: "55%",
            width: 96,
            zIndex: 30
        }
    ];

    const recommended = [
        { name: "Lounge Chair", price: "$240", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHw_cXKib8ROa7uU9hsDrFS-eqZrYV6pE8QQmpatrxjXWTnbqT7yDyZY_W1_630skIeoHfJN7BlFd6yOu_nt_e89cdbN-HH0kLnJaZyw4TgoAEMIPQ6STN5L6eiBYRuLVO1Z-sUEe2UGE-foRPgDL7YDhBTG22hYdQzu6SioTqX3G9EpOhP0LZYMRwKbRh_BYmNADh5mZmRtF5VqeM2yNZxna4lAmUu6bD4dTI11tE5g0-ZSBgbYZ8paBAf8dii3gRH3duDRMDjEc" },
        { name: "Line Art Print", price: "$45", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUdqlku7HRjFjLNxvU4jp24rZE6SRMVBNOIs1T4Xu2YjcbTNL0n2f2DZFJxB0ayclpLggT9XNCXHfm9McgIYZH3RqdyqywW1cgwSIjjM1GUuWdPOOymDss_b1Dsq38W0boAUke4QUMO3vkgEnZULahvBDzokGDfwHFkBgHOR3CSL3ZAhBsdZ8PbhTSR5RtLFByZhUYAS4_SclDg5Kwu2i4tGa8bbKf9_zyDuW643ASIGiS_MxkmV4bW9VYRhI4x7041EaruwOUhxA" },
        { name: "Clay Vase", price: "$32", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtWEtjCk4ih0uW_bhYR1IwkJMOhyC7hROt4nxDSRz-Ja1iE5ywBSgBp4V7oSoDUsWs5UP22tfOnLrIoyCcC7KtaNPehtARdxPqSpl0Cy321SEI6Kn3gfwKsqd2zwBNFhZ2Zz4lzuJXzYaNrrZigakdYA733aIiiTX6HbbzsOYfY9d9PMKLs6TqgA3FlprP7UZu1_T0_p_-_a5t13801jVzejQVcvpe6nqtGs_O9r4EAsrvIO-yw8qW9yGoaNKKvEBAPIDazNIiBQE" },
        { name: "Teak Side Table", price: "$150", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNEUezo4zVlVeWCRkGJLA5F7lkR7tArAt37AGHnKUyx1vUfqJse0qHUg1RoiGzpsVUCiiNg34NFvlsskBjZob9TGhD7uMxY7q67KpMuiAuq7ZR4L3zkwu1Z-pjzMSs2j0etfhJIy1TTOnZTqXHzz_5jCTqsgQ_a2gO3k8xnyw7dR0UdrHP3HXy209t6qdw2XwWlhHfwSjF8YLXmm0R5W7Wt_0m0A1m79c8S6knYq1MxUwFxpnhhV4Zv2t0Ua31SM7MMQobJFHNgiE" }
    ];

    return (
        <div className="bg-white dark:bg-[#0a0f16] text-[#111418] dark:text-white h-screen w-full flex flex-col overflow-hidden font-jakarta select-none">
            {/* Top Navigation */}
            <header className="flex items-center bg-white dark:bg-[#0a0f16] px-6 py-4 justify-between border-b border-slate-100 dark:border-slate-800 z-50 shrink-0">
                <button
                    onClick={() => router.back()}
                    className="text-slate-800 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-base font-black font-outfit uppercase tracking-tighter">Scandi Living Room</h2>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Last saved 2m ago</p>
                </div>
                <div className="flex w-auto items-center justify-end gap-2">
                    <button className="flex items-center justify-center size-10 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">undo</span>
                    </button>
                    <button className="flex items-center justify-center size-10 text-slate-400 hover:text-primary transition-colors opacity-30">
                        <span className="material-symbols-outlined">redo</span>
                    </button>
                </div>
            </header>

            {/* Main Workspace (Canvas) */}
            <main className="relative flex-1 w-full overflow-hidden bg-slate-50 dark:bg-[#0b1219] group/canvas cursor-grab active:cursor-grabbing">
                {/* Dot Pattern Overlay */}
                <div className="absolute inset-0 bg-dot-pattern opacity-50 dark:opacity-20 pointer-events-none" />

                {/* Canvas Items Layer */}
                <div className="absolute inset-0 w-full h-full p-20">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            drag
                            dragMomentum={false}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item.id);
                            }}
                            initial={false}
                            className={`absolute touch-manipulation group/item ${selectedItem === item.id ? 'z-[100]' : ''}`}
                            style={{
                                top: item.top,
                                left: item.left,
                                width: item.width,
                                zIndex: item.zIndex,
                                cursor: 'move'
                            }}
                        >
                            <div className="relative">
                                {/* Selection Handles */}
                                {selectedItem === item.id && (
                                    <div className="absolute -inset-4 border-2 border-primary rounded-2xl pointer-events-none">
                                        <div className="absolute -top-1.5 -left-1.5 size-3 bg-white border-2 border-primary rounded-full shadow-lg" />
                                        <div className="absolute -top-1.5 -right-1.5 size-3 bg-white border-2 border-primary rounded-full shadow-lg" />
                                        <div className="absolute -bottom-1.5 -left-1.5 size-3 bg-white border-2 border-primary rounded-full shadow-lg" />
                                        <div className="absolute -bottom-1.5 -right-1.5 size-3 bg-white border-2 border-primary rounded-full shadow-lg" />

                                        {/* Rotate Handle */}
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                            <div className="size-8 bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center text-primary border border-slate-100 dark:border-slate-700 pointer-events-auto cursor-alias">
                                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                            </div>
                                            <div className="h-4 w-[2px] bg-primary" />
                                        </div>

                                        {/* Tooltip Context Menu */}
                                        <div className="absolute -right-20 top-0 flex flex-col gap-3 pointer-events-auto">
                                            <button className="size-11 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center text-red-500 hover:scale-110 transition-transform border border-slate-100 dark:border-slate-700">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                            <button className="size-11 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 transition-transform border border-slate-100 dark:border-slate-700">
                                                <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <Image
                                    src={item.url}
                                    alt={item.type}
                                    width={item.width}
                                    height={item.width}
                                    draggable={false}
                                    className={`w-full h-auto select-none pointer-events-none drop-shadow-2xl transition-transform duration-300 ${item.rotate ? `rotate-[${item.rotate}deg]` : ''} ${item.opacity ? `opacity-[${item.opacity}]` : ''}`}
                                />
                            </div>
                        </motion.div>
                    ))}

                    {/* Color Swatch Palette Overlay */}
                    <motion.div
                        drag
                        className="absolute top-20 left-20 z-[200] p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 transform -rotate-6 cursor-grab active:cursor-grabbing"
                    >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">Inspiration Palette</p>
                        <div className="flex -space-x-3">
                            <div className="size-10 rounded-full border-4 border-white dark:border-slate-800 shadow-lg bg-[#2e4053] hover:scale-110 transition-transform" />
                            <div className="size-10 rounded-full border-4 border-white dark:border-slate-800 shadow-lg bg-[#d4ac0d] hover:scale-110 transition-transform" />
                            <div className="size-10 rounded-full border-4 border-white dark:border-slate-800 shadow-lg bg-[#aeb6bf] hover:scale-110 transition-transform" />
                            <div className="size-10 rounded-full border-4 border-white dark:border-slate-800 shadow-lg bg-[#f6f7f8] hover:scale-110 transition-transform" />
                        </div>
                    </motion.div>
                </div>

                {/* Floating Action Cluster (Right) */}
                <div className="absolute top-8 right-8 flex flex-col gap-4 z-50">
                    <button className="size-14 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group">
                        <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">share</span>
                    </button>
                    <button className="size-14 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group">
                        <span className="material-symbols-outlined text-[24px] group-hover:rotate-45 transition-transform">settings</span>
                    </button>
                    <button className="size-14 bg-primary text-white rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform group">
                        <span className="material-symbols-outlined text-[32px] group-hover:rotate-90 transition-transform">add</span>
                    </button>
                </div>

                {/* AI Smart Controls (Center Bottom) */}
                <div className="absolute bottom-64 left-0 w-full flex justify-center gap-4 z-40 px-6">
                    <button className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl pl-4 pr-6 py-3 rounded-full shadow-2xl border border-blue-100 dark:border-blue-900/30 hover:scale-105 active:scale-95 transition-all group">
                        <span className="material-symbols-outlined text-primary text-[24px] group-hover:rotate-12 transition-transform filled">auto_awesome</span>
                        <span className="text-sm font-black uppercase tracking-widest text-primary">AI Auto-Arrange</span>
                    </button>
                    <button className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl pl-4 pr-6 py-3 rounded-full shadow-2xl border border-slate-100 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all group">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[24px]">palette</span>
                        <span className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">New Palette</span>
                    </button>
                </div>
            </main>

            {/* Bottom Drawer (Recommended Items) */}
            <div className="relative z-50 bg-white dark:bg-[#0a0f16] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] rounded-t-[3rem] flex flex-col shrink-0 h-[260px] border-t border-slate-100 dark:border-slate-800">
                {/* Drawer Header */}
                <div className="flex flex-col items-center pt-3 pb-2">
                    <div className="h-1.5 w-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4" />
                    <div className="w-full flex justify-between items-center px-10">
                        <h4 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Recommended for this layout</h4>
                        <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Browse Store</button>
                    </div>
                </div>

                {/* Recommended Carousel */}
                <div className="flex-1 overflow-x-auto no-scrollbar pb-6 pt-2 px-10">
                    <div className="flex gap-6 min-w-max h-full">
                        {recommended.map((item, i) => (
                            <div key={i} className="group flex flex-col w-36 gap-3 cursor-pointer">
                                <div className="relative w-full aspect-square bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 group-hover:border-primary transition-all p-3">
                                    <Image src={item.url} alt={item.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                                        <span className="material-symbols-outlined text-[18px] block">add</span>
                                    </div>
                                </div>
                                <div className="px-1 text-center">
                                    <p className="text-slate-900 dark:text-white text-xs font-black uppercase tracking-tighter truncate leading-tight mb-0.5">{item.name}</p>
                                    <p className="text-primary text-[10px] font-black">{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Primary Save Button (Floating Over Surface) */}
                <div className="absolute -top-10 right-10">
                    <button className="bg-gradient-to-r from-primary to-blue-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-widest py-4 px-10 rounded-2xl shadow-2xl shadow-primary/40 flex items-center gap-3 transform transition-all hover:scale-105 active:scale-95 group">
                        <span>Save Board</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">save</span>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .bg-dot-pattern {
                    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
                    background-size: 32px 32px;
                }
                :global(.dark) .bg-dot-pattern {
                    background-image: radial-gradient(#1e293b 1px, transparent 1px);
                }
            `}</style>
        </div>
    );
}
