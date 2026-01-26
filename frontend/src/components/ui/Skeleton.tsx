"use client";

import { forwardRef, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "text" | "circular" | "rectangular" | "rounded";
    width?: string | number;
    height?: string | number;
    animation?: "pulse" | "wave" | "none";
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    function Skeleton(
        {
            variant = "rectangular",
            width,
            height,
            animation = "pulse",
            className,
            style,
            ...props
        },
        ref
    ) {
        const variantStyles = {
            text: "rounded h-4",
            circular: "rounded-full",
            rectangular: "",
            rounded: "rounded-xl",
        };

        const animationStyles = {
            pulse: "animate-pulse",
            wave: "animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]",
            none: "",
        };

        return (
            <div
                ref={ref}
                className={clsx(
                    "bg-white/5",
                    variantStyles[variant],
                    animationStyles[animation],
                    className
                )}
                style={{
                    width: typeof width === "number" ? `${width}px` : width,
                    height: typeof height === "number" ? `${height}px` : height,
                    ...style,
                }}
                {...props}
            />
        );
    }
);

// Pre-built skeleton components for common use cases

export const SkeletonText = forwardRef<
    HTMLDivElement,
    Omit<SkeletonProps, "variant"> & { lines?: number }
>(function SkeletonText({ lines = 1, className, ...props }, ref) {
    return (
        <div ref={ref} className={clsx("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    variant="text"
                    width={i === lines - 1 && lines > 1 ? "75%" : "100%"}
                    {...props}
                />
            ))}
        </div>
    );
});

export const SkeletonAvatar = forwardRef<
    HTMLDivElement,
    Omit<SkeletonProps, "variant"> & { size?: "sm" | "md" | "lg" }
>(function SkeletonAvatar({ size = "md", ...props }, ref) {
    const sizes = { sm: 32, md: 48, lg: 64 };
    return (
        <Skeleton
            ref={ref}
            variant="circular"
            width={sizes[size]}
            height={sizes[size]}
            {...props}
        />
    );
});

export const SkeletonButton = forwardRef<
    HTMLDivElement,
    Omit<SkeletonProps, "variant">
>(function SkeletonButton(props, ref) {
    return (
        <Skeleton ref={ref} variant="rounded" height={48} width={120} {...props} />
    );
});

// Skeleton Card for barber/service cards
export const SkeletonCard = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(function SkeletonCard({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={clsx(
                "bg-surface-dark border border-white/5 rounded-xl overflow-hidden",
                className
            )}
            {...props}
        >
            <Skeleton variant="rectangular" className="aspect-[4/5]" />
            <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                    <Skeleton variant="text" width="60%" height={24} />
                    <Skeleton variant="rounded" width={70} height={28} />
                </div>
                <Skeleton variant="text" width="40%" height={16} />
            </div>
        </div>
    );
});

// Skeleton for testimonial cards
export const SkeletonTestimonial = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(function SkeletonTestimonial({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={clsx(
                "bg-surface-dark border border-white/5 rounded-xl p-8 min-w-[300px] md:min-w-[400px]",
                className
            )}
            {...props}
        >
            <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} variant="circular" width={20} height={20} />
                ))}
            </div>
            <SkeletonText lines={3} className="mb-6" />
            <div className="flex items-center gap-3">
                <SkeletonAvatar size="md" />
                <div className="space-y-2">
                    <Skeleton variant="text" width={100} height={16} />
                    <Skeleton variant="text" width={70} height={12} />
                </div>
            </div>
        </div>
    );
});

// Skeleton for pricing cards
export const SkeletonPricingCard = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(function SkeletonPricingCard({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={clsx(
                "bg-surface-dark border border-white/5 rounded-2xl p-8",
                className
            )}
            {...props}
        >
            <Skeleton variant="rounded" width={48} height={48} className="mb-4" />
            <Skeleton variant="text" width="50%" height={24} className="mb-2" />
            <SkeletonText lines={2} className="mb-6" />
            <div className="flex items-baseline gap-2 mb-8">
                <Skeleton variant="text" width={80} height={40} />
                <Skeleton variant="text" width={60} height={20} />
            </div>
            <div className="space-y-3 mb-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" width="80%" height={16} />
                    </div>
                ))}
            </div>
            <SkeletonButton className="w-full" />
        </div>
    );
});

export default Skeleton;
