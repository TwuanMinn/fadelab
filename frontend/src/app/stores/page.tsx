"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Stores() {
    const stores = [
        {
            id: 1,
            name: "Downtown Showroom",
            address: "123 Main St, New York, NY",
            status: "Open",
            hours: "Until 8:00 PM",
            phone: "(555) 123-4567",
            distance: "1.2 mi",
            coordinates: { top: "40%", left: "55%" }
        },
        {
            id: 2,
            name: "Westside Gallery",
            address: "450 W 33rd St, New York, NY",
            status: "Closed",
            hours: "Opens 10:00 AM",
            phone: "(555) 987-6543",
            distance: "3.5 mi",
            coordinates: { top: "55%", left: "30%" }
        },
        {
            id: 3,
            name: "Brooklyn Lofts",
            address: "789 Bedford Ave, Brooklyn, NY",
            status: "Open",
            hours: "Until 9:00 PM",
            phone: "(555) 321-7654",
            distance: "4.8 mi",
            coordinates: { top: "65%", left: "70%" }
        }
    ];

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
            {/* Header (Floating on Mobile, Sidebar Top on Desktop) */}
            <header className="absolute md:fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm h-16 flex items-center px-4 justify-between md:w-[400px] md:border-b md:border-slate-200 md:dark:border-white/10">
                <Link href="/" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Find a Showroom</h1>
                <div className="size-10"></div> {/* Spacer */}
            </header>

            {/* Map Section (Order 2 on Desktop) */}
            <div className="relative w-full h-[55%] md:h-full md:flex-1 md:order-2 bg-slate-200 overflow-hidden">
                {/* Fake Map Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80')] bg-cover bg-center opacity-80 filter grayscale-[20%]">
                </div>

                {/* Search Bar Floating */}
                <div className="absolute top-20 md:top-6 inset-x-4 md:left-auto md:right-6 md:w-96 z-10">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center px-4 h-12 border border-slate-200 dark:border-white/10">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder="Search by City or Zip"
                            className="flex-1 bg-transparent border-none outline-none px-3 text-slate-900 dark:text-white text-sm font-medium placeholder:text-slate-400"
                        />
                        <span className="material-symbols-outlined text-blue-500 cursor-pointer">my_location</span>
                    </div>
                </div>

                {/* Map Pins */}
                {stores.map((store) => (
                    <div key={store.id} className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center gap-1 cursor-pointer group" style={{ top: store.coordinates.top, left: store.coordinates.left }}>
                        <div className={`px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold shadow-md transform transition-all group-hover:scale-110 ${store.id === 1 ? 'block' : 'hidden'}`}>
                            $1.2M Stock
                        </div>
                        <span className="material-symbols-outlined text-4xl text-blue-600 drop-shadow-md">location_on</span>
                    </div>
                ))}
            </div>

            {/* List Section (Order 1 on Desktop - Sidebar) */}
            <div className="flex-1 md:flex-none md:w-[400px] md:order-1 bg-white dark:bg-slate-950 rounded-t-[2rem] md:rounded-none -mt-6 md:mt-0 relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:shadow-xl flex flex-col pt-16 md:pt-20 border-r border-slate-200 dark:border-white/5">
                {/* Handle (Mobile Only) */}
                <div className="w-full flex justify-center py-3 md:hidden">
                    <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>

                <div className="px-5 pb-4 md:px-6 flex-1 overflow-y-auto">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Nearby Stores</h2>
                    <p className="text-sm text-slate-500 mb-5">3 locations found near you</p>

                    <div className="flex flex-col gap-4 pb-8">
                        {stores.map((store) => (
                            <div key={store.id} className="border border-slate-200 dark:border-white/10 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-900 shadow-sm hover:border-blue-500/30 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{store.name}</h3>
                                        <p className="text-slate-500 text-sm">{store.address}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${store.status === 'Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                        {store.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                                        {store.hours}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">call</span>
                                        {store.phone}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-blue-500/20 shadow-md">
                                        <span className="material-symbols-outlined text-[18px]">directions</span>
                                        Get Directions
                                    </button>
                                    <div className="border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2.5 rounded-xl font-bold text-slate-900 dark:text-white text-sm whitespace-nowrap shadow-sm">
                                        {store.distance}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
