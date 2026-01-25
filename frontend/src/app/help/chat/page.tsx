"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function AgentChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState([
        { role: 'agent', text: 'Hello! I am Sarah from the Returns & Billing team. How can I help you today?' }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', text: input }]);
        setInput("");

        // Mock agent reply
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'agent', text: "Thank you for reaching out. I'm looking into your account details now. One moment please..." }]);
        }, 1500);
    };

    return (
        <div className="bg-slate-50 dark:bg-[#0a0f16] text-[#111418] dark:text-white min-h-screen font-jakarta">
            <div className="relative mx-auto h-full min-h-screen w-full max-w-2xl flex flex-col bg-white dark:bg-[#0a0f16] shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center bg-white dark:bg-[#0a0f16] p-6 justify-between border-b border-slate-100 dark:border-slate-800 z-50">
                    <button
                        onClick={() => router.back()}
                        className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="flex -space-x-2 mb-1">
                            <div className="size-6 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden relative shadow-sm">
                                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Agent" fill className="object-cover" />
                            </div>
                            <div className="size-6 rounded-full border-2 border-white dark:border-slate-900 bg-primary flex items-center justify-center text-[10px] text-white font-black">S</div>
                        </div>
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Support Agent</h2>
                    </div>
                    <button className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">phone</span>
                    </button>
                </div>

                {/* Chat Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium shadow-sm ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-none'
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700'
                                }`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white dark:bg-[#0a0f16] border-t border-slate-100 dark:border-slate-800 pb-10">
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-2 px-4 border border-slate-100 dark:border-slate-700 focus-within:border-primary transition-all">
                        <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent border-none outline-none text-sm font-bold py-3 text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px] filled">send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
