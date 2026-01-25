# Supabase Setup Guide for Furnza

## Quick Setup Steps

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Enter project name: `furnza`
4. Set a strong database password (save this!)
5. Choose a region closest to your users
6. Click **"Create new project"**

### 2. Get Your API Keys
1. Once your project is ready, go to **Settings → API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (safe to use in browser)

### 3. Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and paste your values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Create Database Tables
1. In Supabase Dashboard, go to **SQL Editor**
2. Open the file `supabase/schema.sql` from this project
3. Copy the entire contents and paste into the SQL Editor
4. Click **"Run"** to create all tables and insert sample data

### 5. Enable Google OAuth (Optional)
1. Go to **Authentication → Providers**
2. Enable **Google**
3. Add your Google OAuth credentials (from Google Cloud Console)
4. Set redirect URL to: `https://your-project.supabase.co/auth/v1/callback`

### 6. Restart Your Dev Server
```bash
npm run dev
```

---

## Using Supabase in Your Code

### Authentication
```tsx
import { useAuth } from '@/lib/auth-context';

function MyComponent() {
    const { user, signIn, signOut, signInWithGoogle } = useAuth();
    
    if (user) {
        return <button onClick={signOut}>Sign Out</button>;
    }
    
    return <button onClick={() => signIn('email', 'password')}>Sign In</button>;
}
```

### Fetching Products
```tsx
import { getProducts, getProductById, searchProducts } from '@/lib/supabase';

// Get all products
const products = await getProducts();

// Get single product
const product = await getProductById(1);

// Search products
const results = await searchProducts('sofa');
```

### Cart Operations
```tsx
import { addToCart, getCartItems, removeFromCart } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

function CartButton({ productId }) {
    const { user } = useAuth();
    
    const handleAdd = async () => {
        if (!user) return alert('Please sign in');
        await addToCart(user.id, productId, 1);
    };
    
    return <button onClick={handleAdd}>Add to Cart</button>;
}
```

---

## Troubleshooting

### "Invalid API key"
- Make sure `.env.local` has the correct values
- Restart the dev server after changing env vars

### "Permission denied" errors
- Check that RLS policies are set up (run schema.sql)
- Make sure user is authenticated for protected operations

### Products not showing
- Verify the products table has data in Supabase Dashboard
- Check browser console for errors

---

## Next Steps
1. Replace mock data with Supabase queries
2. Implement real cart persistence
3. Add user profile pages
4. Set up order processing
