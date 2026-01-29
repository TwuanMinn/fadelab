import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create a new booking
export async function POST(request: NextRequest) {
    try {
        const booking = await request.json();

        // Validate required fields
        const required = ['barberId', 'serviceId', 'date', 'time', 'customerEmail'];
        for (const field of required) {
            if (!booking[field]) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Check if slot is still available
        const { data: slot, error: slotError } = await supabase
            .from('time_slots')
            .select('*')
            .eq('barber_id', booking.barberId)
            .eq('date', booking.date)
            .eq('start_time', booking.time)
            .eq('is_booked', false)
            .single();

        if (slotError || !slot) {
            return NextResponse.json(
                { error: 'This time slot is no longer available' },
                { status: 409 }
            );
        }

        // Mark slot as booked
        const { error: updateError } = await supabase
            .from('time_slots')
            .update({ is_booked: true })
            .eq('id', slot.id);

        if (updateError) {
            console.error('Error booking slot:', updateError);
            return NextResponse.json(
                { error: 'Failed to book slot' },
                { status: 500 }
            );
        }

        // Create appointment record
        const { data: appointment, error: appointmentError } = await supabase
            .from('appointments')
            .insert({
                user_id: booking.userId || null,
                barber_id: booking.barberId,
                service_id: booking.serviceId,
                date: booking.date,
                start_time: booking.time,
                end_time: slot.end_time,
                status: 'pending',
                notes: booking.notes || '',
                total_price: booking.totalPrice || booking.total || 0,
            })
            .select()
            .single();

        if (appointmentError) {
            console.error('Error creating appointment:', appointmentError);

            // Rollback slot booking
            await supabase
                .from('time_slots')
                .update({ is_booked: false })
                .eq('id', slot.id);

            return NextResponse.json(
                { error: 'Failed to create appointment' },
                { status: 500 }
            );
        }

        // TODO: Send confirmation email here
        // await sendConfirmationEmail(booking.customerEmail, appointment);

        return NextResponse.json({
            success: true,
            appointment,
            message: 'Booking confirmed successfully',
        });
    } catch (error) {
        console.error('Booking API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Get user's bookings
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            );
        }

        const { data: appointments, error } = await supabase
            .from('appointments')
            .select(`
                *,
                barbers (*),
                services (*)
            `)
            .eq('user_id', userId)
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching bookings:', error);
            return NextResponse.json(
                { error: 'Failed to fetch bookings' },
                { status: 500 }
            );
        }

        return NextResponse.json(appointments);
    } catch (error) {
        console.error('Bookings API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
