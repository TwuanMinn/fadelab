"use client";

export function GiftcardsTab() {
    const giftHistory = [
        { to: "Michael S.", val: "$50.00", status: "Delivered", date: "Sep 20" },
        { to: "Chris P.", val: "$100.00", status: "Active", date: "Oct 02" }
    ];

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Gift Modules</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Deploy style credits to your tactical network. Digital transmission or physical deployment.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform">
                            <span className="material-symbols-outlined text-[150px]">redeem</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] mb-8">Active Credit Vector</p>
                            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">$150.00</h2>
                            <p className="text-white font-bold text-sm tracking-widest uppercase">FADELAB-GIFT-VAL-092x</p>
                        </div>
                    </div>
                    <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5">
                        <h3 className="text-white font-black uppercase text-sm mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-500">history</span>
                            Transmission History
                        </h3>
                        <div className="space-y-4">
                            {giftHistory.map((g, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div>
                                        <p className="text-white font-bold text-sm">To: {g.to}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">{g.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-black">{g.val}</p>
                                        <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest">{g.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 h-fit">
                    <h3 className="text-white font-black uppercase text-sm mb-8 italic">New Transmission</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-2">Amount</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['$25', '$50', '$100', 'Custom'].map(v => (
                                    <button key={v} className="py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white hover:text-black transition-all">{v}</button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest pl-2">Recipient Matrix</label>
                            <input type="email" placeholder="Input target email..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-800" />
                        </div>
                        <button className="w-full py-5 bg-blue-600 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-all">Initiate Deployment</button>
                    </div>
                </div>
            </div>
        </>
    );
}
