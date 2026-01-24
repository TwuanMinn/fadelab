"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DesignAIPage() {
    const router = useRouter();

    return (
        <div className="relative h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-white flex flex-col">
            {/* Background Image (The "Camera" View) */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center object-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeBgDfk5JjAvlHs375RlP6-mXY8QLNpOudL6jvhAgehKBf89i_gv9TPXallrkzOm4zwCPM2bTUkdUHRKxQyT-1MerITIw6nCIUw57t0qdbeko1w6O0_SxCVd4Bg73jdzZKjUOGN10jZwNcDEoGq9J5xzGnw2wiMCJgXGFz-SRhtGqKMV4tIhgKBLUH78CWtNAzbmaatZBtxWNFpzTiy3U4WjiA8ztYxD-4_ZXGj59pvVEB8TxfiSOVsAyfXGn7bOZRQyQ0PPY2SC4')" }}
                />
                {/* AR Placement Grid Overlay (Simulated) */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30 pointer-events-none"
                    style={{ background: "radial-gradient(circle at center, rgba(19, 109, 236, 0.2) 0%, transparent 70%)" }}
                />
            </div>

            {/* Top Navigation Overlay */}
            <div className="relative z-10 flex items-center justify-between p-4 pt-12 pb-2 bg-gradient-to-b from-black/60 to-transparent">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center size-10 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="text-white text-base font-semibold drop-shadow-md tracking-wide">AR View</h2>
                <button
                    onClick={() => router.push('/design-ai/assistant')}
                    className="flex items-center justify-center size-10 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white hover:bg-primary active:scale-95 transition-all group relative"
                >
                    <span className="material-symbols-outlined">chat</span>
                    <span className="absolute right-12 scale-0 group-hover:scale-100 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all origin-right">Design Assistant</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative z-0 flex items-center justify-center">
                {/* 3D Object Representation */}
                <motion.div
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    className="relative w-64 h-64 flex items-center justify-center group cursor-move"
                >
                    {/* Selection Ring */}
                    <motion.div
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-x-0 bottom-4 h-32 border-2 border-primary/50 rounded-[100%] bg-primary/10 transform -rotate-x-60"
                    />
                    {/* Object Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuButNkzMQxTrEX3rYp0l_rgyrlFYgHRbTfvopAbXNBD_fo3Al-yS-aw5rANoAU3lp5teylbhZkbrwsUl0ZU0N_yRTkEXaS05SyX6uGqj1l4LEDO6nlmHkcmDN-GjuX2OwVg7emseUG3-neAAarTRAEl26fpde0RrcBm0Zbk1xjHX_d1y3mC8ydpwKd2TcvPMN_qHuuQGdR8yVTjvuIW4uuqPK3v17Evu-8zLZWkHllHty69L9xL-bkmumFTC6b_m4BCmQ6n6qGoUAY"
                            alt="3D Chair"
                            fill
                            className="object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    {/* Anchor Point */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20" />
                </motion.div>

                {/* Right Side Toggle Controls */}
                <div className="absolute right-4 top-1/4 flex flex-col gap-3">
                    <button className="size-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">light_mode</span>
                    </button>
                    <button className="size-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                    </button>
                    <button
                        onClick={() => router.push('/design-ai/moodboard')}
                        className="size-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors group relative"
                    >
                        <span className="material-symbols-outlined text-[20px]">collections</span>
                        <span className="absolute right-12 scale-0 group-hover:scale-100 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all origin-right">Moodboard View</span>
                    </button>
                    <button className="size-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">floor</span>
                    </button>
                </div>
            </div>

            {/* Bottom Interface Overlay */}
            <div className="relative z-20 flex flex-col gap-4 pb-12 px-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                {/* Gesture Hint */}
                <div className="flex justify-center">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-gray-300">touch_app</span>
                        <p className="text-gray-200 text-xs font-medium">Drag to move • Pinch to scale</p>
                    </div>
                </div>

                {/* Product Card */}
                <div className="bg-black/60 backdrop-blur-2xl rounded-2xl p-4 shadow-lg border border-white/10">
                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex flex-col">
                                <h3 className="text-white text-lg font-bold leading-tight">Velvet Lounge Chair</h3>
                                <p className="text-gray-300 text-sm font-medium">$1,299.00</p>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-1">
                                <button className="size-8 rounded-full bg-[#3b4554] ring-2 ring-transparent ring-offset-2 ring-offset-black transition-all hover:scale-110" />
                                <button className="size-8 rounded-full bg-[#136dec] ring-2 ring-white ring-offset-2 ring-offset-black transition-all hover:scale-110" />
                                <button className="size-8 rounded-full bg-[#a52a2a] ring-2 ring-transparent ring-offset-2 ring-offset-black transition-all hover:scale-110" />
                            </div>
                        </div>
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0 relative">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuButNkzMQxTrEX3rYp0l_rgyrlFYgHRbTfvopAbXNBD_fo3Al-yS-aw5rANoAU3lp5teylbhZkbrwsUl0ZU0N_yRTkEXaS05SyX6uGqj1l4LEDO6nlmHkcmDN-GjuX2OwVg7emseUG3-neAAarTRAEl26fpde0RrcBm0Zbk1xjHX_d1y3mC8ydpwKd2TcvPMN_qHuuQGdR8yVTjvuIW4uuqPK3v17Evu-8zLZWkHllHty69L9xL-bkmumFTC6b_m4BCmQ6n6qGoUAY"
                                alt="Velvet Chair"
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex gap-3 items-stretch">
                    <button className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-md text-white rounded-xl w-14 h-14 border border-white/10 active:bg-primary/20 transition-all">
                        <span className="material-symbols-outlined text-[22px]">360</span>
                    </button>
                    <button className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-md text-white rounded-xl w-14 h-14 border border-white/10 active:bg-red-500/20 active:text-red-400 transition-all">
                        <span className="material-symbols-outlined text-[22px]">delete</span>
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-primary to-[#3b82f6] hover:to-[#2563eb] text-white font-bold text-base rounded-xl h-14 shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined">check_circle</span>
                        Confirm Placement
                    </button>
                </div>
            </div>

            <style jsx>{`
                .rotate-x-60 {
                    transform: rotateX(60deg);
                }
            `}</style>
        </div>
    );
}
