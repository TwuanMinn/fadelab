"use client";

export function SecurityTab() {
    const sessions = [
        { device: "MacBook Pro M3", loc: "New York, US", ip: "192.168.1.1", active: true },
        { device: "iPhone 15 Pro", loc: "New York, US", ip: "172.16.0.4", active: false }
    ];

    const authToggles = [
        { label: "2-Factor Vector", active: true },
        { label: "Biometric Link", active: false },
        { label: "Session Alert", active: true }
    ];

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Clearance & Auth</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">High-level encryption controls and terminal access logs. Keep your profile secured.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center gap-6 mb-8">
                        <div className="size-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                            <span className="material-symbols-outlined font-black">shield_person</span>
                        </div>
                        <div>
                            <p className="text-white font-black text-sm uppercase tracking-tight">Biometric Shield Active</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Your data is synced with end-to-end multi-vector encryption.</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-8 space-y-6">
                    <div className="p-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5">
                        <h3 className="text-white font-black uppercase text-sm mb-8 italic">Active Access Sessions</h3>
                        <div className="space-y-4">
                            {sessions.map((session, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group">
                                    <div className="flex items-center gap-6">
                                        <span className="material-symbols-outlined text-gray-500 text-3xl group-hover:text-blue-500 transition-colors">{session.device.includes('iPhone') ? 'smartphone' : 'laptop_mac'}</span>
                                        <div>
                                            <p className="text-white font-bold text-sm tracking-tight">{session.device}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{session.loc} • IP: {session.ip}</p>
                                        </div>
                                    </div>
                                    {session.active ? (
                                        <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">Current</span>
                                    ) : (
                                        <button className="text-[9px] font-black text-red-500 hover:text-white transition-colors uppercase tracking-widest">Terminate</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4 space-y-6">
                    <div className="p-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5">
                        <h3 className="text-white font-black uppercase text-sm mb-8 italic">Auth Toggles</h3>
                        <div className="space-y-6">
                            {authToggles.map(t => (
                                <div key={t.label} className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-white uppercase">{t.label}</span>
                                    <div className={`w-12 h-6 rounded-full relative p-1 transition-colors cursor-pointer ${t.active ? 'bg-blue-600' : 'bg-white/10'}`}>
                                        <div className={`size-4 bg-white rounded-full transition-transform ${t.active ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-8 bg-red-600/5 border border-red-600/10 rounded-[2.5rem] text-center">
                        <p className="text-[10px] text-red-500/60 font-black uppercase tracking-[0.2em] mb-4">Critical Action</p>
                        <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-600/10">Purge Account Matrix</button>
                    </div>
                </div>
            </div>
        </>
    );
}
