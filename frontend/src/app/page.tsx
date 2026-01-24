"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch
  // if (!mounted) return null; // Removed to support SSR

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: 'Furnza - Modern Furniture',
        url: window.location.href
      }).catch(console.error);
    } else {
      handleCopy();
    }
  };

  const handleProfileClick = () => {
    setIsAuthModalOpen(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-slate-950 transition-colors duration-300 pb-[90px] md:pb-0">
      {/* Floating Dock */}
      <motion.div
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2 px-3 py-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/60 dark:shadow-black/50 transition-colors duration-300"
      >
        {/* Profile / Brand Icon */}
        <motion.button
          onClick={handleProfileClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative size-12 mr-2 group cursor-pointer"
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="Profile"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm border border-slate-100 dark:border-slate-700 whitespace-nowrap pointer-events-none">
            Profile
          </span>
        </motion.button>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1"></div>

        {/* Dock Items */}
        {[
          { icon: 'home', label: 'Home', active: true },
          { icon: 'grid_view', label: 'Catalog' },
          { icon: 'search', label: 'Search' },
          { icon: 'shopping_bag', label: 'Cart', badge: 2 },
          { icon: 'favorite', label: 'Saved' },
          { icon: 'auto_awesome', label: 'Design AI' },
          { icon: 'translate', label: 'Translate' },
          { icon: copied ? 'check_circle' : 'content_copy', label: copied ? 'Copied' : 'Copy Link', action: handleCopy },
          { icon: 'share', label: 'Share', action: handleShare },
          { icon: mounted && theme === 'dark' ? 'light_mode' : 'dark_mode', label: 'Theme', action: toggleTheme },
          { icon: 'settings', label: 'Settings' },
        ].map((item, idx) => (
          <motion.button
            key={idx}
            onClick={item.action}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`relative size-10 flex items-center justify-center rounded-full transition-all group ${item.active ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <span className={`material-symbols-outlined text-[26px] font-bold ${item.active ? 'bg-gradient-to-tr from-primary to-secondary bg-clip-text text-transparent' : 'text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors'}`}>
              {item.icon}
            </span>
            {item.badge && (
              <span className="absolute top-0 right-0 size-2.5 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
            )}
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm border border-slate-100 dark:border-slate-700">{item.label}</span>
          </motion.button>
        ))}
      </motion.div>

      <main className="w-full pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full aspect-[4/5] md:aspect-[21/9] overflow-hidden shadow-soft group mb-10"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80")' }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/10 md:to-transparent"></div>
          <div className="absolute bottom-0 left-0 md:top-0 md:h-full p-8 md:p-16 w-full md:w-1/2 flex flex-col justify-end md:justify-center text-white">
            <div className="transform transition-all duration-700 translate-y-0 opacity-100">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold tracking-wide uppercase mb-4"
              >
                New Collection
              </motion.span>
              <div className="h-[100px] md:h-[140px] mb-4 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={heroTextIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 ${heroTextIndex === 0
                      ? 'text-5xl md:text-7xl font-black uppercase tracking-tighter'
                      : 'text-3xl md:text-5xl font-bold tracking-tight'
                      }`}
                  >
                    {['FURNZA.', 'Minimalist Living.'][heroTextIndex]}
                  </motion.h1>
                </AnimatePresence>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-200 mb-8 text-sm md:text-lg font-medium opacity-90 max-w-md"
              >
                Experience comfort with our new 2024 series. Designed for modern living spaces.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3.5 px-8 rounded-xl shadow-glow transition-all w-full md:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/20"
              >
                Shop Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Categories */}
          <div className="mb-12">
            <div className="flex items-center justify-between px-1 mb-6">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold">Categories</h3>
              <button className="text-primary text-sm font-semibold hover:underline">See All</button>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex overflow-x-auto hide-scrollbar gap-6 md:gap-12 pb-4 md:justify-start"
            >
              {[
                { icon: 'apps', label: 'All' },
                { icon: 'weekend', label: 'Sofa' },
                { icon: 'chair_alt', label: 'Chairs' },
                { icon: 'table_bar', label: 'Tables' },
                { icon: 'light', label: 'Lighting' },
                { icon: 'bed', label: 'Bedroom' },
                { icon: 'kitchen', label: 'Kitchen' },
              ].map((cat, idx) => (
                <motion.div variants={item} key={idx} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
                  <div className={`size-[72px] md:size-[100px] rounded-full flex items-center justify-center shadow-sm border-2 transition-all duration-300 ${cat.label === 'All' ? 'bg-gradient-to-tr from-primary to-secondary border-white/30 shadow-glow' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 group-hover:border-primary/30 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20'}`}>
                    <span className={`material-symbols-outlined text-3xl md:text-4xl transition-colors ${cat.label === 'All' ? 'text-white' : 'text-slate-700 dark:text-slate-300 group-hover:text-primary'}`}>{cat.icon}</span>
                  </div>
                  <span className={`text-xs md:text-sm font-semibold transition-colors ${cat.label === 'All' ? 'text-primary font-bold' : 'text-slate-700 dark:text-slate-400 group-hover:text-primary'}`}>{cat.label}</span>
                </motion.div>
              ))}
              <motion.div variants={item} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
                <div className="size-[72px] md:size-[100px] rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 group-active:scale-95 group-hover:border-primary/30 transition-all duration-200">
                  <span className="material-symbols-outlined text-3xl md:text-4xl text-slate-400">arrow_forward</span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-400">More</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Featured Products */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold">Featured Products</h3>
              <div className="flex gap-2">
                <span className="text-xs text-slate-400 font-medium bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">Sort by: Newest</span>
              </div>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
            >
              {[
                { name: 'Velvet Lounge Chair', price: '120', category: 'Living Room', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuVDrSubKte5588gemwXr5aZI0uxNVE0TurSQghRLtdd5N5sdD-wSfuTnTs2TmgW2srpcWHyRCgVju-NrJ_IG6X8eDOtVEh-rx9x17XdZMCQs2wwa1qynSzs2jJllW0cQbf37L4a-tc_wa0gmQKxUUuZB7904bI05PjWKhu94qBIIAu7-yPi4fmig3Ze4PYPH3BsEb9tJXfnK7sxopeLVG92IxkoXcgel5U5HYDj1bW5dWQBEBuZPqb3GGnm5j-_rflwdlm1y28gM' },
                { name: 'Nordic Dining Chair', price: '85', category: 'Kitchen', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZiUF46DFLrvWmZdx99oU5qnXMX4UopZS8-diEUvqJuzUfcoBzTFKwGZbGdVjEPxhw01OLIkQ-IJ5ZKyjsX9thFLKBmqWIWZN5laSlePJQL-vca07wYzUPfvRzJK2h1AlPRcuyPJ47ZQZd_nqY64nSpxNdaZA7tzUmtmSvvzgZK922oPPhgBze9PJZG7VMYnvP2uxR0hI9fZd-farWcN1tzCweclVwCJXPRksAVyskaHzxnlCttQJkO32C4Ez2g9kBhoOvXGxDAC4' },
                { name: 'Arc Floor Lamp', price: '160', category: 'Lighting', oldPrice: '200', discount: '-20%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ0OKIkIYsdLF7fbcCBbmdnTdpGlbuyR0F0CNic1k-S4C0FkN5fQ0ukU0Zm11Zs4y2rJwby0SYDN6YuNrcSmH8jgLuUTyNCoeyYjX_-qJVtPk6KYVyNsylbK0PXblnUKFfzutRzI6AuHDXeeWtwVfYrM3B-UyO-yObrtFrganzUjZRepfEw-5yH0HxpqseRvDgvdusyEmUVRY9Y4YvE9mL6VaooV75brLoJVcBdJ731hsSLWup6bq98zN3ON_S4euSlUb86hrsEKI' },
                { name: 'Oak Side Table', price: '95', category: 'Bedroom', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYNtGl0I4Db-MZ8w98XyKbbN5oPi_yvtZtrjRTYIbqTCn7nux8Njl02HrWUfdHo-gIgU7YA_a3K8b-tfuoqyfu8m6CDxqKqtsAFGiXGri588PYwF55pRJUERjYqnUqqF7-JP5tyvlSim4N0ekExRRUn3U64bgPkvRmDnxn1LU7Ya-ePykYAXxHzn_uQNKyi5PkJXq6SGNJpb5aiDJLaPfE4fwflsDxa5xRG0izCqrqDjH2pGM1ZUXv4aJS_X_I0sUdRWmlpDTtGkQ' },
                { name: 'Modern Sofa', price: '890', category: 'Living Room', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80' },
                { name: 'Wooden Shelf', price: '210', category: 'Storage', img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=1139&q=80' },
                { name: 'Ceramic Vase', price: '45', category: 'Decoration', img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80' },
                { name: 'Abstract Art', price: '120', category: 'Art', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80' },
                { name: 'Geometric Wool Rug', price: '240', category: 'Rug', img: 'https://images.unsplash.com/photo-1575414003591-ece8d14161bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80' },
              ].map((product, idx) => (
                <motion.div variants={item} key={idx} className="group flex flex-col gap-3 cursor-pointer">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 shadow-sm">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${product.img}")` }}></div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 right-3 size-9 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="material-symbols-outlined text-[20px]">favorite</span>
                    </motion.button>
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 px-2.5 py-1 rounded-lg text-white shadow-sm z-10">
                        <span className="text-[10px] font-bold uppercase tracking-wide">{product.discount}</span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">${product.price}</span>
                        {product.oldPrice && <span className="text-[10px] text-slate-400 line-through decoration-slate-400">${product.oldPrice}</span>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-base leading-snug group-hover:text-primary transition-colors">{product.name}</h4>
                    <p className="text-slate-500 text-xs mt-1">{product.category}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Promo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="relative overflow-hidden rounded-3xl bg-blue-50/50 dark:bg-slate-900/50 p-8 flex flex-col items-start gap-4 shadow-sm border border-slate-100 dark:border-slate-800 group">
              <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.05] dark:opacity-[0.1] rotate-12 transition-transform duration-500 group-hover:rotate-0">
                <span className="material-symbols-outlined text-[250px] text-primary">chair</span>
              </div>
              <div className="z-10 relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-3">
                  <span className="material-symbols-outlined text-xs">local_fire_department</span>
                  Summer Sale
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-3">Up to 50% Off<br />Select Items</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-[240px] mb-4">Refresh your space with our curated summer collection. Limited time only.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="z-10 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm py-3.5 px-8 rounded-xl shadow-glow transition-all"
                >
                  Shop Deals
                </motion.button>
              </div>
            </div>
            <div className="hidden md:block relative overflow-hidden rounded-3xl bg-slate-900 p-8 flex-col items-start gap-4 shadow-sm border border-slate-800 group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="z-10 relative h-full flex flex-col justify-center items-start">
                <h3 className="text-3xl font-bold text-white leading-tight mb-3">New Arrivals</h3>
                <p className="text-slate-300 text-sm max-w-[240px] mb-6">Explore the latest trends in interior design.</p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                  whileTap={{ scale: 0.95 }}
                  className="z-10 bg-white text-slate-900 font-bold text-sm py-3.5 px-8 rounded-xl shadow-sm hover:bg-slate-50 transition-all"
                >
                  View Collection
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[420px] md:max-w-xl max-h-[85vh] bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header Image */}
              <div className="relative h-[180px] md:h-[200px] w-full shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Login Header"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-8 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1">{authMode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
                  <p className="text-white/80 text-xs md:text-sm font-medium">
                    {authMode === 'signin' ? 'Log in to access your premium comfort.' : 'Join Furnza today for exclusive access.'}
                  </p>
                </div>
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="absolute top-4 right-4 size-8 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {/* Modal Content */}
                <div className="p-6 md:p-8 pb-10">
                  {/* Auth Mode Toggle */}
                  <div className="mb-8 p-1 bg-slate-50 border-2 border-black rounded-2xl flex relative overflow-hidden w-full md:max-w-sm mx-auto shadow-sm">
                    <motion.div
                      animate={{ x: authMode === 'signin' ? 0 : '100%' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] bg-black rounded-xl z-0"
                    />
                    <button
                      onClick={() => setAuthMode('signin')}
                      className={`relative z-10 flex-1 py-2 text-xs font-black transition-colors ${authMode === 'signin' ? 'text-white' : 'text-slate-500'}`}
                    >
                      SIGN IN
                    </button>
                    <button
                      onClick={() => setAuthMode('signup')}
                      className={`relative z-10 flex-1 py-2 text-xs font-black transition-colors ${authMode === 'signup' ? 'text-white' : 'text-slate-500'}`}
                    >
                      SIGN UP
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                      {/* Name (Signup only) */}
                      <AnimatePresence mode="popLayout">
                        {authMode === 'signup' && (
                          <motion.div
                            key="name"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                          >
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                            <input
                              type="text"
                              placeholder="Enter your name"
                              className="w-full px-5 py-3.5 rounded-2xl border-2 border-black/10 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-black transition-all text-sm font-medium"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Email (Always visible) */}
                      <div className={authMode === 'signup' ? '' : 'md:col-span-2'}>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email</label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          className="w-full px-5 py-3.5 rounded-2xl border-2 border-black/10 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-black transition-all text-sm font-medium"
                        />
                      </div>

                      {/* Phone & Gender (Signup only) */}
                      <AnimatePresence mode="popLayout">
                        {authMode === 'signup' && (
                          <>
                            <motion.div key="phone" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Phone</label>
                              <input
                                type="tel"
                                placeholder="012-345-678"
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-black/10 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-black transition-all text-sm font-medium"
                              />
                            </motion.div>
                            <motion.div key="gender" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Gender</label>
                              <select className="w-full px-5 py-3.5 rounded-2xl border-2 border-black/10 bg-slate-50/30 text-slate-900 focus:outline-none focus:border-black transition-all text-sm font-medium appearance-none cursor-pointer">
                                <option value="" disabled selected>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>

                      {/* Password (Always visible) */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full px-5 py-3.5 rounded-2xl border-2 border-black/10 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-black transition-all text-sm font-medium"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-xl">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password (Signup only) */}
                      <AnimatePresence mode="popLayout">
                        {authMode === 'signup' && (
                          <motion.div
                            key="confirm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="md:col-span-2"
                          >
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-black/10 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-black transition-all text-sm font-medium"
                              />
                              <button
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                <span className="material-symbols-outlined text-xl">
                                  {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                </span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {authMode === 'signin' && (
                    <div className="flex justify-end mt-4">
                      <button className="text-primary text-xs font-bold hover:underline tracking-tight">Forgot Password?</button>
                    </div>
                  )}

                  <div className="mt-8 space-y-6">
                    {authMode === 'signup' && (
                      <div className="flex items-start gap-3 px-1">
                        <input
                          type="checkbox"
                          className="mt-0.5 size-4 rounded border-slate-200 text-primary focus:ring-primary transition-all cursor-pointer"
                          id="tos"
                        />
                        <label htmlFor="tos" className="text-[11px] font-semibold text-slate-500 leading-tight cursor-pointer">
                          I agree to the <button className="text-primary hover:underline">Terms of Service</button> and <button className="text-primary hover:underline">Privacy Policy</button>
                        </label>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-black text-white font-bold py-4 rounded-2xl shadow-xl shadow-black/10 transition-all text-sm tracking-wide uppercase border-2 border-black"
                    >
                      {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </motion.button>
                  </div>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold bg-white px-4 text-slate-400">
                      Or Continue With
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-3 py-4 border-2 border-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm hover:shadow-md">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
                    <span className="text-sm font-bold text-slate-900">Continue with Google</span>
                  </button>

                  <p className="mt-8 text-center text-xs font-semibold text-slate-400">
                    {authMode === 'signin' ? "New to Furnza?" : "Already have an account?"}
                    <button
                      onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                      className="text-primary hover:underline ml-1"
                    >
                      {authMode === 'signin' ? "Create an Account" : "Sign In"}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
