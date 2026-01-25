"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";

export default function ProductCard({ product }: { product: any }) {
    const { addToCart, items, updateQuantity, removeFromCart, toggleWishlist, isInWishlist } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Get current quantity from global cart
    const cartItem = items.find(item => item.id === product.id);
    const quantity = cartItem?.quantity || 0;
    const inWishlist = mounted ? isInWishlist(product.id) : false;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            category: product.category,
        });
        toast.success("Added to cart", {
            description: product.name,
            action: {
                label: "View Cart",
                onClick: () => window.location.href = "/cart"
            }
        });
    };

    const adjustQuantity = (e: React.MouseEvent, amount: number) => {
        e.stopPropagation();
        e.preventDefault();
        const newQuantity = quantity + amount;
        if (newQuantity <= 0) {
            removeFromCart(product.id);
            toast.info("Removed from cart", { description: product.name });
        } else {
            updateQuantity(product.id, newQuantity);
        }
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            category: product.category,
            rating: product.rating,
        });
        if (inWishlist) {
            toast.info("Removed from wishlist", { description: product.name });
        } else {
            toast.success("Added to wishlist", {
                description: product.name,
                icon: "❤️"
            });
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:-translate-y-2 transition-all duration-500 border border-slate-200 dark:border-slate-700 ring-1 ring-slate-900/5 dark:ring-white/10"
        >
            <Link href={`/product/${product.id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {product.name}</span>
            </Link>

            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 dark:bg-white/5">
                {/* Discount Tag */}
                {product.discount && (
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl z-20 shadow-lg shadow-red-500/20">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-wider">{product.discount}</span>
                    </div>
                )}

                {/* Wishlist Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlistToggle}
                    className={`absolute top-2 right-2 md:top-4 md:right-4 z-20 size-8 md:size-10 rounded-full flex items-center justify-center shadow-lg transition-all ${inWishlist
                            ? "bg-red-500 text-white"
                            : "bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-400 hover:text-red-500"
                        }`}
                >
                    <span className={`material-symbols-outlined text-[16px] md:text-[20px] ${inWishlist ? "filled" : ""}`}>
                        favorite
                    </span>
                </motion.button>

                {/* Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: `url("${product.img}")` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 md:p-6 flex flex-col gap-2 md:gap-5">
                <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                        <h4 className="text-charcoal dark:text-white font-display font-bold text-sm md:text-xl leading-snug mb-0.5 md:mb-1.5 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h4>
                        <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md md:rounded-lg shrink-0 ml-1">
                        <span className="material-symbols-outlined text-[14px] md:text-[18px] text-amber-500 fill-current">star</span>
                        <span className="text-[10px] md:text-sm font-bold text-amber-700 dark:text-amber-400">{product.rating}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        {product.oldPrice && <span className="text-[10px] md:text-xs text-slate-400 line-through decoration-slate-400 mb-0.5">${product.oldPrice}</span>}
                        <span className="text-xl md:text-3xl font-display font-bold text-charcoal dark:text-white">${product.price}</span>
                    </div>
                    <div className="opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                        {quantity === 0 ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="bg-primary hover:bg-blue-600 text-white p-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center gap-0 md:gap-2.5 transition-colors hover:shadow-blue-500/50"
                            >
                                <span className="material-symbols-outlined text-[18px] md:text-[20px]">shopping_bag</span>
                                <span className="hidden md:inline">Add</span>
                            </motion.button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-1"
                            >
                                <button
                                    onClick={(e) => adjustQuantity(e, -1)}
                                    className="size-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
                                >
                                    <span className="material-symbols-outlined text-[18px]">remove</span>
                                </button>
                                <span className="w-8 text-center font-bold text-slate-900 dark:text-white text-sm">{quantity}</span>
                                <button
                                    onClick={(e) => adjustQuantity(e, 1)}
                                    className="size-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
