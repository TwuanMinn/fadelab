"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
    id: number;
    text: string;
    author: string;
    role: string;
    image: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        text: "Best vibe in town. Jason never misses. The attention to detail on the fade is something I haven't found anywhere else in the city.",
        author: "Alex Richardson",
        role: "Regular Client",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeqPMNYIkd9EyzBqCl90RzS5YBk-Pk62gw56wnZoyp7Xr4ISTOGXoLxJBDUntebJSWZrm2ezNC7QbEFv-9K0AUClg_Mpx3CHWyV_yN7VhMdSkB4MKtXZGNDummxkgh_t2zSYh3_LwW6vutggQep7NTrY1S7mUuLYK3gmu1_bQKMjff2ODY2jA8mQYcr44QQ2ZzLC-qTUu3ritXoBbxiwBoq3iVGHWOQ2ymtTieiwKplTs6cO2IwcEaOq_0pWQAcJnRGyH0IqWzqGZe",
        rating: 5,
    },
    {
        id: 2,
        text: "Mark D. understood exactly what I wanted. The atmosphere is super chill and the Classic Cut service is top notch.",
        author: "Michael Turner",
        role: "Classic Cut",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwUvD1KzIK14Hh553WW3ITb9B9lyr37fsqH8sdZyyGo6A9QTFBfXm3HaPCt0HTzfRP0b40SA7pEF4PZ1DOo8OQjThlD5lIBFQbb-V2GnWsvmz0HfMjmu9s8x9RKJZS8O_Q_xU5wG0PbygdH5SrOYh4vGEhRBMsIpvCw_wRNnpyrvlgRdZutclXT3eDgInHKUi7IxMaMOXoB4x9sf4orZh4bLz7bRnbYQZ7rMizxOCSBkI9Wbr7J26RcST9CjnNaREwBOuKQGw3eaSB",
        rating: 5,
    },
    {
        id: 3,
        text: "The Premium Experience is worth every penny. The hot towel shave is unbelievably relaxing. Sarah M. is a true beard expert!",
        author: "Marcus Johnson",
        role: "Premium Member",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAaXXcwVkTLi1yaciH_WWRFntIjqWYYfHxpQfS3J6H3lt6N8NxusKb4_R6wvUziFpoSTwOdmQTNpLcTKdj7MS8d3jcO9vw0ggu3xT2ipsTGKn5-llYQYCS8-QM2YCYmjWOd3L0IXHsFXFauKerH4Fyz0ELmwfMZKZ50TfABwbuQoKt51_iaf6nPHhcsUlg1-meCFzwD725Iv2sDwzs7fEsGvCvF7k37b7NkHk6BJdrKs0qYVmipzC0OnZ_aMMmQ2dPzvvPiZr72y-y",
        rating: 5,
    },
    {
        id: 4,
        text: "Been coming to FadeLab since they opened in 2018. The consistency is incredible - every single cut is perfect. Can't recommend enough!",
        author: "Kevin Chen",
        role: "Founding Member",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1AofsJTDOCwx04Qy58ckD5-660yfEzK17mAw89h25AtC0JiYDAITpgSdRQ_nG9y_nlvvE3MRQopm0t_iWJ0se42u5xWnrSfgz-ouO4RfdSWJM-VFZe3sAR7sv6OwCUvAmC1Gsn-TciFvhDt8rxzz4rYfdxraWJM9YoAcfTjlAaekvGBlQYmFgqX89K4cj2v5iC6tjtkUh4rxHklBa17Xjg9QBPDwnvpv8rFENZjjdQQtze72YK1dQIqf5XsW7gkyWJnmx0Eg0cNAN",
        rating: 5,
    },
];

export function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            if (newDirection === 1) {
                return prev === testimonials.length - 1 ? 0 : prev + 1;
            }
            return prev === 0 ? testimonials.length - 1 : prev - 1;
        });
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            paginate(1);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, paginate]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
    };

    const current = testimonials[currentIndex];

    return (
        <section className="py-20 bg-surface-dark border-y border-white/5 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            Client Stories
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400"
                        >
                            Rated 5.0/5 based on 200+ reviews.
                        </motion.p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setIsAutoPlaying(false);
                                paginate(-1);
                            }}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-background-dark transition-all duration-300 hover:scale-110 active:scale-95"
                            aria-label="Previous testimonial"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsAutoPlaying(false);
                                paginate(1);
                            }}
                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-background-dark hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                            aria-label="Next testimonial"
                        >
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Main testimonial card */}
                <div className="relative h-[320px] md:h-[280px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            <div className="h-full bg-gradient-to-br from-surface-darker/80 via-surface-dark/50 to-surface-darker/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
                                {/* Quote mark */}
                                <div className="absolute top-6 right-8 text-primary/20 text-8xl font-serif leading-none">
                                    "
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 text-yellow-400 mb-6">
                                    {[...Array(current.rating)].map((_, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="material-symbols-outlined text-xl"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            star
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Quote text */}
                                <p className="text-gray-200 text-lg md:text-xl italic mb-8 max-w-3xl leading-relaxed">
                                    "{current.text}"
                                </p>

                                {/* Author info */}
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="relative"
                                    >
                                        <div
                                            className="w-14 h-14 rounded-full bg-cover bg-center ring-2 ring-primary/50 ring-offset-2 ring-offset-surface-dark"
                                            style={{ backgroundImage: `url('${current.image}')` }}
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-surface-dark flex items-center justify-center">
                                            <span className="material-symbols-outlined text-xs text-white">check</span>
                                        </div>
                                    </motion.div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{current.author}</h4>
                                        <p className="text-primary text-sm font-medium">{current.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsAutoPlaying(false);
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "w-8 bg-primary"
                                : "w-2 bg-white/20 hover:bg-white/40"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
