"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Catalog() {
    const products = [
        {
            id: 1,
            name: "Nordic Green Velvet Sofa",
            price: 899,
            rating: 4.8,
            reviews: 120,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: null
        },
        {
            id: 2,
            name: "Minimalist Beige Lounge",
            price: 450,
            rating: 4.5,
            reviews: 85,
            image: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: null
        },
        {
            id: 3,
            name: "Cloud Grey Sectional",
            price: 1200,
            rating: 5.0,
            reviews: 210,
            image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "BESTSELLER"
        },
        {
            id: 4,
            name: "Mid-Century Armchair",
            price: 320,
            rating: 4.7,
            reviews: 42,
            image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
            tag: null,
            liked: true
        },
        {
            id: 5,
            name: "Classic Leather Chesterfield",
            price: 1599,
            originalPrice: 1999,
            rating: 4.9,
            reviews: 56,
            image: "https://images.unsplash.com/photo-1552862750-746b8f6f7f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "-20%"
        },
        {
            id: 6,
            name: "Scandi White Sofa",
            price: 650,
            rating: 4.3,
            reviews: 28,
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: null
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-8">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                <Link href="/" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </Link>
                <h1 className="text-lg font-display font-bold text-slate-900 dark:text-white">Modern Sofas</h1>
                <div className="flex items-center gap-2">
                    <Link href="/design-ai" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-blue-500">auto_awesome</span>
                    </Link>
                    <Link href="/blog" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white">article</span>
                    </Link>
                    <Link href="/rewards" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-amber-500 filled">workspace_premium</span>
                    </Link>
                    <Link href="/compare" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white">compare_arrows</span>
                    </Link>
                    <Link href="/notifications" className="relative size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border border-white dark:border-slate-900"></span>
                    </Link>
                    <button className="relative size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white filled">shopping_cart</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                    </button>
                </div>
            </header>

            {/* Filters */}
            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar px-4 py-4 sticky top-16 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm">
                <button className="size-10 flex-shrink-0 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-[20px]">tune</span>
                </button>
                {['Price Range', 'Color', 'Material', 'Brand'].map((filter, idx) => (
                    <button key={idx} className="h-10 px-5 flex-shrink-0 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        {filter}
                        <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="px-4 pb-20 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={product.id}
                        className="flex flex-col gap-3 group relative"
                    >
                        <Link href={`/product/${product.id}`} className="absolute inset-0 z-10">
                            <span className="sr-only">View {product.name}</span>
                        </Link>

                        {/* Image Card */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white dark:bg-slate-900">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Top Actions */}
                            <div className="absolute top-3 inset-x-3 flex justify-between items-start z-20">
                                <div>
                                    {product.tag && (
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${product.tag.includes('%')
                                            ? 'bg-red-500 text-white'
                                            : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                                            }`}>
                                            {product.tag}
                                        </span>
                                    )}
                                </div>
                                <button className="size-8 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md flex items-center justify-center text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-all shadow-md active:scale-90">
                                    <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                                </button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="relative z-0">
                            <h3 className="text-slate-900 dark:text-white font-bold text-sm leading-tight mb-1 line-clamp-2 min-h-[2.5em]">{product.name}</h3>
                            <div className="flex items-center gap-1 mb-2">
                                <span className="material-symbols-outlined text-[14px] text-amber-500 filled">star</span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{product.rating}</span>
                                <span className="text-xs text-slate-400">({product.reviews})</span>
                            </div>
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
                                )}
                            </div>

                            <button className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-blue-500/20 shadow-lg relative z-20">
                                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
