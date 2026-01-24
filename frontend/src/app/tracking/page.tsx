"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TrackingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#101822] text-[#111418] dark:text-white font-display flex justify-center pb-20 md:pb-8">
            <div className="relative flex w-full flex-col max-w-5xl mx-auto bg-slate-50 dark:bg-[#101822] md:bg-white md:dark:bg-[#101822] md:shadow-xl md:rounded-3xl md:mt-8 md:overflow-hidden md:border md:border-slate-200 md:dark:border-slate-800">

                {/* Header */}
                <div className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-[#101822]/90 backdrop-blur-md p-4 pb-3 justify-between border-b border-slate-100 dark:border-slate-800 md:static md:bg-transparent">
                    <Link href="/" className="text-[#111418] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] md:text-xl">Track Order</h2>
                    <button className="text-[#111418] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>

                <div className="md:p-8 md:pt-2">
                    <div className="flex-1 flex flex-col p-4 md:p-0 gap-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Left Column: Status & Product */}
                            <div className="flex flex-col gap-6">
                                {/* Order Summary Card */}
                                <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1a2430] p-4 shadow-sm border border-slate-100 dark:border-slate-800 md:shadow-none md:border md:border-slate-200">
                                    <div className="flex items-start justify-between gap-4">
                                        <div
                                            className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 border border-slate-100 dark:border-slate-700"
                                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC0BMyhWx_s5sNoJzkQ9cRCXYSwWrMohInvtEpT8Dj2eeK2BurlR4ot_okWfo1Oo538xndPCB5M-aen9upbY2Kd4TmUapaTjH-hDpdAcOB1ipbPOsMQXh-S8qwIvlWmIpJywYVaS6jHYGjMOrw-1ZjOhpZ5YsNpEmpTpSKlQD5fy884bTu8X1978aY9x5RTRnaX3l9CiLXzGRQWg5iOXvWvA--8t1jePvL0y05UB-VNUolxq6MUKc7X1U7JaMfeGxikt-DWo1CKwXs")' }}
                                        >
                                        </div>
                                        <div className="flex flex-col gap-1 flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[#136dec] text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded w-fit">In Transit</p>
                                                <span className="text-xs text-slate-400">#402-221</span>
                                            </div>
                                            <h3 className="text-[#111418] dark:text-white text-base font-bold leading-tight mt-1">Velvet Sectional Sofa</h3>
                                            <p className="text-[#617289] dark:text-slate-400 text-sm font-normal">Navy Blue • Sectional</p>
                                            <p className="text-[#111418] dark:text-white text-sm font-semibold mt-2 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm text-green-600">schedule</span>
                                                Arriving Today by 6 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical Timeline */}
                                <div className="flex flex-col bg-white dark:bg-[#1a2430] rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 md:shadow-none md:border md:border-slate-200">
                                    <h3 className="text-base font-bold mb-4 dark:text-white">Order Status</h3>
                                    <div className="grid grid-cols-[32px_1fr] gap-x-4">
                                        {/* Step 1: Placed */}
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center justify-center size-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                <span className="material-symbols-outlined text-[18px]">check</span>
                                            </div>
                                            <div className="w-[2px] bg-green-100 dark:bg-green-900/50 h-full min-h-[40px]"></div>
                                        </div>
                                        <div className="flex flex-col pb-6">
                                            <p className="text-[#111418] dark:text-white text-sm font-semibold">Order Placed</p>
                                            <p className="text-[#617289] dark:text-slate-400 text-xs">Oct 24, 10:00 AM</p>
                                        </div>
                                        {/* Step 2: Processing */}
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center justify-center size-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                <span className="material-symbols-outlined text-[18px]">check</span>
                                            </div>
                                            <div className="w-[2px] bg-green-100 dark:bg-green-900/50 h-full min-h-[40px]"></div>
                                        </div>
                                        <div className="flex flex-col pb-6">
                                            <p className="text-[#111418] dark:text-white text-sm font-semibold">Processing</p>
                                            <p className="text-[#617289] dark:text-slate-400 text-xs">Oct 24, 2:00 PM</p>
                                        </div>
                                        {/* Step 3: Shipped (Active) */}
                                        <div className="flex flex-col items-center">
                                            <div className="relative z-10 flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-[#136dec] to-blue-700 shadow-lg shadow-blue-500/30 text-white animate-pulse">
                                                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                                            </div>
                                            <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-full min-h-[40px]"></div>
                                        </div>
                                        <div className="flex flex-col pb-6">
                                            <p className="text-[#111418] dark:text-white text-sm font-bold text-[#136dec]">Shipped</p>
                                            <p className="text-[#617289] dark:text-slate-400 text-xs">Oct 25, 9:00 AM - On the way</p>
                                        </div>
                                        {/* Step 4: Delivered (Future) */}
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center justify-center size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
                                                <span className="material-symbols-outlined text-[18px]">home</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Delivered</p>
                                            <p className="text-slate-400 dark:text-slate-500 text-xs">Est. Today 6:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Map & Extras */}
                            <div className="flex flex-col gap-6">
                                {/* Map & Driver Info */}
                                <div className="flex flex-col gap-0 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1a2430] md:shadow-none md:border md:border-slate-200">
                                    {/* Map Header */}
                                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                        <h3 className="text-base font-bold dark:text-white">Live Location</h3>
                                        <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                    </div>
                                    {/* Map View */}
                                    <div className="relative w-full h-48 bg-slate-200">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnSw0kHxG90UZXzhkYh_-6yBxSjQPfIcbwbqV3jwwOwWl7A9v6Hr1chbsCYknqmmnzFQ0-CDY7TXQUw0z86XG5Ggnaax5ZbPtTOAUJlFTI6AW8bIjH1Pt8dfJOL8rdv5YnoTnxjeAfr99qrUfDl4thoMleNFrxqG-ni7_f6ZSS-3nyiDpXDHsyoxHpfh0h2XVG16V4AmbO0eT7O9AkUWrScGZxrqqdqf0XO6Ya4fifhRI675dAp2J7D3a-Zwid1EozhREGgxf52Yg")' }}
                                        >
                                        </div>
                                        {/* Truck Pin */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                            <div className="bg-[#136dec] text-white p-2 rounded-full shadow-lg border-2 border-white transform -translate-y-1">
                                                <span className="material-symbols-outlined text-lg">local_shipping</span>
                                            </div>
                                            <div className="w-3 h-3 bg-[#136dec]/50 rounded-full blur-[2px]"></div>
                                        </div>
                                    </div>
                                    {/* Driver Details */}
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full bg-slate-200 bg-cover bg-center"
                                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5Sw_UMr_ddEnk4KF2k0dKWktMWANKRS1ej38a_ohlDCHwVVRgsJgaJc-8pGVi4iZoIW0bQ2zI3UP_9OXcwE44hY1ShRB2FUhBZYLDOdJQGwwBeHP1rqMfLCEIh8TqfJc8_4n58TCns-BK5YklsGifa6pw2RR7z2pDpVKAaF_dFL7Lbxz9ez6U5NPYQbG8x8oFSYrJ8-VJkIQIs7rsPixAR7evzltdOhbs2YHoX_2v98Y28jG1l3sghEPatFNWMA-DS3l1a69nrAg")' }}
                                            >
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-sm font-bold text-[#111418] dark:text-white">Michael R.</p>
                                                <p className="text-xs text-[#617289] dark:text-slate-400">Ford Transit • 4.9 <span className="text-yellow-500">★</span></p>
                                            </div>
                                        </div>
                                        <button className="bg-[#136dec]/10 hover:bg-[#136dec]/20 text-[#136dec] p-2.5 rounded-full transition-colors">
                                            <span className="material-symbols-outlined">call</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Shipping Details Accordion */}
                                <div className="rounded-xl bg-white dark:bg-[#1a2430] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden md:shadow-none md:border md:border-slate-200">
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="text-base font-bold dark:text-white">Shipping Details</h3>
                                    </div>
                                    <div className="p-4 flex flex-col gap-4">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-slate-400 mt-0.5">location_on</span>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Shipping Address</p>
                                                <p className="text-sm text-[#111418] dark:text-white font-medium">123 Design Avenue, Apt 4B</p>
                                                <p className="text-sm text-[#617289] dark:text-slate-400">Brooklyn, NY 11201</p>
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-slate-100 dark:bg-slate-800 w-full"></div>
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-slate-400 mt-0.5">credit_card</span>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Payment Method</p>
                                                <p className="text-sm text-[#111418] dark:text-white font-medium">Visa ending in 4242</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <button className="w-full bg-white dark:bg-[#2a3441] border border-slate-200 dark:border-slate-700 text-[#111418] dark:text-white font-semibold py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">support_agent</span>
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="h-4 md:hidden"></div>
                    </div>
                </div>

                {/* Sticky Bottom Action (Mobile Only) */}
                <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-5xl w-full p-4 bg-white/90 dark:bg-[#101822]/90 backdrop-blur border-t border-slate-100 dark:border-slate-800 md:hidden z-40">
                    <button className="w-full bg-white dark:bg-[#2a3441] border border-slate-200 dark:border-slate-700 text-[#111418] dark:text-white font-semibold py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">support_agent</span>
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}
