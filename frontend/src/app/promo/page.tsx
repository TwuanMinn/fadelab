"use client";

import dynamic from "next/dynamic";
import { Toolbar } from "../components/Toolbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";

// Dynamic import for the video player (heavy component)
const PromoVideoPlayer = dynamic(
    () => import("@/components/remotion/PromoVideoPlayer").then((mod) => ({ default: mod.PromoVideoPlayer })),
    {
        ssr: false,
        loading: () => (
            <div className="w-full aspect-video bg-surface-dark rounded-2xl flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">play_arrow</span>
                    </div>
                    <span className="text-gray-400">Loading promo video...</span>
                </div>
            </div>
        ),
    }
);

export default function PromoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background-dark via-surface-dark to-background-dark">
            <Toolbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity }}
                        className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                        >
                            <span className="material-symbols-outlined text-primary">movie</span>
                            <span className="text-sm font-bold text-primary uppercase tracking-wide">Promotional Video</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Experience{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                                FadeLab
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Watch our premium animated promo showcasing our world-class grooming services,
                            expert barbers, and the unparalleled FadeLab experience.
                        </p>
                    </motion.div>

                    {/* Video Player */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-6xl mx-auto"
                    >
                        <Suspense fallback={
                            <div className="w-full aspect-video bg-surface-dark rounded-2xl animate-pulse" />
                        }>
                            <PromoVideoPlayer
                                autoPlay={true}
                                loop={true}
                                showControls={true}
                            />
                        </Suspense>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 mt-16"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/barbers"
                                className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(17,82,212,0.4)] hover:shadow-[0_0_60px_rgba(17,82,212,0.5)] flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined">calendar_month</span>
                                Book Appointment
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/"
                                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined">home</span>
                                Back to Home
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Highlight */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: "content_cut",
                                title: "Precision Cuts",
                                description: "Expert barbers delivering flawless fades and classic styles",
                            },
                            {
                                icon: "spa",
                                title: "Premium Experience",
                                description: "Hot towel shaves, grooming treatments, and relaxation",
                            },
                            {
                                icon: "workspace_premium",
                                title: "Award Winning",
                                description: "Recognized as one of NYC's top grooming destinations",
                            },
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur text-center"
                            >
                                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                    <span className="material-symbols-outlined text-primary text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 bg-gradient-to-t from-primary/10 to-transparent">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black text-white mb-6">Ready for Your Best Look?</h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Join thousands of satisfied clients who trust FadeLab for their grooming needs.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                            <Link
                                href="/barbers"
                                className="bg-white text-background-dark hover:bg-gray-200 px-12 py-5 rounded-xl font-bold text-xl transition-all inline-flex items-center gap-3"
                            >
                                Get Started Today
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
