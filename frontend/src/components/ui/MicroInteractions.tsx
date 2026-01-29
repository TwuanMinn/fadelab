"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { MouseEvent, useRef } from "react";

interface RippleButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary" | "ghost";
}

export function RippleButton({
    children,
    className = "",
    onClick,
    variant = "primary",
}: RippleButtonProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25",
        secondary: "bg-white text-background-dark hover:bg-gray-200",
        ghost: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            className={`relative overflow-hidden px-6 py-3 rounded-xl font-bold transition-colors ${variants[variant]} ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useMotionTemplate`
            radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)
          `,
                }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
}

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.15);
        y.set((clientY - centerY) * 0.15);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            className={`group relative overflow-hidden rounded-2xl bg-surface-dark border border-white/5 hover:border-white/10 transition-colors ${className}`}
        >
            {/* Spotlight effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useMotionTemplate`
            radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(17, 82, 212, 0.15), transparent 80%)
          `,
                }}
            />
            {/* Border glow effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useMotionTemplate`
            radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(17, 82, 212, 0.4), transparent 80%)
          `,
                    mask: "linear-gradient(white, white) padding-box, linear-gradient(white, white)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

// ============ NEW PREMIUM ANIMATIONS ============

// Animated rotating border effect
interface AnimatedBorderProps {
    children: React.ReactNode;
    className?: string;
    borderWidth?: number;
}

export function AnimatedBorder({ children, className = "", borderWidth = 2 }: AnimatedBorderProps) {
    return (
        <div className={`relative group ${className}`}>
            {/* Animated gradient border */}
            <motion.div
                className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: "linear-gradient(90deg, #1152d4, #3b82f6, #8b5cf6, #3b82f6, #1152d4)",
                    backgroundSize: "200% 100%",
                    padding: borderWidth,
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <div className="w-full h-full bg-surface-dark rounded-2xl" />
            </motion.div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// 3D Tilt Card Effect
interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export function TiltCard({ children, className = "", intensity = 10 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
        stiffness: 300,
        damping: 30,
    });

    function handleMouseMove(e: MouseEvent) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPos);
        y.set(yPos);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>{children}</div>
        </motion.div>
    );
}

// Pulse effect on scroll into view
interface PulseOnViewProps {
    children: React.ReactNode;
    className?: string;
}

export function PulseOnView({ children, className = "" }: PulseOnViewProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? {
                scale: [0.8, 1.05, 1],
                opacity: 1
            } : {}}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.7, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Shimmer text effect
interface ShimmerTextProps {
    children: string;
    className?: string;
}

export function ShimmerText({ children, className = "" }: ShimmerTextProps) {
    return (
        <motion.span
            className={`relative inline-block ${className}`}
            style={{
                background: "linear-gradient(90deg, #fff 0%, #a5b4fc 25%, #fff 50%, #a5b4fc 75%, #fff 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}
            animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
            {children}
        </motion.span>
    );
}

// Bouncy button with elastic effect
interface BouncyButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function BouncyButton({ children, className = "", onClick }: BouncyButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{
                scale: 0.95,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className={className}
        >
            {children}
        </motion.button>
    );
}

// Stagger children animation on view
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                    }
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Hover card with lift effect
interface LiftCardProps {
    children: React.ReactNode;
    className?: string;
}

export function LiftCard({ children, className = "" }: LiftCardProps) {
    return (
        <motion.div
            whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(17, 82, 212, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`${className}`}
        >
            {children}
        </motion.div>
    );
}

// Icon bounce on hover
interface IconBounceProps {
    children: React.ReactNode;
    className?: string;
}

export function IconBounce({ children, className = "" }: IconBounceProps) {
    return (
        <motion.div
            whileHover={{
                y: [0, -8, 0],
                transition: {
                    duration: 0.4,
                    ease: "easeOut",
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Text reveal on view
interface TextRevealProps {
    text: string;
    className?: string;
}

export function TextReveal({ text, className = "" }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const words = text.split(" ");

    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

