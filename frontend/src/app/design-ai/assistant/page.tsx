"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Message {
    id: number;
    text: string;
    sender: "ai" | "user";
    time: string;
    image?: string;
    suggestions?: ProductSuggestion[];
}

interface ProductSuggestion {
    id: number;
    name: string;
    price: string;
    category: string;
    image: string;
}

export default function DesignAssistant() {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "ai",
            text: "Hello! Upload a photo of your room, and I'll suggest a modern layout for you.",
            time: "10:23 AM"
        }
    ]);

    const suggestions: ProductSuggestion[] = [
        {
            id: 1,
            name: "Velvet Sofa",
            price: "$850",
            category: "Mid-century modern style",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyfITfnOoPWgWdqxOVkZLRHcFbbnPCjrhTmE-RodghNAZN8ukIllz3vkJZoqhUYt96K76KYWr1rjmE_--rbtsSz_eIi2bsUiMecS3aAHOPeHIsMyceJeTFmUp-iyApxLmbC1Oyq87j6IqhZDcAI94WJYWmEWd0sK5jiOHRA_jBcr18VcYfmV8hwK3Q9rY6qiC6s8WnocFgQ8YKajYGlPm2FkPkjIQ_A10nZI2wsp8XLy1hj-2NGvyxGVQdGYafae5_6ba4CWD80io"
        },
        {
            id: 2,
            name: "Glass Coffee Table",
            price: "$390",
            category: "Tempered glass, Oak base",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe8zG5ARnLtoONNFpcJh1DgJLUr8DW7fAqorZS1LpBPB52hl8bvPBiZ_lZHt4wr2pPMYJi8cqIyO-VB3nJpiST2oZUq9NECkg2dut41hiUHfaayCkUjrZPe2mj8J9FJbs_4k9CZtYsgKVRfKwSuWd6ZA8Q4XqsLNpvXKahkqlAqy6u0nlCbXNC_8FKLWXTK5naQOrkjWJxffW_Oe4S646uszF7fJa0tFB9FpqrZZNslEnxjssR3U2ZohPf5ZI3pwpCsq0vFYUTRlM"
        },
        {
            id: 3,
            name: "Brass Floor Lamp",
            price: "$120",
            category: "Adjustable height",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeIbbk7FAa1QKBf8sMz9pyBfWNW_3NRj-nMc_bAfW28UIGsGcBrcPe9TtbqdSu0LaJ1tJvyCKtiGbMvQvI3y35RvdQZYaQiCLX-0H752OpFwEJe2zuFOtWX8pw3trREqorZelwfJbdFWAWYWKxtKQa-OXip-FagFlCOLmBuFD7Gub_OcnfPJnazGJi1M6-IHUqaRJ4F3OfwEtGMhTZwIQX52mO4-J5VCipDuNRSStcvBTk4senSlSWAJRzEHJ9H9vzThRjuwd1Ld0"
        }
    ];

    // Simulate flow
    useEffect(() => {
        if (messages.length === 1) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: 2,
                    sender: "user",
                    text: "I need a sofa and coffee table that fits here.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw8oR7bSMTlY9QQRdHA_ibmj9BNMptB15YP8Ifsw1pdSNykiPZRIztCaFQM2PUMMLPaUI7xwBJJ2Qr6KFae11zcYoIWK-F8VmWhDrfway8WhP89U1vENKbJ9f6vn4ysPUusIg99LXmxq-lXF5Sv3eQ87TYGTSqVfOef_6GN-fKHwOlol2khjZn8aFeJFFr2DdwWD2VYvD_8DJB6ujpfEvbqpc8AymfQ9C2HW_eMUC2SailmEcHuFxwOFc_KOB2ZLcwYUbW8RPRWWo",
                    time: "10:25 AM"
                }]);
            }, 1000);

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: 3,
                    sender: "ai",
                    text: "Based on your lighting and floor tone, I recommend this mid-century modern set. The blue velvet will contrast beautifully with the warm wood.",
                    time: "10:25 AM",
                    suggestions: suggestions
                }]);
            }, 2500);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setMessages(prev => [...prev, {
            id: Date.now(),
            sender: "user",
            text: inputValue,
            time: time
        }]);
        setInputValue("");
    };

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-[#111418] dark:text-white h-screen w-full flex justify-center font-jakarta overflow-hidden">
            <div className="relative flex h-full w-full max-w-2xl flex-col bg-white dark:bg-[#0a0f16] shadow-2xl overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#0a0f16]/95 backdrop-blur-xl z-20 border-b border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => router.back()}
                        className="flex size-12 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 active:scale-95"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <h1 className="text-xl font-black font-outfit uppercase tracking-tighter">Design Assistant</h1>
                        <span className="text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-green-500/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                        </span>
                    </div>
                    <button className="flex size-12 items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-all">
                        <span className="material-symbols-outlined">history</span>
                    </button>
                </header>

                {/* Chat Display */}
                <main
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-8 bg-white dark:bg-[#0a0f16] no-scrollbar pb-32"
                >
                    <div className="flex justify-center">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/50">Today</span>
                    </div>

                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex items-end gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                {/* Avatar */}
                                <div className="shrink-0">
                                    <div className="relative size-12 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-lg">
                                        <Image
                                            src={msg.sender === "ai"
                                                ? "https://lh3.googleusercontent.com/aida-public/AB6AXuC2jWhQr5uowtwpmYTiaGpDN5X99rSRRJcWbaDw1h3UPgMzNRthkZLTHB1eesolqMFzecDn89IxuEUKvWR5Y1X_sWg_-GJDMBeQ-UE57UnsIGXjptsqxdsH9ntJucoX2EWhpzXgfhACc49fPL9YAV-SQTwjCBF66NLiMH3hQKW_kNsnV-tQ_SSYuy_fxoyyg_S-6ljLiWxHSXdKs_KJKxOSFdUUXsoNwBejeQ7kmTsF2JzmaqG_Uiz3Vmdy6Y40EJRvHh9yxsiODdQ"
                                                : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                            }
                                            alt="Avatar"
                                            fill
                                            className="object-cover"
                                        />
                                        {msg.sender === "ai" && (
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-[3px] border-white dark:border-[#0a0f16] rounded-full" />
                                        )}
                                    </div>
                                </div>

                                <div className={`flex flex-col gap-2 max-w-[80%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                                    {/* Subtitle */}
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mx-1">
                                        {msg.sender === "ai" ? "AI Stylist" : "You"} • {msg.time}
                                    </span>

                                    {/* Message Bubble */}
                                    <div className={`p-5 rounded-[2rem] shadow-sm text-sm font-medium leading-relaxed ${msg.sender === "ai"
                                            ? "bg-slate-50 dark:bg-slate-800/80 rounded-bl-none text-slate-900 dark:text-slate-100"
                                            : "bg-primary rounded-br-none text-white shadow-xl shadow-primary/20"
                                        }`}>
                                        {msg.text}
                                    </div>

                                    {/* Image Attachment */}
                                    {msg.image && (
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="relative aspect-video w-full max-w-sm rounded-[2rem] overflow-hidden border-4 border-primary/20 shadow-2xl mt-2"
                                        >
                                            <Image src={msg.image} alt="User Upload" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/10" />
                                        </motion.div>
                                    )}

                                    {/* Product Suggestions Carousel */}
                                    {msg.suggestions && (
                                        <div className="w-full mt-4 -mx-14 px-14">
                                            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-6 px-6 snap-x">
                                                {msg.suggestions.map((p) => (
                                                    <div key={p.id} className="snap-center shrink-0 w-64 flex flex-col gap-4 rounded-[2rem] bg-white dark:bg-slate-800/90 p-5 shadow-2xl border border-slate-100 dark:border-slate-700/50">
                                                        <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-slate-50 dark:bg-slate-900/50">
                                                            <Image src={p.image} alt={p.name} fill className="object-cover p-4 transition-transform hover:scale-110 duration-700" />
                                                            <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-xl">
                                                                {p.price}
                                                            </div>
                                                        </div>
                                                        <div className="px-1 text-center">
                                                            <h3 className="text-sm font-black text-slate-900 dark:text-white truncate font-outfit uppercase tracking-tight">{p.name}</h3>
                                                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">{p.category}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => router.push(`/product/${p.id}`)}
                                                            className="w-full h-12 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all active:scale-95"
                                                        >
                                                            View Item
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Summary Action Card */}
                                            <div className="mt-6 p-6 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black text-white shadow-2xl flex flex-row items-center justify-between gap-6 border border-white/10">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-black mb-1">Total Set Estimate</span>
                                                    <span className="text-3xl font-black font-outfit">$1,360</span>
                                                </div>
                                                <button className="flex-1 max-w-[180px] h-14 bg-gradient-to-r from-primary to-blue-500 hover:scale-[1.02] shadow-xl shadow-primary/30 text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95">
                                                    <span>Buy All</span>
                                                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </main>

                {/* Input Area */}
                <footer className="absolute bottom-0 w-full bg-white/90 dark:bg-[#0a0f16]/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-6 pb-10 z-30">
                    <div className="flex items-center gap-4 max-w-4xl mx-auto">
                        <button className="flex items-center justify-center size-14 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-primary transition-all active:scale-90 shrink-0">
                            <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                        </button>
                        <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] flex items-center px-6 h-14 border-2 border-transparent focus-within:border-primary/30 focus-within:bg-white dark:focus-within:bg-slate-800 transition-all">
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-bold"
                                placeholder="Describe your dream space..."
                                type="text"
                            />
                            <button className="text-slate-400 hover:text-primary p-2 transition-colors">
                                <span className="material-symbols-outlined text-2xl">mic</span>
                            </button>
                        </div>
                        <button
                            onClick={handleSend}
                            className="flex items-center justify-center size-14 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/30 hover:bg-blue-600 transition-all shrink-0 active:scale-90"
                        >
                            <span className="material-symbols-outlined text-2xl">send</span>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}
