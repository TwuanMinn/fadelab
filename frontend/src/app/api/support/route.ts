import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create support request
export async function POST(request: NextRequest) {
    try {
        const supportRequest = await request.json();

        // Validate required fields
        const required = ['type', 'reference', 'issue_type', 'description'];
        for (const field of required) {
            if (!supportRequest[field]) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Create support ticket
        const { data, error } = await supabase
            .from('support_tickets')
            .insert({
                type: supportRequest.type,
                reference: supportRequest.reference,
                issue_type: supportRequest.issue_type,
                description: supportRequest.description,
                user_email: supportRequest.user_email,
                details: supportRequest.details,
                status: 'open',
                priority: 'normal',
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating support ticket:', error);
            return NextResponse.json(
                { error: 'Failed to create support request' },
                { status: 500 }
            );
        }

        // Send confirmation email (optional)
        // await sendSupportConfirmationEmail(supportRequest.user_email, data.id, supportRequest.reference);

        return NextResponse.json({
            success: true,
            ticket: data,
            message: 'Support request created successfully',
        });
    } catch (error) {
        console.error('Support API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Get support tickets for user
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userEmail = searchParams.get('userEmail');

        if (!userEmail) {
            return NextResponse.json(
                { error: 'userEmail is required' },
                { status: 400 }
            );
        }

        const { data: tickets, error } = await supabase
            .from('support_tickets')
            .select('*')
            .eq('user_email', userEmail)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching support tickets:', error);
            return NextResponse.json(
                { error: 'Failed to fetch support tickets' },
                { status: 500 }
            );
        }

        return NextResponse.json(tickets);
    } catch (error) {
        console.error('Support tickets API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}