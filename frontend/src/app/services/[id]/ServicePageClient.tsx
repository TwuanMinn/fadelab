"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Service, ServiceCard } from "@/components/ui/ServiceMenu";
import { ScrollReveal } from "@/components/ui/ParallaxEffects";
import { Toolbar } from "@/app/components/Toolbar";
import { toast } from "sonner";

interface Props {
    service: Service;
    allServices: Service[];
}

export function ServicePageClient({ service, allServices }: Props) {
    const relatedServices = allServices
        .filter((s) => s.id !== service.id)
        .slice(0, 3);

    return (
        <div className="bg-background-dark text-white min-h-screen">
            <Toolbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12">
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-96 bg-cover bg-center opacity-30"
                        style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark/90 to-background-dark" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center gap-2 text-sm text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <span className="material-symbols-outlined text-xs">chevron_right</span>
                            </li>
                            <li>
                                <Link href="/#services" className="hover:text-white transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <span className="material-symbols-outlined text-xs">chevron_right</span>
                            </li>
                            <li className="text-white">{service.name}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <ScrollReveal>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-primary">
                                        {service.icon}
                                    </span>
                                </div>
                                {service.popular && (
                                    <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold">
                                        Most Popular
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black mb-4">{service.name}</h1>

                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-5xl font-black text-primary">${service.price}</span>
                                <span className="text-gray-400 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-lg">schedule</span>
                                    {service.duration}
                                </span>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {service.longDescription}
                            </p>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href={`/barbers?service=${service.id}`}
                                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_30px_rgba(17,82,212,0.5)]"
                                >
                                    Book This Service
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </motion.div>
                        </ScrollReveal>

                        {/* Image */}
                        <ScrollReveal delay={0.2}>
                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10"
                                >
                                    <div
                                        className="aspect-[4/3] bg-cover bg-center"
                                        style={{ backgroundImage: `url('${service.image}')` }}
                                    />
                                </motion.div>
                                {/* Decorative element */}
                                <div className="absolute -bottom-6 -right-6 w-full h-full border border-primary/30 rounded-2xl -z-10" />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-surface-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2">What's Included</h2>
                        <p className="text-gray-400">Everything you get with {service.name}</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {service.features.map((feature, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-background-dark border border-white/10"
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-green-400">check</span>
                                    </div>
                                    <span className="text-white font-medium">{feature}</span>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Book CTA */}
            <section className="py-16 bg-gradient-to-r from-primary/20 via-surface-dark to-primary/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Look Your Best?</h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Book your {service.name} appointment today. Choose your preferred barber and time.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href={`/barbers?service=${service.id}`}
                                    className="inline-flex items-center gap-2 bg-white text-background-dark px-8 py-4 rounded-lg font-bold transition-colors hover:bg-gray-100"
                                >
                                    <span className="material-symbols-outlined">calendar_today</span>
                                    Book Appointment
                                </Link>
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const url = `https://wa.me/12125553233?text=Hi! I'd like to book a ${service.name} ($${service.price})`;
                                    window.open(url, '_blank');
                                }}
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                </svg>
                                Book via WhatsApp
                            </motion.button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Related Services */}
            <section className="py-16 bg-background-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-2">You Might Also Like</h2>
                        <p className="text-gray-400">Explore our other services</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedServices.map((s, index) => (
                            <ScrollReveal key={s.id} delay={index * 0.1}>
                                <ServiceCard service={s} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Back Link */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to All Services
                </Link>
            </div>
        </div>
    );
}
