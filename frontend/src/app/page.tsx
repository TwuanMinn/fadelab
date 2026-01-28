"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Toolbar } from "./components/Toolbar";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { StatsGrid } from "@/components/ui/AnimatedCounter";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";
import { PricingSection } from "@/components/ui/GlassPricingCard";
import { ScrollReveal, FloatingElement } from "@/components/ui/ParallaxEffects";
import { GlowCard } from "@/components/ui/MicroInteractions";
import { toast } from "sonner";

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const words = useMemo(() => ["Fresh Cut", "New Look", "Best Fade", "Style Upgrade"], []);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  // Stats data for the counter section
  const stats = [
    { end: 6, suffix: "+", label: "Years Experience", icon: "workspace_premium" },
    { end: 2500, suffix: "+", label: "Happy Clients", icon: "groups" },
    { end: 4, label: "Expert Barbers", icon: "face" },
    { end: 15, suffix: "K+", label: "Haircuts Done", icon: "content_cut" },
  ];

  return (
    <>
      {/* Premium Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoaded(true)} minDuration={1200} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background-dark text-white font-display overflow-x-hidden antialiased selection:bg-primary selection:text-white pb-24 relative"
      >
        {/* Skip to content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Toolbar />

        {/* Top Logo / Branding with floating animation */}
        <div className="absolute top-0 left-0 right-0 z-40 p-8 flex justify-center">
          <FloatingElement distance={8} duration={5}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                className="size-14 flex items-center justify-center rounded-2xl bg-primary text-white shadow-glow cursor-pointer"
              >
                <span className="material-symbols-outlined text-4xl">content_cut</span>
              </motion.div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white">FadeLab</h1>
            </motion.div>
          </FloatingElement>
        </div>

        {/* Hero Section with Parallax */}
        <motion.header
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/30 z-10"></div>
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKoDlxMKWryCxgM_scsDXmtoXjBJ3UoVcLJuglZPhO2LoVDXnd5fEf40MgjcrgCY_dg9SsSHO_YcSg-YKxddI9h2F5Lqud7jZj94QgSE8kVurMk4OekSYGpDRD_OqdLU-IOS2Q68Y_Mu37EO5mVtJxFnOVuDB1RifgRP4gmQPxq0i6qG7SeUlj1M_eB3Eo1okb_ZudgKhTRI5qcOuTETEg_NWsVFHy-bx30LDf8qTcufeLtVpH9MZJXhoerN19ebXfBHbn4m2kKhzq')" }}
            >
            </motion.div>
          </div>

          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0"
          />

          {/* Content */}
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-2xl flex flex-col gap-6">
              <ScrollReveal delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 w-fit backdrop-blur-sm cursor-pointer"
                  onClick={() => toast.success("We're open! Walk-ins welcome.")}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-white tracking-wide uppercase">Open for Walk-ins</span>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight min-h-[160px] md:min-h-[220px]">
                  Your Next <br />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[wordIndex]}
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -20, rotateX: 90 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary pb-2 animate-gradient bg-[length:200%_auto]"
                    >
                      {words[wordIndex]} Awaits
                    </motion.span>
                  </AnimatePresence>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="text-lg md:text-xl text-gray-300 font-normal max-w-lg leading-relaxed">
                  Experience premium grooming services tailored to your unique style. Precision cuts, hot towel shaves, and a relaxed atmosphere.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/barbers"
                      className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-lg font-bold text-base transition-all shadow-[0_0_20px_rgba(17,82,212,0.5)] hover:shadow-[0_0_30px_rgba(17,82,212,0.6)] flex items-center justify-center gap-2 group"
                    >
                      Book Appointment
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="material-symbols-outlined text-lg"
                      >
                        arrow_forward
                      </motion.span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="#services"
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12 px-8 rounded-lg font-bold text-base transition-all backdrop-blur-sm flex items-center justify-center"
                    >
                      View Services
                    </Link>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/50"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <span className="material-symbols-outlined">expand_more</span>
            </motion.div>
          </motion.div>
        </motion.header>

        {/* About Us Section */}
        <section id="main-content" className="py-20 bg-gradient-to-b from-background-dark to-surface-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">About FadeLab</h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Since 2018, we've been redefining the barbershop experience in New York City.
                  At FadeLab, we blend traditional grooming techniques with modern style trends to deliver
                  exceptional results every time.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Our team of expert barbers brings decades of combined experience, a passion for precision,
                  and a commitment to making you look and feel your absolute best. Whether you're here for
                  a quick trim or a complete transformation, we treat every client with the same level of
                  dedication and artistry.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur"
                >
                  <div className="text-4xl font-black text-primary mb-2">6+</div>
                  <div className="text-white font-semibold">Years of Excellence</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur"
                >
                  <div className="text-4xl font-black text-primary mb-2">4</div>
                  <div className="text-white font-semibold">Master Barbers</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur"
                >
                  <div className="text-4xl font-black text-primary mb-2">100%</div>
                  <div className="text-white font-semibold">Satisfaction Rate</div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Live Availability Section */}
        <section className="py-20 bg-background-dark" id="barbers">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <ScrollReveal>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Real-time Availability</h2>
                  <p className="text-gray-400 mt-2">Check who is free right now.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Link href="/barbers" className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 text-sm group">
                  View Full Schedule
                  <motion.span
                    className="material-symbols-outlined text-lg"
                    whileHover={{ x: 5 }}
                  >
                    arrow_forward
                  </motion.span>
                </Link>
              </ScrollReveal>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Barber Card 1: Available */}
              <ScrollReveal delay={0.1}>
                <GlowCard className="group">
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0qHa9GG916Tc_uBvB2_hjkpFEhLzoDqkqKuGpYklGdSO2P1mt5UWZTcEqzHrLnFgalJ08ZSDX-ZMMnW6DYCUcadwjk2t_IqzbDPHCSLHEJoqMCqW0uS-99QwT0Kjo4HLo1j23Lz1alIyue4TQOJyIj6w8n5_MxUmL5w3JhLHMFipgdUP2s44ZSX4snDxSmdl1Yr-zAetCbZAvZacCspOplBiaQRJXOmKwasPxHlOQyhl3sSbJlWm9vTfTT-O26ZwwXIrTDe6w3oSd')" }}
                      ></motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold text-white">Mark D.</h3>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 border border-green-500/30 backdrop-blur-md"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs font-bold text-green-400">Now</span>
                        </motion.div>
                      </div>
                      <p className="text-sm text-gray-400">Master Stylist</p>
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              {/* Barber Card 2: Busy */}
              <ScrollReveal delay={0.2}>
                <GlowCard className="group">
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWBOlqQi020RlUJunvPdoD2RV26Rade-KRK8ir5mG0DN-bAEi723sSrGDYbc2d9IRJvCiDKE3lBzLDvAWRmhh8xMGl6Iy_vypBaPu5_7A3TH9z0jjuF5mVIdMzIY-7XOnultOErYc59X7bGIMRpOk9xTQeEOvPj7NVO8Fz66EhelEqsxp4nNCvNgN68VlTcirUBzOT8aR92Nb8VoMzRcGj6ouHMeoOWxpZcbxn4ELpM_uX3AxXa7U-AybkhLLXQaLF1Wb5moNL3Hkd')" }}
                      ></motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold text-white">James K.</h3>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-md"
                        >
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-xs font-bold text-yellow-400">2:00 PM</span>
                        </motion.div>
                      </div>
                      <p className="text-sm text-gray-400">Fade Specialist</p>
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              {/* Barber Card 3: Booked */}
              <ScrollReveal delay={0.3}>
                <GlowCard className="group grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaqYTQ5iC-pnGpVWKxQpRXxr_AZWQhYEuNUwSUm6ikdl8MzxV2SJmWwg5dw8aWba3tE6DGHvEVgmRKwdDIEcUAauYz1OyutyGvfV8bixJY1zdwdgoyI1UrRBCczmEBAtaTDuBKp3gvot_bOjRyDPheTQc-yjy4r1KEx6tizTS4u2Ksn91p7KXL8dfY03pt8bn7OFFMOTGTe0VzPpRqE4aMqB-8VJmJFC8UsOktum2kJYRApkmcCxjBzcs5NYavw5s2gUz4tLyvYAE0')" }}></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold text-white">Sarah M.</h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/20 border border-red-500/30 backdrop-blur-md">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-xs font-bold text-red-400">Booked</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">Beard Expert</p>
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              {/* Barber Card 4: Available */}
              <ScrollReveal delay={0.4}>
                <GlowCard className="group">
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1AofsJTDOCwx04Qy58ckD5-660yfEzK17mAw89h25AtC0JiYDAITpgSdRQ_nG9y_nlvvE3MRQopm0t_iWJ0se42u5xWnrSfgz-ouO4RfdSWJM-VFZe3sAR7sv6OwCUvAmC1Gsn-TciFvhDt8rxzz4rYfdxraWJM9YoAcfTjlAaekvGBlQYmFgqX89K4cj2v5iC6tjtkUh4rxHklBa17Xjg9QBPDwnvpv8rFENZjjdQQtze72YK1dQIqf5XsW7gkyWJnmx0Eg0cNAN')" }}
                      ></motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold text-white">David L.</h3>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 border border-green-500/30 backdrop-blur-md"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs font-bold text-green-400">Now</span>
                        </motion.div>
                      </div>
                      <p className="text-sm text-gray-400">Senior Barber</p>
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Section with Animated Counters */}
        <StatsGrid stats={stats} />

        {/* Services Section */}
        <section id="services" className="py-20 bg-surface-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Premium Services</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Professional grooming services designed to elevate your style</p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "content_cut", title: "Classic Cut", price: "$35", desc: "Precision haircut tailored to your style and face shape" },
                { icon: "spa", title: "Hot Towel Shave", price: "$45", desc: "Traditional straight razor experience with premium products" },
                { icon: "face_retouching_natural", title: "Beard Trim & Shape", price: "$25", desc: "Expert beard sculpting and maintenance" },
                { icon: "styling", title: "Hair & Beard Combo", price: "$55", desc: "Complete grooming package for the modern gentleman" },
                { icon: "child_care", title: "Kids Cut", price: "$20", desc: "Patient, professional cuts for children under 12" },
                { icon: "face", title: "Deluxe Package", price: "$85", desc: "Cut, shave, beard trim, and facial treatment" },
              ].map((service, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlowCard>
                    <div className="p-6 text-center h-full flex flex-col">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-3xl text-primary">{service.icon}</span>
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-gray-400 mb-4 flex-grow">{service.desc}</p>
                      <p className="text-3xl font-bold text-primary">{service.price}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toast.success(`${service.title} added! Proceed to booking.`)}
                        className="mt-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 px-4 rounded-lg font-semibold transition-all"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </GlowCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Barber of the Month Spotlight */}
        <section className="py-20 bg-surface-dark border-y border-white/5 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-primary/10 via-transparent to-transparent"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image Grid */}
              <ScrollReveal direction="left" className="relative order-2 lg:order-1">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 aspect-[4/5] max-w-md mx-auto lg:mx-0 group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2')" }}
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="absolute bottom-6 left-6 bg-background-dark/80 backdrop-blur px-4 py-2 rounded border border-white/10"
                  >
                    <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Pro Barber</p>
                    <p className="text-white font-bold text-lg">Since 2018</p>
                  </motion.div>
                </div>
                {/* Decorative pattern */}
                <div className="absolute -top-10 -left-10 w-full h-full border border-white/5 rounded-2xl z-0 hidden lg:block"></div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal direction="right" className="order-1 lg:order-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mb-6 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-sm">trophy</span>
                  <span className="text-xs font-bold text-primary tracking-wide uppercase">Barber of the Month</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  Jason "The Fade" Miller
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Voted top stylist in the city for three consecutive years. Jason specializes in classic straight razor shaves and modern texturizing techniques. His attention to detail is unmatched, turning every haircut into a personalized masterpiece.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-background-dark border border-white/5 transition-all"
                  >
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">content_cut</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Precision Cuts</h4>
                      <p className="text-xs text-gray-400">Tailored to head shape</p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-background-dark border border-white/5 transition-all"
                  >
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">spa</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Hot Towel Shaves</h4>
                      <p className="text-xs text-gray-400">Old school luxury</p>
                    </div>
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/checkout?barberId=4&service=classic-cut" className="flex items-center justify-center gap-2 bg-white text-background-dark hover:bg-gray-200 h-12 px-6 rounded-lg font-bold transition-colors w-fit">
                    Book with Jason
                    <span className="material-symbols-outlined text-lg">arrow_outward</span>
                  </Link>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Section with Glassmorphism */}
        <PricingSection />

        {/* Enhanced Testimonials Slider */}
        <TestimonialSlider />

        {/* FAQ Section */}
        <section className="py-20 bg-background-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-400 text-lg">Got questions? We've got answers.</p>
            </ScrollReveal>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "Do I need an appointment?", a: "While walk-ins are welcome, we recommend booking ahead to guarantee your preferred time slot and barber." },
                { q: "What payment methods do you accept?", a: "We accept cash, all major credit cards, Apple Pay, Google Pay, and Venmo for your convenience." },
                { q: "How long does a typical haircut take?", a: "A standard cut takes 30-45 minutes. Premium services like the Deluxe Package can take up to 90 minutes." },
                { q: "Do you offer student or military discounts?", a: "Yes! We offer 15% off for students with valid ID and 20% off for active military and veterans." },
                { q: "Can I request a specific barber?", a: "Absolutely! When booking, you can select your preferred barber. We'll do our best to accommodate your request." },
              ].map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <motion.div
                    initial={false}
                    className="border border-white/10 rounded-lg bg-surface-dark overflow-hidden"
                  >
                    <motion.button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-white font-semibold text-lg">{faq.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="material-symbols-outlined text-primary"
                      >
                        expand_more
                      </motion.span>
                    </motion.button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === i ? "auto" : 0,
                        opacity: openFaq === i ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-400">{faq.a}</div>
                    </motion.div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-b from-surface-dark to-background-dark relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <ScrollReveal>
                <div className="mb-6">
                  <span className="material-symbols-outlined text-6xl text-primary mb-4 inline-block">mail</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Stay Sharp</h2>
                <p className="text-gray-400 text-lg mb-8">
                  Get exclusive deals, grooming tips, and first access to special events. Join 2,500+ subscribers.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) {
                      toast.success("Thanks for subscribing! Check your inbox.");
                      setEmail("");
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]"
                  >
                    Subscribe
                  </motion.button>
                </form>
                <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Social Feed */}
        <section className="py-20 bg-background-dark" id="lookbook">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">Follow the Fade</h2>
              <div className="flex items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  className="text-primary hover:text-primary/80 transition-colors"
                  href="https://instagram.com/fadelab"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  className="text-primary hover:text-primary/80 transition-colors"
                  href="https://twitter.com/fadelab"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </motion.a>
                <span className="text-gray-500">@FadeLab</span>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDvfAtv59srVAeZIZnSrScjbRBKkEg-ZMhHO82GGsNlbDlTDS8qLcIZruhFy-TZvJopcE9idZRxwmJb2Rsepg9FQjS-oNLa2BSNjKfwenmovF4f7MwnpjNY3apvGvS6HQJyubUQ669vh24eYGidEs-lOtOShyT-3hC5vwwRH2MW4MMUxIDg5RNL3etNy3RWAijVY_zwUQ3dGAZ6TPkbcGFFvQ9hEOuUAt4yboUYHTVV8nyU8yjDlhqkE1RjdCiwcmOyWczjgPqlivVu",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDZEZqtjG2I421S0GG2Re1oAyBuw_0v62ANUMfkEaD2IjVzAI5KadWpkEKIhYuqbCxaYoOEgOIdpBZav4RuZp76bFqA9DRinUT37vigxi5LmvJpKjTxT45oSV9JpDoadfCuIXv8jnJGbp-ClrRnPyElC4XAwOdUDd0_3AAeNpI2RZ1ri3JOQS1KNwny_TnvCSARRVlsVE3JlTglOhCTIbabv4ZYWYITM53xFBJ0KPgMqSk6Mg-LsrXCInSyjFMgU77G8GLQ5fofRgxk",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDJg7E1MWeasGtL1ot-bTtqR7_IV3rwDLACt7pZjHWEGGcsYTCasszlnL9WT5fzU3Aqe036SpesKJ3T6CvxgJkRxt03z2I-4_ew0GKn5jrlmLyrmitzRacDoMh5YW-xcz6hWF0Xp7tP9fDBvO7B2zpgiPAJR70Cft4Cq5EaH27daJt8pXQ8mvEmg_Bnh5uZbSORekLwaP7Gzmwh6ZErHfOwD0DcepTjZ4UgDIEvIPNa39GQp617C1RAVw4b7nAqhgqwKmEp1yMgiWMF",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAGRkihqRmGGmoZOh-YR02Ma8AxKYOAMDdwVYx2Na4zpQZquDuAJskscoqhewRhnfV97xa0SuKErtm41QB6SOV8u8E1TzpuuQsOwQ2kKSvmHQTJdAXPNq_yiFUPY3oRq1SFAJ3lpn8DzOsS3pU8Y0Br52i-JanPtVH4ivJUikK59inP1hHqVeHKKYbJNWW-9hLD7d76rZ0aG2w1y9iAMIJGcNu1sig2rR0Ki0LAzJFCCjz7-lULOZbl2ge4uPaDzdc1RM_iDTc6ggJJ"
              ].map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-surface-dark rounded-lg overflow-hidden group relative cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${img}')` }}
                    ></motion.div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.2 }}
                        className="material-symbols-outlined text-white text-3xl"
                      >
                        favorite
                      </motion.span>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className="bg-surface-dark py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Visit Us</h2>
              <p className="text-gray-400">456 Madison Avenue, Manhattan, NY 10022</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-w-5xl mx-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841633425846!2d-73.97989!3d40.7614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzQxLjAiTiA3M8KwNTgnNDcuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  title="FadeLab Location"
                ></iframe>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-surface-darker py-12 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 mb-4 text-white cursor-pointer"
                >
                  <div className="size-6 text-primary">
                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <span className="font-bold text-lg">FadeLab</span>
                </motion.div>
                <p className="text-gray-500 text-sm">Premium grooming for the modern gentleman. Est. 2018.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Location</h4>
                <p className="text-gray-400 text-sm mb-1">456 Madison Avenue</p>
                <p className="text-gray-400 text-sm">Manhattan, NY 10022</p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm inline-flex items-center gap-1 mt-2"
                >
                  Get Directions <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </motion.a>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Hours</h4>
                <p className="text-gray-400 text-sm mb-1">Mon - Fri: 9:00 AM - 8:00 PM</p>
                <p className="text-gray-400 text-sm mb-1">Saturday: 10:00 AM - 7:00 PM</p>
                <p className="text-gray-400 text-sm mb-1">Sunday: 11:00 AM - 5:00 PM</p>
                <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Open Now
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Contact</h4>
                <p className="text-gray-400 text-sm mb-1">(212) 555-FADE</p>
                <p className="text-gray-400 text-sm">book@fadelab.com</p>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-xs">© 2024 FadeLab. All rights reserved.</p>
              <div className="flex gap-4">
                <a className="text-gray-600 hover:text-white transition-colors text-xs" href="#">Privacy Policy</a>
                <a className="text-gray-600 hover:text-white transition-colors text-xs" href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Persistent Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          {/* WhatsApp Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://wa.me/12125553233?text=Hi!%20I'd%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Book via WhatsApp"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Booking Button (All Devices) */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(17, 82, 212, 0.4)",
                  "0 0 40px rgba(17, 82, 212, 0.6)",
                  "0 0 20px rgba(17, 82, 212, 0.4)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
              onClick={() => window.location.href = '/barbers'}
            >
              <span className="material-symbols-outlined">calendar_today</span>
            </motion.button>
          </motion.div>
        </div>

        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </motion.div>
    </>
  );
}
