-- =====================================================
-- FADELAB COMPLETE DATABASE SCHEMA
-- Real-time Booking, Shopping, and Authorization System
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PROFILES TABLE (linked to Supabase Auth)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- 2. BARBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS barbers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT,
    image TEXT,
    specialty TEXT[] DEFAULT '{}',
    rating DECIMAL(2,1) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    years_experience INTEGER DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    category TEXT,
    image TEXT,
    popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. TIME SLOTS TABLE (for booking availability)
-- =====================================================
CREATE TABLE IF NOT EXISTS time_slots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    barber_id UUID REFERENCES barbers(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(barber_id, date, start_time)
);

-- Index for quick availability queries
CREATE INDEX IF NOT EXISTS idx_time_slots_availability 
ON time_slots(barber_id, date, is_booked);

-- =====================================================
-- 5. APPOINTMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    barber_id UUID REFERENCES barbers(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    notes TEXT,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for user appointments
CREATE INDEX IF NOT EXISTS idx_appointments_user 
ON appointments(user_id, date);

-- =====================================================
-- 6. PRODUCTS TABLE (for shop)
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    discount TEXT,
    category TEXT,
    rating DECIMAL(2,1) DEFAULT 4.5,
    img TEXT,
    stock INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. USER CARTS TABLE (for synced shopping cart)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_carts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    cart_items JSONB DEFAULT '[]',
    wishlist_items JSONB DEFAULT '[]',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    items JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) DEFAULT 0,
    shipping DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address JSONB,
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending',
    tracking_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. BARBER REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS barber_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    barber_id UUID REFERENCES barbers(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to update barber rating on new review
CREATE OR REPLACE FUNCTION update_barber_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE barbers
    SET 
        rating = (
            SELECT ROUND(AVG(rating)::numeric, 1)
            FROM barber_reviews
            WHERE barber_id = NEW.barber_id
        ),
        reviews_count = (
            SELECT COUNT(*)
            FROM barber_reviews
            WHERE barber_id = NEW.barber_id
        )
    WHERE id = NEW.barber_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_barber_review ON barber_reviews;
CREATE TRIGGER on_barber_review
    AFTER INSERT OR UPDATE OR DELETE ON barber_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_barber_rating();

-- =====================================================
-- 10. NEWSLETTER SUBSCRIBERS
-- =====================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 11. CONTACT SUBMISSIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE barber_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- BARBERS: Public read access
CREATE POLICY "Anyone can view barbers" ON barbers FOR SELECT TO anon, authenticated USING (true);

-- SERVICES: Public read access
CREATE POLICY "Anyone can view services" ON services FOR SELECT TO anon, authenticated USING (true);

-- TIME SLOTS: Public read, system write
CREATE POLICY "Anyone can view time slots" ON time_slots FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can update slots" ON time_slots FOR UPDATE TO authenticated USING (true);

-- APPOINTMENTS: Users can manage their own
CREATE POLICY "Users can view own appointments" ON appointments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own appointments" ON appointments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own appointments" ON appointments FOR UPDATE USING (auth.uid() = user_id);

-- PRODUCTS: Public read access
CREATE POLICY "Anyone can view products" ON products FOR SELECT TO anon, authenticated USING (true);

-- USER CARTS: Users can manage their own cart
CREATE POLICY "Users can view own cart" ON user_carts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own cart" ON user_carts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON user_carts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart" ON user_carts FOR DELETE USING (auth.uid() = user_id);

-- ORDERS: Users can manage their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- BARBER REVIEWS: Public read, authenticated write
CREATE POLICY "Anyone can view reviews" ON barber_reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can create reviews" ON barber_reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- NEWSLETTER: Anyone can subscribe
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

-- CONTACT: Anyone can submit
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- =====================================================
-- ENABLE REALTIME FOR KEY TABLES
-- =====================================================

-- Enable realtime for time_slots (for live availability)
ALTER PUBLICATION supabase_realtime ADD TABLE time_slots;

-- Enable realtime for user_carts (for cross-device sync)
ALTER PUBLICATION supabase_realtime ADD TABLE user_carts;

-- Enable realtime for appointments (for status updates)
ALTER PUBLICATION supabase_realtime ADD TABLE appointments;

-- =====================================================
-- SAMPLE DATA: BARBERS
-- =====================================================
INSERT INTO barbers (name, title, bio, image, specialty, rating, years_experience, is_available) VALUES
('Mark D.', 'Master Stylist', 'Mark brings 8 years of precision cutting experience. Known for his attention to detail and ability to understand exactly what clients want.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', ARRAY['Fades', 'Precision Cuts', 'Hot Towel Shaves'], 5.0, 8, true),
('James K.', 'Fade Specialist', 'James is our resident fade expert with 5 years of expertise. His gradients are legendary.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800', ARRAY['Skin Fades', 'Mid Fades', 'Drop Fades'], 4.9, 5, true),
('Sarah M.', 'Beard Expert', 'Sarah has mastered the art of beard shaping over 6 years. From stubble to full beards, she does it all.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800', ARRAY['Beard Shaping', 'Hot Towel Shaves', 'Beard Coloring'], 4.9, 6, true),
('David L.', 'Senior Barber', 'David is a classic gentleman''s barber with 10 years of experience. Traditional techniques with modern precision.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800', ARRAY['Classic Cuts', 'Gentleman Styles', 'Straight Razor'], 4.8, 10, true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SAMPLE DATA: SERVICES
-- =====================================================
INSERT INTO services (name, description, price, duration, category, popular) VALUES
('Classic Cut', 'Traditional barbering at its finest. Includes wash, cut, and style.', 35.00, 30, 'Haircuts', true),
('Skin Fade', 'Precision skin fade with seamless gradient from bald to blended.', 45.00, 45, 'Fades', true),
('Beard Trim', 'Shape and trim your beard to perfection with hot towel finish.', 25.00, 20, 'Beards', false),
('Hot Towel Shave', 'Luxurious straight razor shave with hot towels and premium products.', 40.00, 40, 'Shaves', true),
('Kids Cut', 'Patient, friendly haircuts for children under 12.', 25.00, 20, 'Haircuts', false),
('Full Service', 'Complete package: haircut, beard trim, and hot towel treatment.', 75.00, 75, 'Packages', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SAMPLE DATA: PRODUCTS
-- =====================================================
INSERT INTO products (name, description, price, old_price, category, rating, img) VALUES
('Premium Pomade', 'Strong hold, high shine pomade for classic styles.', 24.99, 29.99, 'Styling', 4.8, 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&q=80&w=400'),
('Beard Oil', 'Nourishing beard oil with argan and jojoba oils.', 19.99, NULL, 'Beard Care', 4.9, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=400'),
('Clay Matte', 'Medium hold, matte finish styling clay.', 22.99, NULL, 'Styling', 4.7, 'https://images.unsplash.com/photo-1626015371893-304f10f66e99?auto=format&fit=crop&q=80&w=400'),
('Sea Salt Spray', 'Texturizing spray for effortless beach waves.', 18.99, 21.99, 'Styling', 4.6, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=400')
ON CONFLICT DO NOTHING;

-- =====================================================
-- FUNCTION: Generate Time Slots for a Barber
-- =====================================================
CREATE OR REPLACE FUNCTION generate_slots_for_barber(
    p_barber_id UUID,
    p_start_date DATE,
    p_days INTEGER DEFAULT 14
)
RETURNS void AS $$
DECLARE
    curr_date DATE;
    slot_time TIME;
BEGIN
    FOR i IN 0..(p_days - 1) LOOP
        curr_date := p_start_date + i;
        
        -- Skip Sundays
        IF EXTRACT(DOW FROM curr_date) = 0 THEN
            CONTINUE;
        END IF;
        
        -- Generate slots from 9 AM to 7 PM (30-min intervals)
        slot_time := '09:00:00'::TIME;
        WHILE slot_time < '19:00:00'::TIME LOOP
            INSERT INTO time_slots (barber_id, date, start_time, end_time, is_booked)
            VALUES (
                p_barber_id,
                curr_date,
                slot_time,
                slot_time + INTERVAL '30 minutes',
                false
            )
            ON CONFLICT (barber_id, date, start_time) DO NOTHING;
            
            slot_time := slot_time + INTERVAL '30 minutes';
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Generate slots for all barbers for the next 14 days
DO $$
DECLARE
    barber_record RECORD;
BEGIN
    FOR barber_record IN SELECT id FROM barbers LOOP
        PERFORM generate_slots_for_barber(barber_record.id, CURRENT_DATE, 14);
    END LOOP;
END $$;
