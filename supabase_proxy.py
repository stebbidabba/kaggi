#!/usr/bin/env python3
"""
Simple HTTP proxy for Supabase to work around DNS issues
"""
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
import httpx
import uvicorn
import json
import asyncio
from typing import Any, Dict

# Supabase configuration
SUPABASE_URL = "https://ylsuzpypokkkreqqkqadu.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsc3V6cHlwb2treHJlcXFrYWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODAyMjIsImV4cCI6MjA3NTI1NjIyMn0.pqFrHZyVRLyBDYW5T6EjeLj59hpv8WPDgQFTQBUhibs"

app = FastAPI(title="Supabase Proxy")

# Try different methods to resolve DNS
async def try_resolve_supabase():
    """Try different approaches to connect to Supabase"""
    
    methods = [
        # Try direct connection
        {"url": SUPABASE_URL, "method": "direct"},
        # Try with different DNS servers via hosts
        {"url": "https://76.76.21.21", "method": "ip", "host": "ylsuzpypokkkreqqkqadu.supabase.co"},
        # Try cloudflare gateway
        {"url": "https://1.1.1.1", "method": "dns_over_https"},
    ]
    
    for method in methods:
        try:
            print(f"Trying {method['method']}...")
            
            if method["method"] == "direct":
                async with httpx.AsyncClient(timeout=10.0) as client:
                    response = await client.get(f"{method['url']}/rest/v1/", headers={
                        "apikey": SUPABASE_KEY,
                        "Authorization": f"Bearer {SUPABASE_KEY}"
                    })
                    if response.status_code < 400:
                        print(f"✅ {method['method']} works!")
                        return method["url"]
            
            elif method["method"] == "ip":
                async with httpx.AsyncClient(timeout=10.0, verify=False) as client:
                    response = await client.get(f"{method['url']}/rest/v1/", headers={
                        "apikey": SUPABASE_KEY,
                        "Authorization": f"Bearer {SUPABASE_KEY}",
                        "Host": method["host"]
                    })
                    if response.status_code < 400:
                        print(f"✅ {method['method']} works!")
                        return method["url"], method["host"]
                        
        except Exception as e:
            print(f"❌ {method['method']} failed: {e}")
            continue
    
    print("❌ All methods failed")
    return None

# Mock data as fallback
MOCK_CARS = [
    {
        "id": "mock-1",
        "seller_name": "Jón Jónsson (Mock)",
        "email": "jon@example.com",
        "phone": "+3547777777",
        "postal_code": "101",
        "car_make": "Toyota",
        "car_model": "Yaris", 
        "car_plate": "AB123",
        "year": 2018,
        "mileage": 110000,
        "status": "active",
        "created_at": "2025-10-05T18:00:00.000000"
    }
]

@app.get("/api/supabase-test")
async def test_connection():
    """Test Supabase connection"""
    result = await try_resolve_supabase()
    return {"status": "tested", "result": str(result)}

@app.get("/api/cars-direct")
async def get_cars_direct():
    """Get cars directly with mock data for now"""
    print("Direct cars API called - returning mock data")
    return {
        "success": True,
        "cars": MOCK_CARS,
        "message": "Mock data - DNS resolution issues with Supabase",
        "note": "This will work with real Supabase when DNS is resolved"
    }

@app.post("/api/cars-direct/register")
async def register_car_direct(car_data: Dict[str, Any]):
    """Register car directly with mock response"""
    print(f"Car registration called with: {car_data}")
    
    # Create mock response
    mock_car = {
        "id": f"car-{len(MOCK_CARS) + 1}",
        "seller_name": f"{car_data.get('firstName', '')} {car_data.get('lastName', '')}".strip(),
        "email": car_data.get('email', ''),
        "phone": car_data.get('phone', ''),
        "postal_code": car_data.get('postalCode', ''),
        "car_make": car_data.get('carMake', ''),
        "car_model": car_data.get('carModel', ''),
        "car_plate": car_data.get('carPlate', ''),
        "year": car_data.get('year'),
        "mileage": car_data.get('mileage'),
        "status": "active",
        "created_at": "2025-10-05T18:30:00.000000"
    }
    
    # Add to mock data
    MOCK_CARS.append(mock_car)
    
    return {
        "success": True,
        "message": "Car registered successfully (mock)",
        "car_id": mock_car["id"],
        "note": "This is mock data - will use real Supabase when DNS is resolved"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)