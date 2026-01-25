"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function ComparisonPage() {
    const router = useRouter();
    const [showDifferences, setShowDifferences] = useState(false);
    const [isComparing, setIsComparing] = useState(false); // New state to toggle between landing and table
    const scrollContainersRef = useRef<(HTMLDivElement | null)[]>([]);

    const products = [
        {
            id: 1,
            name: "Cloud Sofa",
            tag: "Best Seller",
            price: "$1,200",
            dimensions: '80" x 30" x 34"',
            material: "Performance Velvet",
            weightCap: "750 lbs",
            delivery: "2 weeks",
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 2,
            name: "Velvet Luxe",
            tag: "New Arrival",
            price: "$1,450",
            dimensions: '72" x 32" x 30"',
            material: "Top Grain Leather",
            weightCap: "600 lbs",
            delivery: "5 days",
            image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 3,
            name: "Modern Sectional",
            tag: "Top Rated",
            price: "$1,800",
            dimensions: '95" x 40" x 28"',
            material: "Linen Blend",
            weightCap: "900 lbs",
            delivery: "3 weeks",
            image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ];

    useEffect(() => {
        if (!isComparing) return;

        const containers = scrollContainersRef.current;
        let isScrolling = false;

        const handleScroll = (e: Event) => {
            if (!isScrolling) {
                isScrolling = true;
                const target = e.target as HTMLDivElement;
                const scrollLeft = target.scrollLeft;

                containers.forEach(container => {
                    if (container && container !== target) {
                        container.scrollLeft = scrollLeft;
                    }
                });

                window.requestAnimationFrame(() => {
                    isScrolling = false;
                });
            }
        };

        containers.forEach(container => {
            if (container) {
                container.addEventListener('scroll', handleScroll);
            }
        });

        return () => {
            containers.forEach(container => {
                if (container) {
                    container.removeEventListener('scroll', handleScroll);
                }
            });
        };
    }, [isComparing]);

    const addToScrollRef = (el: HTMLDivElement | null, index: number) => {
        scrollContainersRef.current[index] = el;
    };

    return (
        <div className="bg-white dark:bg-[#0a0f16] text-[#111418] dark:text-gray-100 flex flex-col h-screen overflow-hidden font-jakarta">
            {/* Top App Bar */}
            <header className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-[#0a0f16]/90 backdrop-blur-md p-4 border-b border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => isComparing ? setIsComparing(false) : router.back()}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-[#111418] dark:text-white"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h1 className="text-[#111418] dark:text-white text-lg font-black leading-tight tracking-[-0.015em] flex-1 text-center font-outfit uppercase pr-10">
                    {isComparing ? `Compare Products (${products.length})` : "Compare Tool"}
                </h1>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto relative w-full no-scrollbar">
                <AnimatePresence mode="wait">
                    {!isComparing ? (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center max-w-2xl mx-auto w-full pb-32"
                        >
                            {/* Hero Illustration */}
                            <div className="w-full px-6 py-10 flex justify-center">
                                <div className="relative w-full aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 group">
                                    <Image
                                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                        alt="Comparison Hero"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                </div>
                            </div>

                            {/* Headlines */}
                            <div className="w-full px-8 text-center pt-4">
                                <h2 className="text-slate-900 dark:text-white tracking-tighter text-4xl font-black font-outfit uppercase leading-[1.1] mb-4">
                                    Find the Perfect <span className="text-primary italic">Fit</span>
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-bold leading-relaxed max-w-md mx-auto uppercase tracking-wider text-xs">
                                    Don't guess. Compare specs, prices, and materials of up to 4 items instantly to find your match.
                                </p>
                            </div>

                            {/* Categories */}
                            <div className="w-full px-8 py-12">
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { icon: 'chair', label: 'Chairs' },
                                        { icon: 'weekend', label: 'Sofas' },
                                        { icon: 'table_restaurant', label: 'Tables' },
                                        { icon: 'bed', label: 'Beds' }
                                    ].map((cat, i) => (
                                        <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                                            <div className="size-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white shadow-sm transition-all duration-300 transform group-hover:-translate-y-1">
                                                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">{cat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* How It Works Section */}
                            <div className="w-full px-8 pb-12">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">How it works</span>
                                    <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
                                </div>
                                <div className="space-y-8">
                                    {[
                                        { step: "01", title: "Browse Items", desc: "Explore our catalog and find pieces you love." },
                                        { step: "02", title: "Select to Compare", desc: "Tap the compare icon on any product card or add directly." },
                                        { step: "03", title: "View Side-by-Side", desc: "See features, dimensions, and materials compared instantly." }
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-start gap-6 group">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm shadow-xl group-hover:bg-primary group-hover:text-white transition-all">
                                                {step.step}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-slate-900 dark:text-white font-outfit uppercase tracking-tight text-lg">{step.title}</h3>
                                                <p className="text-sm text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1 text-[10px]">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="table"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-[1400px] mx-auto w-full"
                        >
                            {/* Toggle Control */}
                            <div className="shrink-0 flex items-center gap-4 bg-white dark:bg-[#0a0f16] px-6 py-4 min-h-16 justify-between border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 md:px-12">
                                <p className="text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal flex-1 truncate uppercase tracking-widest">Show differences only</p>
                                <div className="shrink-0">
                                    <label className="relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full border-none bg-slate-100 dark:bg-slate-800 p-0.5 transition-colors duration-200">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={showDifferences}
                                            onChange={() => setShowDifferences(!showDifferences)}
                                        />
                                        <div className={`h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-all absolute left-0.5 ${showDifferences ? 'translate-x-[20px] !bg-white' : ''}`}></div>
                                        <div className={`w-full h-full rounded-full transition-colors ${showDifferences ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                    </label>
                                </div>
                            </div>

                            {/* Comparison Table Container */}
                            <div className="flex-1 pb-32">
                                {/* Product Images Row */}
                                <div className="flex w-full border-b border-gray-100 dark:border-gray-800">
                                    <div className="sticky left-0 z-10 w-28 md:w-56 shrink-0 bg-white dark:bg-[#0a0f16] flex items-center justify-center p-4 border-r border-gray-100 dark:border-gray-800 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                                        <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Product</span>
                                    </div>
                                    <div className="flex overflow-x-auto no-scrollbar" ref={(el) => addToScrollRef(el, 0)}>
                                        {products.map((product) => (
                                            <div key={product.id} className="w-48 md:w-80 shrink-0 p-6 border-r border-gray-50 dark:border-gray-800 flex flex-col gap-4 group relative">
                                                <button className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-black/50 rounded-full p-1.5 cursor-pointer hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                                </button>
                                                <div className="w-full aspect-square rounded-[2rem] bg-slate-50 dark:bg-slate-800 overflow-hidden relative shadow-md border border-slate-100 dark:border-slate-800">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-base md:text-lg font-black leading-tight text-slate-900 dark:text-white font-outfit uppercase tracking-tight">{product.name}</p>
                                                    <p className="text-[10px] text-primary font-black bg-primary/10 w-max px-3 py-1 rounded-full mt-2 uppercase tracking-widest">{product.tag}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="w-8 shrink-0"></div>
                                    </div>
                                </div>

                                {/* Comparison Rows Mapper */}
                                {[
                                    { label: 'Price', key: 'price', fontStyle: 'font-black text-lg md:text-xl' },
                                    { label: 'Dimensions', key: 'dimensions', subLabel: 'W x D x H' },
                                    { label: 'Material', key: 'material' },
                                    { label: 'Weight Cap.', key: 'weightCap' },
                                    { label: 'Delivery', key: 'delivery', isDelivery: true }
                                ].map((row, rowIdx) => (
                                    <div key={row.key} className={`flex w-full border-b border-gray-100 dark:border-gray-800 min-h-[70px] md:min-h-[90px] ${rowIdx % 2 !== 0 ? 'bg-slate-50/50 dark:bg-slate-800/10' : ''}`}>
                                        <div className="sticky left-0 z-10 w-28 md:w-56 shrink-0 bg-white dark:bg-[#0a0f16] flex flex-col justify-center px-6 py-4 border-r border-gray-100 dark:border-gray-800 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                                            <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">{row.label}</span>
                                            {row.subLabel && <span className="text-[8px] md:text-[9px] text-slate-300 font-bold uppercase tracking-tighter mt-1 leading-tight">{row.subLabel}</span>}
                                        </div>
                                        <div className="flex overflow-x-auto no-scrollbar items-center" ref={(el) => addToScrollRef(el, rowIdx + 1)}>
                                            {products.map((product) => (
                                                <div key={product.id} className={`w-48 md:w-80 shrink-0 px-6 py-4 border-r border-gray-50 dark:border-gray-800 text-sm md:text-base ${row.fontStyle || 'text-slate-600 dark:text-slate-300 font-bold'} flex items-center gap-3`}>
                                                    {row.isDelivery && <span className="material-symbols-outlined text-primary text-xl">local_shipping</span>}
                                                    {/* @ts-ignore */}
                                                    {product[row.key]}
                                                </div>
                                            ))}
                                            <div className="w-8 shrink-0"></div>
                                        </div>
                                    </div>
                                ))}

                                {/* Action Row */}
                                <div className="flex w-full pt-10 min-h-[80px]">
                                    <div className="sticky left-0 z-10 w-28 md:w-56 shrink-0 bg-white dark:bg-[#0a0f16] flex items-center justify-center p-2 border-r border-gray-100 dark:border-gray-800 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                                    </div>
                                    <div className="flex overflow-x-auto no-scrollbar items-start" ref={(el) => addToScrollRef(el, 6)}>
                                        {products.map((product) => (
                                            <div key={product.id} className="w-48 md:w-80 shrink-0 px-6">
                                                <button className="w-full flex cursor-pointer items-center justify-center rounded-full h-14 md:h-16 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all active:scale-95 border-2 border-transparent">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        ))}
                                        <div className="w-8 shrink-0"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Sticky Bottom CTA - Landing Mode Only */}
            <AnimatePresence>
                {!isComparing && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-0 left-0 w-full p-6 bg-white/90 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 z-50 flex flex-col items-center"
                    >
                        <div className="flex flex-col gap-3 w-full max-w-2xl">
                            <button
                                onClick={() => setIsComparing(true)}
                                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-16 rounded-full shadow-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Start Comparing
                            </button>
                            <button className="w-full text-slate-400 text-[10px] font-black uppercase tracking-widest py-2 hover:text-primary transition-colors">
                                View Saved Comparisons
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Navigation */}
            <nav className="flex shrink-0 gap-2 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0a0f16] px-4 pb-10 pt-4 z-30 shadow-[0_-4px_24px_-12px_rgba(0,0,0,0.1)]">
                <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-primary transition-colors" href="/">
                    <span className="material-symbols-outlined text-2xl">home</span>
                    <p className="text-[10px] font-black uppercase tracking-widest leading-normal">Home</p>
                </Link>
                <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-primary transition-colors" href="/catalog">
                    <span className="material-symbols-outlined text-2xl">grid_view</span>
                    <p className="text-[10px] font-black uppercase tracking-widest leading-normal">Catalog</p>
                </Link>

                <Link className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-primary transition-colors" href="/cart">
                    <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                    <p className="text-[10px] font-black uppercase tracking-widest leading-normal">Cart</p>
                </Link>
            </nav>
        </div>
    );
}
