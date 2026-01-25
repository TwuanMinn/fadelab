"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: any }) {
    const router = useRouter();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAdded(true);
        // Simulate API call
        setTimeout(() => setIsAdded(false), 2000);
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
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                            className={`${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-blue-600'} text-white p-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center gap-0 md:gap-2.5 transition-all hover:shadow-blue-500/50`}
                        >
                            <span className="material-symbols-outlined text-[18px] md:text-[20px]">
                                {isAdded ? 'check' : 'shopping_bag'}
                            </span>
                            <span className="hidden md:inline">{isAdded ? 'Added' : 'Add'}</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
