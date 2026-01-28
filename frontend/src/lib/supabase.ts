import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==================== TYPE DEFINITIONS ====================

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: number;
    img: string;
    oldPrice?: number;
    discount?: string;
    description?: string;
    created_at?: string;
}

export interface CartItem {
    id: number;
    user_id: string;
    product_id: number;
    quantity: number;
    created_at: string;
}

export interface Review {
    id: number;
    user_id: string;
    product_id: number;
    rating: number;
    title: string;
    content: string;
    created_at: string;
}

// Booking System Types
export interface Barber {
    id: string;
    name: string;
    title: string;
    bio: string;
    image: string;
    specialty: string[];
    rating: number;
    reviews_count: number;
    years_experience: number;
    is_available: boolean;
    created_at: string;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number; // in minutes
    category: string;
    image: string;
    popular: boolean;
    created_at: string;
}

export interface TimeSlot {
    id: string;
    barber_id: string;
    date: string;
    start_time: string;
    end_time: string;
    is_booked: boolean;
    created_at: string;
}

export interface Appointment {
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

export interface User {
    id: string;
    email: string;
    full_name: string;
    phone?: string;
    avatar_url?: string;
    created_at: string;
}

// ==================== AUTHENTICATION ====================

export async function signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            }
        }
    });

    if (error) {
        console.error('Error signing up:', error);
        return { user: null, error: error.message };
    }
    return { user: data.user, error: null };
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Error signing in:', error);
        return { user: null, error: error.message };
    }
    return { user: data.user, error: null };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
        return false;
    }
    return true;
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
        console.error('Error resetting password:', error);
        return { success: false, error: error.message };
    }
    return { success: true, error: null };
}

// ==================== BARBERS ====================

export async function getBarbers() {
    const { data, error } = await supabase
        .from('barbers')
        .select('*')
        .eq('is_available', true)
        .order('name');

    if (error) {
        console.error('Error fetching barbers:', error);
        return [];
    }
    return data as Barber[];
}

export async function getBarberById(id: string) {
    const { data, error } = await supabase
        .from('barbers')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching barber:', error);
        return null;
    }
    return data as Barber;
}

// ==================== SERVICES ====================

export async function getServices() {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('popular', { ascending: false });

    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }
    return data as Service[];
}

export async function getServiceById(id: string) {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching service:', error);
        return null;
    }
    return data as Service;
}

// ==================== AVAILABILITY & TIME SLOTS ====================

export async function getAvailableSlots(barberId: string, date: string) {
    const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('barber_id', barberId)
        .eq('date', date)
        .eq('is_booked', false)
        .order('start_time');

    if (error) {
        console.error('Error fetching available slots:', error);
        return [];
    }
    return data as TimeSlot[];
}

export async function getBarberAvailability(barberId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('barber_id', barberId)
        .gte('date', startDate)
        .lte('date', endDate)
        .eq('is_booked', false);

    if (error) {
        console.error('Error fetching barber availability:', error);
        return [];
    }
    return data as TimeSlot[];
}

// Real-time subscription for slot updates
export function subscribeToSlotUpdates(barberId: string, date: string, callback: (slots: TimeSlot[]) => void) {
    const channel = supabase
        .channel(`slots-${barberId}-${date}`)
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'time_slots',
                filter: `barber_id=eq.${barberId}`
            },
            async () => {
                // Refetch slots when there's a change
                const slots = await getAvailableSlots(barberId, date);
                callback(slots);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}

// ==================== APPOINTMENTS ====================

export async function createAppointment(appointment: Omit<Appointment, 'id' | 'created_at'>) {
    // First, mark the time slot as booked
    const { error: slotError } = await supabase
        .from('time_slots')
        .update({ is_booked: true })
        .eq('barber_id', appointment.barber_id)
        .eq('date', appointment.date)
        .eq('start_time', appointment.start_time);

    if (slotError) {
        console.error('Error booking slot:', slotError);
        return { appointment: null, error: 'Time slot no longer available' };
    }

    // Create the appointment
    const { data, error } = await supabase
        .from('appointments')
        .insert(appointment)
        .select()
        .single();

    if (error) {
        console.error('Error creating appointment:', error);
        // Rollback slot booking
        await supabase
            .from('time_slots')
            .update({ is_booked: false })
            .eq('barber_id', appointment.barber_id)
            .eq('date', appointment.date)
            .eq('start_time', appointment.start_time);
        return { appointment: null, error: error.message };
    }

    return { appointment: data as Appointment, error: null };
}

export async function getUserAppointments(userId: string) {
    const { data, error } = await supabase
        .from('appointments')
        .select(`
            *,
            barbers (*),
            services (*)
        `)
        .eq('user_id', userId)
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching appointments:', error);
        return [];
    }
    return data;
}

export async function cancelAppointment(appointmentId: string) {
    // Get the appointment first
    const { data: appointment } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', appointmentId)
        .single();

    if (!appointment) {
        return { success: false, error: 'Appointment not found' };
    }

    // Update appointment status
    const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);

    if (error) {
        console.error('Error cancelling appointment:', error);
        return { success: false, error: error.message };
    }

    // Free up the time slot
    await supabase
        .from('time_slots')
        .update({ is_booked: false })
        .eq('barber_id', appointment.barber_id)
        .eq('date', appointment.date)
        .eq('start_time', appointment.start_time);

    return { success: true, error: null };
}

// ==================== PRODUCTS (EXISTING) ====================

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id');

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data as Product[];
}

export async function getProductById(id: number) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }
    return data as Product;
}

export async function getProductsByCategory(category: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category);

    if (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
    return data as Product[];
}

export async function searchProducts(query: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,category.ilike.%${query}%`);

    if (error) {
        console.error('Error searching products:', error);
        return [];
    }
    return data as Product[];
}

// ==================== CART (EXISTING) ====================

export async function getCartItems(userId: string) {
    const { data, error } = await supabase
        .from('cart_items')
        .select(`
            *,
            products (*)
        `)
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
    return data;
}

export async function addToCart(userId: string, productId: number, quantity: number = 1) {
    const { data, error } = await supabase
        .from('cart_items')
        .upsert({
            user_id: userId,
            product_id: productId,
            quantity
        }, {
            onConflict: 'user_id,product_id'
        });

    if (error) {
        console.error('Error adding to cart:', error);
        return null;
    }
    return data;
}

export async function removeFromCart(userId: string, productId: number) {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

    if (error) {
        console.error('Error removing from cart:', error);
        return false;
    }
    return true;
}

// ==================== REVIEWS (EXISTING) ====================

export async function getProductReviews(productId: number) {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
    return data as Review[];
}

export async function addReview(review: Omit<Review, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('reviews')
        .insert(review)
        .select()
        .single();

    if (error) {
        console.error('Error adding review:', error);
        return null;
    }
    return data as Review;
}

// ==================== NEWSLETTER ====================

export async function subscribeToNewsletter(email: string) {
    const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })
        .single();

    if (error) {
        if (error.code === '23505') {
            return { success: false, error: 'Email already subscribed' };
        }
        console.error('Error subscribing to newsletter:', error);
        return { success: false, error: error.message };
    }
    return { success: true, error: null };
}

// ==================== CONTACT FORM ====================

export async function submitContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    const { error } = await supabase
        .from('contact_submissions')
        .insert(data);

    if (error) {
        console.error('Error submitting contact form:', error);
        return { success: false, error: error.message };
    }
    return { success: true, error: null };
}
