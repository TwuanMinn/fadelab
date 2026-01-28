"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ParallaxEffects";
import { GlowCard } from "@/components/ui/MicroInteractions";

export interface Service {
    id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    longDescription: string;
    features: string[];
    image: string;
    icon: string;
    popular?: boolean;
}

export const services: Service[] = [
    {
        id: "classic-cut",
        name: "Classic Cut",
        price: 35,
        duration: "30-45 min",
        description: "Precision haircut tailored to your style and face shape",
        longDescription: "Our signature Classic Cut includes a detailed consultation, precision cutting with clippers and shears, styling with premium products, and a hot towel finish. Perfect for maintaining your look or trying something new.",
        features: [
            "Detailed consultation",
            "Precision cutting",
            "Premium styling products",
            "Hot towel finish",
            "Style recommendations"
        ],
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800",
        icon: "content_cut",
        popular: true
    },
    {
        id: "hot-towel-shave",
        name: "Hot Towel Shave",
        price: 45,
        duration: "45-60 min",
        description: "Traditional straight razor experience with premium products",
        longDescription: "Experience the art of the traditional straight razor shave. Includes multiple hot towel applications, pre-shave oil, premium shaving cream, precision straight razor work, and soothing aftershave treatment.",
        features: [
            "Multiple hot towel applications",
            "Pre-shave oil treatment",
            "Premium shaving cream",
            "Straight razor precision",
            "Soothing aftershave",
            "Face massage"
        ],
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800",
        icon: "spa"
    },
    {
        id: "beard-trim",
        name: "Beard Trim & Shape",
        price: 25,
        duration: "20-30 min",
        description: "Expert beard sculpting and maintenance",
        longDescription: "Keep your beard looking sharp with our precision trimming service. Includes shaping, line-ups, neck cleanup, and conditioning treatment to keep your facial hair healthy and styled.",
        features: [
            "Precision trimming",
            "Shape consultation",
            "Line-up and edges",
            "Neck cleanup",
            "Beard oil treatment"
        ],
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800",
        icon: "face_retouching_natural"
    },
    {
        id: "hair-beard-combo",
        name: "Hair & Beard Combo",
        price: 55,
        duration: "60-75 min",
        description: "Complete grooming package for the modern gentleman",
        longDescription: "The complete grooming experience. Combines our Classic Cut with a full beard trim and shape. Perfect for maintaining your entire look in one appointment.",
        features: [
            "Full haircut",
            "Complete beard service",
            "Hot towel treatment",
            "Premium products",
            "Save $5 vs. separate"
        ],
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
        icon: "styling",
        popular: true
    },
    {
        id: "kids-cut",
        name: "Kids Cut",
        price: 20,
        duration: "20-30 min",
        description: "Patient, professional cuts for children under 12",
        longDescription: "A fun, stress-free haircut experience for your little ones. Our barbers are experts at working with kids, making sure they leave with a great cut and a smile.",
        features: [
            "Patient, kid-friendly service",
            "Fun atmosphere",
            "Age-appropriate styling",
            "Lollipop after!"
        ],
        image: "https://images.unsplash.com/photo-1634391753673-b9bd24aa3cad?w=800",
        icon: "child_care"
    },
    {
        id: "deluxe-package",
        name: "The Deluxe Package",
        price: 85,
        duration: "90-120 min",
        description: "Cut, shave, beard trim, and facial treatment",
        longDescription: "The ultimate grooming experience. Includes our Classic Cut, Hot Towel Shave, Beard Trim, plus a rejuvenating facial treatment. Leave feeling like royalty.",
        features: [
            "Complete haircut",
            "Full straight razor shave",
            "Beard shaping",
            "Deep cleanse facial",
            "Scalp massage",
            "Complimentary beverage"
        ],
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800",
        icon: "face"
    }
];

export function ServiceCard({ service, featured = false }: { service: Service; featured?: boolean }) {
    return (
        <GlowCard className="h-full">
            <Link href={`/services/${service.id}`} className="block h-full">
                <div className="relative overflow-hidden rounded-xl bg-surface-dark border border-white/10 h-full flex flex-col">
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${service.image}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent" />

                        {service.popular && (
                            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-xs font-bold text-white">
                                Popular
                            </div>
                        )}

                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">{service.icon}</span>
                            </div>
                            <div className="text-xs text-gray-300 bg-black/50 backdrop-blur px-2 py-1 rounded">
                                {service.duration}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-white">{service.name}</h3>
                            <span className="text-2xl font-black text-primary">${service.price}</span>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 flex-1">{service.description}</p>

                        <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-primary text-sm font-semibold"
                        >
                            View Details
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </GlowCard>
    );
}

export function ServicesGrid() {
    return (
        <section className="py-20 bg-background-dark" id="services">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Professional grooming services designed to elevate your style
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 0.1}>
                            <ServiceCard service={service} />
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.4} className="text-center mt-12">
                    <p className="text-gray-500 text-sm mb-4">
                        All services include consultation and premium products
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/barbers"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]"
                        >
                            Book Now
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </motion.div>
                </ScrollReveal>
            </div>
        </section>
    );
}
