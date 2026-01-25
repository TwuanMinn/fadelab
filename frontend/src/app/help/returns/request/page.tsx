"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function ReturnRequestPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedItem, setSelectedItem] = useState(1);
    const [reason, setReason] = useState("Item arrived damaged");
    const [comment, setComment] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const items = [
        {
            id: 1,
            name: "Velvet Sofa - Royal Blue",
            deliveryDate: "Oct 24",
            qty: 1,
            price: 899.00,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            name: "Oak Coffee Table",
            deliveryDate: "Oct 24",
            qty: 1,
            price: 249.00,
            image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    const handleSubmit = async () => {
        setIsSubmitted(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/help/refund-status');
    };

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-slate-900 dark:text-white min-h-screen font-jakarta selection:bg-primary/20">
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-2xl mx-auto bg-white dark:bg-[#0a0f16] shadow-2xl">
                {/* Top App Bar */}
                <header className="sticky top-0 z-50 flex items-center justify-between bg-white/90 dark:bg-[#0a0f16]/90 px-6 py-4 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => router.back()}
                        className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white font-outfit">Request Return</h1>
                    <div className="size-10"></div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto px-8 pb-32 pt-2 no-scrollbar">
                    {/* Progress Indicators */}
                    <div className="flex w-full flex-row items-center justify-center gap-2 py-6">
                        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                    </div>

                    {/* Section 1: Item Selection */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 uppercase font-outfit">Select item to return</h2>
                        <div className="flex flex-col gap-4">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedItem(item.id)}
                                    className={`relative overflow-hidden rounded-[2rem] p-4 cursor-pointer transition-all duration-300 ${selectedItem === item.id
                                            ? 'bg-primary/5 border-2 border-primary shadow-lg shadow-primary/5'
                                            : 'bg-slate-50 dark:bg-slate-800/40 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl relative shadow-sm">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1 py-1">
                                            <span className="inline-block rounded-full bg-slate-200 dark:bg-slate-700 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 w-fit mb-2">
                                                Delivered {item.deliveryDate}
                                            </span>
                                            <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight mb-1 font-outfit uppercase">{item.name}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Qty: {item.qty}</p>
                                            <p className="text-lg font-black text-slate-900 dark:text-white font-outfit">${item.price.toFixed(2)}</p>
                                        </div>
                                        {selectedItem === item.id && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-lg"
                                            >
                                                <span className="material-symbols-outlined text-[16px] filled">check</span>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Reason */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 uppercase font-outfit">Reason for return</h2>
                        <div className="relative">
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full appearance-none rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 py-4 pl-6 pr-12 text-sm font-bold text-slate-900 dark:text-white shadow-sm focus:ring-primary focus:border-primary transition-all uppercase tracking-widest"
                            >
                                <option>Item arrived damaged</option>
                                <option>Wrong item sent</option>
                                <option>Quality not as expected</option>
                                <option>Changed my mind</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6">
                                <span className="material-symbols-outlined text-slate-400">expand_more</span>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Evidence */}
                    <section className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase font-outfit">Upload photos</h2>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Optional</span>
                        </div>

                        <div className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 py-10 text-center hover:border-primary hover:bg-primary/5 transition-all">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-700 shadow-xl mb-4 group-hover:scale-110 transition-transform text-primary">
                                <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                            </div>
                            <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Tap to upload photos</p>
                            <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">JPG or PNG up to 5MB</p>
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            <div className="relative h-24 w-24 flex-shrink-0 rounded-[1.5rem] overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-md">
                                <Image
                                    src="https://images.unsplash.com/photo-1549194388-f61be84a6e9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Additional Comments</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="block w-full rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 py-4 px-6 text-sm font-bold text-slate-900 dark:text-white shadow-sm placeholder:text-slate-400 focus:ring-primary focus:border-primary transition-all resize-none"
                                placeholder="Please describe the issue in detail..."
                                rows={4}
                            />
                        </div>
                    </section>
                </main>

                {/* Sticky Footer */}
                <footer className="fixed bottom-0 z-40 w-full max-w-2xl border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-[#0a0f16]/95 px-8 py-6 pb-10 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <div className="mb-6 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Estimated Refund</span>
                        <span className="text-2xl font-black text-slate-900 dark:text-white font-outfit uppercase">${items.find(i => i.id === selectedItem)?.price.toFixed(2) || "0.00"}</span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                        className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-primary to-blue-600 p-5 text-center font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl shadow-primary/30 transition-all hover:shadow-primary/50 active:scale-95 disabled:opacity-70"
                    >
                        <span className="relative z-10">
                            {isSubmitted ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </div>
                            ) : "Submit Request"}
                        </span>
                    </button>
                </footer>
            </div>
        </div>
    );
}
