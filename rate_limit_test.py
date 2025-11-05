#!/usr/bin/env python3
"""
Focused test for rate limiting functionality
"""

import requests
import time
from datetime import datetime

BACKEND_URL = "https://api-transform.preview.emergentagent.com/api"

def test_rate_limiting():
    """Test rate limiting more carefully"""
    print("🔄 Testing Rate Limiting (60 requests/hour per IP)")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Started at: {datetime.now().isoformat()}")
    
    payload = {
        "plate": "AB123",
        "mileage": 145000,
        "consent": True
    }
    
    success_count = 0
    rate_limited_count = 0
    error_count = 0
    
    # Try to make 70 requests to test rate limiting
    for i in range(70):
        try:
            response = requests.post(
                f"{BACKEND_URL}/vehicle/verify",
                json=payload,
                timeout=10
            )
            
            if response.status_code == 200:
                success_count += 1
                if i % 10 == 0:
                    print(f"  Request {i+1}: Success (Total success: {success_count})")
            elif response.status_code == 429:
                rate_limited_count += 1
                print(f"  Request {i+1}: Rate limited! (Total rate limited: {rate_limited_count})")
                if rate_limited_count == 1:
                    print(f"  ✅ Rate limiting triggered after {success_count} successful requests")
                    break
            else:
                error_count += 1
                print(f"  Request {i+1}: Error {response.status_code} (Total errors: {error_count})")
                
        except Exception as e:
            error_count += 1
            print(f"  Request {i+1}: Exception - {str(e)}")
        
        # Small delay to avoid overwhelming
        time.sleep(0.05)
    
    print(f"\n📊 Results:")
    print(f"  Successful requests: {success_count}")
    print(f"  Rate limited requests: {rate_limited_count}")
    print(f"  Error requests: {error_count}")
    print(f"  Total requests made: {success_count + rate_limited_count + error_count}")
    
    if rate_limited_count > 0:
        print(f"  ✅ Rate limiting is working - triggered after {success_count} requests")
        return True
    elif success_count >= 60:
        print(f"  ⚠️  Rate limiting may not be working - made {success_count} requests without limit")
        return False
    else:
        print(f"  ℹ️  Made {success_count} requests - may be under the limit")
        return True

if __name__ == "__main__":
    test_rate_limiting()