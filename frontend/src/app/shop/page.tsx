"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toolbar } from "../components/Toolbar";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";

const BUNDLES = [
    {
        id: 1,
        title: "The Daily Ritual",
        subtitle: "Hair Care Essentials",
        category: "Hair Care",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9eXLH6w_o6SK6bB86r9yVu1E9soqRLPq2nYj10cQVKghY5R78jhulhOEr9JZClXRAk8vkezk2T-2-AiCTSWR2D-vdkqcHOZnL62ieUzL7vwI3Qlicc6ajChlIg5fmYyuogFkiLRKYmEBHt_JuOdrhhBgRvHecKHpoTnE2hFkkpMnYhzKYG5_rfx82nCoCGB02ona5gIUlSAkQjGeQ6FcwcDGHVVJv8pYs7QWbltkZUvRUeTekbHHjQOiQZbJUD-ZOPNQfEMLHw5Lm",
        discount: "SAVE 20%",
        items: [
            "Revitalizing Shampoo (250ml)",
            "Hydrating Conditioner (250ml)",
            "Matte Clay Pomade (100g)"
        ],
        price: "$48.00",
        regularPrice: "$60.00",
        memberPrice: "$38.40"
    },
    {
        id: 2,
        title: "The Beard Master",
        subtitle: "Grooming Precision",
        category: "Beard Grooming",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Nr3VwXh5dJ-gNZMll6XPHktvnz4Xm25p1Dsgs9fY5zxFSwfuaROsgM_QWIyEOnWwpyyHdNkV4vtkE-vIgZo_-daxxECYvMuzdhDYbSiMwMd3paYTXZiyv_Sy-Ljomsm-ieI_gke528N6Jip6G32dSIsKqI_UQpLXQfVSwhihsKazG3Xhu5REP3quZUtceTt_gW-2-LvWyHZS6A47Qb_6XU78XvnveOFmUor3J0VrlXjYK4A3mG2wi8ooeE0OQfMaOfXCR9ORP6kT",
        discount: "SAVE 15%",
        items: [
            "Signature Beard Oil (30ml)",
            "Taming Beard Balm (60ml)",
            "Handcrafted Wood Comb"
        ],
        price: "$35.00",
        regularPrice: "$42.00",
        memberPrice: "$28.00"
    },
    {
        id: 3,
        title: "The Ultimate Gift Set",
        subtitle: "Full Collection",
        category: "Gift Sets",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAceVYlmqgClXnGDKzQVqvt0kohIJJi2xHbUHpp0hH-wp7ItI_OniVhsJ_AYtTZ0MSHi_kyJr81yD1UUnHn6GhBN6uEGldwnKsRlzpz-uJ9s0jQ3lCEXrgwElnEpchkd2ge2iHgU4uiCb7UT8s0KHTIQtzzclGZ0SKNlM4shJXYNrstcfHAwGS5BrnQagAfRXcfgg_SSi-ydknRoJC-Gy0C7J9mE0yTv9xTL0RWKnQ8SpBqaI178dNj-53k4Z3kfyhyoZLZ9t0-uN-i",
        discount: "SAVE 25%",
        items: [
            "Total Grooming Suite (6 items)",
            "Premium Leather Travel Case",
            "Complimentary Haircut Voucher"
        ],
        price: "$120.00",
        regularPrice: "$160.00",
        memberPrice: "$96.00"
    },
    {
        id: 4,
        title: "The Precision Edge",
        subtitle: "Edge & Definition",
        category: "Beard Grooming",
        image: "https://images.unsplash.com/photo-1599351431202-6e0000a4dbe1?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 10%",
        items: [
            "Precision Razor",
            "Clear Shave Gel (150ml)",
            "Alum Block"
        ],
        price: "$45.00",
        regularPrice: "$50.00",
        memberPrice: "$36.00"
    },
    {
        id: 5,
        title: "The Midnight Refresh",
        subtitle: "Nightly Restoration",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 15%",
        items: [
            "Sleep-In Hair Mask",
            "Silk Pillowcase",
            "Detangling Brush"
        ],
        price: "$55.00",
        regularPrice: "$65.00",
        memberPrice: "$44.00"
    },
    {
        id: 6,
        title: "The Executive Suite",
        subtitle: "Boardroom Ready",
        category: "Gift Sets",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 20%",
        items: [
            "Cologne (50ml)",
            "Luxury Ties",
            "Leather Briefcase Polish"
        ],
        price: "$180.00",
        regularPrice: "$225.00",
        memberPrice: "$144.00"
    },
    {
        id: 7,
        title: "The Arctic Freeze",
        subtitle: "Icy Menthol Flow",
        category: "Limited Edition",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
        discount: "LIMITED RUN",
        items: [
            "Menthol Shampoo (500ml)",
            "Cooling Scalp Tonic",
            "Ice-Blue Styling Gel"
        ],
        price: "$42.00",
        regularPrice: "$50.00",
        memberPrice: "$33.60"
    },
    {
        id: 8,
        title: "The Urban Nomad",
        subtitle: "Travel Command",
        category: "Gift Sets",
        image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 10%",
        items: [
            "Waterproof Dopp Kit",
            "Travel Sized Ritual",
            "Folding Wood Comb"
        ],
        price: "$68.00",
        regularPrice: "$75.00",
        memberPrice: "$54.40"
    },
    {
        id: 9,
        title: "The High Gloss Master",
        subtitle: "Diamond Shine",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1590439471364-192aa70c7c53?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 20%",
        items: [
            "High-Shine Pomade",
            "Gloss Serum",
            "Fine Tooth Comb"
        ],
        price: "$38.00",
        regularPrice: "$48.00",
        memberPrice: "$30.40"
    },
    {
        id: 10,
        title: "The Botanical Sensation",
        subtitle: "Organic Flow",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600",
        discount: "ORGANIC",
        items: [
            "Tea Tree Shampoo",
            "Aloe Conditioner",
            "Hemp Seed Cream"
        ],
        price: "$62.00",
        regularPrice: "$72.00",
        memberPrice: "$49.60"
    },
    {
        id: 11,
        title: "The Shadow Sculpt",
        subtitle: "Deep Volume",
        category: "Beard Grooming",
        image: "https://images.unsplash.com/photo-1503951914875-befea74701c5?auto=format&fit=crop&q=80&w=600",
        discount: "SAVE 15%",
        items: [
            "Volumizing Beard Powder",
            "Stiff Fiber Paste",
            "Beard Straightener"
        ],
        price: "$75.00",
        regularPrice: "$88.00",
        memberPrice: "$60.00"
    },
    {
        id: 12,
        title: "The Carbon Fiber Kit",
        subtitle: "Advanced Materials",
        category: "Limited Edition",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600",
        discount: "NEW DROP",
        items: [
            "Carbon Fiber Comb Set",
            "Matte Black Case",
            "Titanium Scissors"
        ],
        price: "$110.00",
        regularPrice: "$130.00",
        memberPrice: "$88.00"
    },
    {
        id: 13,
        title: "The Royal Crown",
        subtitle: "Scalp Sovereignty",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1542382257-80dee9ad74b6?auto=format&fit=crop&q=80&w=600",
        discount: "ELITE",
        items: [
            "Exfoliating Scrub",
            "Scalp Massager",
            "Growth Serum"
        ],
        price: "$85.00",
        regularPrice: "$100.00",
        memberPrice: "$68.00"
    },
    {
        id: 14,
        title: "The Silver Fox",
        subtitle: "Platinum Precision",
        category: "Limited Edition",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
        discount: "CORE EXCLUSIVE",
        items: [
            "Purple Toning Shampoo",
            "Anti-Yellowing Balm",
            "Soft Shine Spray"
        ],
        price: "$52.00",
        regularPrice: "$62.00",
        memberPrice: "$41.60"
    }
];

const FILTERS = ["All Bundles", "Hair Care", "Beard Grooming", "Gift Sets", "Limited Edition"];

export default function ShopPage() {
    const [activeFilter, setActiveFilter] = useState("All Bundles");
    const [addingId, setAddingId] = useState<number | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    const filteredBundles = activeFilter === "All Bundles"
        ? BUNDLES
        : BUNDLES.filter(b => b.category === activeFilter);

    // Helper to parse price string to number
    const parsePrice = (priceStr: string) => {
        return parseFloat(priceStr.replace('$', ''));
    };

    const handleAddToCart = (bundle: typeof BUNDLES[0]) => {
        setAddingId(bundle.id);
        setTimeout(() => {
            addToCart({
                id: bundle.id + 100, // Offset to avoid ID conflicts with profile shop
                name: bundle.title,
                price: parsePrice(bundle.memberPrice),
                img: bundle.image,
                category: bundle.category
            });
            setAddingId(null);
            toast.success(`${bundle.title} added to cart!`, {
                description: `Member price: ${bundle.memberPrice}`
            });
        }, 500);
    };

    return (
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display min-h-screen">
            <Toolbar />
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full px-6 md:px-10 py-6 pointer-events-none">
                    <div className="max-w-[1280px] mx-auto flex items-center justify-between pointer-events-auto">
                        <Link
                            href="/"
                            className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#1e293b]/50 backdrop-blur-md border border-white/10 text-white hover:bg-blue-600 hover:text-white transition-all duration-300"
                        >
                            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 md:px-10 lg:px-40 py-8">
                    {/* Hero */}
                    <div className="relative w-full rounded-3xl overflow-hidden mb-16 border border-white/5 bg-[#1e293b]/20">
                        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay ease-out scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAceVYlmqgClXnGDKzQVqvt0kohIJJi2xHbUHpp0hH-wp7ItI_OniVhsJ_AYtTZ0MSHi_kyJr81yD1UUnHn6GhBN6uEGldwnKsRlzpz-uJ9s0jQ3lCEXrgwElnEpchkd2ge2iHgU4uiCb7UT8s0KHTIQtzzclGZ0SKNlM4shJXYNrstcfHAwGS5BrnQagAfRXcfgg_SSi-ydknRoJC-Gy0C7J9mE0yTv9xTL0RWKnQ8SpBqaI178dNj-53k4Z3kfyhyoZLZ9t0-uN-i")' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                        <div className="relative z-10 px-6 py-20 md:py-32 flex flex-col items-center text-center">
                            <h2 className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">Curated Collections</h2>
                            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-2">THE BUNDLE</h1>
                            <h1 className="text-4xl md:text-6xl font-thin tracking-wide mb-8 text-white/80">MASTERCLASS</h1>
                            <p className="max-w-xl text-white/70 text-sm md:text-base mb-10 leading-relaxed">
                                Unlock exclusive savings and elevate your daily routine with our expertly curated collections. Professional results, simplified for the modern gentlemen.
                            </p>
                            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20">
                                BUILD YOUR OWN BUNDLE
                                <span className="material-symbols-outlined text-sm">construction</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
                        <div className="flex flex-wrap gap-2">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${activeFilter === filter
                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20"
                                        : "bg-[#1e293b]/50 border-white/5 text-white/60 hover:text-white hover:bg-[#1e293b]"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Sort by:</span>
                            <button className="flex items-center gap-1 text-xs font-bold text-white hover:text-blue-400 transition-colors">
                                Most Popular
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                        </div>
                    </div>

                    {/* Bundles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        <AnimatePresence mode="popLayout">
                            {filteredBundles.map((bundle) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={bundle.id}
                                    className="group relative bg-[#1e293b]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500"
                                >
                                    {/* Discount Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                            {bundle.discount}
                                        </div>
                                    </div>

                                    {/* Image Area */}
                                    <div className="aspect-[4/3] relative overflow-hidden bg-[#0B1121]">
                                        <Image
                                            src={bundle.image}
                                            alt={bundle.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-60"></div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6">
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{bundle.title}</h3>
                                            <p className="text-xs font-medium text-white/40 uppercase tracking-widest">{bundle.subtitle}</p>
                                        </div>

                                        <div className="space-y-3 mb-8">
                                            {bundle.items.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="mt-1 size-4 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                                        <span className="material-symbols-outlined text-[10px] text-blue-500 font-bold">check</span>
                                                    </div>
                                                    <span className="text-xs text-white/70">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs text-white/40 line-through decoration-white/20">Regular Price: {bundle.regularPrice}</span>
                                                    <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase tracking-wider rounded">Member Exclusive</span>
                                                </div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-black text-white tracking-tight">{bundle.memberPrice}</span>
                                                    <span className="text-lg font-bold text-white/40 line-through decoration-white/20">{bundle.price}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(bundle)}
                                            disabled={addingId === bundle.id}
                                            className="mt-6 w-full py-3 bg-white hover:bg-white/90 text-[#0f172a] font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {addingId === bundle.id ? (
                                                <>
                                                    <span className="size-3 border-2 border-[#0f172a]/30 border-t-[#0f172a] rounded-full animate-spin"></span>
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    Add to Cart
                                                    <span className="material-symbols-outlined text-sm">shopping_cart</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-white font-bold mb-4">Featured Bundles</h3>
                        <p className="text-white/60 text-sm max-w-2xl mx-auto">
                            Discover our collection of expertly curated bundles designed for the modern gentleman.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
