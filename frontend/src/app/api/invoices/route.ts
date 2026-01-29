import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate PDF invoice
export async function POST(request: NextRequest) {
    try {
        const { type, reference, details } = await request.json();

        if (!type || !reference) {
            return NextResponse.json(
                { error: 'Type and reference are required' },
                { status: 400 }
            );
        }

        let invoiceData;
        
        if (type === 'booking') {
            invoiceData = await generateBookingInvoice(reference, details);
        } else if (type === 'order') {
            invoiceData = await generateOrderInvoice(reference, details);
        } else {
            return NextResponse.json(
                { error: 'Invalid invoice type' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            invoice: invoiceData,
            message: 'Invoice generated successfully',
        });
    } catch (error) {
        console.error('Invoice generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate invoice' },
            { status: 500 }
        );
    }
}

async function generateBookingInvoice(reference: string, details: any) {
    const items = [
        {
            name: details.serviceName || 'Grooming Session',
            description: `Premium grooming service`,
            quantity: 1,
            unitPrice: details.servicePrice || 50,
            total: details.servicePrice || 50
        }
    ];

    // Add any additional services
    if (details.addons && details.addons.length > 0) {
        details.addons.forEach((addon: any) => {
            items.push({
                name: addon.name,
                description: addon.description,
                quantity: 1,
                unitPrice: addon.price,
                total: addon.price
            });
        });
    }

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = subtotal * 0.1; // 10% loyalty discount
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal - discount + tax;

    return {
        type: 'booking',
        reference,
        date: new Date().toLocaleDateString(),
        dueDate: details.date || new Date().toLocaleDateString(),
        customer: {
            name: details.customerName || 'Guest',
            email: details.customerEmail,
            phone: details.customerPhone
        },
        service: {
            name: details.serviceName,
            specialist: details.specialist,
            date: details.date,
            time: details.time,
            duration: details.duration
        },
        items,
        summary: {
            subtotal,
            discount,
            tax,
            total
        },
        company: {
            name: 'FadeLab',
            address: '123 Barber Lane, NY 10001',
            phone: '(555) 123-4567',
            email: 'info@fadelab.com'
        }
    };
}

async function generateOrderInvoice(reference: string, details: any) {
    const items = details.items || [];
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = details.shipping || 0;
    const total = subtotal + tax + shipping;

    return {
        type: 'order',
        reference,
        date: new Date().toLocaleDateString(),
        orderDate: details.orderDate || new Date().toLocaleDateString(),
        customer: {
            name: details.customerName || 'Guest',
            email: details.customerEmail,
            address: details.shippingAddress
        },
        items: items.map((item: any) => ({
            name: item.name,
            description: item.category || 'Product',
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.price * item.quantity
        })),
        summary: {
            subtotal,
            tax,
            shipping,
            total
        },
        shipping: {
            address: details.shippingAddress,
            method: details.shippingMethod || 'Standard',
            tracking: details.trackingNumber
        },
        company: {
            name: 'FadeLab',
            address: '123 Barber Lane, NY 10001',
            phone: '(555) 123-4567',
            email: 'info@fadelab.com'
        }
    };
}