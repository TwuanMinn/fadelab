"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl ${className}`}
        />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 p-4">
            <Skeleton className="aspect-square w-full rounded-2xl mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-4" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 pb-32">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-6 py-4">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    <Skeleton className="size-10 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="size-10 rounded-full" />
                </div>
            </div>

            {/* Image */}
            <div className="px-6 py-6 max-w-2xl mx-auto">
                <Skeleton className="aspect-square w-full rounded-[2rem] mb-6" />

                {/* Thumbnails */}
                <div className="flex gap-3 mb-8">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="size-16 rounded-xl" />
                    ))}
                </div>

                {/* Title & Price */}
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-8" />

                {/* Color Options */}
                <div className="flex gap-3 mb-8">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="size-12 rounded-full" />
                    ))}
                </div>

                {/* Button */}
                <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
        </div>
    );
}

export function CartItemSkeleton() {
    return (
        <div className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5">
            <Skeleton className="size-24 rounded-xl flex-shrink-0" />
            <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export function SearchResultSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-3">
                        <Skeleton className="h-3 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-5 w-1/3" />
                    </div>
                </div>
            ))}
        </div>
    );
}
