"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 px-8 text-center"
        >
            <div className="size-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-slate-400">{icon}</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">{description}</p>
            {actionLabel && (actionHref || onAction) && (
                actionHref ? (
                    <Link
                        href={actionHref}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-primary/25"
                    >
                        {actionLabel}
                    </Link>
                ) : (
                    <button
                        onClick={onAction}
                        className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-primary/25"
                    >
                        {actionLabel}
                    </button>
                )
            )}
        </motion.div>
    );
}

export function EmptyCart() {
    return (
        <EmptyState
            icon="shopping_cart"
            title="Your cart is empty"
            description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
            actionLabel="Browse Products"
            actionHref="/"
        />
    );
}

export function EmptyWishlist() {
    return (
        <EmptyState
            icon="favorite"
            title="No favorites yet"
            description="Save items you love by tapping the heart icon. They'll appear here for easy access."
            actionLabel="Discover Products"
            actionHref="/"
        />
    );
}

export function EmptySearch({ query }: { query?: string }) {
    return (
        <EmptyState
            icon="search_off"
            title="No results found"
            description={query ? `We couldn't find anything matching "${query}". Try a different search term.` : "Try searching for furniture, lighting, or decor."}
            actionLabel="Clear Search"
            actionHref="/search"
        />
    );
}

export function EmptyOrders() {
    return (
        <EmptyState
            icon="receipt_long"
            title="No orders yet"
            description="When you place an order, it will appear here so you can track its progress."
            actionLabel="Start Shopping"
            actionHref="/"
        />
    );
}

export function EmptyReviews() {
    return (
        <EmptyState
            icon="rate_review"
            title="No reviews yet"
            description="Be the first to share your thoughts about this product!"
        />
    );
}

export function EmptyNotifications() {
    return (
        <EmptyState
            icon="notifications_off"
            title="All caught up!"
            description="You have no new notifications. Check back later for updates on your orders."
        />
    );
}
