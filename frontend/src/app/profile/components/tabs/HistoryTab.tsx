"use client";

export function HistoryTab() {
    const historyItems = [
        { id: 1, service: "Premium Fade", date: "Oct 10, 2023", barber: "Jason Miller", price: "$45", rating: 5 },
        { id: 2, service: "Beard Sculpt", date: "Sep 25, 2023", barber: "Sarah Jenkins", price: "$35", rating: 5 },
        { id: 3, service: "Classic Cut", date: "Sep 08, 2023", barber: "Mark Davis", price: "$30", rating: 4 },
        { id: 4, service: "Full Service", date: "Aug 20, 2023", barber: "James K.", price: "$75", rating: 5 },
    ];

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Style History</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">A chronological record of your grooming sessions and styling evolution.</p>
            </header>
            <div className="space-y-4">
                {historyItems.map(item => (
                    <div
                        key={item.id}
                        className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/10 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-500 text-2xl">content_cut</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold">{item.service}</h3>
                                <p className="text-gray-400 text-sm">{item.date} • with {item.barber}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`material-symbols-outlined text-lg ${i < item.rating ? 'text-yellow-500' : 'text-gray-700'}`}>
                                        star
                                    </span>
                                ))}
                            </div>
                            <span className="text-white font-black">{item.price}</span>
                            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all">
                                Rebook
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
