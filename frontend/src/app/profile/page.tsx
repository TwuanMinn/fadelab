"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

// Import components
import {
    AuthForm,
    ProfileSidebar,
    DashboardTab,
    BookingsTab,
    HistoryTab,
    GalleryTab,
    SubscriptionsTab,
    RewardsTab,
    PaymentsTab,
    GiftcardsTab,
    ReferralsTab,
    ShopTab,
    PreferencesTab,
    SecurityTab,
    NotificationsTab,
    LegalTab,
    HelpTab,
} from "./components";

// Tab content renderer
function TabContent({ activeTab, userName }: { activeTab: string; userName: string }) {
    switch (activeTab) {
        case 'dashboard':
            return <DashboardTab userName={userName} />;
        case 'bookings':
            return <BookingsTab />;
        case 'history':
            return <HistoryTab />;
        case 'gallery':
            return <GalleryTab />;
        case 'subscriptions':
            return <SubscriptionsTab />;
        case 'rewards':
            return <RewardsTab />;
        case 'payments':
            return <PaymentsTab />;
        case 'giftcards':
            return <GiftcardsTab />;
        case 'referrals':
            return <ReferralsTab />;
        case 'shop':
            return <ShopTab />;
        case 'preferences':
            return <PreferencesTab />;
        case 'security':
            return <SecurityTab />;
        case 'notifications':
            return <NotificationsTab />;
        case 'legal':
            return <LegalTab />;
        case 'help':
            return <HelpTab />;
        default:
            return <DashboardTab userName={userName} />;
    }
}

function ProfileSettingsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, profile, loading, signOut } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");

    useEffect(() => {
        setMounted(true);
        const tabParam = searchParams.get('tab');
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    const handleSignOut = async () => {
        await signOut();
        // Use hard redirect to ensure auth state is fully cleared
        window.location.href = '/';
    };

    // Loading state
    if (!mounted || loading) {
        return (
            <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl font-bold">Loading...</div>
            </div>
        );
    }

    // Show login form if not authenticated
    if (!user) {
        return <AuthForm />;
    }

    // User is authenticated - show dashboard
    const userName = profile?.full_name || user.email?.split('@')[0] || 'User';

    return (
        <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white font-display overflow-x-hidden min-h-screen flex flex-row transition-colors duration-300">
            {/* Side Navigation */}
            <ProfileSidebar
                userName={userName}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSignOut={handleSignOut}
            />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-y-auto scroll-smooth w-full">
                <div className="container mx-auto max-w-[1200px] p-4 md:p-6 lg:p-10 pb-24">
                    {/* Mobile Header */}
                    <div className="lg:hidden flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="bg-[#1e293b]/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                                <span className="material-symbols-outlined text-white">arrow_back</span>
                            </Link>
                            <span className="font-bold text-lg capitalize">{activeTab}</span>
                        </div>
                        <div
                            className="size-10 rounded-full bg-cover bg-center ring-2 ring-blue-500/20"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY7i0hUIrYB7hfMD2NCDQ0fgkWk5BpB1gi1joR4vJV_ab3mDVRzTQUpoKBmLDHG-FJAkmYiaBw43z5DuK5OMQEUtBTwQQ8SZ-RvRABEz2zrKqph5UwEiLru1yAeLQ5guZovWkKzUIHVXkfxJzrhBAXRlmA_izSluXou2MHR7qBBWc89dCmFHO_TJskJuoQwPHBtkXIIXhNvoofdN8LlkxziZyFxUjZ38sTzlGdpLtSXipTUR90XuvwukMF902mwTgyM16nHUHoOb8k")' }}
                        />
                    </div>

                    {/* Tab Content */}
                    <TabContent activeTab={activeTab} userName={userName} />
                </div>
            </main>
        </div>
    );
}

export default function ProfileSettingsPage() {
    return (
        <Suspense fallback={
            <div className="bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a] text-white min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl font-bold">Loading...</div>
            </div>
        }>
            <ProfileSettingsContent />
        </Suspense>
    );
}
