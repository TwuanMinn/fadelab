"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ParallaxEffects";
import { GlowCard } from "@/components/ui/MicroInteractions";

// Import and re-export from shared data file for backward compatibility
import { services, type Service } from "@/lib/services-data";
export { services };
export type { Service };


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
