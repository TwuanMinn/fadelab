"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Toolbar } from "./components/Toolbar";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["GROOMING", "STYLING", "CRAFT", "PRECISION"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // scroll-fast
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-gradient-to-br from-black via-[#0B1121] to-black text-white font-display overflow-x-hidden antialiased selection:bg-blue-600 selection:text-white pb-24 relative">
      <Toolbar />

      {/* Background Decorators */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] size-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[600px] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[1000px] bg-blue-900/5 rounded-full blur-[150px]" />
      </div>

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
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/30 z-10"></div>
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKoDlxMKWryCxgM_scsDXmtoXjBJ3UoVcLJuglZPhO2LoVDXnd5fEf40MgjcrgCY_dg9SsSHO_YcSg-YKxddI9h2F5Lqud7jZj94QgSE8kVurMk4OekSYGpDRD_OqdLU-IOS2Q68Y_Mu37EO5mVtJxFnOVuDB1RifgRP4gmQPxq0i6qG7SeUlj1M_eB3Eo1okb_ZudgKhTRI5qcOuTETEg_NWsVFHy-bx30LDf8qTcufeLtVpH9MZJXhoerN19ebXfBHbn4m2kKhzq')" }}>
          </div>
        </div>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 w-fit backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-white tracking-wide uppercase">Open for Walk-ins</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tighter">
              PREMIUM <br />
              <div className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[wordIndex]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-normal max-w-lg leading-relaxed opacity-80">
              Experience the art of grooming at FadeLab. We specialize in precision fades, hot towel shaves, and modern texturizing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/barbers" className="bg-blue-600 hover:bg-blue-500 text-white h-14 px-10 rounded-2xl font-bold text-base transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">calendar_month</span>
                <span>Book Your Chair</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Live Availability Section */}
      <section className="py-24 relative z-10" id="barbers">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight uppercase">The Lab Squad</h2>
              <p className="text-gray-500 mt-2 font-medium">Real-time status of our master barbers.</p>
            </div>
          </div>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing"
          >
            {[
              { name: "Mark D.", role: "Master Stylist", status: "Now", color: "emerald", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0qHa9GG916Tc_uBvB2_hjkpFEhLzoDqkqKuGpYklGdSO2P1mt5UWZTcEqzHrLnFgalJ08ZSDX-ZMMnW6DYCUcadwjk2t_IqzbDPHCSLHEJoqMCqW0uS-99QwT0Kjo4HLo1j23Lz1alIyue4TQOJyIj6w8n5_MxUmL5w3JhLHMFipgdUP2s44ZSX4snDxSmdl1Yr-zAetCbZAvZacCspOplBiaQRJXOmKwasPxHlOQyhl3sSbJlWm9vTfTT-O26ZwwXIrTDe6w3oSd" },
              { name: "James K.", role: "Fade Specialist", status: "2:00 PM", color: "yellow", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWBOlqQi020RlUJunvPdoD2RV26Rade-KRK8ir5mG0DN-bAEi723sSrGDYbc2d9IRJvCiDKE3lBzLDvAWRmhh8xMGl6Iy_vypBaPu5_7A3TH9z0jjuF5mVIdMzIY-7XOnultOErYc59X7bGIMRpOk9xTQeEOvPj7NVO8Fz66EhelEqsxp4nNCvNgN68VlTcirUBzOT8aR92Nb8VoMzRcGj6ouHMeoOWxpZcbxn4ELpM_uX3AxXa7U-AybkhLLXQaLF1Wb5moNL3Hkd" },
              { name: "Sarah M.", role: "Beard Expert", status: "Booked", color: "red", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaqYTQ5iC-pnGpVWKxQpRXxr_AZWQhYEuNUwSUm6ikdl8MzxV2SJmWwg5dw8aWba3tE6DGHvEVgmRKwdDIEcUAauYz1OyutyGvfV8bixJY1zdwdgoyI1UrRBCczmEBAtaTDuBKp3gvot_bOjRyDPheTQc-yjy4r1KEx6tizTS4u2Ksn91p7KXL8dfY03pt8bn7OFFMOTGTe0VzPpRqE4aMqB-8VJmJFC8UsOktum2kJYRApkmcCxjBzcs5NYavw5s2gUz4tLyvYAE0" },
              { name: "David L.", role: "Senior Barber", status: "Now", color: "emerald", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1AofsJTDOCwx04Qy58ckD5-660yfEzK17mAw89h25AtC0JiYDAITpgSdRQ_nG9y_nlvvE3MRQopm0t_iWJ0se42u5xWnrSfgz-ouO4RfdSWJM-VFZe3sAR7sv6OwCUvAmC1Gsn-TciFvhDt8rxzz4rYfdxraWJM9YoAcfTjlAaekvGBlQYmFadeLuG1gf5dJ16ngX5UKfPX3iSgbonEqARAJqwzE3-3BZ3YKSbynFVWHOxCM5IB9OOTbNoD0xsZYDfP8A3m" },
              { name: "Alex R.", role: "Precision Cut", status: "3:15 PM", color: "yellow", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeqPMNYIkd9EyzBqCl90RzS5YBk-Pk62gw56wnZoyp7Xr4ISTOGXoLxJBDUntebJSWZrm2ezNC7QbEFv-9K0AUClg_Mpx3CHWyV_yN7VhMdSkB4MKtXZGNDummxkgh_t2zSYh3_LwW6vutggQep7NTrY1S7mUuLYK3gmu1_bQKMjff2ODY2jA8mQYcr44QQ2ZzLC-qTUu3ritXoBbxiwBoq3iVGHWOQ2ymtTieiwKplTs6cO2IwcEaOq_0pWQAcJnRGyH0IqWzqGZe" },
              { name: "Michael T.", role: "Color Specialist", status: "Now", color: "emerald", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1OrKvMzwM9fdJ5lq_44XBQH6cqKNckEfsaRzgzffF4Xd-uSWIPuJ-gz0hoP29aDbHzlKbOT7_2Bm9AygABvEAK104QyiGCDcwCVGNSlpU3IHuLJ78PWI0tkrviHAWF2s-PDhSF9mYPVO3IfBEFTprdk-kb1qF38Prid5zFCEQP7BcrYzLYzE7pfpAP8niX8RDIlUIw6UqgriW3GTbQ-k8qetM45qKVb9XO9-65qNBw1uT_ZpFi5jladUEPZuntgDNETfH8AmNthm4" },
              { name: "Jessica W.", role: "Texture Artist", status: "Booked", color: "red", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0V4U6h5fQoCXlGk1Jp2yS9X0V8L7Z5M4N2b3F6v1H8J9KlqW5R3T7Y0U4X6Z9I2O8P5V1H3N7J4L9M6K2Q8Y5T1R0W3V5X8Z9I2O8P5V1H3N7J4L9M6K2Q8Y5T1R0W3V5X8Z9I2O8P5V1H3N7J4L9M6K2Q8Y5T1R0W3V5X8Z9I2O8P5V1H3N7J4L9M6K2Q8Y5T1R0W3V5X8Z9I2O8P5V1H3N7J4L9M6K2Q8Y5T1R0W3V5X8Z9I2O8P5V1H3N7J4L9M6K2Q8Y5" },
              { name: "Ryan B.", role: "Classic Cuts", status: "4:30 PM", color: "yellow", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClTyBxLeqObwqhijPVy04XdKzNs075BfIvWKH7sRnSkdXYNw3zTqa7GkvrGvwAAogEdDxFT1YG5zFY6oJCN8YziVE3FGy3foRepU6Hmg7o-qe3kk4pGK-J92ShTn_v2wwZ_HMwyRlc9BNdTdjs_g4-CDH13tjPwTv5dXAbZudjuwawPZycQZmUbLFM8eBCMDae1-YPXucvP6NWH8Q4Eupo5a7tVxcOc-8JlDmi4MSKQUQTs-vF77jAvxCPLIV3n4sD6VjwThbMkm0" },
              { name: "Chris P.", role: "Shave Master", status: "Now", color: "emerald", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACp8ZMeLexblgVCUbVcTC3gXaXFYAQQNwWv-TyA3ah9WTD_IVOMm97NfJApokPVuGxOJQTeyhgZM-zWJcoRj_PMnqFe8sEjnCEau7TqXhfdXTiNj8Hrf2JOgzkG96GX6e0Xzs37luTUFJzgDfXuEdJp7SfcErimEPpTazUecBC0taQAPDjUtrbVRpZ67rKQpJsSI05wm8pzsEvv_XgEd_RPy643kj6BcMh8Qk0qPmxFyJoTV0NbXO2OEfmdzzwmC8VpeUHe1kP6uRW" },
              { name: "Kevin L.", role: "Fades & Tapers", status: "1:00 PM", color: "emerald", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKoDlxMKWryCxgM_scsDXmtoXjBJ3UoVcLJuglZPhO2LoVDXnd5fEf40MgjcrgCY_dg9SsSHO_YcSg-YKxddI9h2F5Lqud7jZj94QgSE8kVurMk4OekSYGpDRD_OqdLU-IOS2Q68Y_Mu37EO5mVtJxFnOVuDB1RifgRP4gmQPxq0i6qG7SeUlj1M_eB3Eo1okb_ZudgKhTRI5qcOuTETEg_NWsVFHy-bx30LDf8qTcufeLtVpH9MZJXhoerN19ebXfBHbn4m2kKhzq" },
              { name: "Sam K.", role: "Hair Tattoo", status: "Booked", color: "red", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbqkPfu2X1j4on1uwGbYHkERZnUKAuJXPnXXs5eoajsRmyompEDAaC5_4m2hy-dy95gmv7Nysi8eE4mhlEGKoc-FZVxWg5r94xO2E8QFVRqcbnnkkG73K1YkdbSR3aUqUKscF1zIKn_xolhnXVgz5s_RtsRA31iZaQW6nkwZJGqTK1VqmCL7qYwgB1pwk9MkecSauXgRo_wYIXcEGp1G99n-A910nP5cOgogXSpZrBe4VBGZHN6p7nV2Hq2zJ9CuRKkMZkd8JIPUjv" },
              { name: "Jordan M.", role: "Style Consultant", status: "5:00 PM", color: "yellow", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp_slhJYSw_7O-kLe-zk34Ktuh1VmQ3ZYCNG8uF0TznS1jtvbTJxLyWSYec-SS3DpKi5KbddypSSllsQADB4tPajg7ICQsnH6Rhan9KQyQria3XnvrNxSQXGQgDpsyEcBz2U1q7keiopdSNNmnbAfh0uW5VOLR3PaVfRuSY6fDFcXTLrXM_GQ8jP_gZsy6b9U4z6RRXMfOUkyh1-JlbDmnECWTJWrsahjsdOaAOfXHebe62ZJ4Z0tLLVWsyCAfhjGK23nxiFDtVKQ" }
            ].map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative flex-shrink-0 min-w-[280px] snap-center overflow-hidden rounded-3xl bg-surface-dark border border-white/5 transition-all hover:border-primary/50"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${b.img}')` }}></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{b.name}</h3>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-${b.color}-500/20 border border-${b.color}-500/30 backdrop-blur-md`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-${b.color}-500 ${b.color === 'emerald' ? 'animate-pulse' : ''}`}></div>
                      <span className={`text-[10px] font-black uppercase text-${b.color}-400`}>{b.status}</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{b.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Transparent Pricing */}
      <section className="py-24 relative z-10" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Transparent Pricing</h2>
            <p className="text-gray-400 text-lg font-medium">Simple, transparent pricing for premium services. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Quick Trim */}
            <motion.div
              whileHover={{ y: -10 }}
              className="flex flex-col p-10 rounded-[2.5rem] bg-surface-dark border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="mb-6 size-14 rounded-2xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">speed</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Quick Trim</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed flex-grow">Perfect for maintenance between full cuts. Includes line-up and neck shave.</p>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black text-white tracking-tighter">$30</span>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">/ 20 min</span>
              </div>
              <ul className="flex flex-col gap-4 mb-10 text-sm text-gray-300 font-bold">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Edge Line-up</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Neck Shave</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Product Styling</li>
              </ul>
              <Link href="/checkout?service=quick-trim" className="w-full py-4 rounded-xl border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-background-dark transition-all flex items-center justify-center">Select</Link>
            </motion.div>

            {/* Classic Cut (Highlight) */}
            <motion.div
              whileHover={{ y: -10 }}
              className="flex flex-col p-10 rounded-[2.5rem] bg-surface-dark border-2 border-primary/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <div className="mb-6 size-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">content_cut</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Classic Cut</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed flex-grow">Our signature service. Full consultation, wash, precision cut, and style.</p>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black text-white tracking-tighter">$50</span>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">/ 45 min</span>
              </div>
              <ul className="flex flex-col gap-4 mb-10 text-sm text-gray-300 font-bold">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Hair Wash & Condition</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Scissor & Clipper Cut</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Hot Towel Finish</li>
              </ul>
              <Link href="/checkout?service=classic-cut" className="w-full py-4 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center">Most Popular</Link>
            </motion.div>

            {/* Premium Experience */}
            <motion.div
              whileHover={{ y: -10 }}
              className="flex flex-col p-10 rounded-[2.5rem] bg-surface-dark border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="mb-6 size-14 rounded-2xl bg-white/5 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">diamond</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Premium</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed flex-grow">The ultimate grooming package. Full haircut plus beard sculpt and mini-facial.</p>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black text-white tracking-tighter">$85</span>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">/ 75 min</span>
              </div>
              <ul className="flex flex-col gap-4 mb-10 text-sm text-gray-300 font-bold">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Everything in Classic</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Beard Sculpt & Oil</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Face Massage</li>
              </ul>
              <Link href="/checkout?service=premium" className="w-full py-4 rounded-xl border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-background-dark transition-all flex items-center justify-center">Select</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Barber Spotlight - UI UX PRO MAX REDESIGN */}
      <section className="py-32 relative overflow-hidden z-10">
        {/* Anti-Gravity Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.02] uppercase tracking-[0.2em] select-none italic">ELITE</div>
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.02] uppercase tracking-[0.2em] select-none italic">CRAFT</div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-12 backdrop-blur-md"
            >
              <div className="size-2 rounded-full bg-primary animate-ping"></div>
              <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Specialist Spotlight</span>
            </motion.div>

            {/* Kinetic Name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                JASON <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary drop-shadow-glow">MILLER</span>
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-xl font-medium leading-relaxed mb-16 max-w-2xl"
            >
              With over a decade of precision craft, Jason combines old-school barbering with modern aesthetic science. Elite clearance in anatomical fades.
            </motion.p>

            {/* Feature Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-16">
              {[
                { title: "Precision", sub: "Anatomical Fades", icon: "content_cut", gradient: "from-primary to-blue-600" },
                { title: "Luxury", sub: "Steam & Sharp", icon: "spa", gradient: "from-blue-600 to-cyan-500" }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-surface-dark/50 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-6 text-left group hover:border-primary/30 transition-all duration-500"
                >
                  <div className={`size-16 rounded-2xl bg-gradient-to-br ${f.gradient} p-[1px]`}>
                    <div className="w-full h-full bg-background-dark rounded-[1.2rem] flex items-center justify-center">
                      <span className={`material-symbols-outlined text-transparent bg-clip-text bg-gradient-to-br ${f.gradient} text-3xl font-black`}>{f.icon}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg uppercase tracking-tight">{f.title}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{f.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Primary Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-2xl"
            >
              <Link href="/checkout?barberId=4" className="group relative w-full h-20 bg-white hover:bg-primary rounded-3xl overflow-hidden transition-all duration-500 flex items-center justify-center gap-4 active:scale-95 shadow-2xl">
                <span className="text-background-dark group-hover:text-white font-black text-base uppercase tracking-[0.3em] transition-colors relative z-10">Initiate Session With Jason</span>
                <span className="material-symbols-outlined text-background-dark group-hover:text-white transition-colors relative z-10 font-black">bolt</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </motion.div>

            {/* Hero Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative w-full max-w-3xl aspect-[4/5] rounded-[4rem] overflow-hidden mt-24 shadow-2xl group border border-white/5"
            >
              <div className="w-full h-full bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK2yCOLz9X5syA1VWcvnqx5qKLgny1cR_8mlJcwm4jQGfEXCtuCIAoouD_3_m0yKyZa7Zd1HtVv7eCTfoEOQEYHauG_DGbvFDv8A4zoqCd_7_19fNJwWctUgKbOvIBEDRD8BCQE4TXmImjOiIubeOPid_RLMl9ZW9mZH83sRNAB8o9eTSeIDOJd2lDeNLFan--XkKmzXgdF8KFb-254Xa8krbu4GFpoBCHtGoPikR86-Mu53u6e4mHo8W7jD_8q6EVHxxEco70T1_2')" }}></div>
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>

              {/* Ranking Badge Overlay */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xs px-6">
                <div className="bg-surface-dark/60 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] text-center shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <p className="text-[10px] font-black text-primary tracking-[0.4em] uppercase mb-2">Protocol Status</p>
                  <p className="text-white font-black text-3xl uppercase tracking-tighter italic">Top Rated 2024</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery - UI UX PRO MAX */}
      <section className="py-24 bg-surface-darker" id="lookbook">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Visual Archive</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none italic">
                THE LOOK <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">BOOK</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm font-medium mb-2">
              A curated collection of our finest transformations. Precision in every pixel.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[800px]">
            {[
              { img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800", span: "row-span-2 col-span-2" },
              { img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400", span: "row-span-1 col-span-1" },
              { img: "https://images.unsplash.com/photo-1503951914875-befea74701c5?auto=format&fit=crop&q=80&w=400", span: "row-span-1 col-span-1" },
              { img: "https://images.unsplash.com/photo-1599351431202-6e0000a4dbe1?auto=format&fit=crop&q=80&w=800", span: "row-span-2 col-span-2" },
              { img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=400", span: "row-span-1 col-span-1" },
              { img: "https://images.unsplash.com/photo-1635273051937-93c4d7e63471?auto=format&fit=crop&q=80&w=400", span: "row-span-1 col-span-1" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl ${item.span}`}
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[10px] font-black text-primary tracking-widest uppercase mb-1">Master Craft</p>
                    <p className="text-white font-black text-sm uppercase italic">Clearance Level: Elite</p>
                  </div>
                </div>
                <div className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
                  <span className="material-symbols-outlined text-white text-xl">zoom_in</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-surface-darker py-20 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-6 text-white">
                <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white">
                  <span className="material-symbols-outlined text-xl">content_cut</span>
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase">FadeLab</span>
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">Defining modern grooming standards through precision, atmosphere, and elite care.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6">Contact</h4>
                <p className="text-gray-500 text-sm font-bold mb-2">123 Groom St.</p>
                <p className="text-gray-500 text-sm font-bold">New York, NY</p>
              </div>
              <div>
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6">Social</h4>
                <div className="flex flex-col gap-2">
                  <Link className="text-gray-500 text-sm font-bold hover:text-primary transition-colors" href="#">Instagram</Link>
                  <Link className="text-gray-500 text-sm font-bold hover:text-primary transition-colors" href="#">Twitter</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">© 2024 FadeLab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
