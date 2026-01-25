import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for your database
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

// Helper functions for common operations
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

// Cart operations
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

// Reviews
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
