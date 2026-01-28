"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
}

export function Skeleton({
    className = "",
    variant = "rectangular",
    width,
    height,
}: SkeletonProps) {
    const baseStyles = "bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer";

    const variants = {
        text: "rounded",
        circular: "rounded-full",
        rectangular: "rounded-lg",
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${className}`}
            style={{ width, height }}
        />
    );
}

export function BarberCardSkeleton() {
    return (
        <div className="relative overflow-hidden rounded-xl bg-surface-dark border border-white/5">
            <div className="aspect-[4/5] w-full">
                <Skeleton className="w-full h-full" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center justify-between mb-1">
                    <Skeleton width={100} height={24} />
                    <Skeleton width={60} height={24} variant="rectangular" />
                </div>
                <Skeleton width={80} height={16} className="mt-2" />
            </div>
        </div>
    );
}

export function PricingCardSkeleton() {
    return (
        <div className="flex flex-col p-8 rounded-2xl bg-surface-dark border border-white/5">
            <Skeleton width={48} height={48} variant="rectangular" className="mb-4" />
            <Skeleton width="60%" height={24} className="mb-2" />
            <Skeleton width="100%" height={16} className="mb-6" />
            <Skeleton width="40%" height={40} className="mb-8" />
            <div className="flex flex-col gap-3 mb-8">
                <Skeleton width="80%" height={20} />
                <Skeleton width="70%" height={20} />
                <Skeleton width="75%" height={20} />
            </div>
            <Skeleton width="100%" height={48} />
        </div>
    );
}

export function TestimonialSkeleton() {
    return (
        <div className="min-w-[300px] md:min-w-[400px] bg-background-dark p-8 rounded-xl border border-white/5">
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} width={20} height={20} variant="circular" />
                ))}
            </div>
            <Skeleton width="100%" height={20} className="mb-2" />
            <Skeleton width="90%" height={20} className="mb-2" />
            <Skeleton width="70%" height={20} className="mb-6" />
            <div className="flex items-center gap-3">
                <Skeleton width={40} height={40} variant="circular" />
                <div>
                    <Skeleton width={100} height={16} className="mb-1" />
                    <Skeleton width={60} height={12} />
                </div>
            </div>
        </div>
    );
}

export function LoadingDots() {
    return (
        <div className="flex gap-1 items-center justify-center">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 0.6,
                        delay: i * 0.15,
                        repeat: Infinity,
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                />
            ))}
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-3 border-white/20 border-t-primary rounded-full"
                />
                <p className="text-gray-400 text-sm font-medium">Loading...</p>
            </motion.div>
        </div>
    );
}
