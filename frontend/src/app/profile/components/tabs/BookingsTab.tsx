"use client";

import { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { services as servicesData } from "@/lib/services-data";

interface Appointment {
    id: string;
    user_id: string;
    barber_id: string;
    service_id: string;
    date: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    total_price: number;
    created_at: string;
}

interface EnhancedAppointment extends Appointment {
    barberName: string;
    barberImage?: string;
    serviceName: string;
}

export function BookingsTab() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<EnhancedAppointment[]>([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Helper to format time from 24h to 12h
    const formatTime = (time: string) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    // Helper to format date avoiding timezone issues
    const formatDate = (dateStr: string) => {
        // Parse the date string (YYYY-MM-DD) and create a local date
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Helper to get service name
    const getServiceName = (serviceId: string) => {
        const service = servicesData.find(s => s.id === serviceId);
        return service?.name || 'Grooming Session';
    };

    // Helper to check if appointment date is valid (not in the past)
    const isUpcoming = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        const appointmentDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return appointmentDate >= today;
    };

    const fetchAppointments = useCallback(async () => {
        if (!user) {
            setLoadingAppointments(false);
            return;
        }

        setLoadingAppointments(true);
        setError(null);

        try {
            // Fetch appointments with barber data joined
            const { data: appointmentsData, error: aptError } = await supabase
                .from('appointments')
                .select(`
                    *,
                    barbers (
                        id,
                        name,
                        image
                    )
                `)
                .eq('user_id', user.id)
                .order('date', { ascending: false });

            if (aptError) {
                console.error('Error fetching appointments:', aptError);
                setError('Failed to load appointments. Please try again.');
                setLoadingAppointments(false);
                return;
            }

            if (!appointmentsData || appointmentsData.length === 0) {
                setAppointments([]);
                setLoadingAppointments(false);
                return;
            }

            // Map appointments with barber and service names
            const enhancedAppointments: EnhancedAppointment[] = appointmentsData.map((apt: any) => ({
                ...apt,
                barberName: apt.barbers?.name || 'Barber',
                barberImage: apt.barbers?.image,
                serviceName: getServiceName(apt.service_id)
            }));

            setAppointments(enhancedAppointments);
        } catch (err) {
            console.error('Error fetching appointments:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoadingAppointments(false);
        }
    }, [user]);

    const handleCancelAppointment = async (appointmentId: string) => {
        if (!confirm('Are you sure you want to cancel this appointment?')) return;

        setCancellingId(appointmentId);

        try {
            const { error } = await supabase
                .from('appointments')
                .update({ status: 'cancelled' })
                .eq('id', appointmentId)
                .eq('user_id', user?.id);

            if (error) {
                alert('Failed to cancel appointment: ' + error.message);
            } else {
                // Refresh appointments list
                await fetchAppointments();
            }
        } catch (err) {
            console.error('Error cancelling appointment:', err);
            alert('Failed to cancel appointment. Please try again.');
        } finally {
            setCancellingId(null);
        }
    };

    const handleAddToCalendar = (apt: EnhancedAppointment) => {
        // Parse date
        const [year, month, day] = apt.date.split('-').map(Number);
        const [hours, minutes] = apt.start_time.split(':').map(Number);

        const startDate = new Date(year, month - 1, day, hours, minutes, 0);
        const endDate = new Date(startDate);
        endDate.setMinutes(startDate.getMinutes() + 45);

        const formatICSDate = (d: Date) => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const h = String(d.getHours()).padStart(2, '0');
            const min = String(d.getMinutes()).padStart(2, '0');
            return `${y}${m}${dd}T${h}${min}00`;
        };

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FadeLab//NONSGML v1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${apt.id}@fadelab.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:FadeLab: ${apt.serviceName} with ${apt.barberName}
DESCRIPTION:Premium grooming session at FadeLab.
LOCATION:123 Barber Lane, NY 10001
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fadelab-${apt.id.slice(-6)}.ics`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    // Set up real-time subscription for appointment updates
    useEffect(() => {
        if (!user) return;

        // Force initial refresh after subscription setup
        const refreshTimer = setTimeout(() => {
            fetchAppointments();
        }, 1000);

        const channel = supabase
            .channel(`appointments-${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'appointments',
                    filter: `user_id=eq.${user.id}`
                },
                () => {
                    // Refetch appointments when there's a change
                    console.log('Appointment update detected, refreshing...');
                    fetchAppointments();
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Successfully subscribed to appointment updates');
                    // Additional fetch to ensure we have latest data
                    fetchAppointments();
                }
            });

        return () => {
            clearTimeout(refreshTimer);
            supabase.removeChannel(channel);
        };
    }, [user, fetchAppointments]);

    // Separate upcoming and past appointments
    const upcomingAppointments = appointments.filter(
        apt => (apt.status === 'confirmed' || apt.status === 'pending') && isUpcoming(apt.date)
    );
    const pastAppointments = appointments.filter(
        apt => apt.status === 'completed' || apt.status === 'cancelled' || !isUpcoming(apt.date)
    );

    return (
        <>
            <header className="mb-10 flex flex-col gap-2 animate-fade-in-up">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white italic">My Bookings</h1>
                <p className="text-gray-400 text-base lg:text-lg max-w-2xl">View and manage your upcoming and past appointments.</p>
            </header>

            {loadingAppointments ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-2">error</span>
                    <p className="text-red-400">{error}</p>
                    <button
                        onClick={fetchAppointments}
                        className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 text-sm font-bold transition-all"
                    >
                        Try Again
                    </button>
                </div>
            ) : appointments.length === 0 ? (
                <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-[2.5rem] p-12 border border-white/5 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">calendar_month</span>
                    <h3 className="text-xl font-black text-white uppercase mb-2">No Appointments Yet</h3>
                    <p className="text-gray-400 mb-6">Book your first session to get started on your grooming journey.</p>
                    <Link
                        href="/barbers"
                        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all"
                    >
                        Book Your First Session
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Upcoming Appointments */}
                    {upcomingAppointments.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500">upcoming</span>
                                Upcoming Sessions ({upcomingAppointments.length})
                            </h2>
                            <div className="space-y-4">
                                {upcomingAppointments.map((apt) => (
                                    <motion.div
                                        key={apt.id}
                                        whileHover={{ y: -2 }}
                                        className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="size-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
                                                <span className="material-symbols-outlined text-blue-500 text-2xl">content_cut</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold">{apt.serviceName}</h3>
                                                <p className="text-gray-400 text-sm">
                                                    {formatDate(apt.date)} at {formatTime(apt.start_time)}
                                                </p>
                                                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">
                                                    with {apt.barberName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${apt.status === 'confirmed'
                                                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                                                : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                                                }`}>
                                                {apt.status}
                                            </span>
                                            <button
                                                onClick={() => handleAddToCalendar(apt)}
                                                className="px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-500 text-xs font-bold uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center gap-1"
                                            >
                                                <span className="material-symbols-outlined text-sm">event</span>
                                                Calendar
                                            </button>
                                            <button
                                                onClick={() => handleCancelAppointment(apt.id)}
                                                disabled={cancellingId === apt.id}
                                                className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all disabled:opacity-50"
                                            >
                                                {cancellingId === apt.id ? 'Cancelling...' : 'Cancel'}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* No Upcoming but has Past */}
                    {upcomingAppointments.length === 0 && pastAppointments.length > 0 && (
                        <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 text-center">
                            <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">event_available</span>
                            <h3 className="text-lg font-bold text-white mb-2">No Upcoming Sessions</h3>
                            <p className="text-gray-400 text-sm mb-4">You have no upcoming appointments scheduled.</p>
                            <Link
                                href="/barbers"
                                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all"
                            >
                                Book New Session
                            </Link>
                        </div>
                    )}

                    {/* Past Appointments */}
                    {pastAppointments.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-500">history</span>
                                Past Sessions ({pastAppointments.length})
                            </h2>
                            <div className="space-y-4">
                                {pastAppointments.map((apt) => (
                                    <div
                                        key={apt.id}
                                        className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-60"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="size-14 bg-white/10 rounded-xl flex items-center justify-center">
                                                <span className="material-symbols-outlined text-gray-500 text-2xl">content_cut</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold">{apt.serviceName}</h3>
                                                <p className="text-gray-500 text-sm">
                                                    {formatDate(apt.date)}
                                                </p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                                    with {apt.barberName}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${apt.status === 'completed'
                                            ? 'bg-gray-500/20 text-gray-400'
                                            : 'bg-red-500/20 text-red-500'
                                            }`}>
                                            {apt.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </>
    );
}
