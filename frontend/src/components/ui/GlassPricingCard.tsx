"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PricingFeature {
    text: string;
}

interface GlassPricingCardProps {
    icon: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    features: PricingFeature[];
    featured?: boolean;
    href: string;
    delay?: number;
}

export function GlassPricingCard({
    icon,
    title,
    description,
    price,
    duration,
    features,
    featured = false,
    href,
    delay = 0,
}: GlassPricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative flex flex-col p-8 rounded-2xl transition-all duration-500 group overflow-hidden ${featured
                    ? "bg-gradient-to-br from-primary/20 via-surface-dark to-surface-dark border-primary/30"
                    : "bg-surface-dark/50 border-white/5 hover:border-primary/30"
                } border backdrop-blur-xl`}
        >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated glow effect for featured */}
            {featured && (
                <>
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <motion.div
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"
                    />
                </>
            )}

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="relative z-10">
                {/* Icon */}
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`mb-4 p-3 w-fit rounded-xl ${featured
                            ? "bg-primary/30 text-primary shadow-lg shadow-primary/20"
                            : "bg-white/5 text-white group-hover:bg-primary/20 group-hover:text-primary"
                        } transition-all duration-300`}
                >
                    <span className="material-symbols-outlined">{icon}</span>
                </motion.div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow min-h-[48px]">{description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black text-white">${price}</span>
                    <span className="text-gray-500">/ {duration}</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 text-sm text-gray-300">
                    {features.map((feature, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: delay + index * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-primary text-base">check</span>
                            {feature.text}
                        </motion.li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link
                    href={href}
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${featured
                            ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40"
                            : "border border-white/20 text-white hover:bg-white hover:text-background-dark"
                        }`}
                >
                    <span>Select</span>
                    <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="material-symbols-outlined text-lg opacity-0 group-hover/btn:opacity-100 transition-all"
                    >
                        arrow_forward
                    </motion.span>
                </Link>
            </div>
        </motion.div>
    );
}

export function PricingSection() {
    const plans = [
        {
            icon: "speed",
            title: "Quick Trim",
            description: "Perfect for maintenance between full cuts. Includes line-up and neck shave.",
            price: 30,
            duration: "20 min",
            features: [
                { text: "Edge Line-up" },
                { text: "Neck Shave" },
                { text: "Product Styling" },
            ],
            href: "/checkout?service=quick-trim",
        },
        {
            icon: "content_cut",
            title: "Classic Cut",
            description: "Our signature service. Full consultation, wash, precision cut, and style.",
            price: 50,
            duration: "45 min",
            features: [
                { text: "Hair Wash & Conditioning" },
                { text: "Scissor & Clipper Cut" },
                { text: "Hot Towel Finish" },
            ],
            href: "/checkout?service=classic-cut",
            featured: true,
        },
        {
            icon: "diamond",
            title: "Premium Experience",
            description: "The ultimate grooming package. Full haircut plus beard sculpt and mini-facial.",
            price: 85,
            duration: "75 min",
            features: [
                { text: "Everything in Classic" },
                { text: "Beard Sculpt & Oil" },
                { text: "Relaxing Face Massage" },
            ],
            href: "/checkout?service=premium",
        },
    ];

    return (
        <section className="py-24 bg-background-dark relative overflow-hidden" id="services">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Transparent Pricing
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Simple, transparent pricing for premium services. No hidden fees.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <GlassPricingCard key={plan.title} {...plan} delay={index * 0.15} />
                    ))}
                </div>
            </div>
        </section>
    );
}
