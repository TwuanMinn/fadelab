"use client";

export function NotificationsTab() {
    const notifications = [
        { type: 'confirm', label: 'Session Confirmed', desc: 'Protocol #BK-7782 validated for Oct 24.', time: '2m ago', active: true },
        { type: 'payment', label: 'Payment Success', desc: 'Settlement for FadeLab Elite Plan processed.', time: '1h ago', active: false },
        { type: 'security', label: 'New Access Vector', desc: 'Login detected from MacBook Pro M3 in NY.', time: '4h ago', active: false },
        { type: 'promo', label: 'Reward Unlocked', desc: 'You are now 500pts away from Legendary status.', time: '1d ago', active: false },
    ];

    const getIconAndColor = (type: string) => {
        switch (type) {
            case 'confirm':
                return { icon: 'check_circle', bg: 'bg-emerald-500/20', text: 'text-emerald-500' };
            case 'payment':
                return { icon: 'account_balance_wallet', bg: 'bg-blue-500/20', text: 'text-blue-500' };
            case 'security':
                return { icon: 'security', bg: 'bg-red-500/20', text: 'text-red-500' };
            default:
                return { icon: 'stars', bg: 'bg-purple-500/20', text: 'text-purple-500' };
        }
    };

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">Signal History</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">Full transmission log of all tactical session alerts and system protocols.</p>
            </header>
            <div className="space-y-4">
                {notifications.map((n, i) => {
                    const { icon, bg, text } = getIconAndColor(n.type);
                    return (
                        <div key={i} className={`p-6 rounded-2xl border transition-all flex gap-6 items-start ${n.active ? 'bg-blue-600/10 border-blue-500/30' : 'bg-white/5 border-white/5 opacity-70 hover:opacity-100'}`}>
                            <div className={`size-10 rounded-full flex items-center justify-center ${bg} ${text}`}>
                                <span className="material-symbols-outlined text-xl">{icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-white font-black uppercase text-xs tracking-tight">{n.label}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">{n.time}</p>
                                </div>
                                <p className="text-gray-400 text-xs font-medium">{n.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
