"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Toolbar } from "./components/Toolbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = useMemo(() => ["Fresh Cut", "New Look", "Best Fade", "Style Upgrade"], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="bg-background-dark text-white font-display overflow-x-hidden antialiased selection:bg-primary selection:text-white pb-24 relative">
      <Toolbar />

      {/* Top Logo / Branding */}
      <div className="absolute top-0 left-0 right-0 z-40 p-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="size-14 flex items-center justify-center rounded-2xl bg-primary text-white shadow-glow">
            <span className="material-symbols-outlined text-4xl">content_cut</span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">FadeLab</h1>
        </motion.div>
      </div>

      {/* Hero Section */}
      <header className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/30 z-10"></div>
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKoDlxMKWryCxgM_scsDXmtoXjBJ3UoVcLJuglZPhO2LoVDXnd5fEf40MgjcrgCY_dg9SsSHO_YcSg-YKxddI9h2F5Lqud7jZj94QgSE8kVurMk4OekSYGpDRD_OqdLU-IOS2Q68Y_Mu37EO5mVtJxFnOVuDB1RifgRP4gmQPxq0i6qG7SeUlj1M_eB3Eo1okb_ZudgKhTRI5qcOuTETEg_NWsVFHy-bx30LDf8qTcufeLtVpH9MZJXhoerN19ebXfBHbn4m2kKhzq')" }}>
          </div>
        </div>
        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 w-fit backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-white tracking-wide uppercase">Open for Walk-ins</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight min-h-[160px] md:min-h-[220px]">
              Your Next <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary pb-2"
                >
                  {words[wordIndex]} Awaits
                </motion.span>
              </AnimatePresence>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-normal max-w-lg leading-relaxed">
              Experience premium grooming services tailored to your unique style. Precision cuts, hot towel shaves, and a relaxed atmosphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/barbers" className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-lg font-bold text-base transition-all shadow-[0_0_20px_rgba(17,82,212,0.5)] hover:shadow-[0_0_30px_rgba(17,82,212,0.6)] flex items-center justify-center">
                Book Appointment
              </Link>
              <Link href="#services" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12 px-8 rounded-lg font-bold text-base transition-all backdrop-blur-sm flex items-center justify-center">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Live Availability Section */}
      <section className="py-20 bg-background-dark" id="barbers">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Real-time Availability</h2>
              <p className="text-gray-400 mt-2">Check who is free right now.</p>
            </div>
            <Link href="/barbers" className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 text-sm">
              View Full Schedule <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Barber Card 1: Available */}
            <div className="group relative overflow-hidden rounded-xl bg-surface-dark border border-white/5 transition-all hover:border-primary/50">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0qHa9GG916Tc_uBvB2_hjkpFEhLzoDqkqKuGpYklGdSO2P1mt5UWZTcEqzHrLnFgalJ08ZSDX-ZMMnW6DYCUcadwjk2t_IqzbDPHCSLHEJoqMCqW0uS-99QwT0Kjo4HLo1j23Lz1alIyue4TQOJyIj6w8n5_MxUmL5w3JhLHMFipgdUP2s44ZSX4snDxSmdl1Yr-zAetCbZAvZacCspOplBiaQRJXOmKwasPxHlOQyhl3sSbJlWm9vTfTT-O26ZwwXIrTDe6w3oSd')" }}></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-bold text-white">Mark D.</h3>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 border border-green-500/30 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-green-400">Now</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Master Stylist</p>
              </div>
            </div>
            {/* Barber Card 2: Busy */}
            <div className="group relative overflow-hidden rounded-xl bg-surface-dark border border-white/5 transition-all hover:border-white/20">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWBOlqQi020RlUJunvPdoD2RV26Rade-KRK8ir5mG0DN-bAEi723sSrGDYbc2d9IRJvCiDKE3lBzLDvAWRmhh8xMGl6Iy_vypBaPu5_7A3TH9z0jjuF5mVIdMzIY-7XOnultOErYc59X7bGIMRpOk9xTQeEOvPj7NVO8Fz66EhelEqsxp4nNCvNgN68VlTcirUBzOT8aR92Nb8VoMzRcGj6ouHMeoOWxpZcbxn4ELpM_uX3AxXa7U-AybkhLLXQaLF1Wb5moNL3Hkd')" }}></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-bold text-white">James K.</h3>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-xs font-bold text-yellow-400">2:00 PM</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Fade Specialist</p>
              </div>
            </div>
            {/* Barber Card 3: Booked */}
            <div className="group relative overflow-hidden rounded-xl bg-surface-dark border border-white/5 grayscale transition-all hover:grayscale-0">
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
            {/* Barber Card 4: Available */}
            <div className="group relative overflow-hidden rounded-xl bg-surface-dark border border-white/5 transition-all hover:border-primary/50">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1AofsJTDOCwx04Qy58ckD5-660yfEzK17mAw89h25AtC0JiYDAITpgSdRQ_nG9y_nlvvE3MRQopm0t_iWJ0se42u5xWnrSfgz-ouO4RfdSWJM-VFZe3sAR7sv6OwCUvAmC1Gsn-TciFvhDt8rxzz4rYfdxraWJM9YoAcfTjlAaekvGBlQYmFgqX89K4cj2v5iC6tjtkUh4rxHklBa17Xjg9QBPDwnvpv8rFENZjjdQQtze72YK1dQIqf5XsW7gkyWJnmx0Eg0cNAN')" }}></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-bold text-white">David L.</h3>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 border border-green-500/30 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-green-400">Now</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Senior Barber</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barber of the Month Spotlight */}
      <section className="py-20 bg-surface-dark border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Grid */}
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2')" }}></div>
                <div className="absolute bottom-6 left-6 bg-background-dark/80 backdrop-blur px-4 py-2 rounded border border-white/10">
                  <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Experience</p>
                  <p className="text-white font-bold text-lg">10+ Years</p>
                </div>
              </div>
              {/* Decorative pattern */}
              <div className="absolute -top-10 -left-10 w-full h-full border border-white/5 rounded-2xl z-0 hidden lg:block"></div>
            </div>
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mb-6">
                <span className="material-symbols-outlined text-primary text-sm">trophy</span>
                <span className="text-xs font-bold text-primary tracking-wide uppercase">Barber of the Month</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Jason "The Fade" Miller
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Voted top stylist in the city for three consecutive years. Jason specializes in classic straight razor shaves and modern texturizing techniques. His attention to detail is unmatched, turning every haircut into a personalized masterpiece.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background-dark border border-white/5">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">content_cut</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Precision Cuts</h4>
                    <p className="text-xs text-gray-400">Tailored to head shape</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background-dark border border-white/5">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">scooter</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Hot Towel Shaves</h4>
                    <p className="text-xs text-gray-400">Old school luxury</p>
                  </div>
                </div>
              </div>
              <Link href="/checkout?barberId=4&service=classic-cut" className="flex items-center justify-center gap-2 bg-white text-background-dark hover:bg-gray-200 h-12 px-6 rounded-lg font-bold transition-colors w-fit">
                Book with Jason
                <span className="material-symbols-outlined text-lg">arrow_outward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-background-dark" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Pricing</h2>
            <p className="text-gray-400 text-lg">Simple, transparent pricing for premium services. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Quick Trim */}
            <div className="flex flex-col p-8 rounded-2xl bg-surface-dark border border-white/5 hover:border-white/10 transition-colors">
              <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl text-white">
                <span className="material-symbols-outlined">speed</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quick Trim</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">Perfect for maintenance between full cuts. Includes line-up and neck shave.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">$30</span>
                <span className="text-gray-500">/ 20 min</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Edge Line-up</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Neck Shave</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Product Styling</li>
              </ul>
              <Link href="/checkout?service=quick-trim" className="w-full py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white hover:text-background-dark transition-all flex items-center justify-center">Select</Link>
            </div>
            {/* Classic Cut */}
            <div className="flex flex-col p-8 rounded-2xl bg-surface-dark border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <div className="mb-4 p-3 bg-primary/20 w-fit rounded-xl text-primary">
                <span className="material-symbols-outlined">content_cut</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Classic Cut</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">Our signature service. Full consultation, wash, precision cut, and style.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">$50</span>
                <span className="text-gray-500">/ 45 min</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Hair Wash & Conditioning</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Scissor & Clipper Cut</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Hot Towel Finish</li>
              </ul>
              <Link href="/checkout?service=classic-cut" className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center">Select</Link>
            </div>
            {/* Premium Experience */}
            <div className="flex flex-col p-8 rounded-2xl bg-surface-dark border border-white/5 hover:border-white/10 transition-colors">
              <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl text-white">
                <span className="material-symbols-outlined">diamond</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Experience</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">The ultimate grooming package. Full haircut plus beard sculpt and mini-facial.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">$85</span>
                <span className="text-gray-500">/ 75 min</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Everything in Classic</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Beard Sculpt & Oil</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check</span> Relaxing Face Massage</li>
              </ul>
              <Link href="/checkout?service=premium" className="w-full py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white hover:text-background-dark transition-all flex items-center justify-center">Select</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-surface-dark border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Client Stories</h2>
              <p className="text-gray-400">Rated 5.0/5 based on 200+ reviews.</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-background-dark transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-background-dark hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          {/* Slider Container (Using CSS Grid for simplicity in static template) */}
          <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
            {/* Testimonial 1 */}
            <div className="min-w-[300px] md:min-w-[400px] bg-background-dark p-8 rounded-xl border border-white/5 snap-center">
              <div className="flex gap-1 text-yellow-400 mb-4">
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              </div>
              <p className="text-gray-300 italic mb-6">"Best vibe in town. Jason never misses. The attention to detail on the fade is something I haven't found anywhere else in the city."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBeqPMNYIkd9EyzBqCl90RzS5YBk-Pk62gw56wnZoyp7Xr4ISTOGXoLxJBDUntebJSWZrm2ezNC7QbEFv-9K0AUClg_Mpx3CHWyV_yN7VhMdSkB4MKtXZGNDummxkgh_t2zSYh3_LwW6vutggQep7NTrY1S7mUuLYK3gmu1_bQKMjff2ODY2jA8mQYcr44QQ2ZzLC-qTUu3ritXoBbxiwBoq3iVGHWOQ2ymtTieiwKplTs6cO2IwcEaOq_0pWQAcJnRGyH0IqWzqGZe')" }}></div>
                <div>
                  <p className="text-white font-bold text-sm">Alex Richardson</p>
                  <p className="text-gray-500 text-xs">Regular Client</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="min-w-[300px] md:min-w-[400px] bg-background-dark p-8 rounded-xl border border-white/5 snap-center">
              <div className="flex gap-1 text-yellow-400 mb-4">
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              </div>
              <p className="text-gray-300 italic mb-6">"Finally found a place that understands how to handle longer hair. The atmosphere is super chill and the service is top notch."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwUvD1KzIK14Hh553WW3ITb9B9lyr37fsqH8sdZyyGo6A9QTFBfXm3HaPCt0HTzfRP0b40SA7pEF4PZ1DOo8OQjThlD5lIBFQbb-V2GnWsvmz0HfMjmu9s8x9RKJZS8O_Q_xU5wG0PbygdH5SrOYh4vGEhRBMsIpvCw_wRNnpyrvlgRdZutclXT3eDgInHKUi7IxMaMOXoB4x9sf4orZh4bLz7bRnbYQZ7rMizxOCSBkI9Wbr7J26RcST9CjnNaREwBOuKQGw3eaSB')" }}></div>
                <div>
                  <p className="text-white font-bold text-sm">Michael Turner</p>
                  <p className="text-gray-500 text-xs">Classic Cut</p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="min-w-[300px] md:min-w-[400px] bg-background-dark p-8 rounded-xl border border-white/5 snap-center">
              <div className="flex gap-1 text-yellow-400 mb-4">
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                <span className="material-symbols-outlined text-[20px] fill-current">star</span>
              </div>
              <p className="text-gray-300 italic mb-6">"The premium experience is worth every penny. The hot towel shave is unbelievably relaxing. Highly recommend making a reservation."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAaXXcwVkTLi1yaciH_WWRFntIjqWYYfHxpQfS3J6H3lt6N8NxusKb4_R6wvUziFpoSTwOdmQTNpLcTKdj7MS8d3jcO9vw0ggu3xT2ipsTGKn5-llYQYCS8-QM2YCYmjWOd3L0IXHsFXFauKerH4Fyz0ELmwfMZKZ50TfABwbuQoKt51_iaf6nPHhcsUlg1-meCFzwD725Iv2sDwzs7fEsGvCvF7k37b7NkHk6BJdrKs0qYVmipzC0OnZ_aMMmQ2dPzvvPiZr72y-y')" }}></div>
                <div>
                  <p className="text-white font-bold text-sm">Marcus Johnson</p>
                  <p className="text-gray-500 text-xs">Premium Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-20 bg-background-dark" id="lookbook">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Follow the Fade</h2>
            <a className="text-primary hover:underline flex items-center gap-1" href="#">@FadeLab <span className="material-symbols-outlined text-sm">open_in_new</span></a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-surface-dark rounded-lg overflow-hidden group relative">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvfAtv59srVAeZIZnSrScjbRBKkEg-ZMhHO82GGsNlbDlTDS8qLcIZruhFy-TZvJopcE9idZRxwmJb2Rsepg9FQjS-oNLa2BSNjKfwenmovF4f7MwnpjNY3apvGvS6HQJyubUQ669vh24eYGidEs-lOtOShyT-3hC5vwwRH2MW4MMUxIDg5RNL3etNy3RWAijVY_zwUQ3dGAZ6TPkbcGFFvQ9hEOuUAt4yboUYHTVV8nyU8yjDlhqkE1RjdCiwcmOyWczjgPqlivVu')" }}></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">favorite</span>
              </div>
            </div>
            <div className="aspect-square bg-surface-dark rounded-lg overflow-hidden group relative">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZEZqtjG2I421S0GG2Re1oAyBuw_0v62ANUMfkEaD2IjVzAI5KadWpkEKIhYuqbCxaYoOEgOIdpBZav4RuZp76bFqA9DRinUT37vigxi5LmvJpKjTxT45oSV9JpDoadfCuIXv8jnJGbp-ClrRnPyElC4XAwOdUDd0_3AAeNpI2RZ1ri3JOQS1KNwny_TnvCSARRVlsVE3JlTglOhCTIbabv4ZYWYITM53xFBJ0KPgMqSk6Mg-LsrXCInSyjFMgU77G8GLQ5fofRgxk')" }}></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">favorite</span>
              </div>
            </div>
            <div className="aspect-square bg-surface-dark rounded-lg overflow-hidden group relative">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJg7E1MWeasGtL1ot-bTtqR7_IV3rwDLACt7pZjHWEGGcsYTCasszlnL9WT5fzU3Aqe036SpesKJ3T6CvxgJkRxt03z2I-4_ew0GKn5jrlmLyrmitzRacDoMh5YW-xcz6hWF0Xp7tP9fDBvO7B2zpgiPAJR70Cft4Cq5EaH27daJt8pXQ8mvEmg_Bnh5uZbSORekLwaP7Gzmwh6ZErHfOwD0DcepTjZ4UgDIEvIPNa39GQp617C1RAVw4b7nAqhgqwKmEp1yMgiWMF')" }}></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">favorite</span>
              </div>
            </div>
            <div className="aspect-square bg-surface-dark rounded-lg overflow-hidden group relative">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGRkihqRmGGmoZOh-YR02Ma8AxKYOAMDdwVYx2Na4zpQZquDuAJskscoqhewRhnfV97xa0SuKErtm41QB6SOV8u8E1TzpuuQsOwQ2kKSvmHQTJdAXPNq_yiFUPY3oRq1SFAJ3lpn8DzOsS3pU8Y0Br52i-JanPtVH4ivJUikK59inP1hHqVeHKKYbJNWW-9hLD7d76rZ0aG2w1y9iAMIJGcNu1sig2rR0Ki0LAzJFCCjz7-lULOZbl2ge4uPaDzdc1RM_iDTc6ggJJ')" }}></div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">favorite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-darker py-12 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 text-white">
                <div className="size-6 text-primary">
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
                  </svg>
                </div>
                <span className="font-bold text-lg">FadeLab</span>
              </div>
              <p className="text-gray-500 text-sm">Premium grooming for the modern gentleman. Est. 2018.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Location</h4>
              <p className="text-gray-400 text-sm mb-1">123 Barber St.</p>
              <p className="text-gray-400 text-sm">Downtown District</p>
              <p className="text-gray-400 text-sm">New York, NY 10001</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Hours</h4>
              <p className="text-gray-400 text-sm mb-1">Mon - Fri: 9am - 8pm</p>
              <p className="text-gray-400 text-sm mb-1">Saturday: 10am - 6pm</p>
              <p className="text-gray-400 text-sm">Sunday: Closed</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm mb-1">(555) 123-4567</p>
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

      {/* Persistent Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button className="bg-primary text-white w-14 h-14 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center animate-bounce">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
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
    </div>
  );
}
