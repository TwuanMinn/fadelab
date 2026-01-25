"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";
import { EmptyWishlist } from "../components/EmptyStates";
import { ProductGridSkeleton } from "../components/Skeleton";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, addToCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddToCart = (item: any) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            img: item.img,
            category: item.category,
        });
        toast.success("Added to cart", {
            description: item.name,
            action: {
                label: "View Cart",
                onClick: () => window.location.href = "/cart"
            }
        });
    };

    const handleRemove = (id: number, name: string) => {
        removeFromWishlist(id);
        toast.info("Removed from wishlist", { description: name });
    };

    // Show skeleton while hydrating
    if (!mounted) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
                    <div className="h-6 w-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                    <div className="w-10" />
                </header>
                <div className="px-4 py-8 max-w-5xl mx-auto">
                    <ProductGridSkeleton count={4} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-8">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                <Link href="/" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500 filled">favorite</span>
                    My Wishlist ({wishlist.length})
                </h1>
                <div className="w-10" />
            </header>

            {/* Content */}
            {wishlist.length === 0 ? (
                <EmptyWishlist />
            ) : (
                <div className="px-4 py-8 max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <AnimatePresence mode="popLayout">
                            {wishlist.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                    key={item.id}
                                    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group"
                                >
                                    <Link href={`/product/${item.id}`}>
                                        <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                                style={{ backgroundImage: `url("${item.img}")` }}
                                            />
                                            {/* Remove button */}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleRemove(item.id, item.name);
                                                }}
                                                className="absolute top-2 right-2 size-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all z-10"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                            </button>
                                        </div>
                                    </Link>
                                    <div className="p-4">
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{item.category}</p>
                                        <Link href={`/product/${item.id}`}>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
                                        </Link>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-lg font-black text-slate-900 dark:text-white">${item.price}</span>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <span className="material-symbols-outlined text-[14px] filled">star</span>
                                                <span className="text-xs font-bold">{item.rating}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="w-full mt-3 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                                            Add to Cart
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
}
