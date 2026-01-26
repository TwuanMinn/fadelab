"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BarberProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    barber: any;
}

export function BarberProfileModal({ isOpen, onClose, barber }: BarberProfileModalProps) {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState("11:30 AM");

    if (!isOpen || !barber) return null;

    const changeMonth = (offset: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        setViewDate(newDate);
    };

    const getDaysArray = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const padding = Array(firstDay).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
        return [...padding, ...days];
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const isPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-6xl max-h-[90vh] bg-surface-dark rounded-[2rem] shadow-2xl border border-white/10 flex flex-col lg:flex-row overflow-hidden z-10"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-white text-white hover:text-black transition-colors backdrop-blur-md"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    {/* Main Content Column */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar lg:border-r border-white/5 bg-surface-dark relative">
                        {/* Background Watermarks */}
                        <div className="absolute top-20 left-10 pointer-events-none opacity-[0.03] select-none z-0">
                            <span className="text-[18rem] font-black italic tracking-tighter uppercase leading-none">Elite</span>
                        </div>
                        <div className="absolute bottom-20 right-10 pointer-events-none opacity-[0.03] select-none z-0">
                            <span className="text-[18rem] font-black italic tracking-tighter uppercase leading-none">Craft</span>
                        </div>

                        {/* Top Profile Section (Redesigned Hero) */}
                        <div className="relative p-12 flex flex-col items-center text-center z-10">
                            {/* Stylized Name Heading */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md"
                            >
                                <div className="size-2 rounded-full bg-primary animate-ping"></div>
                                <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Specialist Spotlight</span>
                            </motion.div>

                            <div className="mb-8">
                                <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">
                                    <span className="block text-white">{barber.name.split(' ')[0]}</span>
                                    <span className="block text-primary">{barber.name.split(' ').slice(1).join(' ')}</span>
                                </h2>
                            </div>










                        </div>

                        {/* Image Showcase Section */}
                        <div className="p-12 pt-0 w-full z-10">
                            <div className="relative aspect-[4/5] sm:aspect-video rounded-[3rem] overflow-hidden border border-white/10 group">
                                <div
                                    className="w-full h-full bg-cover bg-top transition-transform duration-1000 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${barber.img}')` }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>

                        {/* Biography Grid */}
                        <div className="p-12 pt-4 space-y-12 z-10 relative">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="md:col-span-2 space-y-6">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">person</span>
                                        Biography
                                    </h3>
                                    <div className="space-y-4 text-gray-400 font-medium leading-relaxed">
                                        <p>{barber.bio || "With over a decade of experience in men's grooming, this master barber has established themselves as one of the city's premier stylists. They believe a haircut isn't just a service—it's an experience that boosts confidence."}</p>
                                        <p>When not behind the chair, they are likely mentoring the next generation of barbers or exploring new textural techniques.</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">workspace_premium</span>
                                        Certifications
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <span className="material-symbols-outlined text-yellow-500 text-xl">star</span>
                                            <div>
                                                <p className="text-white text-sm font-bold uppercase tracking-wide">Master License</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">State Board, 2018</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                            <span className="material-symbols-outlined text-yellow-500 text-xl">star</span>
                                            <div>
                                                <p className="text-white text-sm font-bold uppercase tracking-wide">Fade Specialist</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Moneyspire Academy</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined text-primary">grid_view</span>
                                    Visual Archive
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="aspect-square bg-surface-darker rounded-xl overflow-hidden cursor-pointer group relative border border-white/5">
                                            <div
                                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                                style={{ backgroundImage: `url('${barber.img}')` }} // Placeholder, would use real gallery in prod
                                            ></div>
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Booking Column */}
                    <div className="lg:w-[420px] bg-[#0c1018] border-l border-white/5 flex flex-col h-full overflow-y-auto custom-scrollbar">
                        {/* Calendar Section */}
                        <div className="p-8 border-b border-white/5">


                            {/* Date Selector */}
                            <div className="flex items-center justify-between mb-6 bg-surface-dark p-2 rounded-xl border border-white/5">
                                <button
                                    onClick={() => changeMonth(-1)}
                                    className="size-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <span className="font-black text-white text-sm uppercase tracking-widest">
                                    {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </span>
                                <button
                                    onClick={() => changeMonth(1)}
                                    className="size-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>

                            {/* Calendar Grid (Simplified Visual) */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-8 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                {getDaysArray().map((date, i) => {
                                    if (!date) return <div key={`empty-${i}`} className="size-10" />;

                                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                                    const disabled = isPast(date);

                                    return (
                                        <button
                                            key={i}
                                            disabled={disabled}
                                            onClick={() => setSelectedDate(date)}
                                            className={`size-10 rounded-lg flex items-center justify-center transition-all ${isSelected
                                                ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-110'
                                                : disabled
                                                    ? 'text-gray-700 cursor-not-allowed'
                                                    : 'text-gray-300 hover:bg-white/10'
                                                }`}
                                        >
                                            {date.getDate()}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Time Slots */}
                            <div className="mb-8">
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4">
                                    Available Slots ({selectedDate ? selectedDate.toLocaleString('default', { month: 'short', day: 'numeric' }) : 'Select Date'})
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {['10:00 AM', '11:30 AM', '2:00 PM', '3:45 PM'].map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-3 rounded-xl border text-xs font-bold transition-all ${selectedTime === time
                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-surface-dark border-white/5 text-gray-400 hover:border-primary/50 hover:text-white'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={`/checkout?barberId=${barber.id}&service=classic-cut&time=${encodeURIComponent(selectedTime)}&date=${encodeURIComponent(selectedDate?.toISOString() || "")}`}
                                className="w-full bg-white hover:bg-gray-200 text-background-dark font-black uppercase tracking-widest text-xs py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                Proceed to Payment
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </Link>
                        </div>

                        {/* Personality / Extras */}
                        <div className="p-8 space-y-6">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Personality Matrix</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-surface-dark border border-white/5">
                                        <div className="size-10 rounded-xl bg-[#151b26] flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">music_note</span>
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-bold uppercase tracking-wide">Vibe</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Lo-Fi / Jazz</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-surface-dark border border-white/5">
                                        <div className="size-10 rounded-xl bg-[#151b26] flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">{barber.traitIcon || 'psychology'}</span>
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-bold uppercase tracking-wide">Trait</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{barber.trait}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
