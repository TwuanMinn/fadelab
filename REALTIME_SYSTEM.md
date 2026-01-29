# FadeLab Real-time System Implementation

This document describes the real-time booking, shopping, and authorization system implementation.

## Overview

The system now integrates with Supabase for:
- 🔐 **Authentication**: Email/password + Google OAuth with profile sync
- 📅 **Real-time Booking**: Live slot availability with instant updates
- 🛒 **Shopping Cart**: Cross-device sync for authenticated users
- 📦 **Order Management**: Full checkout flow with status tracking

---

## Quick Setup

### 1. Environment Variables

Create/update `.env.local` in the `frontend` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # For API routes only
```

### 2. Database Setup

Run the SQL schema in your Supabase SQL Editor:

```bash
# The schema file is located at:
# supabase/schema.sql
```

This will create all tables, RLS policies, triggers, and sample data.

### 3. Enable Realtime

In Supabase Dashboard:
1. Go to **Database → Replication**
2. Enable realtime for: `time_slots`, `user_carts`, `appointments`

---

## Architecture

### Core Files

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client + all database functions |
| `src/lib/auth-context.tsx` | Auth provider with cart sync |
| `src/lib/cart-store.ts` | Zustand cart with server sync |
| `src/hooks/useBookingSystem.ts` | Real-time booking hook |
| `src/hooks/useOrderSystem.ts` | Order management hook |

### API Routes

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/availability` | GET | Fetch available time slots |
| `/api/bookings` | GET, POST | Create/fetch appointments |
| `/api/orders` | GET, POST, PATCH | Manage orders |

---

## How It Works

### 1. Authentication Flow

```
User Signs Up/In
       ↓
   Supabase Auth
       ↓
   Profile Created (via trigger)
       ↓
   Cart Synced (loadFromServer)
       ↓
   Real-time subscriptions activated
```

### 2. Booking Flow

```
Select Barber → Select Service → Pick Date
       ↓
  Load Available Slots (from Supabase)
       ↓
  Subscribe to Real-time Updates
       ↓
  Select Time → Confirm Booking
       ↓
  Atomic Transaction:
    1. Mark slot as booked
    2. Create appointment
    3. (Rollback on failure)
```

### 3. Shopping Flow

```
Add to Cart (local + server sync)
       ↓
  Checkout → Enter Address → Payment Method
       ↓
  Create Order (with calculated totals)
       ↓
  Clear Cart → Success Page
       ↓
  Real-time order status updates
```

---

## Usage Examples

### Using the Booking System

```tsx
import { useBookingSystem } from '@/hooks/useBookingSystem';

function BookingPage() {
    const booking = useBookingSystem();
    
    // Select a barber
    booking.selectBarber(barber);
    
    // Select a service
    booking.selectService(service);
    
    // Select a date (triggers slot fetch)
    await booking.selectDate(new Date());
    
    // Available slots are now in booking.availableSlots
    // They update in real-time when other users book!
    
    // Select a time
    booking.selectTime('10:00', slotId);
    
    // Create the booking
    const result = await booking.createBooking({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0123',
        notes: 'First time visitor'
    });
}
```

### Using the Cart Store

```tsx
import { useCartStore } from '@/lib/cart-store';

function ShopPage() {
    const { items, addToCart, getCartTotal, getCartCount } = useCartStore();
    
    // Add to cart (auto-syncs with server if logged in)
    addToCart({
        id: 1,
        name: 'Premium Pomade',
        price: 24.99,
        img: '/pomade.jpg',
        category: 'Styling'
    });
    
    // Cart count badge
    const count = getCartCount();
    
    // Checkout total
    const total = getCartTotal();
}
```

### Using the Order System

```tsx
import { useOrderSystem } from '@/hooks/useOrderSystem';

function CheckoutPage() {
    const order = useOrderSystem();
    
    // Set shipping address
    order.setShippingAddress({
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        phone: '555-0123'
    });
    
    // Set payment method
    order.setPaymentMethod('card');
    
    // Create order
    const result = await order.createOrder();
    
    if (result.success) {
        // Redirect to success page
        router.push(`/success?orderId=${result.orderId}`);
    }
}
```

### Using Authentication

```tsx
import { useAuth } from '@/lib/auth-context';

function ProfilePage() {
    const { user, profile, signIn, signUp, signOut, loading } = useAuth();
    
    if (loading) return <Loading />;
    
    if (!user) {
        return <LoginForm onSubmit={signIn} />;
    }
    
    return (
        <div>
            <h1>Welcome, {profile?.full_name}</h1>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}
```

---

## Database Schema

### Key Tables

| Table | Description |
|-------|-------------|
| `profiles` | Extended user data (synced from auth.users) |
| `barbers` | Barber profiles with ratings |
| `services` | Available services with pricing |
| `time_slots` | 30-min booking slots per barber/day |
| `appointments` | User bookings linked to slots |
| `products` | Shop inventory |
| `user_carts` | Synced cart/wishlist (JSONB) |
| `orders` | Purchase records with status |

### Real-time Triggers

- **Profile Creation**: Auto-creates profile on user signup
- **Rating Aggregation**: Updates barber rating on new review
- **Slot Generation**: Function to create time slots for barbers

---

## Security

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- **Public Read**: barbers, services, time_slots, products
- **Own Data Only**: profiles, appointments, user_carts, orders
- **Authenticated Write**: reviews, newsletter subscriptions

---

## Troubleshooting

### Slots not showing?
1. Check if `time_slots` table has data for the selected barber/date
2. Run the `generate_slots_for_barber()` function
3. Verify realtime is enabled for `time_slots`

### Cart not syncing?
1. Ensure user is logged in (`useAuth().user !== null`)
2. Check if `user_carts` table exists
3. Verify RLS policies allow the user to write

### Bookings failing?
1. Check console for specific error messages
2. Verify `appointments` and `time_slots` tables exist
3. Ensure user has permission to create appointments

---

## Next Steps

To complete the production setup:

1. [ ] Add Stripe integration for payments
2. [ ] Set up email sending (confirmation emails)
3. [ ] Add SMS notifications (appointment reminders)
4. [ ] Create admin dashboard for managing bookings
5. [ ] Add inventory tracking for products
