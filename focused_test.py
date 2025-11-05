#!/usr/bin/env python3
"""
Focused test for the updated vehicle verification endpoint
Testing specific requirements from the review request
"""

import requests
import json
from datetime import datetime

BACKEND_URL = "https://api-transform.preview.emergentagent.com/api"

def test_consent_removal():
    """Test the specific requirements from the review request"""
    print("🔍 FOCUSED TESTING: Vehicle Verification Endpoint Without Consent")
    print("=" * 60)
    
    results = []
    
    # Test 1: Endpoint accepts requests with only plate and mileage
    print("\n1. Testing endpoint accepts only plate and mileage...")
    try:
        payload = {"plate": "AB123", "mileage": 150000}
        response = requests.post(f"{BACKEND_URL}/vehicle/verify", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("verified") == True and "vehicle" in data:
                print("✅ PASS: Endpoint accepts requests with only plate and mileage")
                results.append(True)
            else:
                print(f"❌ FAIL: Unexpected response: {data}")
                results.append(False)
        else:
            print(f"❌ FAIL: HTTP {response.status_code}: {response.text}")
            results.append(False)
    except Exception as e:
        print(f"❌ FAIL: Exception: {e}")
        results.append(False)
    
    # Test 2: Valid plates return successful verification
    print("\n2. Testing valid plates return successful verification...")
    valid_plates = ["AB123", "TEST123"]
    for plate in valid_plates:
        try:
            payload = {"plate": plate, "mileage": 120000}
            response = requests.post(f"{BACKEND_URL}/vehicle/verify", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if (data.get("verified") == True and 
                    data.get("vehicle", {}).get("make") == "Toyota" and
                    data.get("vehicle", {}).get("model") == "Yaris"):
                    print(f"✅ PASS: Valid plate {plate} returns Toyota Yaris")
                    results.append(True)
                else:
                    print(f"❌ FAIL: Plate {plate} - unexpected response: {data}")
                    results.append(False)
            else:
                print(f"❌ FAIL: Plate {plate} - HTTP {response.status_code}")
                results.append(False)
        except Exception as e:
            print(f"❌ FAIL: Plate {plate} - Exception: {e}")
            results.append(False)
    
    # Test 3: Invalid plates return not_found error
    print("\n3. Testing invalid plates return not_found error...")
    invalid_plates = ["INVALID", "NOTFOUND"]
    for plate in invalid_plates:
        try:
            payload = {"plate": plate, "mileage": 120000}
            response = requests.post(f"{BACKEND_URL}/vehicle/verify", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("verified") == False and data.get("reason") == "not_found":
                    print(f"✅ PASS: Invalid plate {plate} returns not_found")
                    results.append(True)
                else:
                    print(f"❌ FAIL: Plate {plate} - unexpected response: {data}")
                    results.append(False)
            else:
                print(f"❌ FAIL: Plate {plate} - HTTP {response.status_code}")
                results.append(False)
        except Exception as e:
            print(f"❌ FAIL: Plate {plate} - Exception: {e}")
            results.append(False)
    
    # Test 4: Input validation still works
    print("\n4. Testing input validation still works...")
    validation_tests = [
        {"name": "Invalid plate format", "payload": {"plate": "AB@123", "mileage": 120000}},
        {"name": "Negative mileage", "payload": {"plate": "AB123", "mileage": -1000}}
    ]
    
    for test in validation_tests:
        try:
            response = requests.post(f"{BACKEND_URL}/vehicle/verify", json=test["payload"], timeout=10)
            
            if response.status_code == 422:
                print(f"✅ PASS: {test['name']} correctly rejected (HTTP 422)")
                results.append(True)
            else:
                print(f"❌ FAIL: {test['name']} - expected HTTP 422, got {response.status_code}")
                results.append(False)
        except Exception as e:
            print(f"❌ FAIL: {test['name']} - Exception: {e}")
            results.append(False)
    
    # Test 5: Requests with consent field are handled appropriately
    print("\n5. Testing requests with consent field are handled appropriately...")
    consent_tests = [
        {"name": "With consent=true", "payload": {"plate": "AB123", "mileage": 120000, "consent": True}},
        {"name": "With consent=false", "payload": {"plate": "AB123", "mileage": 120000, "consent": False}}
    ]
    
    for test in consent_tests:
        try:
            response = requests.post(f"{BACKEND_URL}/vehicle/verify", json=test["payload"], timeout=10)
            
            # The endpoint should either reject (422) or ignore the consent field
            if response.status_code == 422:
                print(f"✅ PASS: {test['name']} - correctly rejected extra field (HTTP 422)")
                results.append(True)
            elif response.status_code == 200:
                data = response.json()
                if data.get("verified") == True and "vehicle" in data:
                    print(f"✅ PASS: {test['name']} - ignored consent field and processed successfully")
                    results.append(True)
                else:
                    print(f"❌ FAIL: {test['name']} - unexpected response: {data}")
                    results.append(False)
            else:
                print(f"❌ FAIL: {test['name']} - unexpected status: {response.status_code}")
                results.append(False)
        except Exception as e:
            print(f"❌ FAIL: {test['name']} - Exception: {e}")
            results.append(False)
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 FOCUSED TEST SUMMARY")
    print("=" * 60)
    
    total_tests = len(results)
    passed_tests = sum(results)
    failed_tests = total_tests - passed_tests
    
    print(f"Total Tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {failed_tests}")
    
    if failed_tests == 0:
        print("\n🎉 ALL FOCUSED TESTS PASSED!")
        print("✅ Vehicle verification endpoint successfully updated:")
        print("   - Accepts requests with only plate and mileage")
        print("   - Valid plates return mock vehicle data")
        print("   - Invalid plates return not_found error")
        print("   - Input validation still works")
        print("   - Consent field is properly handled (ignored)")
    else:
        print(f"\n⚠️  {failed_tests} test(s) failed - see details above")
    
    return failed_tests == 0

if __name__ == "__main__":
    success = test_consent_removal()
    exit(0 if success else 1)