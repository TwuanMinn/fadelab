import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create a new order
export async function POST(request: NextRequest) {
    try {
        const order = await request.json();

        // Validate required fields
        const required = ['userId', 'items', 'shippingAddress', 'paymentMethod'];
        for (const field of required) {
            if (!order[field]) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        if (!order.items || order.items.length === 0) {
            return NextResponse.json(
                { error: 'Cart is empty' },
                { status: 400 }
            );
        }

        // Calculate totals
        const subtotal = order.items.reduce(
            (sum: number, item: any) => sum + (item.price * item.quantity),
            0
        );
        const taxRate = 0.08;
        const tax = subtotal * taxRate;
        const shipping = subtotal > 50 ? 0 : 9.99;
        const total = subtotal + tax + shipping;

        // Create order
        const { data: newOrder, error } = await supabase
            .from('orders')
            .insert({
                user_id: order.userId,
                items: order.items,
                subtotal: subtotal,
                tax: tax,
                shipping: shipping,
                total: total,
                status: 'pending',
                shipping_address: order.shippingAddress,
                payment_method: order.paymentMethod,
                payment_status: 'pending',
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating order:', error);
            return NextResponse.json(
                { error: 'Failed to create order' },
                { status: 500 }
            );
        }

        // TODO: Process payment here
        // const paymentResult = await processPayment(newOrder.id, total, order.paymentMethod);

        // TODO: Send order confirmation email
        // await sendOrderConfirmationEmail(order.email, newOrder);

        // Clear user's cart in database
        await supabase
            .from('user_carts')
            .update({ cart_items: [], updated_at: new Date().toISOString() })
            .eq('user_id', order.userId);

        return NextResponse.json({
            success: true,
            order: newOrder,
            message: 'Order placed successfully',
        });
    } catch (error) {
        console.error('Order API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Get user's orders
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const orderId = searchParams.get('orderId');

        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            );
        }

        // Get single order
        if (orderId) {
            const { data: order, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .eq('user_id', userId)
                .single();

            if (error) {
                console.error('Error fetching order:', error);
                return NextResponse.json(
                    { error: 'Order not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json(order);
        }

        // Get all user orders
        const { data: orders, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
            return NextResponse.json(
                { error: 'Failed to fetch orders' },
                { status: 500 }
            );
        }

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Orders API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Update order status
export async function PATCH(request: NextRequest) {
    try {
        const { orderId, status, trackingNumber } = await request.json();

        if (!orderId || !status) {
            return NextResponse.json(
                { error: 'orderId and status are required' },
                { status: 400 }
            );
        }

        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        const updateData: any = {
            status,
            updated_at: new Date().toISOString(),
        };

        if (trackingNumber) {
            updateData.tracking_number = trackingNumber;
        }

        const { data: order, error } = await supabase
            .from('orders')
            .update(updateData)
            .eq('id', orderId)
            .select()
            .single();

        if (error) {
            console.error('Error updating order:', error);
            return NextResponse.json(
                { error: 'Failed to update order' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            order,
            message: 'Order updated successfully',
        });
    } catch (error) {
        console.error('Order update API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
