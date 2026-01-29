"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'booking' | 'order';
    reference: string;
    details?: any;
}

export function SupportModal({ isOpen, onClose, type, reference, details }: SupportModalProps) {
    const [issue, setIssue] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supportData = {
                type,
                reference,
                issue_type: issue,
                description,
                user_email: details?.userEmail || 'guest',
                details: JSON.stringify(details),
                status: 'open',
                created_at: new Date().toISOString()
            };

            const response = await fetch('/api/support', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supportData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                throw new Error('Failed to submit support request');
            }
        } catch (error) {
            console.error('Error submitting support request:', error);
            // Fallback to email
            const subject = encodeURIComponent(`Help with ${type === 'booking' ? 'Booking' : 'Order'} ${reference}`);
            const body = encodeURIComponent(`Issue Type: ${issue}\n\nDescription:\n${description}\n\nReference: ${reference}`);
            window.location.href = `mailto:support@fadelab.com?subject=${subject}&body=${body}`;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#1e293b] rounded-2xl p-6 max-w-md w-full border border-white/10"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                        Help with {type === 'booking' ? 'Booking' : 'Order'} {reference}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {submitted ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-green-500 text-2xl">check</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Support Request Submitted</h4>
                        <p className="text-white/60 text-sm">
                            We'll get back to you within 24 hours. Reference: #{reference}
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-white/60 text-sm mb-2">Issue Type</label>
                            <select
                                value={issue}
                                onChange={(e) => setIssue(e.target.value)}
                                required
                                className="w-full bg-surface-darker text-white rounded-xl p-3 border border-white/10 focus:border-blue-500 outline-none"
                            >
                                <option value="">Select an issue</option>
                                {type === 'booking' ? (
                                    <>
                                        <option value="reschedule">Need to reschedule</option>
                                        <option value="cancel">Request cancellation</option>
                                        <option value="payment">Payment issue</option>
                                        <option value="barber">Barber preference</option>
                                        <option value="other">Other</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="shipping">Shipping issue</option>
                                        <option value="damaged">Item arrived damaged</option>
                                        <option value="wrong_item">Received wrong item</option>
                                        <option value="payment">Payment issue</option>
                                        <option value="return">Return request</option>
                                        <option value="other">Other</option>
                                    </>
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={4}
                                placeholder="Please describe your issue in detail..."
                                className="w-full bg-surface-darker text-white rounded-xl p-3 border border-white/10 focus:border-blue-500 outline-none resize-none"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-2 bg-surface-darker hover:bg-surface-darker/80 rounded-xl text-white font-bold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !issue || !description}
                                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
}