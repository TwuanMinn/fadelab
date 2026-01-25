"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SettingsModal from "./components/SettingsModal";
import QRCodeModal from "./components/QRCodeModal";
import PriceDropModal from "./components/PriceDropModal";
import ProductCard from "./components/ProductCard";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("https://furnza.vercel.app");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPriceDropOpen, setIsPriceDropOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showToolbar, setShowToolbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, sortBy]);

  const products = useMemo(() => [
    // Chairs (5 items)
    { id: 1, name: 'Velvet Lounge Chair', price: 120, category: 'Chairs', rating: 4.8, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Nordic Dining Chair', price: 85, category: 'Chairs', rating: 4.5, img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 101, name: 'Ergo Office Chair', price: 250, category: 'Chairs', rating: 4.7, img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 102, name: 'Rattan Accent Chair', price: 180, category: 'Chairs', rating: 4.6, img: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 103, name: 'Modern Armchair', price: 320, category: 'Chairs', rating: 4.9, img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Lighting (5 items)
    { id: 3, name: 'Arc Floor Lamp', price: 160, category: 'Lighting', rating: 4.9, oldPrice: 200, discount: '-20%', img: 'https://images.unsplash.com/photo-1507473888900-52e1ad142756?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 201, name: 'Industrial Pendant', price: 89, category: 'Lighting', rating: 4.4, img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 202, name: 'Minimalist Desk Lamp', price: 45, category: 'Lighting', rating: 4.6, img: 'https://images.unsplash.com/photo-1534349762913-96c22b678f20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 203, name: 'Glass Chandelier', price: 450, category: 'Lighting', rating: 4.8, img: 'https://images.unsplash.com/photo-1543198615-8d5f921b6392?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 204, name: 'Wall Sconce Pair', price: 120, category: 'Lighting', rating: 4.5, img: 'https://images.unsplash.com/photo-1533132649069-42b4d9622d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Tables (5 items)
    { id: 4, name: 'Oak Side Table', price: 95, category: 'Tables', rating: 4.6, img: 'https://images.unsplash.com/photo-1532323544230-7191fd515c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 301, name: 'Marble Coffee Table', price: 350, category: 'Tables', rating: 4.8, img: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 302, name: 'Glass Dining Table', price: 550, category: 'Tables', rating: 4.5, img: 'https://images.unsplash.com/photo-1577140917170-285929ea5518?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 303, name: 'Rustic Console', price: 280, category: 'Tables', rating: 4.4, img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 304, name: 'Bedside Nightstand', price: 85, category: 'Tables', rating: 4.3, img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Sofa (5 items)
    { id: 5, name: 'Modern Sofa', price: 890, category: 'Sofa', rating: 4.7, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80' },
    { id: 9, name: 'Geometric Wool Rug', price: 240, category: 'Sofa', rating: 4.3, img: 'https://images.unsplash.com/photo-1575414003591-ece8d14161bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 401, name: 'Cloud Modular Sofa', price: 1450, category: 'Sofa', rating: 4.9, img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 402, name: 'Leather Chesterfield', price: 2100, category: 'Sofa', rating: 4.8, img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 403, name: 'Minimalist Loveseat', price: 650, category: 'Sofa', rating: 4.5, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Bedroom (5 items)
    { id: 6, name: 'Wooden Shelf', price: 210, category: 'Bedroom', rating: 4.4, img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=1139&q=80' },
    { id: 7, name: 'Ceramic Vase', price: 45, category: 'Bedroom', rating: 4.8, img: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 501, name: 'Queen Platform Bed', price: 850, category: 'Bedroom', rating: 4.7, img: 'https://images.unsplash.com/photo-1505693416388-b0346efee958?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 502, name: 'Cozy Knit Throw', price: 85, category: 'Bedroom', rating: 4.6, img: 'https://images.unsplash.com/photo-1522771753062-82bc2379b451?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 503, name: 'Oak Wardrobe', price: 1200, category: 'Bedroom', rating: 4.8, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

    // Kitchen (5 items)
    { id: 8, name: 'Abstract Art', price: 120, category: 'Kitchen', rating: 5.0, img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80' },
    { id: 601, name: 'Cookware Set', price: 299, category: 'Kitchen', rating: 4.8, img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 602, name: 'Dinnerware Set', price: 150, category: 'Kitchen', rating: 4.6, img: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 603, name: 'Bar Stool (Set)', price: 220, category: 'Kitchen', rating: 4.5, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 604, name: 'Bamboo Board', price: 35, category: 'Kitchen', rating: 4.7, img: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ], []);

  const sortedProducts = useMemo(() => {
    let result = products.filter(p => selectedCategory === 'All' || p.category === selectedCategory);

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [products, sortBy, selectedCategory]);

  // Drag Scroll Logic
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    setMounted(true);
    setCurrentUrl(window.location.href);
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => (prev + 1) % 2);
    }, 4000);

    // Trigger Price Drop Modal after 5 seconds for demo
    // Trigger Price Drop Modal after 5 seconds for demo (Once per user)
    let modalTimer: NodeJS.Timeout;
    const hasSeenPromo = localStorage.getItem('hasSeenPromo');
    if (!hasSeenPromo) {
      modalTimer = setTimeout(() => {
        setIsPriceDropOpen(true);
        localStorage.setItem('hasSeenPromo', 'true');
      }, 5000);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setShowToolbar(false);
        } else {
          setShowToolbar(true);
        }
      } else {
        setShowToolbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      clearTimeout(modalTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

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
    if (!isSignedIn) {
      setIsAuthModalOpen(true);
    } else {
      router.push('/help');
    }
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
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 dark:bg-black transition-colors duration-300 pb-[90px] md:pb-0 overflow-x-hidden">
      <PriceDropModal
        isOpen={isPriceDropOpen}
        onClose={() => setIsPriceDropOpen(false)}
        product={{
          name: "Nordic Sofa",
          variant: "3-Seater Velvet",
          oldPrice: "$900.00",
          newPrice: "$720.00",
          discount: "20%",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBamfDzpr2QM_QjL9SpHzw60z1VtUxTimLAduwASUqQINCyatI7E6U1RnBctBQQSfAxETxeZQLsBts4eyYf8cO_Rstl-hGWBMge3lcibSWVGiAtHy354h2vnhw17f7a-cLHHNzGsqG6NCewiBRfBWZLV0-KLobvmRqy6FVSVfJo13vfvEYdjkFxlOPSxWHg-tJeH0VsEMJgXyBAaN66a-aoDE7tHTmPyT5IkxSBDy4lZHIPmCQ3pr3l1SpfhTHzK6QBWY5xr-zJOJk"
        }}
      />

      <motion.div
        layout
        initial={false}
        animate={{
          width: isSearchOpen ? 'min(90vw, 500px)' : 'fit-content',
          opacity: showToolbar ? 1 : 0,
          y: showToolbar ? 0 : 100,
        }}
        transition={{
          layout: { type: "spring", stiffness: 300, damping: 30 },
          width: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }}
        className="fixed bottom-4 md:bottom-8 left-0 right-0 mx-auto w-fit z-50 flex items-center px-1.5 py-1.5 md:px-4 md:py-3 rounded-full bg-white dark:bg-slate-900 border-2 border-black shadow-xl shadow-black/10 transition-colors duration-300 pointer-events-auto max-w-[95vw]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isSearchOpen ? (
            <motion.div
              key="icons"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 lg:gap-3 whitespace-nowrap overflow-x-auto hide-scrollbar px-1"
            >
              {/* Profile / Brand Icon */}
              <motion.button
                onClick={handleProfileClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative size-10 md:size-16 mr-1.5 md:mr-3 group cursor-pointer flex-shrink-0"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-black/10 dark:border-white/10 shadow-soft bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                  {isSignedIn ? (
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                      alt="Profile"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[24px] md:text-[40px] font-bold group-hover:text-primary transition-colors">account_circle</span>
                  )}
                </div>

                {/* Hover Label */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-[10px] font-black rounded-xl opacity-0 scale-50 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-2xl z-[60] border border-white/10 dark:border-black/5 flex flex-col items-center">
                  {isSignedIn ? 'Account' : 'Sign In'}
                  <div className="absolute top-[90%] left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900/90 dark:border-t-white/90" />
                </div>
              </motion.button>

              {/* Divider */}
              <div className="w-px h-5 md:h-8 bg-slate-200 dark:bg-slate-700 mx-0.5 md:mx-1 flex-shrink-0"></div>

              {/* Dock Items */}
              {[
                { icon: 'home', label: 'Home', active: true },
                { icon: 'grid_view', label: 'Catalog', action: () => router.push('/catalog') },
                { icon: 'search', label: 'Search', action: () => router.push('/search') },
                { icon: 'shopping_bag', label: 'Cart', badge: 2, action: () => router.push('/cart') },
                { icon: 'notifications', label: 'Inbox', badge: 2, action: () => router.push('/notifications') },
                ...(isSignedIn ? [
                  { icon: 'local_shipping', label: 'Track', action: () => router.push('/tracking') },
                ] : []),
                { icon: 'article', label: 'Blog', action: () => router.push('/blog') },
                { icon: 'location_on', label: 'Stores', action: () => router.push('/stores') },
                { icon: 'auto_awesome', label: 'Design AI', action: () => router.push('/design-ai') },
                { icon: 'translate', label: 'Translate' },
                { icon: copied ? 'check_circle' : 'content_copy', label: copied ? 'Copied' : 'Copy Link', action: handleCopy },
                { icon: 'share', label: 'Share', action: handleShare },
                { icon: 'qr_code_scanner', label: 'QR Scan', action: () => setIsQRCodeOpen(true) },
                { icon: mounted && theme === 'dark' ? 'light_mode' : 'dark_mode', label: 'Theme', action: toggleTheme },
                { icon: 'settings', label: 'Settings', action: () => setIsSettingsOpen(true) },
              ].map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={item.action}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative size-7 md:size-10 flex items-center justify-center rounded-full transition-all group flex-shrink-0 ${item.active ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <span className={`material-symbols-outlined text-[18px] md:text-[26px] font-bold ${item.active ? 'bg-gradient-to-tr from-primary to-secondary bg-clip-text text-transparent' : 'text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors'}`}>
                    {item.icon}
                  </span>
                  {item.badge && (
                    <span className="absolute top-0 right-0 size-2.5 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                  )}

                  {/* Hover Label */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-[10px] font-black rounded-xl opacity-0 scale-50 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-2xl z-[60] border border-white/10 dark:border-black/5 flex flex-col items-center">
                    {item.label}
                    <div className="absolute top-[90%] left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900/90 dark:border-t-white/90" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="searchbar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center w-full relative"
            >
              <span className="material-symbols-outlined text-black dark:text-white absolute left-0 font-bold pointer-events-none">search</span>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setIsSearchOpen(false)}
                placeholder="Search premium furniture..."
                className="bg-transparent border-none outline-none text-black dark:text-white w-full font-bold text-sm placeholder:text-slate-400 text-center px-12 h-10"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute right-0 size-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-all hover:rotate-90"
              >
                <span className="material-symbols-outlined text-xl font-bold">close</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
                onClick={() => router.push('/catalog')}
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
          <div className="mb-14">
            <div className="flex items-center justify-between px-1 mb-6">
              <h3 className="text-charcoal dark:text-white text-3xl font-display font-medium tracking-tight">Browse by Category</h3>
              <button
                onClick={() => router.push('/catalog')}
                className="text-bronze dark:text-secondary text-sm font-bold hover:underline"
              >View All</button>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex overflow-x-auto hide-scrollbar gap-4 pb-6 select-none cursor-grab active:cursor-grabbing"
              ref={sliderRef}
              onMouseDown={(e) => {
                setIsDown(true);
                if (sliderRef.current) {
                  setStartX(e.pageX - sliderRef.current.offsetLeft);
                  setScrollLeft(sliderRef.current.scrollLeft);
                }
              }}
              onMouseLeave={() => setIsDown(false)}
              onMouseUp={() => setIsDown(false)}
              onMouseMove={(e) => {
                if (!isDown) return;
                e.preventDefault();
                if (sliderRef.current) {
                  const x = e.pageX - sliderRef.current.offsetLeft;
                  const walk = (x - startX) * 2; // Scroll-fast
                  sliderRef.current.scrollLeft = scrollLeft - walk;
                }
              }}
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
                <motion.div
                  variants={item}
                  key={idx}
                  className="flex-shrink-0 group cursor-pointer"
                  onClick={() => setSelectedCategory(cat.label)}
                >
                  <div className={`px-6 py-3 rounded-full border transition-all duration-500 ease-out flex items-center gap-2.5 ${selectedCategory === cat.label
                    ? 'bg-charcoal text-white border-charcoal shadow-lg shadow-charcoal/20 dark:bg-white dark:text-charcoal dark:border-white'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-transparent hover:text-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 hover:shadow-glow hover:-translate-y-0.5 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 dark:hover:border-blue-400/50 dark:hover:bg-blue-900/40'}`}>
                    <span className={`material-symbols-outlined text-[20px] transition-colors duration-300 ${selectedCategory === cat.label ? 'text-white dark:text-charcoal' : 'text-slate-400 group-hover:text-white dark:text-slate-500 dark:group-hover:text-white'}`}>{cat.icon}</span>
                    <span className="text-sm font-bold whitespace-nowrap">{cat.label}</span>
                  </div>
                </motion.div>
              ))}
              <motion.div
                variants={item}
                className="flex-shrink-0 group cursor-pointer"
                onClick={() => router.push('/catalog')}
              >
                <div className="px-6 py-3 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/10 transition-all flex items-center gap-2">
                  <span className="text-sm font-bold whitespace-nowrap">More</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Featured Products */}
          <div className="mb-12">
            {/* Featured Products */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-8 gap-4">
              <h3 className="text-charcoal dark:text-white text-xl md:text-3xl font-display font-medium tracking-tight">Featured Products</h3>
              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/compare')}
                  className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 bg-white dark:bg-white/5 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:text-primary transition-all border border-slate-200 dark:border-white/10 flex items-center gap-2 md:gap-3 cursor-pointer shadow-sm group whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-[16px] md:text-[18px] text-slate-300 group-hover:text-primary transition-colors">compare_arrows</span>
                  <span className="group-hover:text-primary transition-colors">Compare</span>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 bg-white dark:bg-white/5 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:text-primary transition-all border border-slate-200 dark:border-white/10 flex items-center gap-2 md:gap-3 cursor-pointer shadow-sm group whitespace-nowrap"
                  >
                    <span className="text-slate-300 group-hover:text-primary transition-colors">Sort:</span>
                    <span className="text-primary">{sortBy === 'newest' ? 'Newest' : sortBy === 'price-low' ? 'Low Price' : sortBy === 'price-high' ? 'High Price' : 'Top Rated'}</span>
                    <span className={`material-symbols-outlined text-[16px] md:text-[18px] transition-transform ${isSortOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>expand_more</span>
                  </motion.button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-[#0a0f16] rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-30"
                      >
                        {[
                          { label: 'Newest', value: 'newest' },
                          { label: 'Price: Low', value: 'price-low' },
                          { label: 'Price: High', value: 'price-high' },
                          { label: 'Top Rated', value: 'rating' },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value as any);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === opt.value
                              ? "bg-primary/10 text-primary"
                              : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                              }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {sortedProducts.slice(0, visibleCount).map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Show More / Show Less Buttons */}
            <div className="flex justify-center gap-3 mt-8 md:mt-12 w-full">
              {visibleCount > 6 && (
                <button
                  onClick={() => setVisibleCount(6)}
                  className="group relative px-6 py-2.5 md:px-8 md:py-3 rounded-xl md:rounded-2xl bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold text-xs md:text-sm border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 overflow-hidden transition-all shadow-sm hover:shadow-lg active:scale-95"
                >
                  <div className="absolute inset-0 bg-slate-100 dark:bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-1.5 md:gap-2">
                    <span className="material-symbols-outlined text-[16px] md:text-[20px] group-hover:-translate-y-0.5 transition-transform">expand_less</span>
                    <span className="hidden sm:inline">Show Less</span>
                  </div>
                </button>
              )}
              {visibleCount < sortedProducts.length && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="group relative px-6 py-2.5 md:px-8 md:py-3 rounded-xl md:rounded-2xl bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold text-xs md:text-sm border border-slate-200 dark:border-white/10 hover:border-primary dark:hover:border-primary overflow-hidden transition-all shadow-sm hover:shadow-lg active:scale-95"
                >
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-1.5 md:gap-2">
                    <span className="hidden sm:inline">Show More</span>
                    <span className="material-symbols-outlined text-[16px] md:text-[20px] group-hover:translate-y-0.5 transition-transform">expand_more</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Promo Banner - Bento Grid Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {/* Primary Promo Card */}
            <div
              onClick={() => router.push('/catalog?tag=sale')}
              className="md:col-span-2 relative overflow-hidden rounded-[2rem] bg-[#1a1a1a] dark:bg-slate-900 text-white p-10 flex flex-col items-start justify-center min-h-[300px] shadow-2xl group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#a0522d]/20 to-transparent"></div>
              <div className="absolute right-[-20%] top-[-20%] w-[60%] h-[140%] bg-gradient-to-br from-white/5 to-transparent rotate-12 blur-3xl group-hover:rotate-0 transition-all duration-1000"></div>

              <div className="relative z-10 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest mb-6 text-[#d2691e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2691e] animate-pulse"></span>
                  LIMITED OFFER
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-medium leading-[1.1] mb-4">Summer Collection<br /><span className="text-white/40">Up to 50% Off</span></h3>
                <p className="text-white/70 mb-8 font-light text-lg">Curated pieces for modern living. Elevate your space with our premium selection.</p>

                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-[#1a1a1a] px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-[#d2691e] hover:text-white transition-colors shadow-lg flex items-center gap-3"
                >
                  SHOP THE SALE
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </motion.button>
              </div>

              <div className="absolute right-[-5%] bottom-[-5%] w-[40%] aspect-square opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">
                <span className="material-symbols-outlined text-[300px]">chair</span>
              </div>
            </div>

            {/* Secondary Promo Card */}
            <div
              onClick={() => router.push('/catalog?sort=newest')}
              className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 p-8 flex flex-col justify-between group shadow-xl border border-slate-100 dark:border-slate-800 transition-all hover:shadow-2xl cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#136dec] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                </div>
                <h3 className="text-2xl font-display font-medium text-[#111418] dark:text-white mb-2">New Arrivals</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">Explore the latest trends in interior design.</p>
              </div>

              <div className="relative z-10 mt-8 flex justify-end">
                <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center group-hover:border-[#136dec] group-hover:bg-[#136dec] text-[#111418] hover:text-white dark:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                </div>
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
                      onClick={() => {
                        setIsSignedIn(true);
                        setIsAuthModalOpen(false);
                      }}
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
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <QRCodeModal isOpen={isQRCodeOpen} onClose={() => setIsQRCodeOpen(false)} url={currentUrl} />
    </div>
  );
}
