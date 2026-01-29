import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const barberId = searchParams.get('barberId');
        const date = searchParams.get('date');
        const serviceId = searchParams.get('serviceId');

        if (!barberId || !date) {
            return NextResponse.json(
                { error: 'barberId and date are required' },
                { status: 400 }
            );
        }

        // Fetch available slots from Supabase
        const { data: slots, error } = await supabase
            .from('time_slots')
            .select('*')
            .eq('barber_id', barberId)
            .eq('date', date)
            .eq('is_booked', false)
            .order('start_time');

        if (error) {
            console.error('Error fetching availability:', error);
            return NextResponse.json(
                { error: 'Failed to fetch availability' },
                { status: 500 }
            );
        }

        // Transform to UI format
        const availability = slots.map(slot => ({
            time: slot.start_time,
            endTime: slot.end_time,
            available: true,
            slotId: slot.id,
        }));

        return NextResponse.json(availability);
    } catch (error) {
        console.error('Availability API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
