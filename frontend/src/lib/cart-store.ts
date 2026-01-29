import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabase';

// ==================== TYPES ====================

export interface CartItem {
    id: number;
    name: string;
    price: number;
    img: string;
    quantity: number;
    category: string;
}

export interface WishlistItem {
    id: number;
    name: string;
    price: number;
    img: string;
    category: string;
    rating: number;
}

interface CartStore {
    // State
    items: CartItem[];
    wishlist: WishlistItem[];
    userId: string | null;
    isSyncing: boolean;
    lastSyncedAt: Date | null;

    // Cart actions
    addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;

    // Wishlist actions
    addToWishlist: (product: WishlistItem) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    toggleWishlist: (product: WishlistItem) => void;

    // Sync actions
    setUserId: (userId: string | null) => void;
    syncWithServer: () => Promise<void>;
    loadFromServer: () => Promise<void>;
}

// ==================== STORE ====================

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            wishlist: [],
            userId: null,
            isSyncing: false,
            lastSyncedAt: null,

            // ==================== CART ACTIONS ====================

            addToCart: (product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.id === product.id);
                    let newItems: CartItem[];

                    if (existingItem) {
                        newItems = state.items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        );
                    } else {
                        newItems = [...state.items, { ...product, quantity }];
                    }

                    return { items: newItems };
                });

                // Sync with server if user is logged in
                const { userId } = get();
                if (userId) {
                    get().syncWithServer();
                }
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== productId)
                }));

                const { userId } = get();
                if (userId) {
                    get().syncWithServer();
                }
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === productId
                            ? { ...item, quantity }
                            : item
                    )
                }));

                const { userId } = get();
                if (userId) {
                    get().syncWithServer();
                }
            },

            clearCart: () => {
                set({ items: [] });

                const { userId } = get();
                if (userId) {
                    get().syncWithServer();
                }
            },

            getCartTotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getCartCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },

            // ==================== WISHLIST ACTIONS ====================

            addToWishlist: (product) => {
                set((state) => {
                    if (state.wishlist.find(item => item.id === product.id)) {
                        return state;
                    }
                    return {
                        wishlist: [...state.wishlist, product]
                    };
                });

                const { userId } = get();
                if (userId) {
                    get().syncWithServer();
                }
            },

            removeFromWishlist: (productId) => {
                set((state) => ({
                    wishlist: state.wishlist.filter(item => item.id !== productId)
                }));

                const { userId } = get();
                if (userId) {
                    get().syncWithServer();
                }
            },

            isInWishlist: (productId) => {
                return get().wishlist.some(item => item.id === productId);
            },

            toggleWishlist: (product) => {
                const isInList = get().isInWishlist(product.id);
                if (isInList) {
                    get().removeFromWishlist(product.id);
                } else {
                    get().addToWishlist(product);
                }
            },

            // ==================== SYNC ACTIONS ====================

            setUserId: (userId) => {
                set({ userId });
                if (userId) {
                    // Load user's cart from server when they log in
                    get().loadFromServer();
                }
            },

            syncWithServer: async () => {
                const { userId, items, wishlist, isSyncing } = get();

                if (!userId || isSyncing) return;

                set({ isSyncing: true });

                try {
                    // Upsert cart data to Supabase
                    const { error } = await supabase
                        .from('user_carts')
                        .upsert({
                            user_id: userId,
                            cart_items: items,
                            wishlist_items: wishlist,
                            updated_at: new Date().toISOString(),
                        }, {
                            onConflict: 'user_id',
                        });

                    if (error) {
                        console.error('Error syncing cart:', error);
                    } else {
                        set({ lastSyncedAt: new Date() });
                    }
                } catch (error) {
                    console.error('Error syncing cart:', error);
                } finally {
                    set({ isSyncing: false });
                }
            },

            loadFromServer: async () => {
                const { userId, items: localItems, wishlist: localWishlist } = get();

                if (!userId) return;

                set({ isSyncing: true });

                try {
                    const { data, error } = await supabase
                        .from('user_carts')
                        .select('*')
                        .eq('user_id', userId)
                        .single();

                    if (error) {
                        if (error.code !== 'PGRST116') { // Not found is ok
                            console.error('Error loading cart:', error);
                        }
                        // If no server cart exists, sync current local cart to server
                        if (localItems.length > 0 || localWishlist.length > 0) {
                            await get().syncWithServer();
                        }
                    } else if (data) {
                        // Merge server cart with local cart (local takes priority for conflicts)
                        const serverItems = (data.cart_items || []) as CartItem[];
                        const serverWishlist = (data.wishlist_items || []) as WishlistItem[];

                        // Merge items: local items take priority, add server-only items
                        const mergedItems = [...localItems];
                        serverItems.forEach(serverItem => {
                            if (!mergedItems.find(item => item.id === serverItem.id)) {
                                mergedItems.push(serverItem);
                            }
                        });

                        // Merge wishlist
                        const mergedWishlist = [...localWishlist];
                        serverWishlist.forEach(serverItem => {
                            if (!mergedWishlist.find(item => item.id === serverItem.id)) {
                                mergedWishlist.push(serverItem);
                            }
                        });

                        set({
                            items: mergedItems,
                            wishlist: mergedWishlist,
                            lastSyncedAt: new Date()
                        });

                        // Sync merged cart back to server
                        await get().syncWithServer();
                    }
                } catch (error) {
                    console.error('Error loading cart:', error);
                } finally {
                    set({ isSyncing: false });
                }
            },
        }),
        {
            name: 'fadelab-cart-storage',
            partialize: (state) => ({
                items: state.items,
                wishlist: state.wishlist,
            }),
        }
    )
);

// ==================== REAL-TIME SYNC HOOK ====================

export function subscribeToCartUpdates(userId: string, callback: (items: CartItem[], wishlist: WishlistItem[]) => void) {
    const channel = supabase
        .channel(`cart-${userId}`)
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'user_carts',
                filter: `user_id=eq.${userId}`
            },
            (payload) => {
                const data = payload.new as any;
                if (data) {
                    callback(
                        data.cart_items || [],
                        data.wishlist_items || []
                    );
                }
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}
