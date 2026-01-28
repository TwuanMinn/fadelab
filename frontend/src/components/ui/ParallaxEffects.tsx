"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    offset?: number;
}

export function ParallaxSection({ children, className = "", offset = 50 }: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

interface ParallaxBackgroundProps {
    imageUrl?: string;
    overlayOpacity?: number;
    speed?: number;
    className?: string;
}

export function ParallaxBackground({
    imageUrl,
    overlayOpacity = 0.5,
    speed = 0.5,
    className = "",
}: ParallaxBackgroundProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

    return (
        <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
            {imageUrl && (
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
                    initial={{ backgroundImage: `url('${imageUrl}')` }}
                />
            )}
            <div
                className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/30"
                style={{ opacity: overlayOpacity }}
            />
        </div>
    );
}

interface FloatingElementProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
}

export function FloatingElement({
    children,
    delay = 0,
    duration = 4,
    distance = 15,
    className = "",
}: FloatingElementProps) {
    return (
        <motion.div
            animate={{
                y: [0, -distance, 0],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    className?: string;
}

export function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    className = "",
}: ScrollRevealProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
    };

    const { x, y } = directions[direction];

    return (
        <motion.div
            initial={{ opacity: 0, x, y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
