"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SubmitReviewPage() {
    const router = useRouter();
    const [rating, setRating] = useState(4);
    const [images, setImages] = useState<string[]>([
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBb1SkTwfGKpc57KYEj6TECRw3Xmpw2RTv0dv03T-uK9GOhvcKnKSMnp9vLUcgjEkIHaeVSEqiUGfGslsm6z5kdjoLsrLXydPqjbi69aAi_FPKQsESH-h3_YiLwWMdfDeziUMaGGKjXZ7kl6ZFCNxhLKnnxS5e6Iy_o9Gab0AVBfIoHTZmn_VZ_G0RE8wI0xA6wpr-iDG6vbSOrFQx8XgQqiDstiYVNlZfjkad3CW1_wGRK6lqHLiZ69rQN1Bhpgi1K66jE0guJ7Us",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCE_7fNxHw1JPn7LSpIDQQJistHM3j9ZzAQZjnh435MNok0PkmHcaun3H1RhtrVlEZT2vVorI-C7bWWbIKw8iS7BAXyxV4eO4C96PF3h_u9BafZdg5wk0sIWLRGIwhbBaicvrA2nsNd3C_Nab7WnU7-4LYYXgYunl5Dk4jpqI3FuPH36YoDfuSLRYRGvilyPP-GH1kzjOzHWyRV1mAU2oI0yHJCpHjkA5gbfh3hH7PiBqY61TsegmNDKmSCA-HfoalzTtTNDAb8XPQ"
    ]);

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-[#111418] dark:text-white min-h-screen font-display">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 bg-white dark:bg-[#101822] border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center p-4 justify-between">
                    <button
                        onClick={() => router.back()}
                        className="text-[#111418] dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center font-outfit">Submit a Review</h2>
                    <div className="size-10"></div> {/* Spacer for balance */}
                </div>
                {/* Progress Indicators */}
                <div className="flex w-full flex-row items-center justify-center gap-3 pb-4">
                    <div className="h-1.5 w-8 rounded-full bg-[#136dec]"></div>
                    <div className="h-1.5 w-8 rounded-full bg-[#dbe0e6] dark:bg-gray-700"></div>
                    <div className="h-1.5 w-8 rounded-full bg-[#dbe0e6] dark:bg-gray-700"></div>
                </div>
            </div>

            <main className="max-w-md mx-auto p-4 space-y-6 pb-32">
                {/* Product Summary Card */}
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-lg shrink-0 overflow-hidden">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmkW8o_hTaLJ0LTlZee0kD1bh8qIlRLfcdIf_EqLOPVS59gxOKVkmHqAVuWWkh8a4BCAy087DQwJxdBN0Y-vtSZPDF73ZRTRATxOPV1R2fV2scxp_qVgHW76XjzJNDZz9gC7gyIyjwUbOJ-FpP8IiAxBciJQDFY9jETu_FuAxRiP0e9KnAJxsyjef7I0ZXqqli5XEB9xvqM_ihb0G0kX5OkkUuCroXCoMvbPFG2Le3PTaHSugugvMnHNLFUvCnsag7-8oDB567ups"
                                alt="Ergonomic Task Chair"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden">
                            <p className="text-[#111418] dark:text-white text-base font-bold leading-tight truncate font-outfit">Ergonomic Task Chair</p>
                            <p className="text-[#617289] dark:text-gray-400 text-xs font-normal leading-normal">Ordered Sep 24, 2023</p>
                            <p className="text-[#136dec] text-xs font-semibold">Verified Purchase</p>
                        </div>
                    </div>
                </div>

                {/* Rating Section */}
                <section className="space-y-4">
                    <h3 className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] font-outfit">Overall Rating</h3>
                    <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="flex gap-2 w-full justify-around text-[#136dec]">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transform active:scale-95 transition-transform"
                                >
                                    <span className={`material-symbols-outlined !text-4xl ${star <= rating ? 'filled' : 'text-gray-300 dark:text-gray-600'}`}>
                                        star
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Written Review Section */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h3 className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] font-outfit">Write a Review</h3>
                        <span className="text-xs text-gray-400 font-medium">0 / 500</span>
                    </div>
                    <textarea
                        className="w-full min-h-[160px] p-4 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:border-[#136dec] focus:ring-[#136dec] transition-all text-base resize-none dark:text-white dark:placeholder-gray-500 font-sans outline-none border-2"
                        placeholder="What did you like or dislike? How's the quality?"
                    ></textarea>
                </section>

                {/* Media Upload Section */}
                <section className="space-y-4">
                    <h3 className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] font-outfit">Add Photos</h3>
                    <p className="text-sm text-[#617289] dark:text-gray-400 -mt-2">Share how it looks in your space (Max 5)</p>
                    <div className="grid grid-cols-3 gap-3">
                        {/* Upload Trigger */}
                        <div className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined text-[#136dec] !text-3xl">add_a_photo</span>
                            <span className="text-[10px] font-bold text-[#136dec] mt-1 uppercase tracking-wider">Add</span>
                        </div>

                        {/* Images */}
                        {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 group">
                                <Image
                                    src={img}
                                    alt={`Review image ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    onClick={() => handleRemoveImage(idx)}
                                    className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 rounded-full p-1 cursor-pointer transition-colors"
                                >
                                    <span className="material-symbols-outlined text-white !text-sm">close</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Guidelines (Subtle Info) */}
                <div className="flex gap-3 p-4 bg-[#136dec]/5 dark:bg-[#136dec]/10 rounded-xl">
                    <span className="material-symbols-outlined text-[#136dec]">info</span>
                    <p className="text-xs text-[#617289] dark:text-gray-300 leading-relaxed font-medium">
                        Reviews are most helpful when they focus on the product features and your overall experience. Avoid mentioning shipping or customer service here.
                    </p>
                </div>
            </main>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-[#101822]/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-40">
                <div className="max-w-md mx-auto">
                    <button className="w-full bg-gradient-to-br from-[#136dec] to-[#4292f4] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#136dec]/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm">
                        Submit Review
                        <span className="material-symbols-outlined !text-lg">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
