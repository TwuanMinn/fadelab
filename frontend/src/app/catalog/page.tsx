"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Suspense } from 'react';

function CatalogContent() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string>("All");
    const [selectedColor, setSelectedColor] = useState<string>("All");
    const [selectedMaterial, setSelectedMaterial] = useState<string>("All");
    const [selectedBrand, setSelectedBrand] = useState<string>("All");
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get("category");

    useEffect(() => {
        if (categoryQuery) {
            // Map common categories if needed or just set as material/brand if match
            const cat = categoryQuery.charAt(0).toUpperCase() + categoryQuery.slice(1);
            if (["Velvet", "Leather", "Fabric", "Wood"].includes(cat)) {
                setSelectedMaterial(cat);
            } else if (["Lumière", "Nordic", "Chester", "Scandi"].includes(cat)) {
                setSelectedBrand(cat);
            }
        }
    }, [categoryQuery]);

    const filterOptions = {
        "Price Range": ["All", "$0 - $500", "$500 - $1000", "$1000+"],
        "Color": ["All", "Green", "Beige", "Grey", "White", "Leather"],
        "Material": ["All", "Velvet", "Leather", "Fabric", "Wood"],
        "Brand": ["All", "Lumière", "Nordic", "Chester", "Scandi"]
    };

    const products = [
        {
            id: 1,
            name: "Nordic Green Velvet Sofa",
            price: 899,
            rating: 4.8,
            reviews: 120,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: null,
            color: "Green",
            material: "Velvet",
            brand: "Nordic"
        },
        {
            id: 2,
            name: "Minimalist Beige Lounge",
            price: 450,
            rating: 4.5,
            reviews: 85,
            image: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: null,
            color: "Beige",
            material: "Fabric",
            brand: "Lumière"
        },
        {
            id: 3,
            name: "Cloud Grey Sectional",
            price: 1200,
            rating: 5.0,
            reviews: 210,
            image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "BESTSELLER",
            color: "Grey",
            material: "Fabric",
            brand: "Lumière"
        },
        {
            id: 4,
            name: "Mid-Century Armchair",
            price: 320,
            rating: 4.7,
            reviews: 42,
            image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
            tag: null,
            liked: true,
            color: "Brown",
            material: "Wood",
            brand: "Scandi"
        },
        {
            id: 5,
            name: "Classic Leather Chesterfield",
            price: 1599,
            originalPrice: 1999,
            rating: 4.9,
            reviews: 56,
            image: "https://images.unsplash.com/photo-1552862750-746b8f6f7f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "-20%",
            color: "Leather",
            material: "Leather",
            brand: "Chester"
        },
        {
            id: 6,
            name: "Scandi White Sofa",
            price: 650,
            rating: 4.3,
            reviews: 28,
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: null,
            color: "White",
            material: "Fabric",
            brand: "Scandi"
        },
        {
            id: 7,
            name: "Velvet Royal Blue Sofa",
            price: 1100,
            rating: 4.8,
            reviews: 34,
            image: "https://images.unsplash.com/photo-1551133990-7ccc23bd4940?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "PREMIUM",
            color: "Blue",
            material: "Velvet",
            brand: "Lumière"
        },
        {
            id: 8,
            name: "Modern Oak Coffee Table",
            price: 250,
            rating: 4.6,
            reviews: 12,
            image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: null,
            color: "Natural",
            material: "Wood",
            brand: "Scandi"
        },
        {
            id: 9,
            name: "White Marble Dining Table",
            price: 1450,
            rating: 4.9,
            reviews: 8,
            image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "LUXURY",
            color: "White",
            material: "Marble",
            brand: "Nordic"
        },
        {
            id: 10,
            name: "Minimalist Bedside Table",
            price: 180,
            rating: 4.4,
            reviews: 25,
            image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "NEW",
            color: "Natural",
            material: "Wood",
            brand: "Nordic"
        },
        {
            id: 11,
            name: "Leather Round Ottoman",
            price: 350,
            rating: 4.7,
            reviews: 15,
            image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=930&q=80",
            tag: null,
            color: "Brown",
            material: "Leather",
            brand: "Chester"
        },
        {
            id: 12,
            name: "Emerald Velvet Accent Chair",
            price: 550,
            rating: 4.8,
            reviews: 40,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            tag: "FEATURED",
            color: "Green",
            material: "Velvet",
            brand: "Lumière"
        },
        {
            id: 13,
            name: "Matte Black Floor Lamp",
            price: 120,
            rating: 4.5,
            reviews: 67,
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=770&q=80",
            tag: "SALE",
            color: "Black",
            material: "Metal",
            brand: "Scandi"
        },
        {
            id: 14,
            name: "Geometric Wool Rug",
            price: 400,
            rating: 4.6,
            reviews: 19,
            image: "https://images.unsplash.com/photo-1575414003591-ece8d14161bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: null,
            color: "Beige",
            material: "Wool",
            brand: "Nordic"
        },
        {
            id: 15,
            name: "Ergonomic Office Chair",
            price: 320,
            rating: 4.3,
            reviews: 11,
            image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
            tag: null,
            color: "Grey",
            material: "Fabric",
            brand: "Lumière"
        },
        {
            id: 16,
            name: "Teak Outdoor Patio Set",
            price: 2200,
            rating: 4.9,
            reviews: 5,
            image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "OUTDOOR",
            color: "Natural",
            material: "Wood",
            brand: "Scandi"
        },
        {
            id: 17,
            name: "Ceramic Table Lamp",
            price: 85,
            rating: 4.7,
            reviews: 90,
            image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
            tag: null,
            color: "White",
            material: "Ceramic",
            brand: "Lumière"
        },
        {
            id: 18,
            name: "Tufted Queen Sized Bed",
            price: 1850,
            rating: 5.0,
            reviews: 2,
            image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "ROYAL",
            color: "Grey",
            material: "Fabric",
            brand: "Chester"
        },
        {
            id: 19,
            name: "Floating Wall Bookshelf",
            price: 210,
            rating: 4.5,
            reviews: 4,
            image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=1139&q=80",
            tag: null,
            color: "Dark Wood",
            material: "Wood",
            brand: "Nordic"
        },
        {
            id: 20,
            name: "Mirrored Silver Sideboard",
            price: 950,
            rating: 4.8,
            reviews: 7,
            image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
            tag: "ELEGANCE",
            color: "Silver",
            material: "Metal",
            brand: "Lumière"
        }
    ];

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const priceMatch =
                selectedPrice === "All" ||
                (selectedPrice === "$0 - $500" && p.price <= 500) ||
                (selectedPrice === "$500 - $1000" && p.price > 500 && p.price <= 1000) ||
                (selectedPrice === "$1000+" && p.price > 1000);

            const colorMatch = selectedColor === "All" || p.color === selectedColor;
            const materialMatch = selectedMaterial === "All" || p.material === selectedMaterial;
            const brandMatch = selectedBrand === "All" || p.brand === selectedBrand;

            return priceMatch && colorMatch && materialMatch && brandMatch;
        });
    }, [selectedPrice, selectedColor, selectedMaterial, selectedBrand]);

    const handleFilterClick = (filterType: string, option: string) => {
        if (filterType === "Price Range") setSelectedPrice(option);
        if (filterType === "Color") setSelectedColor(option);
        if (filterType === "Material") setSelectedMaterial(option);
        if (filterType === "Brand") setSelectedBrand(option);
        setActiveFilter(null);
    };

    const getSelectedValue = (filterType: string) => {
        if (filterType === "Price Range") return selectedPrice;
        if (filterType === "Color") return selectedColor;
        if (filterType === "Material") return selectedMaterial;
        if (filterType === "Brand") return selectedBrand;
        return "All";
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-8 font-jakarta">
            {/* Header */}
            <header className="sticky top-0 z-[60] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                <Link href="/" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </Link>
                <h1 className="text-lg font-display font-bold text-slate-900 dark:text-white uppercase tracking-widest">Modern Sofas</h1>
                <div className="flex items-center gap-2">
                    <Link href="/design-ai" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-blue-500">auto_awesome</span>
                    </Link>

                    <button className="relative size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white filled">shopping_cart</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                    </button>
                </div>
            </header>

            {/* Filters Area */}
            <div className="sticky top-16 z-50 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm px-4 py-4 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => {
                            setSelectedPrice("All");
                            setSelectedColor("All");
                            setSelectedMaterial("All");
                            setSelectedBrand("All");
                        }}
                        className="size-10 flex-shrink-0 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-[20px]">restart_alt</span>
                    </button>

                    {Object.keys(filterOptions).map((filter) => {
                        const val = getSelectedValue(filter);
                        const isActive = val !== "All";

                        return (
                            <div key={filter} className="relative flex-shrink-0">
                                <button
                                    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                                    className={`h-11 px-6 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 border-transparent"
                                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-primary/50"
                                        }`}
                                >
                                    {isActive ? val : filter}
                                    <span className={`material-symbols-outlined text-[18px] transition-transform ${activeFilter === filter ? "rotate-180" : ""}`}>
                                        expand_more
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {activeFilter === filter && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full left-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-[70] overflow-hidden"
                                        >
                                            {filterOptions[filter as keyof typeof filterOptions].map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleFilterClick(filter, opt)}
                                                    className={`w-full text-left px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${val === opt
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                        }`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Product Grid */}
            <div className="px-5 pt-8 pb-32 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={product.id}
                            className="flex flex-col gap-4 group relative"
                        >
                            <Link href={`/product/${product.id}`} className="absolute inset-0 z-10">
                                <span className="sr-only">View {product.name}</span>
                            </Link>

                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute top-4 inset-x-4 flex justify-between items-start z-20">
                                    {product.tag && (
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl ${product.tag.includes('%') ? 'bg-red-500 text-white' : 'bg-slate-900/80 dark:bg-white/80 backdrop-blur-md text-white dark:text-slate-900'
                                            }`}>
                                            {product.tag}
                                        </span>
                                    )}
                                </div>


                            </div>

                            <div className="px-2">
                                <div className="flex justify-between items-start gap-2 mb-1">
                                    <h3 className="text-slate-900 dark:text-white font-black text-sm uppercase font-outfit tracking-tight line-clamp-2">{product.name}</h3>
                                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-lg shrink-0">
                                        <span className="material-symbols-outlined text-[14px] text-amber-500 filled">star</span>
                                        <span className="text-sm font-black text-amber-700 dark:text-amber-400">{product.rating}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{product.brand} • {product.material}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-black text-primary font-outfit tracking-tighter">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-xs text-slate-400 line-through font-bold">${product.originalPrice}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                        className="size-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-xl active:scale-90"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function Catalog() {
    return (
        <Suspense>
            <CatalogContent />
        </Suspense>
    );
}
