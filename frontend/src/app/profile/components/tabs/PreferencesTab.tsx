"use client";

export function PreferencesTab() {
    const musicOptions = [
        { id: 'lofi', label: 'Lo-Fi / Beats', sub: 'Low intensity atmospheric' },
        { id: 'jazz', label: 'Jazz / Blues', sub: 'Classic barbershop vibe' },
        { id: 'techno', label: 'Minimal / Deep', sub: 'High focus energy' },
        { id: 'silence', label: 'Zero Signal', sub: 'No music during session' }
    ];

    const refreshmentOptions = [
        { label: 'Black Coffee', icon: 'coffee' },
        { label: 'Sparkling Water', icon: 'water_drop' },
        { label: 'Craft Brew', icon: 'sports_bar' },
        { label: 'Refuse Refreshment', icon: 'block' }
    ];

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Service Vibe</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Calibrate your in-chair atmosphere. These parameters are deployed to the specialist terminal upon your arrival.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="p-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5">
                    <h3 className="text-white font-black uppercase text-sm mb-8 flex items-center gap-3 italic">
                        <span className="material-symbols-outlined text-blue-500">graphic_eq</span>
                        Auditory Matrix
                    </h3>
                    <div className="space-y-4">
                        {musicOptions.map(vibe => (
                            <button key={vibe.id} className="w-full p-6 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl flex items-center justify-between group transition-all">
                                <div className="text-left">
                                    <p className="text-white font-bold text-sm uppercase">{vibe.label}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">{vibe.sub}</p>
                                </div>
                                <div className="size-4 rounded-full border-2 border-white/10 group-hover:border-blue-500 transition-colors"></div>
                            </button>
                        ))}
                    </div>
                </section>
                <section className="p-8 bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] border border-white/5">
                    <h3 className="text-white font-black uppercase text-sm mb-8 flex items-center gap-3 italic">
                        <span className="material-symbols-outlined text-blue-500">coffee</span>
                        Refreshment protocol
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {refreshmentOptions.map(item => (
                            <button key={item.label} className="flex items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-blue-600/10 hover:border-blue-500/30 transition-all text-left group">
                                <span className="material-symbols-outlined text-gray-500 group-hover:text-blue-500 transition-colors">{item.icon}</span>
                                <span className="text-white font-black uppercase text-xs tracking-widest">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </section>
                <section className="md:col-span-2 p-10 bg-blue-600/10 border border-blue-500/20 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Social Interaction Level</h3>
                        <p className="text-gray-400 text-sm font-medium">Define the conversational depth for your session.</p>
                    </div>
                    <div className="flex bg-black/40 p-2 rounded-2xl border border-white/10">
                        {['Quiet', 'Moderate', 'Chatty'].map(level => (
                            <button key={level} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${level === 'Moderate' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:text-white'}`}>{level}</button>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
