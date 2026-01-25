"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface WriteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export default function WriteReviewModal({ isOpen, onClose, productName }: WriteReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [step, setStep] = useState(1); // 1: Rating, 2: Details, 3: Success

    // Mock Auth
    const isAuthenticated = true; // For demo purposes, assume true or check localStorage

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-[61] w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white">Write a Review</h3>
                            <button onClick={onClose} className="size-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>

                        {step === 1 && (
                            <div className="p-8 flex flex-col items-center text-center">
                                <p className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-widest">How was the {productName}?</p>

                                <div className="flex gap-2 mb-8">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setRating(star)}
                                            className="transition-transform hover:scale-110 active:scale-95"
                                        >
                                            <span
                                                className={`material-symbols-outlined text-5xl transition-colors ${star <= (hoverRating || rating)
                                                        ? 'text-amber-400 filled'
                                                        : 'text-slate-200 dark:text-slate-700'
                                                    }`}
                                            >
                                                star
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <p className="h-6 text-sm font-bold text-slate-900 dark:text-white mb-8">
                                    {hoverRating === 5 ? "It's amazing!" :
                                        hoverRating === 4 ? "Pretty good" :
                                            hoverRating === 3 ? "It's okay" :
                                                hoverRating === 2 ? "Could be better" :
                                                    hoverRating === 1 ? "Terrible" : ""}
                                </p>

                                <button
                                    onClick={() => rating > 0 && setStep(2)}
                                    disabled={rating === 0}
                                    className="w-full bg-primary disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                >
                                    Next Step
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Review Title</label>
                                    <input
                                        type="text"
                                        placeholder="Summarize your experience"
                                        className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 font-bold text-sm outline-none border border-transparent focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Your Review</label>
                                    <textarea
                                        rows={4}
                                        placeholder="What did you like or dislike? How was the quality?"
                                        className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 font-medium text-sm outline-none border border-transparent focus:border-primary transition-colors resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Add Photos</label>
                                    <div className="flex gap-2">
                                        <button className="size-20 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary hover:border-primary transition-colors">
                                            <span className="material-symbols-outlined">add_a_photo</span>
                                            <span className="text-[10px] font-bold">Upload</span>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(3)}
                                    className="w-full mt-4 bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                >
                                    Submit Review
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="p-12 flex flex-col items-center text-center">
                                <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-4xl">check</span>
                                </div>
                                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Review Submitted!</h4>
                                <p className="text-slate-500 mb-8">Thanks for sharing your feedback with the community.</p>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-slate-100 dark:bg-slate-800 font-bold rounded-xl"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
