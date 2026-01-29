'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useCartStore, CartItem } from '@/lib/cart-store';

// ==================== TYPES ====================

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

export interface Order {
    id: string;
    user_id: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shipping_address: ShippingAddress;
    payment_method: string;
    payment_status: string;
    tracking_number?: string;
    created_at: string;
    updated_at: string;
}

interface OrderState {
    isProcessing: boolean;
    error: string | null;
    currentStep: number;
    shippingAddress: ShippingAddress | null;
    paymentMethod: string | null;
}

// ==================== HOOK ====================

export function useOrderSystem() {
    const { user } = useAuth();
    const { items, getCartTotal, clearCart } = useCartStore();

    const [state, setState] = useState<OrderState>({
        isProcessing: false,
        error: null,
        currentStep: 1,
        shippingAddress: null,
        paymentMethod: null,
    });

    const updateState = useCallback((updates: Partial<OrderState>) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    // ==================== CALCULATED VALUES ====================

    const subtotal = getCartTotal();
    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    const shippingCost = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    const total = subtotal + tax + shippingCost;

    // ==================== STEP NAVIGATION ====================

    const goToStep = useCallback((step: number) => {
        updateState({ currentStep: step, error: null });
    }, [updateState]);

    const nextStep = useCallback(() => {
        if (state.currentStep < 4) {
            goToStep(state.currentStep + 1);
        }
    }, [state.currentStep, goToStep]);

    const prevStep = useCallback(() => {
        if (state.currentStep > 1) {
            goToStep(state.currentStep - 1);
        }
    }, [state.currentStep, goToStep]);

    // ==================== ADDRESS HANDLING ====================

    const setShippingAddress = useCallback((address: ShippingAddress) => {
        updateState({ shippingAddress: address, error: null });
    }, [updateState]);

    const validateAddress = useCallback((address: ShippingAddress): boolean => {
        const required: (keyof ShippingAddress)[] = [
            'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country', 'phone'
        ];

        for (const field of required) {
            if (!address[field] || address[field].trim() === '') {
                updateState({ error: `${field} is required` });
                return false;
            }
        }

        return true;
    }, [updateState]);

    // ==================== PAYMENT HANDLING ====================

    const setPaymentMethod = useCallback((method: string) => {
        updateState({ paymentMethod: method, error: null });
    }, [updateState]);

    // ==================== ORDER CREATION ====================

    const createOrder = useCallback(async (): Promise<{ success: boolean; orderId?: string; error?: string }> => {
        if (!user) {
            return { success: false, error: 'Please sign in to place an order' };
        }

        if (items.length === 0) {
            return { success: false, error: 'Your cart is empty' };
        }

        if (!state.shippingAddress) {
            return { success: false, error: 'Please provide a shipping address' };
        }

        if (!state.paymentMethod) {
            return { success: false, error: 'Please select a payment method' };
        }

        updateState({ isProcessing: true, error: null });

        try {
            const orderData = {
                user_id: user.id,
                items: items,
                subtotal: subtotal,
                tax: tax,
                shipping: shippingCost,
                total: total,
                status: 'pending',
                shipping_address: state.shippingAddress,
                payment_method: state.paymentMethod,
                payment_status: 'pending',
            };

            const { data, error } = await supabase
                .from('orders')
                .insert(orderData)
                .select()
                .single();

            if (error) {
                console.error('Error creating order:', error);
                updateState({ isProcessing: false, error: 'Failed to create order. Please try again.' });
                return { success: false, error: error.message };
            }

            // Clear cart after successful order
            clearCart();

            updateState({
                isProcessing: false,
                currentStep: 4, // Success step
                error: null
            });

            return { success: true, orderId: data.id };
        } catch (error) {
            console.error('Order error:', error);
            updateState({ isProcessing: false, error: 'An unexpected error occurred' });
            return { success: false, error: 'An unexpected error occurred' };
        }
    }, [user, items, state.shippingAddress, state.paymentMethod, subtotal, tax, shippingCost, total, clearCart, updateState]);

    // ==================== ORDER HISTORY ====================

    const getUserOrders = useCallback(async (): Promise<Order[]> => {
        if (!user) return [];

        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching orders:', error);
                return [];
            }

            return data as Order[];
        } catch (error) {
            console.error('Error fetching orders:', error);
            return [];
        }
    }, [user]);

    const getOrderById = useCallback(async (orderId: string): Promise<Order | null> => {
        if (!user) return null;

        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .eq('user_id', user.id)
                .single();

            if (error) {
                console.error('Error fetching order:', error);
                return null;
            }

            return data as Order;
        } catch (error) {
            console.error('Error fetching order:', error);
            return null;
        }
    }, [user]);

    // ==================== RESET ====================

    const resetOrder = useCallback(() => {
        setState({
            isProcessing: false,
            error: null,
            currentStep: 1,
            shippingAddress: null,
            paymentMethod: null,
        });
    }, []);

    // ==================== RETURN ====================

    return {
        // State
        ...state,

        // Cart data
        cartItems: items,
        subtotal,
        tax,
        shippingCost,
        total,

        // Navigation
        goToStep,
        nextStep,
        prevStep,

        // Address
        setShippingAddress,
        validateAddress,

        // Payment
        setPaymentMethod,

        // Order actions
        createOrder,
        getUserOrders,
        getOrderById,
        resetOrder,

        // Auth state
        isAuthenticated: !!user,
    };
}

// ==================== REAL-TIME ORDER UPDATES ====================

export function subscribeToOrderUpdates(userId: string, callback: (order: Order) => void) {
    const channel = supabase
        .channel(`orders-${userId}`)
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'orders',
                filter: `user_id=eq.${userId}`
            },
            (payload) => {
                callback(payload.new as Order);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}
