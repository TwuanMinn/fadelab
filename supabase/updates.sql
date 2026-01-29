-- Add missing tables for enhanced functionality

-- Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('booking', 'order')),
    reference TEXT NOT NULL,
    issue_type TEXT NOT NULL,
    description TEXT NOT NULL,
    user_email TEXT NOT NULL,
    details JSONB,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Index for support tickets
CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON support_tickets(user_email, created_at);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status, created_at);

-- Cart updates table for real-time sync
CREATE TABLE IF NOT EXISTS cart_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    update_type TEXT NOT NULL CHECK (update_type IN ('synced', 'modified', 'cleared')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details JSONB
);

-- Index for cart updates
CREATE INDEX IF NOT EXISTS idx_cart_updates_user ON cart_updates(user_id, timestamp DESC);

-- Appointment updates table for better real-time
CREATE TABLE IF NOT EXISTS appointment_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    update_type TEXT NOT NULL CHECK (update_type IN ('created', 'updated', 'cancelled')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    details JSONB
);

-- Index for appointment updates
CREATE INDEX IF NOT EXISTS idx_appointment_updates_user ON appointment_updates(user_id, timestamp DESC);

-- Enhanced orders table with tracking numbers
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_snapshots JSONB;

-- Update existing orders with tracking numbers
UPDATE orders 
SET tracking_number = 'US-' || substr(id::text, -8) || upper(substr(extract(epoch from created_at)::text, 1, 6))
WHERE tracking_number IS NULL;

-- Enable RLS for new tables
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_updates ENABLE ROW LEVEL SECURITY;

-- RLS policies for support tickets
CREATE POLICY "Users can view own support tickets" ON support_tickets FOR SELECT USING (auth.email() = user_email);
CREATE POLICY "Users can create own support tickets" ON support_tickets FOR INSERT WITH CHECK (auth.email() = user_email);

-- RLS policies for cart updates
CREATE POLICY "Users can manage own cart updates" ON cart_updates FOR ALL USING (auth.uid() = user_id);

-- RLS policies for appointment updates
CREATE POLICY "Users can manage own appointment updates" ON appointment_updates FOR ALL USING (auth.uid() = user_id);

-- Enable realtime for new tables
ALTER PUBLICATION supabase_realtime ADD TABLE support_tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE cart_updates;
ALTER PUBLICATION supabase_realtime ADD TABLE appointment_updates;

-- Trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log appointment changes
CREATE OR REPLACE FUNCTION log_appointment_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO appointment_updates (user_id, appointment_id, update_type, details)
        VALUES (NEW.user_id, NEW.id, 'created', row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO appointment_updates (user_id, appointment_id, update_type, details)
        VALUES (NEW.user_id, NEW.id, 'updated', row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO appointment_updates (user_id, appointment_id, update_type, details)
        VALUES (OLD.user_id, OLD.id, 'cancelled', row_to_json(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER appointment_change_log
    AFTER INSERT OR UPDATE OR DELETE ON appointments
    FOR EACH ROW EXECUTE FUNCTION log_appointment_change();