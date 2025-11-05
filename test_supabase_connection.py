#!/usr/bin/env python3
"""
Test Supabase connection with different approaches
"""
import requests
import socket
import json

def test_dns_resolution():
    """Test if we can resolve the Supabase hostname"""
    hostname = "ylsuzpypokkkreqqkqadu.supabase.co"
    try:
        ip = socket.gethostbyname(hostname)
        print(f"✅ DNS resolution successful: {hostname} -> {ip}")
        return ip
    except socket.gaierror as e:
        print(f"❌ DNS resolution failed: {e}")
        return None

def test_supabase_api():
    """Test direct API connection"""
    url = "https://ylsuzpypokkkreqqkqadu.supabase.co/rest/v1/"
    headers = {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsc3V6cHlwb2treHJlcXFrYWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODAyMjIsImV4cCI6MjA3NTI1NjIyMn0.pqFrHZyVRLyBDYW5T6EjeLj59hpv8WPDgQFTQBUhibs",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsc3V6cHlwb2treHJlcXFrYWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODAyMjIsImV4cCI6MjA3NTI1NjIyMn0.pqFrHZyVRLyBDYW5T6EjeLj59hpv8WPDgQFTQBUhibs"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        print(f"✅ API connection successful: {response.status_code}")
        print(f"Response headers: {dict(response.headers)}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ API connection failed: {e}")
        return False

def test_supabase_tables():
    """Test if we can access the tables"""
    base_url = "https://ylsuzpypokkkreqqkqadu.supabase.co/rest/v1"
    headers = {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsc3V6cHlwb2treHJlcXFrYWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODAyMjIsImV4cCI6MjA3NTI1NjIyMn0.pqFrHZyVRLyBDYW5T6EjeLj59hpv8WPDgQFTQBUhibs",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsc3V6cHlwb2treHJlcXFrYWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODAyMjIsImV4cCI6MjA3NTI1NjIyMn0.pqFrHZyVRLyBDYW5T6EjeLj59hpv8WPDgQFTQBUhibs",
        "Content-Type": "application/json"
    }
    
    # Test Bílar table
    try:
        response = requests.get(f"{base_url}/Bílar", headers=headers, timeout=10)
        print(f"✅ Bílar table access: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} cars in database")
        else:
            print(f"   Response: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Bílar table access failed: {e}")
    
    # Test uppboð table
    try:
        response = requests.get(f"{base_url}/uppboð", headers=headers, timeout=10)
        print(f"✅ uppboð table access: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} bids in database")
        else:
            print(f"   Response: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"❌ uppboð table access failed: {e}")

if __name__ == "__main__":
    print("🔍 Testing Supabase connection...")
    
    print("\n1. Testing DNS resolution...")
    ip = test_dns_resolution()
    
    print("\n2. Testing API connection...")
    api_works = test_supabase_api()
    
    if api_works:
        print("\n3. Testing table access...")
        test_supabase_tables()
    else:
        print("\n❌ Cannot test tables - API connection failed")
    
    print("\n🔍 Diagnosis complete.")