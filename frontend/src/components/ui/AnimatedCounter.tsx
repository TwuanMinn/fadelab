"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon?: string;
}

export function AnimatedCounter({
    end,
    duration = 2,
    suffix = "",
    prefix = "",
    label,
    icon,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOutExpo * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration, isInView]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center group"
        >
            {icon && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                    className="mb-3 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
                >
                    <span className="material-symbols-outlined text-2xl">{icon}</span>
                </motion.div>
            )}
            <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
                {prefix}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                    {count}
                </span>
                {suffix}
            </div>
            <p className="mt-2 text-gray-400 text-sm font-medium uppercase tracking-wider">
                {label}
            </p>
        </motion.div>
    );
}

interface StatsGridProps {
    stats: AnimatedCounterProps[];
}

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <section className="py-20 bg-surface-dark border-y border-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">By The Numbers</h2>
                    <p className="text-gray-400">The proof is in the precision</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <AnimatedCounter key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
