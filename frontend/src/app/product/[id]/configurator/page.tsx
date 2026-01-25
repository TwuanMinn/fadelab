"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ConfiguratorPage() {
    const router = useRouter();
    const [selectedFabric, setSelectedFabric] = useState("Cream");
    const [selectedLeg, setSelectedLeg] = useState("Natural Walnut");
    const [activeTab, setActiveTab] = useState("Fabric");

    const fabrics = [
        { name: "Cream", color: "#f5f5dc", image: "" },
        { name: "Charcoal", color: "#36454f", image: "" },
        { name: "Slate", color: "#708090", image: "" },
        { name: "Sienna", color: "#a0522d", image: "" },
        { name: "Royal", color: "#136dec", image: "" },
    ];

    const legs = [
        { name: "Natural Walnut", color: "#4a3728", border: "transparent" },
        { name: "Polished Chrome", color: "#e3e3e3", border: "transparent" },
        { name: "Matte Black", color: "#1a1a1a", border: "transparent" },
    ];

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-[#111418] dark:text-white min-h-screen font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* TopAppBar */}
                <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-[#101822]/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => router.back()}
                        className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-start"
                    >
                        <span className="material-symbols-outlined cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full p-2 transition-colors">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center font-outfit">Customizer</h2>
                    <div className="flex w-12 items-center justify-end">
                        <button className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-[#111418] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                    </div>
                </div>

                {/* 3D Viewer Area (HeaderImage) */}
                <div className="relative @container px-4 py-2">
                    <div className="w-full bg-[#f0f2f5] dark:bg-gray-800 flex flex-col justify-end overflow-hidden rounded-[2rem] min-h-[380px] relative shadow-inner border border-white dark:border-gray-700">
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCoxkFQzRaE-arP2ybYvmxb30jUm51nFymmgu2iBHoO64OzJgvKzkHFE4uV4Bug3mnYKgmD-PywdQj41GAbCksYXs4HUR-ggmlgzstaUK_D_okZ1-P5VSxNSF1bK8ohm_CZACpQKhoW6w9L7nbEOQzCUeMSDRYrKaVcbLNAhiwJ32NTF8h-MPpctOtGhWg43m1wUcoQEdgofXFZrd3kXElT6b-HR9PEje4M1QqRXXjaRsLHcg9K9u_UTtA64AzOQiA21eOvqrDpTNE")' }}></div>

                        {/* Floating Controls */}
                        <div className="absolute right-4 top-4 flex flex-col gap-3">
                            <button className="bg-white/90 dark:bg-black/50 p-3 rounded-full shadow-xl backdrop-blur-md hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[#136dec]">view_in_ar</span>
                            </button>
                            <button className="bg-white/90 dark:bg-black/50 p-3 rounded-full shadow-xl backdrop-blur-md hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-gray-700 dark:text-white">360</span>
                            </button>
                        </div>

                        {/* Zoom Indicator */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#617289] dark:text-gray-300 flex items-center gap-2">
                                <span className="material-symbols-outlined text-xs">pinch</span>
                                Pinch to Zoom
                            </p>
                        </div>
                    </div>
                </div>

                {/* Configuration Content */}
                <div className="flex-1 bg-white dark:bg-[#101822] rounded-t-[32px] mt-[-20px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-32 relative z-10 border-t border-gray-100 dark:border-gray-800">
                    {/* HeadlineText & Meta */}
                    <div className="pt-8 px-6">
                        <h1 className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-tight font-outfit uppercase">Modular Cloud Sofa</h1>
                        <p className="text-[#617289] dark:text-gray-400 text-sm font-medium pt-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            Premium velvet fabric • Soft-density foam • 4-6 weeks delivery
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="mt-6 px-6">
                        <div className="flex border-b border-[#dbe0e6] dark:border-gray-700 gap-8 overflow-x-auto no-scrollbar">
                            {["Fabric", "Legs", "Dimensions", "Reviews"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap transition-colors ${activeTab === tab
                                            ? "border-b-[#136dec] text-[#136dec]"
                                            : "border-b-transparent text-[#617289] dark:text-gray-400 hover:text-[#111418] dark:hover:text-white"
                                        }`}
                                >
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Swatches Section */}
                    {activeTab === "Fabric" && (
                        <div className="px-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-[#111418] dark:text-white text-base font-bold mb-4 font-outfit uppercase tracking-wide">Select Fabric</h3>
                            <div className="grid grid-cols-5 gap-4">
                                {fabrics.map((fabric) => (
                                    <button
                                        key={fabric.name}
                                        onClick={() => setSelectedFabric(fabric.name)}
                                        className={`flex flex-col items-center gap-2 group transition-all ${selectedFabric === fabric.name ? "" : "opacity-60 hover:opacity-100"}`}
                                    >
                                        <div className={`size-14 rounded-full border border-black/5 shadow-sm transition-all ${selectedFabric === fabric.name
                                                ? "ring-2 ring-[#136dec] ring-offset-2 ring-offset-white dark:ring-offset-[#101822] scale-110"
                                                : "group-hover:scale-105"
                                            }`} style={{ backgroundColor: fabric.color }}></div>
                                        <span className={`text-[10px] font-bold ${selectedFabric === fabric.name ? "text-[#136dec]" : "text-[#111418] dark:text-gray-400"}`}>
                                            {fabric.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Leg Finishes */}
                    {activeTab === "Fabric" && (
                        <div className="px-6 pt-8 pb-10">
                            <h3 className="text-[#111418] dark:text-white text-base font-bold mb-4 font-outfit uppercase tracking-wide">Leg Finish</h3>
                            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                {legs.map((leg) => (
                                    <button
                                        key={leg.name}
                                        onClick={() => setSelectedLeg(leg.name)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl shrink-0 transition-all border-2 ${selectedLeg === leg.name
                                                ? "bg-[#136dec]/10 border-[#136dec]"
                                                : "bg-white dark:bg-white/5 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                                            }`}
                                    >
                                        <div className="size-8 rounded-lg border border-black/10 shadow-sm" style={{ backgroundColor: leg.color }}></div>
                                        <span className={`text-sm font-bold ${selectedLeg === leg.name ? "text-[#136dec]" : "text-[#111418] dark:text-gray-300"}`}>
                                            {leg.name}
                                        </span>
                                        {selectedLeg === leg.name && <span className="material-symbols-outlined text-[#136dec] text-lg">check_circle</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sticky Footer Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#101822] p-6 border-t border-[#dbe0e6] dark:border-gray-800 flex items-center justify-between gap-6 z-[60] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col">
                        <p className="text-[#617289] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Price</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[#111418] dark:text-white text-3xl font-black font-outfit">$2,499</span>
                            <span className="text-[#617289] dark:text-gray-400 text-xs font-medium">USD</span>
                        </div>
                    </div>
                    <button className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-lg bg-gradient-to-r from-[#136dec] to-[#4b96ff] shadow-[0_8px_20px_rgba(19,109,236,0.3)] hover:shadow-[0_12px_24px_rgba(19,109,236,0.4)] active:scale-95 transition-all">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
