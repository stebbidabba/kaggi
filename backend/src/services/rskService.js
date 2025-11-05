const axios = require('axios');
const logger = require('../utils/logger');

class RSKService {
  constructor() {
    this.baseURL = 'https://api.skattur.cloud/legalentities/v2';
  }

  /**
   * Validate company registration number with RSK Company Registry
   */
  async validateCompany(kennitala) {
    try {
      const response = await axios.get(`${this.baseURL}/${kennitala}`, {
        timeout: 10000
      });

      if (response.status === 200) {
        // Company found
        const data = response.data;
        const companyName = data.name || data.nafn || '';
        
        logger.info(`RSK: Company found for kennitala ${kennitala}: ${companyName}`);
        
        return {
          valid: true,
          company_name: companyName,
          message: '✅ Staðfest fyrirtæki.'
        };

      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

    } catch (error) {
      if (error.response?.status === 404) {
        // Company not found
        logger.info(`RSK: Company not found for kennitala ${kennitala}`);
        return {
          valid: false,
          message: '❌ Kennitala fannst ekki.'
        };

      } else if (error.response?.status === 401) {
        // API key required
        logger.error(`RSK: API key required for kennitala ${kennitala}`);
        return {
          valid: false,
          message: '❌ Villa við að staðfesta kennitölu.'
        };

      } else if (error.code === 'ECONNABORTED') {
        // Timeout
        logger.error(`RSK: API timeout for kennitala ${kennitala}`);
        return {
          valid: false,
          message: '❌ Tími rann út við staðfestingu.'
        };

      } else {
        // Other API error
        logger.error(`RSK API error for kennitala ${kennitala}:`, error.message);
        return {
          valid: false,
          message: '❌ Villa við að staðfesta kennitölu.'
        };
      }
    }
  }

  /**
   * Validate kennitala format (10 digits)
   */
  isValidKennitalaFormat(kennitala) {
    return /^\d{10}$/.test(kennitala);
  }

  /**
   * Get service status
   */
  async getServiceStatus() {
    try {
      // Test with a dummy kennitala to check API availability
      const response = await axios.get(`${this.baseURL}/0000000000`, {
        timeout: 5000
      });

      return {
        available: true,
        message: 'RSK API is available'
      };

    } catch (error) {
      if (error.response?.status === 401) {
        return {
          available: false,
          message: 'RSK API requires subscription key',
          requiresApiKey: true
        };
      } else if (error.response?.status === 404) {
        return {
          available: true,
          message: 'RSK API is available (404 is expected for invalid kennitala)'
        };
      } else {
        return {
          available: false,
          message: 'RSK API is not available',
          error: error.message
        };
      }
    }
  }
}

module.exports = new RSKService();