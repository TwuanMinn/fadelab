"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  total: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
}

function PaymentFormContent({ total, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: 'if_required'
      });

      if (error) {
        onError(error.message || "Payment failed");
      } else if (paymentIntent) {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      onError("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex gap-4 mb-6">
        {['card', 'paypal', 'apple'].map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setPaymentMethod(m)}
            className={`px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
              paymentMethod === m 
                ? 'bg-blue-600 border-blue-500 shadow-glow text-white' 
                : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {m === 'card' ? 'credit_card' : m === 'paypal' ? 'account_balance_wallet' : 'payments'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">{m}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {paymentMethod === 'card' ? (
          <motion.div
            key="card-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-black via-[#0B1121] to-[#0f172a]/80 border border-white/10 rounded-2xl">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#ffffff',
                      '::placeholder': {
                        color: '#6b7280',
                      },
                      iconColor: '#3b82f6',
                    },
                    invalid: {
                      color: '#ef4444',
                    },
                  },
                }}
                className="text-white"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="alternative-payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-12 bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10 text-center"
          >
            <div className="size-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="material-symbols-outlined text-4xl text-blue-500">
                {paymentMethod === 'paypal' ? 'account_balance_wallet' : 'payments'}
              </span>
            </div>
            <p className="text-xl font-black text-white uppercase tracking-tighter mb-2">
              Redirect Protocol
            </p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              You will be securely routed to {paymentMethod} for final clearance.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl flex items-center gap-6">
        <div className="size-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
          <span className="material-symbols-outlined font-black">lock</span>
        </div>
        <div>
          <p className="text-[10px] font-black text-white uppercase tracking-tight">End-to-End Encryption Active</p>
          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">PCI Level 1 Shield Proxy Enabled</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing || paymentMethod !== 'card'}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-4"
      >
        {isProcessing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            PROCESSING...
          </>
        ) : (
          <>
            PAY ${total.toFixed(2)}
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function PaymentForm({ total, onSuccess, onError }: PaymentFormProps) {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="p-6 bg-red-600/10 border border-red-500/20 rounded-2xl text-center">
        <p className="text-red-500 font-black uppercase tracking-wider">
          Stripe not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent total={total} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}