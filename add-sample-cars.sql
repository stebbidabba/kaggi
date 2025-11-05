-- Add 2 cars to Bílasalaportal (Dealer Portal)
-- Execute this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Car 1: Suzuki Swift 2016 White
INSERT INTO public."Bílar" (
    seller_name, 
    email, 
    phone, 
    postal_code,
    car_make, 
    car_model, 
    car_plate, 
    year, 
    mileage, 
    status
) VALUES (
    'Stefán Jónsson',
    'stefan@example.is',
    '+3546921608',
    '170',
    'Suzuki',
    'Swift',
    'AB123',
    2016,
    85000,
    'active'
)
ON CONFLICT (car_plate) DO UPDATE SET
    seller_name = EXCLUDED.seller_name,
    car_make = EXCLUDED.car_make,
    car_model = EXCLUDED.car_model,
    year = EXCLUDED.year,
    mileage = EXCLUDED.mileage,
    status = EXCLUDED.status;

-- Car 2: Volkswagen Golf 2018 Blue
INSERT INTO public."Bílar" (
    seller_name, 
    email, 
    phone, 
    postal_code,
    car_make, 
    car_model, 
    car_plate, 
    year, 
    mileage, 
    status
) VALUES (
    'Guðrún Magnúsdóttir',
    'gudrun@example.is',
    '+3547777123',
    '101',
    'Volkswagen',
    'Golf',
    'CD456',
    2018,
    62000,
    'active'
)
ON CONFLICT (car_plate) DO UPDATE SET
    seller_name = EXCLUDED.seller_name,
    car_make = EXCLUDED.car_make,
    car_model = EXCLUDED.car_model,
    year = EXCLUDED.year,
    mileage = EXCLUDED.mileage,
    status = EXCLUDED.status;

-- Verify the cars were added
SELECT * FROM public."Bílar" WHERE car_plate IN ('AB123', 'CD456');

