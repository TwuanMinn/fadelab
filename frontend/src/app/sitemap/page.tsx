"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SiteMapPage() {
    const router = useRouter();

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] min-h-screen font-jakarta text-[#111418] dark:text-white pb-20">
            <div className="relative flex flex-col w-full max-w-md mx-auto bg-white dark:bg-[#101822] min-h-screen shadow-xl overflow-x-hidden">
                {/* TopAppBar */}
                <div className="flex items-center bg-white dark:bg-[#101822] p-4 pb-2 justify-between sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => router.back()}
                        className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center font-outfit">Site Map</h2>
                    <div className="flex w-12 items-center justify-end">
                        <button className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-[#111418] dark:text-white transition-colors">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                    </div>
                </div>

                {/* Intro BodyText */}
                <div className="bg-white dark:bg-[#101822] px-4 pt-6 pb-3">
                    <p className="text-[#111418] dark:text-gray-300 text-base font-normal leading-relaxed">
                        A complete directory of our furniture collections and services. Use the categories below to navigate our platform.
                    </p>
                </div>

                {/* SearchBar */}
                <div className="px-4 py-3 bg-white dark:bg-[#101822]">
                    <div className="flex w-full items-center rounded-xl h-12 overflow-hidden border border-gray-200 dark:border-gray-700 bg-[#f0f2f4] dark:bg-gray-800/50 focus-within:border-[#136dec] focus-within:ring-1 focus-within:ring-[#136dec] transition-all">
                        <div className="flex items-center justify-center pl-4 text-[#617289]">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="flex w-full bg-transparent border-none focus:outline-0 h-full placeholder:text-[#617289] px-4 text-base font-normal leading-normal text-[#111418] dark:text-white"
                            placeholder="Search for a page..."
                        />
                    </div>
                </div>

                {/* Shop Section */}
                <div className="bg-white dark:bg-[#101822] pt-4">
                    <h2 className="text-[#136dec] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-4 font-outfit">Shop</h2>

                    {[
                        { label: 'Living Room Furniture', href: '/catalog?category=living-room' },
                        { label: 'Bedroom Collections', href: '/catalog?category=bedroom' },
                        { label: 'Office & Workspace', href: '/catalog?category=office' },
                        { label: 'New Arrivals', href: '/catalog?sort=newest', icon: 'stars', iconColor: 'text-[#136dec]' },
                        { label: 'Sale & Clearance', href: '/catalog?tag=sale', labelColor: 'text-red-500', icon: 'sell', iconColor: 'text-red-500' }
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center gap-4 px-4 min-h-14 justify-between border-b border-gray-50 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                        >
                            <p className={`${item.labelColor || 'text-[#111418] dark:text-white'} text-base font-medium leading-normal flex-1 truncate`}>{item.label}</p>
                            <div className={`shrink-0 ${item.iconColor || 'text-[#111418] dark:text-white group-hover:text-[#136dec]'}`}>
                                <span className="material-symbols-outlined">{item.icon || 'chevron_right'}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* About Section */}
                <div className="bg-white dark:bg-[#101822]">
                    <h2 className="text-[#136dec] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10 font-outfit">About Us</h2>
                    {[
                        { label: 'Our Story', href: '/about' },
                        { label: 'Sustainability Commitment', href: '/about/sustainability' },
                        { label: 'Careers', href: '/careers' }
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center gap-4 px-4 min-h-14 justify-between border-b border-gray-50 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                        >
                            <p className="text-[#111418] dark:text-white text-base font-normal leading-normal flex-1 truncate">{item.label}</p>
                            <div className="shrink-0 text-gray-400 group-hover:text-[#136dec]">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Support Section */}
                <div className="bg-white dark:bg-[#101822]">
                    <h2 className="text-[#136dec] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10 font-outfit">Support</h2>
                    {[
                        { label: 'Help Center / FAQ', href: '/help' },
                        { label: 'Shipping & Returns', href: '/help/returns' },
                        { label: 'Order Tracking', href: '/tracking', icon: 'local_shipping' }
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center gap-4 px-4 min-h-14 justify-between border-b border-gray-50 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                        >
                            <p className="text-[#111418] dark:text-white text-base font-normal leading-normal flex-1 truncate">{item.label}</p>
                            <div className="shrink-0 text-gray-400 group-hover:text-[#136dec]">
                                <span className="material-symbols-outlined">{item.icon || 'chevron_right'}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Services Section */}
                <div className="bg-white dark:bg-[#101822]">
                    <h2 className="text-[#136dec] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10 font-outfit">Services</h2>
                    {[
                        { label: 'Interior Design Consultation', href: '/design-ai', icon: 'brush' },
                        { label: 'White Glove Delivery', href: '/services/delivery', icon: 'inventory' },
                        { label: 'Gift Cards', href: '/gift-cards', icon: 'card_giftcard' }
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center gap-4 px-4 min-h-14 justify-between border-b border-gray-50 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                        >
                            <p className="text-[#111418] dark:text-white text-base font-normal leading-normal flex-1 truncate">{item.label}</p>
                            <div className="shrink-0 text-gray-400 group-hover:text-[#136dec]">
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Sticky Bottom CTA */}
                <div className="mt-12 mb-20 px-4">
                    <div className="bg-[#136dec]/10 dark:bg-[#136dec]/20 p-6 rounded-xl border border-[#136dec]/20 flex flex-col items-center gap-4 text-center">
                        <p className="text-[#111418] dark:text-white font-semibold">Can&apos;t find what you&apos;re looking for?</p>
                        <button
                            onClick={() => router.push('/help/chat')}
                            className="bg-[#136dec] text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-[#136dec]/30 w-full active:scale-95 transition-all hover:bg-blue-600"
                        >
                            Chat with an Expert
                        </button>
                    </div>
                </div>

                {/* Footer Meta */}
                <div className="bg-gray-50 dark:bg-[#0a0f16] py-10 px-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center mb-6">
                        <Link className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#136dec] transition-colors" href="#">Privacy Policy</Link>
                        <Link className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#136dec] transition-colors" href="#">Terms of Use</Link>
                        <Link className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#136dec] transition-colors" href="#">Cookie Settings</Link>
                    </div>
                    <p className="text-xs text-center text-gray-400 dark:text-gray-600">© 2024 Furnza Co. All Rights Reserved.</p>
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#101822]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex justify-around py-3 z-40 max-w-md mx-auto">
                    <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#136dec] transition-colors">
                        <span className="material-symbols-outlined">home</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
                    </Link>
                    <Link href="/catalog" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#136dec] transition-colors">
                        <span className="material-symbols-outlined">chair</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide">Shop</span>
                    </Link>
                    <div className="flex flex-col items-center gap-1 text-[#136dec]">
                        <span className="material-symbols-outlined filled">account_tree</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide">Site Map</span>
                    </div>
                    <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#136dec] transition-colors">
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide">Cart</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
