"use client";

export function ReferralsTab() {
    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Referral Protocol</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Expand the network and earn session credits for every successful deployment.</p>
            </header>
            <div className="p-10 bg-blue-600/10 border border-blue-500/20 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-md">
                    <h3 className="text-2xl font-black text-white uppercase italic mb-4">Tactical Invite Matrix</h3>
                    <p className="text-gray-400 mb-8 font-medium italic select-none">Share your unique clearance code. When they book, you both receive $15 in protocol credits.</p>
                    <div className="flex items-center gap-4 bg-black/40 p-2 pl-6 rounded-2xl border border-white/10">
                        <span className="font-mono text-xl font-black text-white tracking-[0.3em]">FADE-ALEX-01</span>
                        <button className="bg-blue-600 hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Copy</button>
                    </div>
                </div>
                <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 w-full md:w-80">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6">Network Growth</p>
                    <div className="flex justify-between items-end mb-4">
                        <p className="text-3xl font-black text-white">4</p>
                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-1">+2 This Month</p>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-blue-600 w-[80%] shadow-glow-blue"></div>
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">1 more for Legendary Status</p>
                </div>
            </div>
        </>
    );
}
