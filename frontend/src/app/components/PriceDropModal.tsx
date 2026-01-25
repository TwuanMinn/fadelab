"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PriceDropModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        name: string;
        variant: string;
        oldPrice: string;
        newPrice: string;
        discount: string;
        image: string;
    };
}

export default function PriceDropModal({ isOpen, onClose, product }: PriceDropModalProps) {
    const router = useRouter();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-white dark:bg-[#0a0f16] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-20 flex items-center justify-center size-10 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-md text-slate-500 hover:text-primary transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>

                        {/* Image Section */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 dark:bg-slate-900">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1000"
                            />
                            {/* Discount Badge */}
                            <div className="absolute bottom-6 left-6 bg-white dark:bg-[#0a0f16] px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-100 dark:border-slate-800">
                                <span className="material-symbols-outlined text-primary text-[18px] filled">local_offer</span>
                                <span className="text-primary text-[10px] font-black uppercase tracking-widest">{product.discount} OFF</span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 flex flex-col gap-6">
                            <div className="text-center flex flex-col gap-2">
                                <h3 className="text-slate-900 dark:text-white text-2xl font-black font-outfit uppercase tracking-tighter">Great News! It&apos;s on Sale.</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">An item in your wishlist just dropped in price.</p>
                            </div>

                            {/* Product Info Card */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-[1.5rem] flex items-center justify-between border border-slate-100 dark:border-slate-700/50">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-widest">{product.name}</span>
                                    <span className="text-slate-900 dark:text-white text-sm font-bold truncate max-w-[140px] uppercase font-outfit">{product.variant}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-slate-400 text-[10px] font-bold line-through">{product.oldPrice}</span>
                                    <span className="text-primary text-xl font-black font-outfit tracking-tight">{product.newPrice}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        onClose();
                                        router.push('/product/nordic-sofa');
                                    }}
                                    className="group relative flex w-full cursor-pointer items-center justify-center rounded-2xl h-14 bg-primary text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98]"
                                >
                                    <span className="text-xs font-black uppercase tracking-widest mr-2">Grab it Now</span>
                                    <span className="material-symbols-outlined text-white transition-transform group-hover:translate-x-1" style={{ fontSize: '20px' }}>arrow_forward</span>
                                </button>

                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
