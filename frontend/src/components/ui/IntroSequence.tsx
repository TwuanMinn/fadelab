"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface IntroSequenceProps {
    onComplete?: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const hasCompletedRef = useRef(false);

    useEffect(() => {
        // Prevent double execution in Strict Mode
        if (hasCompletedRef.current) return;

        // Step 1: Show intro for 4 seconds
        const introTimer = setTimeout(() => {
            setShowLoading(true);
        }, 4000);

        // Step 2: After intro + loading, complete
        const completeTimer = setTimeout(() => {
            if (!hasCompletedRef.current) {
                hasCompletedRef.current = true;
                setIsVisible(false);
                onComplete?.();
            }
        }, 5500); // 4s intro + 1.5s loading

        return () => {
            clearTimeout(introTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="intro-overlay"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[9999] bg-black"
            >
                {!showLoading ? (
                    // ====== INTRO ANIMATION ======
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center overflow-hidden"
                    >
                        {/* Animated background */}
                        <div className="absolute inset-0">
                            {/* Glowing orbs */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px]"
                            />
                            <motion.div
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    opacity: [0.2, 0.5, 0.2],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/25 rounded-full blur-[80px]"
                            />
                        </div>

                        {/* Razor sweep line */}
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: "200%", opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            className="absolute top-1/2 left-0 w-48 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                            style={{ boxShadow: "0 0 30px rgba(59,130,246,0.8)" }}
                        />

                        {/* Center content */}
                        <div className="relative z-10 flex flex-col items-center gap-8">
                            {/* Logo icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 40px rgba(17,82,212,0.5)",
                                            "0 0 80px rgba(17,82,212,0.8)",
                                            "0 0 40px rgba(17,82,212,0.5)",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center"
                                >
                                    <motion.span
                                        animate={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="material-symbols-outlined text-white"
                                        style={{ fontSize: 64 }}
                                    >
                                        content_cut
                                    </motion.span>
                                </motion.div>
                            </motion.div>

                            {/* Brand name */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="text-7xl md:text-8xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300"
                            >
                                FadeLab
                            </motion.h1>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                                className="text-xl text-white/60 font-medium tracking-[0.3em] uppercase"
                            >
                                Premium Grooming
                            </motion.p>
                        </div>

                        {/* Progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 4, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-primary via-blue-400 to-primary"
                            />
                        </div>
                    </motion.div>
                ) : (
                    // ====== LOADING SCREEN ======
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-background-dark"
                    >
                        <div className="flex flex-col items-center">
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(17,82,212,0.4)",
                                        "0 0 40px rgba(17,82,212,0.6)",
                                        "0 0 20px rgba(17,82,212,0.4)",
                                    ],
                                }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="size-14 flex items-center justify-center rounded-xl bg-primary text-white mb-4"
                            >
                                <motion.span
                                    animate={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="material-symbols-outlined text-3xl"
                                >
                                    content_cut
                                </motion.span>
                            </motion.div>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 128 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full"
                            />
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
