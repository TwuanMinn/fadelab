-- Supabase Database Schema for Furnza
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 0,
    img TEXT NOT NULL,
    old_price DECIMAL(10, 2),
    discount VARCHAR(10),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Cart Items Table
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 3. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Row Level Security (RLS) Policies
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products: Anyone can read
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- Cart: Users can only see their own cart
CREATE POLICY "Users can view own cart" ON cart_items
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into own cart" ON cart_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_items
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from own cart" ON cart_items
    FOR DELETE USING (auth.uid() = user_id);

-- Reviews: Anyone can read, authenticated users can create
CREATE POLICY "Reviews are viewable by everyone" ON reviews
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Wishlist: Users can only see their own
CREATE POLICY "Users can view own wishlist" ON wishlist
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON wishlist
    FOR ALL USING (auth.uid() = user_id);

-- Orders: Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Insert sample products (same as your current data)
INSERT INTO products (id, name, price, category, rating, img) VALUES
(1, 'Velvet Lounge Chair', 120, 'Chairs', 4.8, 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(2, 'Nordic Dining Chair', 85, 'Chairs', 4.5, 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(3, 'Arc Floor Lamp', 160, 'Lighting', 4.9, 'https://images.unsplash.com/photo-1507473888900-52e1ad142756?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(4, 'Oak Side Table', 95, 'Tables', 4.6, 'https://images.unsplash.com/photo-1532323544230-7191fd515c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(5, 'Modern Sofa', 890, 'Sofa', 4.7, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80'),
(6, 'Wooden Shelf', 210, 'Bedroom', 4.4, 'https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=1139&q=80'),
(7, 'Ceramic Vase', 45, 'Bedroom', 4.8, 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(8, 'Abstract Art', 120, 'Kitchen', 5.0, 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80'),
(101, 'Ergo Office Chair', 250, 'Chairs', 4.7, 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(102, 'Rattan Accent Chair', 180, 'Chairs', 4.6, 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(103, 'Modern Armchair', 320, 'Chairs', 4.9, 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(201, 'Industrial Pendant', 89, 'Lighting', 4.4, 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(202, 'Minimalist Desk Lamp', 45, 'Lighting', 4.6, 'https://images.unsplash.com/photo-1534349762913-96c22b678f20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(301, 'Marble Coffee Table', 350, 'Tables', 4.8, 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(401, 'Cloud Modular Sofa', 1450, 'Sofa', 4.9, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(501, 'Queen Platform Bed', 850, 'Bedroom', 4.7, 'https://images.unsplash.com/photo-1505693416388-b0346efee958?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
(601, 'Cookware Set', 299, 'Kitchen', 4.8, 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;
