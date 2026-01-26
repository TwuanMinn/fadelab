"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function MembershipPage() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white font-display min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7ebf3] dark:border-b-gray-800 px-6 lg:px-10 py-5 bg-white dark:bg-gray-900 sticky top-0 z-50">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-3 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors group"
                >
                    <div className="size-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">arrow_back</span>
                    </div>
                    <span className="text-lg font-bold">Back</span>
                </button>
                <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2">
                    FadeLab Rewards
                </h2>
                <div className="w-8"></div> {/* Spacer for centering */}
            </header>

            {/* Main Content */}
            <main className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8 pb-24">
                <div className="w-full max-w-[1024px] flex flex-col gap-8">
                    {/* Hero / Status Section */}
                    <section className="flex flex-col gap-6 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none bg-gradient-to-l from-primary to-transparent"></div>
                        <div className="flex flex-wrap justify-between items-end gap-4 relative z-10">
                            <div className="flex flex-col gap-2">
                                <p className="text-[#4c669a] dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Welcome back</p>
                                <h1 className="text-[#0d121b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Alex Morgan</h1>
                                <div className="inline-flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 w-fit">
                                    <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-sm">stars</span>
                                    <span className="text-yellow-700 dark:text-yellow-400 text-sm font-bold">Gold Tier Member</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center justify-center bg-background-light dark:bg-gray-800 rounded-lg p-4 min-w-[120px] border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-colors">
                                    <span className="text-2xl font-bold text-primary">1,450</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Points</span>
                                </div>
                                <div className="flex flex-col items-center justify-center bg-background-light dark:bg-gray-800 rounded-lg p-4 min-w-[120px] border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-colors">
                                    <span className="text-2xl font-bold text-[#0d121b] dark:text-white">350</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">To Platinum</span>
                                </div>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="flex flex-col gap-2 relative z-10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#0d121b] dark:text-gray-200 font-medium">Progress to Platinum Status</span>
                                <span className="text-[#0d121b] dark:text-gray-200 font-bold">80%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out shadow-glow" style={{ width: '80%' }}></div>
                            </div>
                            <p className="text-[#4c669a] dark:text-gray-400 text-xs font-normal">Earn 50 more points to unlock a complimentary monthly treatment.</p>
                        </div>
                    </section>

                    {/* Tier Comparison Table */}
                    <section className="flex flex-col gap-4">
                        <div className="px-2">
                            <h2 className="text-[#0d121b] dark:text-white text-2xl font-bold tracking-tight">Tier Benefits</h2>
                            <p className="text-[#4c669a] dark:text-gray-400 text-sm mt-1">Unlock exclusive perks as you level up.</p>
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                                        <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Benefit</th>
                                        <th className="px-6 py-4 font-bold text-[#0d121b] dark:text-white text-center">Bronze</th>
                                        <th className="px-6 py-4 font-bold text-[#0d121b] dark:text-white text-center">Silver</th>
                                        <th className="px-6 py-4 font-bold text-primary text-center bg-primary/5 dark:bg-primary/10 relative">
                                            Gold
                                            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                                        </th>
                                        <th className="px-6 py-4 font-bold text-[#0d121b] dark:text-white text-center">Platinum</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0d121b] dark:text-gray-200">Booking Priority</td>
                                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">Standard</td>
                                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">24hr Advance</td>
                                        <td className="px-6 py-4 text-center font-bold text-primary bg-primary/5 dark:bg-primary/10">Priority</td>
                                        <td className="px-6 py-4 text-center text-[#0d121b] dark:text-white font-medium">VIP Line</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0d121b] dark:text-gray-200">Product Discount</td>
                                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">0%</td>
                                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">5%</td>
                                        <td className="px-6 py-4 text-center font-bold text-primary bg-primary/5 dark:bg-primary/10">10%</td>
                                        <td className="px-6 py-4 text-center text-[#0d121b] dark:text-white font-medium">15%</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0d121b] dark:text-gray-200">Beverage Service</td>
                                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"><span className="material-symbols-outlined text-gray-300">close</span></td>
                                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">Coffee/Tea</td>
                                        <td className="px-6 py-4 text-center font-bold text-primary bg-primary/5 dark:bg-primary/10">Full Bar</td>
                                        <td className="px-6 py-4 text-center text-[#0d121b] dark:text-white font-medium">Premium Bar</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0d121b] dark:text-gray-200">Complimentary Treatment</td>
                                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"><span className="material-symbols-outlined text-gray-300">close</span></td>
                                        <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"><span className="material-symbols-outlined text-gray-300">close</span></td>
                                        <td className="px-6 py-4 text-center font-bold text-primary bg-primary/5 dark:bg-primary/10">Birthday Only</td>
                                        <td className="px-6 py-4 text-center text-[#0d121b] dark:text-white font-medium">Monthly</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Two Column Layout: Referrals & History */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Referral Section (2/3 width) */}
                        <section className="lg:col-span-2 flex flex-col gap-6">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">diversity_3</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0d121b] dark:text-white">Refer a Friend</h3>
                                        <p className="text-sm text-[#4c669a] dark:text-gray-400">Give $20, Get $20. Share your style with friends.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="flex flex-col gap-4">
                                        <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">Your Unique Code</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1 bg-background-light dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center px-4 py-3 font-mono text-lg font-bold tracking-widest text-[#0d121b] dark:text-white select-all">
                                                ALEXM-2024
                                            </div>
                                            <CopyToClipboard text="ALEXM-2024" onCopy={handleCopy}>
                                                <button aria-label="Copy Code" className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#0d121b] dark:text-white rounded-lg px-4 flex items-center justify-center transition-colors relative group">
                                                    <span className="material-symbols-outlined text-xl">{copied ? 'check' : 'content_copy'}</span>
                                                    {copied && (
                                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">Copied!</span>
                                                    )}
                                                </button>
                                            </CopyToClipboard>
                                        </div>
                                        <button className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                            <span className="material-symbols-outlined text-sm">mail</span>
                                            Share via Email
                                        </button>
                                    </div>
                                    {/* Simple Chart Visualization */}
                                    <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                                        <div className="relative size-32">
                                            <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                                <circle className="stroke-current text-gray-200 dark:text-gray-700" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                                <circle className="stroke-current text-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="70 100" strokeWidth="3"></circle>
                                            </svg>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                                <span className="text-2xl font-bold text-[#0d121b] dark:text-white block">3</span>
                                                <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 font-bold">Sign-ups</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 text-xs">
                                            <div className="flex items-center gap-1">
                                                <div className="size-2 rounded-full bg-primary"></div>
                                                <span className="text-gray-600 dark:text-gray-300">Successful (3)</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="size-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                                <span className="text-gray-600 dark:text-gray-300">Pending (2)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Points History Timeline (1/3 width) */}
                        <section className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-[#0d121b] dark:text-white">Points History</h3>
                                    <Link className="text-xs font-bold text-primary hover:underline uppercase tracking-wide" href="#">View All</Link>
                                </div>
                                <div className="relative pl-4 border-l border-gray-200 dark:border-gray-800 space-y-8">
                                    {/* Timeline Item 1 */}
                                    <div className="relative group">
                                        <div className="absolute -left-[21px] bg-white dark:bg-gray-900 p-1">
                                            <div className="size-3 rounded-full bg-primary ring-4 ring-blue-50 dark:ring-blue-900/30 group-hover:ring-primary/30 transition-all"></div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Today</span>
                                            <p className="text-sm font-bold text-[#0d121b] dark:text-white">Booking Completed</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Haircut + Beard Trim</p>
                                            <span className="inline-block mt-1 text-xs font-bold text-green-600 dark:text-green-400">+100 pts</span>
                                        </div>
                                    </div>
                                    {/* Timeline Item 2 */}
                                    <div className="relative group">
                                        <div className="absolute -left-[21px] bg-white dark:bg-gray-900 p-1">
                                            <div className="size-3 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Nov 12</span>
                                            <p className="text-sm font-bold text-[#0d121b] dark:text-white">Referral Bonus</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Friend: Mike S.</p>
                                            <span className="inline-block mt-1 text-xs font-bold text-green-600 dark:text-green-400">+500 pts</span>
                                        </div>
                                    </div>
                                    {/* Timeline Item 3 */}
                                    <div className="relative group">
                                        <div className="absolute -left-[21px] bg-white dark:bg-gray-900 p-1">
                                            <div className="size-3 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Oct 20</span>
                                            <p className="text-sm font-bold text-[#0d121b] dark:text-white">Product Purchase</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Matte Clay 3oz</p>
                                            <span className="inline-block mt-1 text-xs font-bold text-green-600 dark:text-green-400">+25 pts</span>
                                        </div>
                                    </div>
                                    {/* Timeline Item 4 */}
                                    <div className="relative group">
                                        <div className="absolute -left-[21px] bg-white dark:bg-gray-900 p-1">
                                            <div className="size-3 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Oct 05</span>
                                            <p className="text-sm font-bold text-[#0d121b] dark:text-white">Reward Redemption</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Free Beverage Upgrade</p>
                                            <span className="inline-block mt-1 text-xs font-bold text-red-500 dark:text-red-400">-150 pts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
