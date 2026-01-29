"use client";

export function SubscriptionsTab() {
    const plans = [
        { name: "Standby", price: "$0", desc: "Basic tactical grooming", features: ["Online Booking", "History Archive", "Basic Rewards"], active: false },
        { name: "Elite", price: "$45", desc: "Priority execution protocol", features: ["2 Priority Cuts / Mo", "Scalp Massage Matrix", "10% Product Discount", "Unlimited Wash & Style"], active: true },
        { name: "Legendary", price: "$85", desc: "Absolute style dominance", features: ["4 Priority Cuts / Mo", "Full Facial Treatment", "20% Product Discount", "VIP Event Access", "Dedicated Concierge"], active: false }
    ];

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Membership Plans</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Access curated grooming protocols and priority clearance levels.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map(plan => (
                    <div
                        key={plan.name}
                        className={`flex flex-col p-10 rounded-[3rem] border transition-all duration-500 ${plan.active ? 'bg-blue-600/10 border-blue-500 shadow-2xl shadow-blue-500/10' : 'bg-[#1e293b]/50 border-white/5 hover:border-white/10'}`}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-2xl font-black text-white uppercase italic">{plan.name}</h3>
                            {plan.active && <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Active Plan</span>}
                        </div>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                            <span className="text-gray-500 font-bold text-xs uppercase">/ month</span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-10">{plan.desc}</p>
                        <ul className="flex flex-col gap-4 mb-12 flex-1">
                            {plan.features.map(f => (
                                <li key={f} className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                    <span className="material-symbols-outlined text-blue-500 text-lg">check_circle</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${plan.active ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'}`}>
                            {plan.active ? 'Manage Plan' : 'Initiate Upgrade'}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
