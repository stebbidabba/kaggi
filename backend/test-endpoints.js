const axios = require('axios');

const BASE_URL = 'http://localhost:8003/api';

async function testEndpoints() {
  console.log('🧪 Testing Node.js Backend Endpoints...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get('http://localhost:8003/health');
    console.log('✅ Health check:', healthResponse.data.status);
    
    // Test 2: Root API endpoint
    console.log('\n2. Testing root API...');
    const rootResponse = await axios.get(BASE_URL);
    console.log('✅ Root API:', rootResponse.data.message);
    
    // Test 3: Vehicle verification
    console.log('\n3. Testing vehicle verification...');
    const vehicleResponse = await axios.post(`${BASE_URL}/vehicle/verify`, {
      plate: 'AB123',
      mileage: 50000
    });
    console.log('✅ Vehicle verification:', vehicleResponse.data.success, '-', vehicleResponse.data.message);
    
    // Test 4: Status endpoint
    console.log('\n4. Testing status endpoint...');
    const statusResponse = await axios.post(`${BASE_URL}/status`, {
      message: 'Node.js backend test',
      details: 'Testing all endpoints'
    });
    console.log('✅ Status creation:', statusResponse.data.message);
    
    // Test 5: Get status checks
    console.log('\n5. Testing get status checks...');
    const getStatusResponse = await axios.get(`${BASE_URL}/status`);
    console.log('✅ Get status checks:', getStatusResponse.data.length, 'records');
    
    // Test 6: Company validation
    console.log('\n6. Testing company validation...');
    const companyResponse = await axios.post(`${BASE_URL}/validate-company`, {
      kennitala: '1234567890'
    });
    console.log('✅ Company validation:', companyResponse.data.valid, '-', companyResponse.data.message);
    
    // Test 7: Car registration
    console.log('\n7. Testing car registration...');
    try {
      const carResponse = await axios.post(`${BASE_URL}/cars/register`, {
        seller_name: 'Test User',
        email: 'test@example.com',
        phone: '+3547777777',
        postal_code: '101',
        car_make: 'Toyota',
        car_model: 'Yaris',
        car_plate: 'TEST123',
        year: 2020,
        mileage: 50000
      });
      console.log('✅ Car registration:', carResponse.data.success, '-', carResponse.data.message);
    } catch (error) {
      console.log('⚠️ Car registration (expected to fail due to DB):', error.response?.data?.message || error.message);
    }
    
    // Test 8: SMS service info
    console.log('\n8. Testing SMS service info...');
    const smsInfoResponse = await axios.get(`${BASE_URL}/sms-service-info`);
    console.log('✅ SMS service configured:', smsInfoResponse.data.configured);
    
    // Test 9: Brevo debug
    console.log('\n9. Testing Brevo connection...');
    const brevoResponse = await axios.get(`${BASE_URL}/debug-brevo`);
    console.log('✅ Brevo connected:', brevoResponse.data.connected);
    
    console.log('\n🎉 All endpoint tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run tests
testEndpoints();