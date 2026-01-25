"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "../../data/products";
import WriteReviewModal from "../../components/WriteReviewModal";

export default function ProductDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeColor, setActiveColor] = useState("Ocean Blue");
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const rawProduct = getProductById(id as string);

    if (!rawProduct) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <button onClick={() => router.push('/')} className="text-primary hover:underline">Back to Catalog</button>
            </div>
        );
    }

    const product = {
        ...rawProduct,
        oldPrice: (rawProduct as any).oldPrice || rawProduct.price * 1.25,
        reviewsCount: 124,
        description: "Experience the perfect blend of mid-century modern design and contemporary comfort. This piece features premium materials, a solid frame, and ergonomic cushioning designed for hours of relaxation.",
        colors: [
            { name: "Ocean Blue", hex: "#136dec" },
            { name: "Slate Grey", hex: "#36454F" },
            { name: "Cloud White", hex: "#E5E4E2" }
        ],
        images: [
            rawProduct.img,
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBelctOQQoK5mni0NJdBcze7fPaibOZUVSu_V9R1ZxVEzY1UhvxRf4eupv8HLOGvbeSTj0Wwttzq6JaaTGQ75ELYE4f7lt0yZ9CC9SIx0pleIukOnkrbDG8PvfvMbXMKMXLkhGndrhm4s4uxbw5TS7BHrnJwbFugyy0dTNEICWNIV5qwGt-tey9Qz5uIfFKnmpQtSXartRMcKGJk4UXivRtOETuYMBWCLi1YeHj3Rfuje33nZJ1pxwZS-WmZIeIfuVJhMkppDIkugc",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBzsE1MhIeQ5QRyUnr-u5pzKorg5r81UbkoNNO8svp0gGHqZH6X7HHv1AkifcQcpNtmNYMY68EnrO_i2nQTQQ5dfKxYKCnK15ou-zbUClqAwzgNjqCVmUdPzIgVc1nltBiJQOp7w7RTO2mUg5f7dJGjSTwD-NMNy0T2IFnRzCqzGVrtByps01EES775H7m5jFhKm75amet0vMrvgQaMRu0ezNTzs81iYiI88Txicttfr10Lx-3so8H51nu2_jefvga3NuGNHq0m5Eo"
        ],
        specs: [
            { label: "Height", value: '32"', icon: "straighten" },
            { label: "Material", value: "Premium", icon: "chair" },
            { label: "Load", value: "300 lbs", icon: "scale" },
            { label: "Color", value: "Custom", icon: "palette" },
            { label: "Weight", value: "24 lbs", icon: "inventory_2" },
            { label: "Warranty", value: "2 Years", icon: "verified" }
        ],
        topReview: {
            user: "Sarah Jenkins",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPYkZ8EV_1dMz4XffISVHQhmv2d_LGGVEa_JoZZjpk-JVgdtDCRXiEDoQgwb3sRAv_X8ogwqEbMU9LYWT91OIpYD2oLx6Y_I4CPU3sc__bVvgkyEG1hVG9surm2V3zN29-Lukl-YyIg8B5vhNun8zDpsdZlDYzMjX-e8iwRxLRh60GvIwth71mTpR8h3_A_l2bw9knY7XsLpFfDIlbtk5kh42PeCQdPLOtwTUzQah0lpiBz4ptzAaunXyY7DV4yfawcMKUjACfILo",
            rating: 5,
            time: "2d ago",
            content: "Absolutely love this! It adds a nice pop of color to my living room. Very sturdy."
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
            setActiveImageIndex(index);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#101822] text-slate-900 dark:text-white font-display flex justify-center pb-32">
            <div className="relative flex w-full flex-col max-w-5xl mx-auto md:px-8 md:pt-8">

                {/* Desktop Header */}
                <div className="hidden md:flex items-center justify-between mb-8">
                    <button onClick={() => router.back()} className="flex items-center gap-2 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Catalog
                    </button>
                    <div className="flex gap-4">
                        <button className="size-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Header */}
                <nav className="sticky top-0 z-50 flex md:hidden w-full items-center justify-between bg-white/90 dark:bg-[#101822]/90 px-4 py-3 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
                    <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm transition hover:bg-slate-100 dark:hover:bg-slate-700">
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Details</h2>
                    <div className="flex items-center gap-2">
                        <Link href="/design-ai" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-blue-500 shadow-sm transition hover:bg-slate-100 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined">auto_awesome</span>
                        </Link>
                        <Link href="/blog" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shadow-sm transition hover:bg-slate-100 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined">article</span>
                        </Link>
                        <Link href="/rewards" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-amber-500 shadow-sm transition hover:bg-slate-100 dark:hover:bg-slate-700">
                            <span className="material-symbols-outlined filled">workspace_premium</span>
                        </Link>
                    </div>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left: Images */}
                    <div className="flex flex-col gap-4">
                        <div className="relative md:rounded-3xl overflow-hidden md:border md:border-slate-100 md:dark:border-slate-800 md:shadow-soft">
                            <div
                                className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
                                ref={scrollRef}
                                onScroll={handleScroll}
                            >
                                {product.images.map((img, idx) => (
                                    <div key={idx} className="flex w-full flex-shrink-0 snap-center px-0 md:px-0">
                                        <div className="aspect-[4/5] w-full relative">
                                            <Image
                                                src={img}
                                                alt={`${product.name} ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Dots Indicators */}
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                                {product.images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 transition-all duration-300 rounded-full ${activeImageIndex === idx ? "w-6 bg-primary" : "w-1.5 bg-white/50 backdrop-blur-md"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Thumbnails */}
                        <div className="hidden md:flex gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        scrollRef.current?.scrollTo({ left: scrollRef.current.clientWidth * idx, behavior: 'smooth' });
                                        setActiveImageIndex(idx);
                                    }}
                                    className={`relative size-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? "border-primary p-0.5" : "border-transparent opacity-60 hover:opacity-100"}`}
                                >
                                    <Image src={img} alt="thumb" fill className="object-cover rounded-[14px]" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col gap-8 px-6 md:px-0 pt-2 pb-10">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="bg-blue-50 dark:bg-blue-900/30 text-primary text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">New Arrival</span>
                                <div className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5">
                                    <span className="material-symbols-outlined text-yellow-500 text-[16px] filled">star</span>
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{product.rating}</span>
                                    <span className="text-[11px] text-slate-400 font-medium">({product.reviewsCount})</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">{product.name}</h1>
                            <div className="flex items-baseline gap-3 mt-1">
                                <span className="text-4xl font-black text-primary">${product.price.toFixed(2)}</span>
                                <span className="text-lg text-slate-400 line-through font-medium leading-none">${product.oldPrice.toFixed(2)}</span>
                                <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-lg ml-2">Save 22%</span>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Select Color: <span className="text-slate-900 dark:text-white">{activeColor}</span></span>
                            <div className="flex gap-4">
                                {product.colors.map((color, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveColor(color.name)}
                                        className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-all ring-offset-2 ring-offset-white dark:ring-offset-[#101822] ${activeColor === color.name ? "ring-2 ring-primary scale-110" : "ring-1 ring-transparent hover:ring-slate-300 dark:hover:ring-slate-700"}`}
                                    >
                                        <span className="h-full w-full rounded-full border border-black/5" style={{ backgroundColor: color.hex }}></span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector - Desktop Only here */}
                        <div className="hidden md:flex flex-col gap-4 pt-4">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Quantity</span>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-500 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition active:scale-90"
                                    >
                                        <span className="material-symbols-outlined">remove</span>
                                    </button>
                                    <span className="w-12 text-center text-lg font-black text-slate-900 dark:text-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition active:scale-90"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                                <button
                                    onClick={() => router.push('/checkout')}
                                    className="h-14 flex-1 bg-primary hover:bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    <span className="material-symbols-outlined">payments</span>
                                    Buy Now — ${(product.price * quantity).toFixed(2)}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col w-full border-t border-slate-100 dark:border-slate-800 pt-2">
                            <details className="group border-b border-slate-100 dark:border-slate-800 py-6" open>
                                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900 dark:text-white outline-none">
                                    Description
                                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-slate-400">expand_more</span>
                                </summary>
                                <div className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                                    <p>{product.description}</p>
                                </div>
                            </details>

                            <details className="group border-b border-slate-100 dark:border-slate-800 py-6">
                                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900 dark:text-white outline-none">
                                    Specifications
                                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-slate-400">expand_more</span>
                                </summary>
                                <div className="mt-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {product.specs.map((spec, idx) => (
                                            <div key={idx} className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 text-center border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                                                <span className="material-symbols-outlined mb-2 text-primary">{spec.icon}</span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">{spec.label}</span>
                                                <span className="text-[13px] font-bold text-slate-900 dark:text-white">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => router.push(`/product/${id}/dimensions`)}
                                        className="mt-6 w-full py-4 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl flex items-center justify-center gap-3 text-sm font-black text-slate-900 dark:text-white transition-all border border-dashed border-slate-300 dark:border-slate-700"
                                    >
                                        <span className="material-symbols-outlined text-primary">straighten</span>
                                        View Full Size Guide & Technical Drawing
                                    </button>
                                    <button
                                        onClick={() => router.push(`/help/velvet-care`)}
                                        className="mt-3 w-full py-4 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl flex items-center justify-center gap-3 text-sm font-black text-slate-900 dark:text-white transition-all border border-dashed border-slate-300 dark:border-slate-700"
                                    >
                                        <span className="material-symbols-outlined text-primary">sanitizer</span>
                                        Professional Product Care Guide
                                    </button>
                                </div>
                            </details>

                            <details className="group border-b border-slate-100 dark:border-slate-800 py-6">
                                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900 dark:text-white outline-none">
                                    Reviews ({product.reviewsCount})
                                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-slate-400">expand_more</span>
                                </summary>
                                <div className="mt-8">
                                    {/* Rating Overview */}
                                    <div className="flex flex-col items-center text-center mb-10">
                                        <h2 className="text-6xl font-black text-slate-900 dark:text-white mb-2">{product.rating}</h2>
                                        <div className="flex text-primary mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`material-symbols-outlined text-2xl ${i < 4 ? 'filled' : 'filled opacity-40'}`}>star</span>
                                            ))}
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Based on {product.reviewsCount} reviews</p>
                                    </div>

                                    {/* Rating Distribution */}
                                    <div className="space-y-3 mb-12 max-w-sm mx-auto">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <div key={rating} className="flex items-center gap-4">
                                                <span className="text-xs font-bold text-slate-500 w-3">{rating}</span>
                                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: rating === 5 ? '75%' : rating === 4 ? '15%' : '2%' }}
                                                        className="h-full bg-primary rounded-full transition-all duration-1000"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Customer Photos */}
                                    <div className="mb-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Customer Photos</h3>
                                            <button className="text-primary text-xs font-bold hover:underline">See All</button>
                                        </div>
                                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                            {[
                                                "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ0OKIkIYsdLF7fbcCBbmdnTdpGlbuyR0F0CNic1k-S4C0FkN5fQ0ukU0Zm11Zs4y2rJwby0SYDN6YuNrcSmH8jgLuUTyNCoeyYjX_-qJVtPk6KYVyNsylbK0PXblnUKFfzutRzI6AuHDXeeWtwVfYrM3B-UyO-yObrtFrganzUjZRepfEw-5yH0HxpqseRvDgvdusyEmUVRY9Y4YvE9mL6VaooV75brLoJVcBdJ731hsSLWup6bq98zN3ON_S4euSlUb86hrsEKI",
                                                "https://lh3.googleusercontent.com/aida-public/AB6AXuBelctOQQoK5mni0NJdBcze7fPaibOZUVSu_V9R1ZxVEzY1UhvxRf4eupv8HLOGvbeSTj0Wwttzq6JaaTGQ75ELYE4f7lt0yZ9CC9SIx0pleIukOnkrbDG8PvfvMbXMKMXLkhGndrhm4s4uxbw5TS7BHrnJwbFugyy0dTNEICWNIV5qwGt-tey9Qz5uIfFKnmpQtSXartRMcKGJk4UXivRtOETuYMBWCLi1YeHj3Rfuje33nZJ1pxwZS-WmZIeIfuVJhMkppDIkugc",
                                                "https://lh3.googleusercontent.com/aida-public/AB6AXuBzsE1MhIeQ5QRyUnr-u5pzKorg5r81UbkoNNO8svp0gGHqZH6X7HHv1AkifcQcpNtmNYMY68EnrO_i2nQTQQ5dfKxYKCnK15ou-zbUClqAwzgNjqCVmUdPzIgVc1nltBiJQOp7w7RTO2mUg5f7dJGjSTwD-NMNy0T2IFnRzCqzGVrtByps01EES775H7m5jFhKm75amet0vMrvgQaMRu0ezNTzs81iYiI88Txicttfr10Lx-3so8H51nu2_jefvga3NuGNHq0m5Eo",
                                                "https://lh3.googleusercontent.com/aida-public/AB6AXuAYNtGl0I4Db-MZ8w98XyKbbN5oPi_yvtZtrjRTYIbqTCn7nux8Njl02HrWUfdHo-gIgU7YA_a3K8b-tfuoqyfu8m6CDxqKqtsAFGiXGri588PYwF55pRJUERjYqnUqqF7-JP5tyvlSim4N0ekExRRUn3U64bgPkvRmDnxn1LU7Ya-ePykYAXxHzn_uQNKyi5PkJXq6SGNJpb5aiDJLaPfE4fwflsDxa5xRG0izCqrqDjH2pGM1ZUXv4aJS_X_I0sUdRWmlpDTtGkQ"
                                            ].map((img, i) => (
                                                <div key={i} className="relative size-24 rounded-2xl overflow-hidden shrink-0 group cursor-pointer border border-slate-100 dark:border-slate-800">
                                                    <Image src={img} alt="customer" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Filters */}
                                    <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                                        {["Highest Rated", "Newest", "With Photos", "Lowest Rating"].map((filter, i) => (
                                            <button key={i} className={`px-5 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                                {filter.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Review List */}
                                    <div className="space-y-10">
                                        {[
                                            {
                                                user: "Jane Cooper",
                                                rating: 5,
                                                time: "2 days ago",
                                                title: "Absolutely love the texture!",
                                                comment: "The velvet finish is incredibly soft and the color matches the photos perfectly. Assembly was a breeze, took me less than 15 minutes. Highly recommend for any modern apartment.",
                                                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClTyBxLeqObwqhijPVy04XdKzNs075BfIvWKH7sRnSkdXYNw3zTqa7GkvrGvwAAogEdDxFT1YG5zFY6oJCN8YziVE3FGy3foRepU6Hmg7o-qe3kk4pGK-J92ShTn_v2wwZ_HMwyRlc9BNdTdjs_g4-CDH13tjPwTv5dXAbZudjuwawPZycQZmUbLFM8eBCMDae1-YPXucvP6NWH8Q4Eupo5a7tVxcOc-8JlDmi4MSKQUQTs-vF77jAvxCPLIV3n4sD6VjwThbMkm0",
                                                helpful: 12
                                            },
                                            {
                                                user: "Mark Simmons",
                                                rating: 4,
                                                time: "1 week ago",
                                                title: "Great chair but shipping was delayed",
                                                comment: "The product itself is fantastic. Sturdy, comfortable, and looks premium. However, it arrived 3 days later than the estimated date. Packaging was good though, no scratches.",
                                                helpful: 4
                                            },
                                            {
                                                user: "Sarah Lee",
                                                rating: 5,
                                                time: "2 weeks ago",
                                                title: "Perfect fit for my studio!",
                                                comment: "I was worried it might be too big for my small space, but the dimensions are exactly as described. It's surprisingly lightweight too, making it easy to move around.",
                                                helpful: 8
                                            }
                                        ].map((review, i) => (
                                            <div key={i} className="border-b border-slate-50 dark:border-slate-800/50 pb-8 last:border-0">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden relative">
                                                            <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-400 text-xs">{(review.user.split(' ').map(n => n[0]).join(''))}</div>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-sm font-black text-slate-900 dark:text-white">{review.user}</p>
                                                                <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                                                    <span className="material-symbols-outlined text-xs filled">verified</span>
                                                                    Verified Buyer
                                                                </div>
                                                            </div>
                                                            <div className="flex text-amber-500 mt-0.5">
                                                                {[...Array(5)].map((_, starIdx) => (
                                                                    <span key={starIdx} className={`material-symbols-outlined text-[14px] ${starIdx < review.rating ? 'filled' : ''}`}>star</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-slate-400 font-medium">{review.time}</span>
                                                </div>
                                                <h4 className="text-base font-black text-slate-900 dark:text-white mb-2 leading-tight">{review.title}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{review.comment}</p>

                                                {review.image && (
                                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800">
                                                        <Image src={review.image} alt="review" fill className="object-cover" />
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-6">
                                                    <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                                                        <span className="text-xs font-bold">Helpful ({review.helpful})</span>
                                                    </button>
                                                    <button className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Report</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                                        <button
                                            onClick={() => router.push(`/product/${id}/reviews`)}
                                            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black px-10 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700"
                                        >
                                            <span className="material-symbols-outlined">forum</span>
                                            Read All 124 Reviews
                                        </button>
                                        <button
                                            onClick={() => setIsReviewModalOpen(true)}
                                            className="bg-primary hover:bg-blue-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
                                        >
                                            <span className="material-symbols-outlined">rate_review</span>
                                            Write a Review
                                        </button>
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky CTA */}
                <div className="fixed bottom-0 left-0 right-0 z-40 w-full border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-[#101822]/95 backdrop-blur-xl px-6 py-4 pb-10 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)] md:hidden">
                    <div className="flex items-center gap-4 max-w-lg mx-auto">
                        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-700 transition"
                            >
                                <span className="material-symbols-outlined text-lg">remove</span>
                            </button>
                            <span className="w-8 text-center text-sm font-black text-slate-900 dark:text-white">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition"
                            >
                                <span className="material-symbols-outlined text-lg">add</span>
                            </button>
                        </div>
                        <button
                            onClick={() => router.push('/checkout')}
                            className="relative flex h-12 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary text-white shadow-lg shadow-primary/25 transition active:scale-[0.98]"
                        >
                            <span className="material-symbols-outlined text-[20px]">payments</span>
                            <span className="font-bold">Buy Now</span>
                        </button>
                    </div>
                </div>
            </div>

            <WriteReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                productName={product.name}
            />
        </div>
    );
}
