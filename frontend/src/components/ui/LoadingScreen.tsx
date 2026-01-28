"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
    onComplete?: () => void;
    minDuration?: number;
}

export function LoadingScreen({ onComplete, minDuration = 2000 }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        // Minimum display time
        const timer = setTimeout(() => {
            setIsLoading(false);
            onComplete?.();
        }, minDuration);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, [minDuration, onComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-background-dark flex flex-col items-center justify-center"
                >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent blur-3xl"
                        />
                    </div>

                    {/* Logo animation */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Scissors icon with pulse */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(17, 82, 212, 0.4)",
                                    "0 0 60px rgba(17, 82, 212, 0.6)",
                                    "0 0 20px rgba(17, 82, 212, 0.4)",
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="size-20 flex items-center justify-center rounded-2xl bg-primary text-white mb-6"
                        >
                            <motion.span
                                animate={{ rotate: [0, -15, 0, 15, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="material-symbols-outlined text-5xl"
                            >
                                content_cut
                            </motion.span>
                        </motion.div>

                        {/* Brand name with reveal effect */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white">
                                FadeLab
                            </span>
                        </motion.h1>

                        {/* Progress bar */}
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                className="h-full bg-gradient-to-r from-primary via-blue-400 to-primary rounded-full"
                            />
                        </div>

                        {/* Loading text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 text-gray-400 text-sm font-medium tracking-wider uppercase"
                        >
                            <motion.span
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                Loading Experience
                            </motion.span>
                        </motion.p>
                    </motion.div>

                    {/* Decorative particles - only render on client */}
                    {isMounted && [...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                scale: 0,
                                opacity: 0,
                            }}
                            animate={{
                                y: [0, -150],
                                scale: [0, 1, 0],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                            className="absolute w-2 h-2 rounded-full bg-primary/50"
                            style={{
                                left: `${10 + i * 15}%`,
                                top: `${40 + (i % 3) * 15}%`,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
