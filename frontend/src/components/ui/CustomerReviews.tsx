"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Review {
    id: number;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    text: string;
    service: string;
    barber: string;
    helpful: number;
    verified: boolean;
}

const reviews: Review[] = [
    {
        id: 1,
        author: "Alex Richardson",
        avatar: "AR",
        rating: 5,
        date: "2 days ago",
        text: "Best vibe in town. Jason never misses. The attention to detail on the fade is something I haven't found anywhere else in the city.",
        service: "Classic Fade",
        barber: "Jason Miller",
        helpful: 24,
        verified: true,
    },
    {
        id: 2,
        author: "Michael Turner",
        avatar: "MT",
        rating: 5,
        date: "1 week ago",
        text: "Mark D. understood exactly what I wanted. The atmosphere is super chill and the Classic Cut service is top notch.",
        service: "Classic Cut",
        barber: "Mark D.",
        helpful: 18,
        verified: true,
    },
    {
        id: 3,
        author: "Kevin Chen",
        avatar: "KC",
        rating: 5,
        date: "2 weeks ago",
        text: "Been coming to FadeLab since they opened in 2018. The consistency is incredible - every single cut is perfect.",
        service: "Hair & Beard Combo",
        barber: "David L.",
        helpful: 31,
        verified: true,
    },
    {
        id: 4,
        author: "Marcus Johnson",
        avatar: "MJ",
        rating: 5,
        date: "3 weeks ago",
        text: "The Premium Experience is worth every penny. The hot towel shave is unbelievably relaxing. Sarah M. is a true beard expert!",
        service: "Deluxe Package",
        barber: "Sarah M.",
        helpful: 42,
        verified: true,
    },
    {
        id: 5,
        author: "James Williams",
        avatar: "JW",
        rating: 4,
        date: "1 month ago",
        text: "Great cut, loved the vibe. Only minor wait time but worth it. Will definitely be back!",
        service: "Classic Cut",
        barber: "James K.",
        helpful: 12,
        verified: false,
    },
];

function StarRating({ rating, interactive = false, onRate }: {
    rating: number;
    interactive?: boolean;
    onRate?: (rating: number) => void;
}) {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    disabled={!interactive}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    onClick={() => onRate?.(star)}
                    className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                >
                    <span
                        className={`material-symbols-outlined text-lg ${star <= (hoverRating || rating)
                                ? 'text-yellow-400'
                                : 'text-gray-600'
                            }`}
                        style={{ fontVariationSettings: star <= (hoverRating || rating) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                        star
                    </span>
                </button>
            ))}
        </div>
    );
}

function ReviewCard({ review, onHelpful }: { review: Review; onHelpful: (id: number) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-dark border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {review.avatar}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="text-white font-semibold">{review.author}</h4>
                            {review.verified && (
                                <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                                    <span className="material-symbols-outlined text-xs">verified</span>
                                    Verified
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 text-xs">{review.date}</p>
                    </div>
                </div>
                <StarRating rating={review.rating} />
            </div>

            {/* Service & Barber Tags */}
            <div className="flex gap-2 mb-3">
                <span className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded">
                    {review.service}
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    with {review.barber}
                </span>
            </div>

            {/* Review Text */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{review.text}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                    onClick={() => onHelpful(review.id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"
                >
                    <span className="material-symbols-outlined text-base">thumb_up</span>
                    Helpful ({review.helpful})
                </button>
                <button className="text-gray-500 hover:text-white text-sm transition-colors">
                    <span className="material-symbols-outlined text-base">flag</span>
                </button>
            </div>
        </motion.div>
    );
}

export function CustomerReviews() {
    const [filter, setFilter] = useState<'all' | number>('all');
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 0, text: '', service: '' });
    const [localReviews, setLocalReviews] = useState(reviews);

    const filteredReviews = filter === 'all'
        ? localReviews
        : localReviews.filter(r => r.rating === filter);

    const avgRating = (localReviews.reduce((acc, r) => acc + r.rating, 0) / localReviews.length).toFixed(1);

    const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: localReviews.filter(r => r.rating === rating).length,
        percentage: (localReviews.filter(r => r.rating === rating).length / localReviews.length) * 100
    }));

    const handleHelpful = (id: number) => {
        setLocalReviews(prev =>
            prev.map(r => r.id === id ? { ...r, helpful: r.helpful + 1 } : r)
        );
        toast.success("Thanks for your feedback!");
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (newReview.rating === 0) {
            toast.error("Please select a rating");
            return;
        }
        toast.success("Thank you! Your review has been submitted for approval.");
        setShowWriteReview(false);
        setNewReview({ rating: 0, text: '', service: '' });
    };

    return (
        <section className="py-20 bg-background-dark" id="reviews">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            Customer Reviews
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400"
                        >
                            See what our clients are saying
                        </motion.p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowWriteReview(true)}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <span className="material-symbols-outlined">edit</span>
                        Write a Review
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Stats Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface-dark border border-white/10 rounded-xl p-6 sticky top-24">
                            {/* Overall Rating */}
                            <div className="text-center mb-6 pb-6 border-b border-white/10">
                                <div className="text-5xl font-black text-white mb-2">{avgRating}</div>
                                <StarRating rating={Math.round(parseFloat(avgRating))} />
                                <p className="text-gray-500 text-sm mt-2">Based on {localReviews.length} reviews</p>
                            </div>

                            {/* Rating Breakdown */}
                            <div className="space-y-3 mb-6">
                                {ratingCounts.map(({ rating, count, percentage }) => (
                                    <button
                                        key={rating}
                                        onClick={() => setFilter(filter === rating ? 'all' : rating)}
                                        className={`w-full flex items-center gap-3 text-sm transition-colors ${filter === rating ? 'text-primary' : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <span className="w-3">{rating}</span>
                                        <span className="material-symbols-outlined text-sm text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="w-6 text-right">{count}</span>
                                    </button>
                                ))}
                            </div>

                            {filter !== 'all' && (
                                <button
                                    onClick={() => setFilter('all')}
                                    className="w-full text-center text-primary text-sm hover:underline"
                                >
                                    Clear filter
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="lg:col-span-3 space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredReviews.map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ReviewCard review={review} onHelpful={handleHelpful} />
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredReviews.length === 0 && (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-5xl text-gray-600 mb-4 block">rate_review</span>
                                <p className="text-gray-500">No reviews match this filter</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Write Review Modal */}
                <AnimatePresence>
                    {showWriteReview && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setShowWriteReview(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-surface-dark border border-white/10 rounded-2xl p-8 max-w-lg w-full"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-white">Write a Review</h3>
                                    <button
                                        onClick={() => setShowWriteReview(false)}
                                        className="text-gray-500 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmitReview} className="space-y-6">
                                    {/* Rating */}
                                    <div>
                                        <label className="block text-white font-medium mb-2">Your Rating</label>
                                        <StarRating
                                            rating={newReview.rating}
                                            interactive
                                            onRate={(r) => setNewReview(prev => ({ ...prev, rating: r }))}
                                        />
                                    </div>

                                    {/* Service */}
                                    <div>
                                        <label className="block text-white font-medium mb-2">Service</label>
                                        <select
                                            value={newReview.service}
                                            onChange={(e) => setNewReview(prev => ({ ...prev, service: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                            required
                                        >
                                            <option value="">Select a service</option>
                                            <option value="Classic Cut">Classic Cut</option>
                                            <option value="Classic Fade">Classic Fade</option>
                                            <option value="Hot Towel Shave">Hot Towel Shave</option>
                                            <option value="Beard Trim">Beard Trim</option>
                                            <option value="Hair & Beard Combo">Hair & Beard Combo</option>
                                            <option value="Deluxe Package">Deluxe Package</option>
                                        </select>
                                    </div>

                                    {/* Review Text */}
                                    <div>
                                        <label className="block text-white font-medium mb-2">Your Review</label>
                                        <textarea
                                            value={newReview.text}
                                            onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                                            placeholder="Share your experience..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                            required
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold transition-colors"
                                    >
                                        Submit Review
                                    </motion.button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
