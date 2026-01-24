"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function ReviewsPage() {
    const router = useRouter();
    const { id } = useParams();
    const [activeFilter, setActiveFilter] = useState("Highest Rated");

    const filters = ["Highest Rated", "Newest", "With Photos", "Lowest Rated"];

    const customerPhotos = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCuLbgZXz0GAEggaqo74giMsDe0MKB3IkIvV6KVzhJrdqKEkLD6P2VGWyMbfTkI_QSQWhxNTZcxLJEF4pxTwRHdlaVWsdRsxW2iFqlQWR-EikX1YDHAvykJKUCkpUj0siZ4llVIceQ0VPIyb_z_979GRC5Pepc_m_8TCkO5R39QhTywJQt36yO_FEGEVvHP0RbCjQWR2e7Ro4vXntLyB_VPeOlUG79HudQCLMqrNnfEvIpEEmLe2w9jR1EYXhTJJzau7JN0kcAYqA4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMb25ytjuCtJqEYaLs_M2_QjF83AUywzcBz-p74qeNgSr7R-3zMpuz1t_fQ6PcBSIhHUDjYLCpg5Vvc3Tk5-h1e6srtSTez-4lqUiJy6b3GNhamaBlPrOaFi62dHqGy0gMKjAEfEDErv78sC0NdWugqlWfQ93r3_JT8ix1eJPgCX5KMikbM-D1TFTG6MubkttKwz39hNgHUMl7l-YuS8dNQb3CUMtOL6e1gB_GhsLVjW11wCKWG_VrfCNEyMMAhs6E6ez7tNY8zr4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDoG3HCImExJpINXciXqSxEMdX4ynnMYf4mJgyitijOnh7ptNhLLU2Q1dJFoiOxHECc-Qhb8HMA8Ad6cxKcivCHruD5C3ZruJB9qRlKBFbsOjAH11ibSJY0vpiHGYZc1_z977elbemkYV2lsOVmaneFkbSBNO6e6jLsMpSRldCi12fAqT2RGdrltse7e8Z8xaNsOneEtAgHx3N72Z6beqmZXbSrovDQ70LP0xMyOKWnZ5opVcle1Lkw242SqjhS_hWZqMqDRU6336c",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB6BfnwoU4WqCUSglA9jzUbkW9u4YWkYTH18t-xtQ3SxctqjzaGJI3fFJt9nXl4wQRddOiLruDSiiYsRoINTELdTRmXbC8cLNVc7V3KKOtmsWxSNLudAn_IiAxgFpZooCVesKQWQDOWwcZSJyw1l2jlaU7cJNUfaFF5NxgojUKmggxU4E8G0y4y7ICmf1q8vmGt_znz35Z7RNb1UcOvoDxgO9rnja0DYergsj0q4TgGELqnE7r9ASCpJRLvPw420GIC6PhO3sPRw4o"
    ];

    const reviews = [
        {
            user: "Jane Cooper",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp8Fu1y-n82YWO8moML7RCAlw4xLcg8uj91GGenWjrv6Wr1-gLME2k2pLCTDLOc-X0hS4M1NTPIPK2kMD1EL9hNG53ztmw_o01Nm6Np0qqRqgWLuc946ntJwIny2skbpGi_8O9FnrL4JE2_bE5f1PdX78hVEkgmuzKv5_GOa5JMD5WHX7fVv6NRI28Cg9p-j3rRL4JBgXrwCLC4sUjLQ2lkwykYEgFmE3-3t9YFsCG8cLiWqSNkKTYR5dcfmpaOGIlTS2wbho_ckM",
            verified: true,
            time: "2 days ago",
            rating: 5,
            title: "Absolutely love the texture!",
            comment: "The velvet finish is incredibly soft and the color matches the photos perfectly. Assembly was a breeze, took me less than 15 minutes. Highly recommend for any modern apartment.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCquJMwwGHWjtOMnyiH9rTWNLBW2im1uYMX3p8obXQsdSMExqkxaWustw37FTcegISI3dJ88CrnkSffGE0TaNRki8jRiTb2AKwhUQHL0mjxv8ECuofkHJhsWc_5uw7nWmi0jlHZJbN5HD1FvI0OL69_VJw9WSeops_osJVGhDCzOSRTOzIDpBPlEvoO2qXT2cDznRN94Tvp7BJxIHELuNNAzt14zeQBd2Wxp9WizqrNSDhJchRkgU0-QYo3G2vXZbCuQONPNustPlM",
            helpful: 12
        },
        {
            user: "Mark Simmons",
            avatar: null,
            verified: true,
            time: "1 week ago",
            rating: 4,
            title: "Great chair but shipping was delayed",
            comment: "The product itself is fantastic. Sturdy, comfortable, and looks premium. However, it arrived 3 days later than the estimated date. Packaging was good though, no scratches.",
            helpful: 4
        },
        {
            user: "Sarah Lee",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_oJfru6d9iitQoz-R-g4HWhIlelR1V09E3jlkpsMGJJSNzx15YTbOAIWGp9X6CaDHBopqNB3pf-PEgo5wLNR7shXWKUPyrgN3BOaBMnB3vXfHLT965Mg4l5SkJK5vmYn4c-ljxO5PZvsSbYGr64y22k2jjD4VdOo7YfrS7LKub6femCrR3auOt1AB4R7LQIZ4UwUiMvAVbooOSxyZs-Hcnzkcg1vYvU3KCgft_DFOV1KFBWCZi0ebQpNrkfkEWipUkDe-74vxzWw",
            verified: true,
            time: "2 weeks ago",
            rating: 5,
            title: "Perfect fit for my studio!",
            comment: "I was worried it might be too big for my small space, but the dimensions are exactly as described. It's surprisingly lightweight too, making it easy to move around.",
            helpful: 8
        }
    ];

    return (
        <div className="bg-white dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-2xl mx-auto border-x border-slate-100 dark:border-slate-800 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-50 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center px-6 py-4 justify-between">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center justify-center size-10 -ml-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 className="text-xl font-black font-outfit uppercase tracking-tighter flex-1 text-center pr-8">Customer Reviews</h1>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    {/* Rating Summary */}
                    <div className="px-8 py-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex flex-col items-center">
                                <p className="text-slate-900 dark:text-white text-7xl font-black font-outfit tracking-tighter">4.8</p>
                                <div className="flex gap-1 my-3 text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`material-symbols-outlined text-2xl ${i < 4 ? 'filled' : 'filled opacity-40'}`}>star</span>
                                    ))}
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">Based on 124 reviews</p>
                            </div>

                            {/* Breakdown Bars */}
                            <div className="w-full max-w-sm space-y-3">
                                {[
                                    { stars: 5, percentage: 86 },
                                    { stars: 4, percentage: 10 },
                                    { stars: 3, percentage: 2 },
                                    { stars: 2, percentage: 1 },
                                    { stars: 1, percentage: 1 },
                                ].map((row) => (
                                    <div key={row.stars} className="flex items-center gap-4 group">
                                        <span className="w-3 text-xs font-black text-slate-400 group-hover:text-primary transition-colors">{row.stars}</span>
                                        <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${row.percentage}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={`rounded-full ${row.stars >= 4 ? 'bg-primary' : 'bg-slate-400'}`}
                                            />
                                        </div>
                                        <span className="w-8 text-[10px] font-bold text-slate-400 text-right">{row.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-4 bg-slate-50 dark:bg-[#121a24] w-full" />

                    {/* Customer Photos */}
                    <div className="py-10">
                        <div className="flex items-center justify-between px-8 mb-6">
                            <h3 className="text-lg font-black font-outfit uppercase tracking-tighter">Customer Gallery</h3>
                            <button className="text-xs font-black text-primary hover:underline tracking-widest uppercase">See All</button>
                        </div>
                        <div className="flex overflow-x-auto no-scrollbar gap-4 px-8 pb-4">
                            {customerPhotos.map((url, i) => (
                                <div key={i} className="shrink-0 snap-start">
                                    <div className="size-32 rounded-[2rem] overflow-hidden shadow-lg border-2 border-white dark:border-slate-800 relative group cursor-pointer">
                                        <Image src={url} alt="Gallery" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                </div>
                            ))}
                            <div className="shrink-0 snap-start">
                                <div className="size-32 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer group">
                                    <span className="material-symbols-outlined text-3xl mb-1 group-hover:scale-110 transition-transform">add_a_photo</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Add Yours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Chips */}
                    <div className="sticky top-[60px] bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl z-40 border-y border-slate-100 dark:border-slate-800">
                        <div className="flex gap-3 px-8 py-4 overflow-x-auto no-scrollbar">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-xs font-black transition-all ${activeFilter === filter
                                            ? "bg-primary text-white shadow-lg shadow-primary/25"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {filter.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="flex flex-col px-8 py-4 space-y-12 mt-4">
                        {reviews.map((review, i) => (
                            <div key={i} className="group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm relative overflow-hidden">
                                            {review.avatar ? (
                                                <Image src={review.avatar} alt={review.user} fill className="object-cover" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center font-black text-primary text-xs">
                                                    {review.user.split(' ').map(n => n[0]).join('')}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1.5">{review.user}</p>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-lg w-fit">
                                                <span className="material-symbols-outlined text-[12px] text-green-500 filled">verified</span>
                                                <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Verified Buyer</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{review.time}</span>
                                </div>
                                <div className="flex gap-0.5 text-amber-500 mb-3">
                                    {[...Array(5)].map((_, starI) => (
                                        <span key={starI} className={`material-symbols-outlined text-[18px] ${starI < review.rating ? 'filled' : ''}`}>star</span>
                                    ))}
                                </div>
                                <h4 className="font-black text-slate-900 dark:text-white text-base mb-2 font-outfit uppercase tracking-tight">{review.title}</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed mb-4">
                                    {review.comment}
                                </p>
                                {review.image && (
                                    <div className="mt-4 mb-6 relative w-full aspect-video rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm group-hover:shadow-md transition-shadow">
                                        <Image src={review.image} alt="Review" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                )}
                                <div className="flex items-center gap-6 mt-4">
                                    <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group/btn">
                                        <span className="material-symbols-outlined text-[20px] group-hover/btn:scale-110 transition-transform">thumb_up</span>
                                        <span className="text-xs font-black uppercase tracking-widest">Helpful ({review.helpful})</span>
                                    </button>
                                    <button className="text-slate-400 text-xs font-black hover:text-red-500 transition-colors uppercase tracking-widest">
                                        Report
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sticky Bottom CTA */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center px-4 pointer-events-none z-50">
                    <button className="pointer-events-auto bg-gradient-to-r from-primary to-blue-500 text-white rounded-2xl px-10 py-5 shadow-2xl shadow-primary/40 flex items-center gap-3 transform hover:scale-105 active:scale-95 transition-all group">
                        <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">rate_review</span>
                        <span className="font-black font-outfit uppercase tracking-tighter">Write a Review</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
