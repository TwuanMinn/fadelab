"use client";

import { Player } from "@remotion/player";
import { FadeLabPromoVideo, fadeLabVideoConfig } from "./FadeLabPromo";
import { motion } from "framer-motion";

interface PromoVideoPlayerProps {
    autoPlay?: boolean;
    loop?: boolean;
    showControls?: boolean;
    className?: string;
}

export const PromoVideoPlayer = ({
    autoPlay = true,
    loop = true,
    showControls = true,
    className = "",
}: PromoVideoPlayerProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 ${className}`}
            style={{
                background: "linear-gradient(135deg, rgba(17,82,212,0.1) 0%, rgba(0,0,0,0.8) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
            }}
        >
            {/* Glow effect behind */}
            <div
                style={{
                    position: "absolute",
                    inset: -20,
                    background: "radial-gradient(circle at center, rgba(17,82,212,0.3) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />

            {/* Player */}
            <div style={{ position: "relative", zIndex: 1 }}>
                <Player
                    component={FadeLabPromoVideo}
                    durationInFrames={fadeLabVideoConfig.durationInFrames}
                    fps={fadeLabVideoConfig.fps}
                    compositionWidth={fadeLabVideoConfig.width}
                    compositionHeight={fadeLabVideoConfig.height}
                    style={{
                        width: "100%",
                        aspectRatio: "16/9",
                    }}
                    autoPlay={autoPlay}
                    loop={loop}
                    controls={showControls}
                />
            </div>

            {/* Premium badge */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "rgba(17,82,212,0.9)",
                    backdropFilter: "blur(10px)",
                    padding: "8px 16px",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    zIndex: 10,
                }}
            >
                <span style={{ fontSize: 14, fontWeight: 600, color: "white" }}>
                    ✨ Promo Video
                </span>
            </motion.div>
        </motion.div>
    );
};

// Compact version for embedding in sections
export const PromoVideoCompact = () => {
    return (
        <PromoVideoPlayer
            autoPlay={true}
            loop={true}
            showControls={false}
            className="max-w-4xl mx-auto"
        />
    );
};

// Full page hero version
export const PromoVideoHero = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-background-dark to-surface-dark py-20">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                        Experience FadeLab
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Watch our premium promotional video showcasing our services, team, and the FadeLab experience.
                    </p>
                </motion.div>

                <PromoVideoPlayer
                    autoPlay={true}
                    loop={true}
                    showControls={true}
                    className="max-w-5xl mx-auto"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center gap-4 mt-12"
                >
                    <a
                        href="/barbers"
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-glow flex items-center gap-2"
                    >
                        Book Now
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                    <a
                        href="/"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur"
                    >
                        Back to Home
                    </a>
                </motion.div>
            </div>
        </div>
    );
};
