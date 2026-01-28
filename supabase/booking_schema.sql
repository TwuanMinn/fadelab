-- FadeLab Booking System Schema
-- Run this AFTER the main schema.sql in your Supabase SQL Editor

-- ==================== BARBERS ====================
CREATE TABLE IF NOT EXISTS barbers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT,
    image TEXT,
    specialty TEXT[] DEFAULT '{}',
    rating DECIMAL(2,1) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    years_experience INTEGER DEFAULT 1,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== TIME SLOTS ====================
CREATE TABLE IF NOT EXISTS time_slots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    barber_id UUID REFERENCES barbers(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(barber_id, date, start_time)
);

-- ==================== APPOINTMENTS ====================
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    barber_id UUID REFERENCES barbers(id) ON DELETE SET NULL,
    service_id TEXT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    notes TEXT,
    total_price DECIMAL(10,2) NOT NULL,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== NEWSLETTER ====================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- ==================== CONTACT SUBMISSIONS ====================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== BARBER REVIEWS ====================
CREATE TABLE IF NOT EXISTS barber_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    barber_id UUID REFERENCES barbers(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== INDEXES ====================
CREATE INDEX IF NOT EXISTS idx_time_slots_barber_date ON time_slots(barber_id, date);
CREATE INDEX IF NOT EXISTS idx_time_slots_available ON time_slots(is_booked, date);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);

-- ==================== ROW LEVEL SECURITY ====================
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE barber_reviews ENABLE ROW LEVEL SECURITY;

-- Public read for barbers and slots
CREATE POLICY "Public read barbers" ON barbers FOR SELECT USING (true);
CREATE POLICY "Public read slots" ON time_slots FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON barber_reviews FOR SELECT USING (true);

-- Authenticated users can book
CREATE POLICY "Auth users book slots" ON time_slots FOR UPDATE USING (true);
CREATE POLICY "Auth users create appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users view own appointments" ON appointments FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users update own appointments" ON appointments FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Newsletter and contact open
CREATE POLICY "Anyone subscribe newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Reviews
CREATE POLICY "Auth users create reviews" ON barber_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==================== SAMPLE BARBERS ====================
INSERT INTO barbers (name, title, bio, image, specialty, rating, years_experience, is_available)
VALUES 
    ('Jason Miller', 'Master Barber', 'Specializing in classic fades and modern styles.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpphgHIH-Y-c0k9k_PEVyDOAjkPxbC89FuNrWX0z6ySJcJ1wNKcJVUWpT7LIxH8J8Q5mfQ0u3L97TMVTxyBNQ7bMY0W6O0hPXhMlQ3xVKf0FYUVpX_AqXgbFJIwwOJehcWdQoGkl2p8M5sMg', ARRAY['Fades', 'Classic'], 5.0, 8, true),
    ('Mark D.', 'Senior Barber', 'Expert in beard styling and hot towel shaves.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwUvD1KzIK14Hh553WW3ITb9B9lyr37fsqH8sdZyyGo6A9QTFBfXm3HaPCt0HTzfRP0b40SA7pEF4PZ1DOo8OQjThlD5lIBFQbb-V2GnWsvmz0HfMjmu9s8x9RKJZS8O_Q_xU5wG0PbygdH5SrOYh4vGEhRBMsIpvCw_wRNnpyrvlgRdZutclXT3eDgInHKUi7IxMaMOXoB4x9sf4orZh4bLz7bRnbYQZ7rMizxOCSBkI9Wbr7J26RcST9CjnNaREwBOuKQGw3eaSB', ARRAY['Beard', 'Shave'], 4.9, 7, true),
    ('Sarah M.', 'Style Specialist', 'Creative cuts and modern styles.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAaXXcwVkTLi1yaciH_WWRFntIjqWYYfHxpQfS3J6H3lt6N8NxusKb4_R6wvUziFpoSTwOdmQTNpLcTKdj7MS8d3jcO9vw0ggu3xT2ipsTGKn5-llYQYCS8-QM2YCYmjWOd3L0IXHsFXFauKerH4Fyz0ELmwfMZKZ50TfABwbuQoKt51_iaf6nPHhcsUlg1-meCFzwD725Iv2sDwzs7fEsGvCvF7k37b7NkHk6BJdrKs0qYVmipzC0OnZ_aMMmQ2dPzvvPiZr72y-y', ARRAY['Modern', 'Texture'], 5.0, 5, true),
    ('David L.', 'Senior Barber', 'Classic gentleman cuts with precision.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1AofsJTDOCwx04Qy58ckD5-660yfEzK17mAw89h25AtC0JiYDAITpgSdRQ_nG9y_nlvvE3MRQopm0t_iWJ0se42u5xWnrSfgz-ouO4RfdSWJM-VFZe3sAR7sv6OwCUvAmC1Gsn-TciFvhDt8rxzz4rYfdxraWJM9YoAcfTjlAaekvGBlQYmFgqX89K4cj2v5iC6tjtkUh4rxHklBa17Xjg9QBPDwnvpv8rFENZjjdQQtze72YK1dQIqf5XsW7gkyWJnmx0Eg0cNAN', ARRAY['Classic', 'Kids'], 4.8, 6, true)
ON CONFLICT DO NOTHING;

-- Generate time slots for next 14 days
DO $$
DECLARE
    barber RECORD;
    slot_date DATE;
    slot_time TIME;
BEGIN
    FOR barber IN SELECT id FROM barbers LOOP
        FOR i IN 0..13 LOOP
            slot_date := CURRENT_DATE + i;
            IF EXTRACT(DOW FROM slot_date) != 0 THEN
                slot_time := '09:00:00'::TIME;
                WHILE slot_time < '19:00:00'::TIME LOOP
                    INSERT INTO time_slots (barber_id, date, start_time, end_time, is_booked)
                    VALUES (barber.id, slot_date, slot_time, slot_time + INTERVAL '30 minutes', false)
                    ON CONFLICT DO NOTHING;
                    slot_time := slot_time + INTERVAL '30 minutes';
                END LOOP;
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE time_slots;
