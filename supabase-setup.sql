-- Kaggi Database Schema for Supabase PostgreSQL
-- Execute this script in your Supabase SQL Editor

-- Create cars table (Bílar)
CREATE TABLE IF NOT EXISTS public."Bílar" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    postal_code VARCHAR(10),
    car_make VARCHAR(50) NOT NULL,
    car_model VARCHAR(50) NOT NULL,
    car_plate VARCHAR(20) NOT NULL UNIQUE,
    year INTEGER NOT NULL CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM NOW()) + 1),
    mileage INTEGER CHECK (mileage >= 0),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bids table (uppboð)
CREATE TABLE IF NOT EXISTS public."uppboð" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES public."Bílar"(id) ON DELETE CASCADE,
    dealer_name VARCHAR(100) NOT NULL,
    dealer_email VARCHAR(255) NOT NULL,
    bid_amount INTEGER NOT NULL CHECK (bid_amount > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public."favorites" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES public."Bílar"(id) ON DELETE CASCADE,
    dealer_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(car_id, dealer_email)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bilar_status ON public."Bílar"(status);
CREATE INDEX IF NOT EXISTS idx_bilar_created_at ON public."Bílar"(created_at);
CREATE INDEX IF NOT EXISTS idx_bilar_car_plate ON public."Bílar"(car_plate);
CREATE INDEX IF NOT EXISTS idx_uppbod_car_id ON public."uppboð"(car_id);
CREATE INDEX IF NOT EXISTS idx_uppbod_dealer_email ON public."uppboð"(dealer_email);
CREATE INDEX IF NOT EXISTS idx_uppbod_created_at ON public."uppboð"(created_at);
CREATE INDEX IF NOT EXISTS idx_favorites_dealer_email ON public."favorites"(dealer_email);
CREATE INDEX IF NOT EXISTS idx_favorites_car_id ON public."favorites"(car_id);

-- Enable Row Level Security (RLS) for security
ALTER TABLE public."Bílar" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."uppboð" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."favorites" ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
-- For now, allowing all operations for development

-- Bílar table policies
CREATE POLICY IF NOT EXISTS "Allow all operations on Bílar" ON public."Bílar"
    FOR ALL USING (true) WITH CHECK (true);

-- uppboð table policies  
CREATE POLICY IF NOT EXISTS "Allow all operations on uppboð" ON public."uppboð"
    FOR ALL USING (true) WITH CHECK (true);

-- favorites table policies
CREATE POLICY IF NOT EXISTS "Allow all operations on favorites" ON public."favorites"
    FOR ALL USING (true) WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create triggers to automatically update updated_at column
DROP TRIGGER IF EXISTS update_bilar_updated_at ON public."Bílar";
CREATE TRIGGER update_bilar_updated_at
    BEFORE UPDATE ON public."Bílar"
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_uppbod_updated_at ON public."uppboð";
CREATE TRIGGER update_uppbod_updated_at
    BEFORE UPDATE ON public."uppboð"
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO public."Bílar" (seller_name, email, phone, car_make, car_model, car_plate, year, mileage, status) VALUES
    ('Jón Jónsson', 'jon@example.is', '+3547777777', 'Toyota', 'Yaris', 'TEST01', 2020, 45000, 'active'),
    ('Anna Pétursdóttir', 'anna@example.is', '+3547777888', 'BMW', '320i', 'TEST02', 2019, 38000, 'active'),
    ('Gunnar Gunnarsson', 'gunnar@example.is', '+3547777999', 'Mercedes-Benz', 'C-Class', 'TEST03', 2021, 22000, 'pending')
ON CONFLICT (car_plate) DO NOTHING;

-- Add some sample bids
INSERT INTO public."uppboð" (car_id, dealer_name, dealer_email, bid_amount)
SELECT 
    b.id,
    'Bílasali Reykjavík',
    'dealer@example.is',
    2500000
FROM public."Bílar" b 
WHERE b.car_plate = 'TEST01'
ON CONFLICT DO NOTHING;

-- Verify the setup
SELECT 'Tables created successfully!' as status;
SELECT 'Cars count: ' || COUNT(*) FROM public."Bílar";
SELECT 'Bids count: ' || COUNT(*) FROM public."uppboð";
SELECT 'Favorites count: ' || COUNT(*) FROM public."favorites";