const axios = require('axios');
const logger = require('../utils/logger');

class CreditinfoService {
  constructor() {
    this.baseURL = process.env.VEHICLE_API_BASE;
    this.tokenURL = process.env.CREDITINFO_TOKEN_URL;
    this.clientId = process.env.CREDITINFO_CLIENT_ID;
    this.clientSecret = process.env.CREDITINFO_CLIENT_SECRET;
    this.username = process.env.CREDITINFO_USERNAME;
    this.password = process.env.CREDITINFO_PASSWORD;
    
    // Token cache
    this.tokenCache = {
      accessToken: null,
      expiresAt: null
    };
  }

  /**
   * Get OAuth2 access token using Resource Owner Password Credentials (ROPC) flow
   */
  async getAccessToken() {
    try {
      // Check if we have a valid cached token
      if (this.tokenCache.accessToken && 
          this.tokenCache.expiresAt && 
          new Date() < this.tokenCache.expiresAt) {
        return this.tokenCache.accessToken;
      }

      const data = new URLSearchParams({
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username: this.username,
        password: this.password
      });

      const response = await axios.post(this.tokenURL, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 15000
      });

      if (response.status === 200) {
        const tokenData = response.data;
        const accessToken = tokenData.access_token;
        const expiresIn = tokenData.expires_in || 3600; // Default 1 hour

        // Cache the token with expiry (1 minute buffer)
        this.tokenCache.accessToken = accessToken;
        this.tokenCache.expiresAt = new Date(Date.now() + (expiresIn - 60) * 1000);

        logger.info('Successfully obtained Creditinfo access token using OAuth2 ROPC flow');
        return accessToken;
      } else {
        throw new Error(`Token request failed with status: ${response.status}`);
      }
    } catch (error) {
      logger.error('Error getting Creditinfo access token:', error.message);
      throw new Error(`Failed to authenticate with Creditinfo API: ${error.message}`);
    }
  }

  /**
   * Call Creditinfo API to get vehicle information
   */
  async getVehicleInfo(plate) {
    // Check if we have all required credentials
    if (!this.baseURL || !this.username || !this.password || !this.clientId || !this.clientSecret) {
      logger.warn('Missing Creditinfo credentials, using mock response');
      return this.getMockResponse(plate);
    }

    try {
      // Get OAuth2 access token
      const accessToken = await this.getAccessToken();

      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };

      // Updated payload format for API
      const payload = { registrationNumber: plate.toUpperCase() };

      const response = await axios.post(
        `${this.baseURL}/Vehicle/GetVehicleInformationBasic`,
        payload,
        {
          headers,
          timeout: 15000
        }
      );

      if (response.status === 200) {
        const apiData = response.data;
        
        // Check if we got vehicles array with data
        if (apiData && apiData.vehicles && apiData.vehicles.length > 0) {
          const vehicleData = apiData.vehicles[0]; // Get first vehicle from array
          
          // Map Creditinfo API response to our format
          const result = {
            success: true,
            vehicle: {
              registrationNumber: vehicleData.registrationNumber || plate.toUpperCase(),
              make: vehicleData.type || 'Unknown',
              model: vehicleData.subtype || 'Unknown', 
              year: vehicleData.firstRegistrationDate ? 
                    parseInt(vehicleData.firstRegistrationDate.substring(0, 4)) : 0,
              vin: vehicleData.vehicleIdentificationNumber || '****',
              fuel: vehicleData.technical?.energySource || 'Unknown',
              engineSize: vehicleData.technical?.engineDisplacement || 0,
              color: vehicleData.color || 'Unknown'
            }
          };

          logger.info(`Creditinfo API: Real vehicle found - Plate: ${plate}, Make: ${result.vehicle.make} ${result.vehicle.model}`);
          return result;
          
        } else {
          // API returned no vehicles, use mock fallback
          logger.info(`Creditinfo API: No vehicles found for plate ${plate}, trying mock response`);
          return this.getMockResponse(plate);
        }

      } else if (response.status === 204) {
        // No content - vehicle not found
        logger.info(`Creditinfo API: Vehicle not found - Plate: ${plate}`);
        return { success: false, reason: 'not_found' };

      } else {
        throw new Error(`API request failed with status: ${response.status}`);
      }

    } catch (error) {
      logger.error(`Creditinfo API error for plate ${plate}:`, error.message);

      // For any API errors, try mock response first
      const mockResult = this.getMockResponse(plate);
      if (mockResult.success) {
        logger.warn('Using mock response due to API error');
        return mockResult;
      }

      return { 
        success: false, 
        reason: 'api_unavailable',
        error: error.message 
      };
    }
  }

  /**
   * Get mock response for development/testing
   */
  getMockResponse(plate) {
    // Mock response for development with realistic Icelandic license plates
    const upperPlate = plate.toUpperCase();
    
    // Common test plates and realistic Icelandic plates
    const mockVehicles = {
      'AB123': { make: 'Toyota', model: 'Yaris', year: 2018, fuel: 'Gasoline', engineSize: 1300 },
      'IS-AB123': { make: 'Toyota', model: 'Yaris', year: 2018, fuel: 'Gasoline', engineSize: 1300 },
      'TEST123': { make: 'Toyota', model: 'Yaris', year: 2018, fuel: 'Gasoline', engineSize: 1300 },
      'DAK71': { make: 'Toyota', model: 'Yaris', year: 2018, fuel: 'Gasoline', engineSize: 1300 },
      'GOP41': { make: 'Volkswagen', model: 'Golf', year: 2019, fuel: 'Gasoline', engineSize: 1400 },
      'HVF23': { make: 'BMW', model: '320i', year: 2020, fuel: 'Gasoline', engineSize: 2000 },
      'JKL45': { make: 'Mercedes-Benz', model: 'C-Class', year: 2017, fuel: 'Diesel', engineSize: 2200 },
      'MNO67': { make: 'Audi', model: 'A4', year: 2021, fuel: 'Gasoline', engineSize: 1800 },
      'PQR89': { make: 'Honda', model: 'Civic', year: 2019, fuel: 'Gasoline', engineSize: 1500 },
      'STU12': { make: 'Ford', model: 'Focus', year: 2018, fuel: 'Gasoline', engineSize: 1600 },
      'VWX34': { make: 'Nissan', model: 'Qashqai', year: 2020, fuel: 'Gasoline', engineSize: 1300 },
      'YZA56': { make: 'Kia', model: 'Ceed', year: 2021, fuel: 'Gasoline', engineSize: 1400 },
      'BCD78': { make: 'Hyundai', model: 'i30', year: 2019, fuel: 'Gasoline', engineSize: 1400 },
      'EFG90': { make: 'Skoda', model: 'Octavia', year: 2020, fuel: 'Diesel', engineSize: 2000 }
    };
    
    const vehicleData = mockVehicles[upperPlate];
    if (vehicleData) {
      return {
        success: true,
        vehicle: {
          registrationNumber: upperPlate,
          make: vehicleData.make,
          model: vehicleData.model,
          year: vehicleData.year,
          vin: '****',
          fuel: vehicleData.fuel,
          engineSize: vehicleData.engineSize
        }
      };
    } else {
      return { success: false, reason: 'not_found' };
    }
  }
}

module.exports = new CreditinfoService();