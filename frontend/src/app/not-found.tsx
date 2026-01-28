"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [180, 90, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-lg">
                {/* Glitchy 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative mb-8"
                >
                    <motion.span
                        animate={{ x: [-2, 2, -2] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="absolute text-8xl md:text-9xl font-black text-primary/30 select-none"
                        style={{ left: "-2px", top: "-2px" }}
                    >
                        404
                    </motion.span>
                    <motion.span
                        animate={{ x: [2, -2, 2] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="absolute text-8xl md:text-9xl font-black text-blue-500/30 select-none"
                        style={{ left: "2px", top: "2px" }}
                    >
                        404
                    </motion.span>
                    <span className="relative text-8xl md:text-9xl font-black text-white">404</span>
                </motion.div>

                {/* Scissors animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 flex justify-center"
                >
                    <motion.div
                        animate={{ rotate: [0, -15, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-4 rounded-2xl bg-surface-dark border border-white/10"
                    >
                        <span className="material-symbols-outlined text-5xl text-primary">content_cut</span>
                    </motion.div>
                </motion.div>

                {/* Message */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-4"
                >
                    Oops! This page got a bad cut
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 mb-8 text-lg"
                >
                    Looks like this fade didn't go as planned. Let's get you back to safety.
                </motion.p>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/"
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">home</span>
                        Back to Home
                    </Link>
                    <Link
                        href="/barbers"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-xl font-bold transition-all backdrop-blur-sm hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">calendar_today</span>
                        Book Now
                    </Link>
                </motion.div>

                {/* Quick links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 flex flex-wrap gap-4 justify-center text-sm"
                >
                    <Link href="/#services" className="text-gray-400 hover:text-primary transition-colors">
                        Services
                    </Link>
                    <span className="text-gray-600">•</span>
                    <Link href="/#lookbook" className="text-gray-400 hover:text-primary transition-colors">
                        Lookbook
                    </Link>
                    <span className="text-gray-600">•</span>
                    <Link href="/support" className="text-gray-400 hover:text-primary transition-colors">
                        Support
                    </Link>
                </motion.div>
            </div>

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    className="absolute w-1 h-1 rounded-full bg-primary/60"
                    style={{
                        left: `${10 + i * 10}%`,
                        top: `${50 + (i % 4) * 10}%`,
                    }}
                />
            ))}
        </div>
    );
}
