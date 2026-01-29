"use client";

export function RewardsTab() {
    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Rewards & Status</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Manage your loyalty points and unlock exclusive member benefits.</p>
            </header>
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-10 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-6xl text-blue-500 mb-4">military_tech</span>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Elite Status Module</h2>
                <p className="text-gray-400 max-w-md mb-8">You are 500 points away from reaching 'Legendary' status which unlocks 20% off all sessions.</p>
                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-8">
                    <div className="h-full bg-blue-500 w-[75%] shadow-glow"></div>
                </div>
                <button className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors">Redeem Points</button>
            </div>
        </>
    );
}
