"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, Suspense } from "react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import { EmptySearch } from "../components/EmptyStates";
import { SearchResultSkeleton } from "../components/Skeleton";

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const categories = ["All", "Chairs", "Lighting", "Tables", "Sofa", "Bedroom", "Kitchen"];

    const searchResults = useMemo(() => {
        let results = PRODUCTS;

        // Filter by category if selected
        if (selectedCategory && selectedCategory !== "All") {
            results = results.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (query.trim()) {
            const q = query.toLowerCase();
            results = results.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        return results;
    }, [query, selectedCategory]);

    const handleCategoryClick = (cat: string) => {
        setSelectedCategory(cat === selectedCategory ? null : cat);
    };

    return (
        <div className="bg-white dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-2xl mx-auto">
                {/* Top Navigation */}
                <div className="flex items-center px-6 py-4 justify-between sticky top-0 z-50 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="flex size-12 shrink-0 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <h2 className="text-xl font-black font-outfit uppercase tracking-tighter flex-1 text-center pr-12">Search</h2>
                </div>

                {/* Search Bar Area */}
                <div className="px-6 py-6 group">
                    <div className="relative flex items-center h-16 bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] border-2 border-transparent focus-within:border-primary focus-within:bg-white dark:focus-within:bg-slate-800 transition-all px-6 shadow-sm">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 h-full px-4 text-sm font-bold placeholder:text-slate-400 dark:text-white"
                            placeholder="Search for furniture..."
                            autoFocus
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="size-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400"
                            >
                                <span className="material-symbols-outlined text-[20px]">cancel</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-3 px-6 overflow-x-auto no-scrollbar pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`flex h-10 shrink-0 items-center justify-center rounded-xl px-5 text-xs font-black uppercase tracking-wider transition-all active:scale-95 ${selectedCategory === cat
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results Section */}
                <div className="px-6 py-6 flex-1">
                    {!mounted ? (
                        <SearchResultSkeleton />
                    ) : searchResults.length > 0 ? (
                        <>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} {query && `for "${query}"`}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <AnimatePresence mode="popLayout">
                                    {searchResults.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <EmptySearch query={query} />
                    )}
                </div>

                {/* AI Stylist CTA */}
                <div className="px-6 pb-8">
                    <Link href="/design-ai" className="block">
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl shadow-primary/10 group cursor-pointer active:scale-[0.98] transition-all duration-300 bg-gradient-to-br from-primary to-blue-400 p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center size-12 bg-white/20 backdrop-blur-md rounded-xl">
                                    <span className="material-symbols-outlined text-white text-2xl">auto_awesome</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white text-base font-black">Can't find it?</h3>
                                    <p className="text-white/80 text-xs">Let our AI Stylist help you</p>
                                </div>
                                <span className="material-symbols-outlined text-white">arrow_forward</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense>
            <SearchContent />
        </Suspense>
    );
}
