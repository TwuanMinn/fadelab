"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

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
