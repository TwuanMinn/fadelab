import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    items: CartItem[];
    wishlist: WishlistItem[];

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
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            wishlist: [],

            // Cart actions
            addToCart: (product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map(item =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            )
                        };
                    }
                    return {
                        items: [...state.items, { ...product, quantity }]
                    };
                });
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== productId)
                }));
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
            },

            clearCart: () => set({ items: [] }),

            getCartTotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getCartCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },

            // Wishlist actions
            addToWishlist: (product) => {
                set((state) => {
                    if (state.wishlist.find(item => item.id === product.id)) {
                        return state;
                    }
                    return {
                        wishlist: [...state.wishlist, product]
                    };
                });
            },

            removeFromWishlist: (productId) => {
                set((state) => ({
                    wishlist: state.wishlist.filter(item => item.id !== productId)
                }));
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
            }
        }),
        {
            name: 'furnza-cart-storage',
        }
    )
);
