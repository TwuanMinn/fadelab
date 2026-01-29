"use client";

import Link from "next/link";

interface NavItem {
    id: string;
    label: string;
    icon: string;
}

interface ProfileSidebarProps {
    userName: string;
    activeTab: string;
    onTabChange: (tab: string) => void;
    onSignOut: () => void;
}

export const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "grid_view" },
    { id: "bookings", label: "My Bookings", icon: "calendar_month" },
    { id: "history", label: "Style History", icon: "history" },
    { id: "gallery", label: "Visual Archive", icon: "photo_library" },
    { id: "subscriptions", label: "Membership Plans", icon: "workspace_premium" },
    { id: "rewards", label: "Rewards & Status", icon: "stars" },
    { id: "payments", label: "Payment Methods", icon: "account_balance_wallet" },
    { id: "giftcards", label: "Gift Modules", icon: "redeem" },
    { id: "referrals", label: "Refer a Friend", icon: "group_add" },
    { id: "shop", label: "Lab Shop", icon: "shopping_bag" },
    { id: "preferences", label: "Service Vibe", icon: "tune" },
    { id: "security", label: "Clearance & Auth", icon: "lock" },
    { id: "notifications", label: "Signal History", icon: "notifications" },
    { id: "legal", label: "Legal & Policies", icon: "policy" },
    { id: "help", label: "Help Center", icon: "help" },
];

export function ProfileSidebar({ userName, activeTab, onTabChange, onSignOut }: ProfileSidebarProps) {
    return (
        <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-white/10 bg-black/20 backdrop-blur-xl p-6 overflow-y-auto z-20 h-screen sticky top-0">
            <div className="flex flex-col gap-8">
                {/* User Profile Summary */}
                <div className="flex items-center gap-4 p-2 rounded-xl bg-[#1e293b]/50 backdrop-blur-md border border-white/5">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-lg ring-2 ring-blue-500/20"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY7i0hUIrYB7hfMD2NCDQ0fgkWk5BpB1gi1joR4vJV_ab3mDVRzTQUpoKBmLDHG-FJAkmYiaBw43z5DuK5OMQEUtBTwQQ8SZ-RvRABEz2zrKqph5UwEiLru1yAeLQ5guZovWkKzUIHVXkfxJzrhBAXRlmA_izSluXou2MHR7qBBWc89dCmFHO_TJskJuoQwPHBtkXIIXhNvoofdN8LlkxziZyFxUjZ38sTzlGdpLtSXipTUR90XuvwukMF902mwTgyM16nHUHoOb8k")',
                        }}
                    ></div>
                    <div className="flex flex-col">
                        <h2 className="text-base font-bold leading-tight">{userName}</h2>
                        <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider">
                            Member
                        </p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left group ${activeTab === item.id
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className={`material-symbols-outlined text-2xl ${activeTab === item.id ? "fill-1" : "group-hover:text-blue-500 transition-colors"}`}>
                                {item.icon}
                            </span>
                            <span className={`text-sm ${activeTab === item.id ? "font-bold" : "font-medium group-hover:text-blue-500 transition-colors"}`}>
                                {item.label}
                            </span>
                        </button>
                    ))}

                    <Link
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors group mt-4 w-full text-left"
                        href="/"
                    >
                        <span className="material-symbols-outlined text-2xl group-hover:text-blue-500 transition-colors">
                            home
                        </span>
                        <span className="text-sm font-medium group-hover:text-blue-500 transition-colors">
                            Back to Home
                        </span>
                    </Link>
                </nav>
            </div>

            {/* Bottom Action */}
            <button
                onClick={onSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors mt-auto w-full text-left"
            >
                <span className="material-symbols-outlined text-2xl">logout</span>
                <span className="text-sm font-medium">Logout</span>
            </button>
        </aside>
    );
}
