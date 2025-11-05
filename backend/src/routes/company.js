const express = require('express');
const router = express.Router();
const { validateCompany } = require('../utils/validators');
const rskService = require('../services/rskService');
const logger = require('../utils/logger');

// Rate limiting storage
const rateLimitStorage = new Map();

/**
 * Simple rate limiting function for company validation
 */
function isRateLimited(ip, limit = 30, windowMs = 3600000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStorage.has(ip)) {
    rateLimitStorage.set(ip, []);
  }
  
  const requests = rateLimitStorage.get(ip);
  const validRequests = requests.filter(time => time > windowStart);
  rateLimitStorage.set(ip, validRequests);
  
  if (validRequests.length >= limit) {
    return true;
  }
  
  validRequests.push(now);
  rateLimitStorage.set(ip, validRequests);
  
  return false;
}

/**
 * POST /api/validate-company
 * Validate company registration number with RSK Company Registry
 */
router.post('/validate-company', validateCompany, async (req, res) => {
  const { kennitala } = req.body;
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  
  try {
    logger.info(`Company validation request - IP: ${clientIp}, Kennitala: ${kennitala}`);
    
    // Rate limiting - 30 requests per hour
    if (isRateLimited(clientIp, 30)) {
      logger.warn(`Company validation rate limit exceeded for IP: ${clientIp}`);
      return res.status(429).json({
        valid: false,
        message: 'Of margar beiðnir. Reyndu aftur síðar.',
        error: 'rate_limit_exceeded'
      });
    }
    
    // Validate kennitala format
    if (!rskService.isValidKennitalaFormat(kennitala)) {
      return res.status(422).json({
        valid: false,
        message: 'Ógild snið kennitölu. Kennitala verður að vera 10 tölustafir.',
        error: 'invalid_format'
      });
    }
    
    // Call RSK API
    const result = await rskService.validateCompany(kennitala);
    
    // Log validation attempt (in production, save to database)
    const validationLog = {
      kennitala: kennitala,
      valid: result.valid,
      ip: clientIp,
      timestamp: new Date().toISOString(),
      company_name: result.company_name || null
    };
    
    logger.info('Company validation logged:', validationLog);
    
    return res.status(200).json({
      valid: result.valid,
      message: result.message,
      company_name: result.company_name || undefined
    });
    
  } catch (error) {
    logger.error(`Company validation error for kennitala ${kennitala}:`, error.message);
    
    return res.status(500).json({
      valid: false,
      message: '❌ Villa við að staðfesta kennitölu.',
      error: 'internal_error'
    });
  }
});

/**
 * GET /api/rsk-service-status
 * Get RSK service status
 */
router.get('/rsk-service-status', async (req, res) => {
  try {
    const result = await rskService.getServiceStatus();
    
    return res.status(200).json(result);
    
  } catch (error) {
    logger.error('RSK service status error:', error.message);
    
    return res.status(500).json({
      available: false,
      error: error.message
    });
  }
});

module.exports = router;