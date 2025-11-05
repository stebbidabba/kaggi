const express = require('express');
const router = express.Router();
const { validateVehicleVerification } = require('../utils/validators');
const creditinfoService = require('../services/creditinfoService');
const supabaseService = require('../services/supabaseService');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

// Rate limiting storage (in production use Redis)
const rateLimitStorage = new Map();

/**
 * Simple rate limiting function
 */
function isRateLimited(ip, limit = 60, windowMs = 3600000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Get or create rate limit data for this IP
  if (!rateLimitStorage.has(ip)) {
    rateLimitStorage.set(ip, []);
  }
  
  const requests = rateLimitStorage.get(ip);
  
  // Clean old requests
  const validRequests = requests.filter(time => time > windowStart);
  rateLimitStorage.set(ip, validRequests);
  
  // Check if under limit
  if (validRequests.length >= limit) {
    return true;
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitStorage.set(ip, validRequests);
  
  return false;
}

/**
 * POST /api/vehicle/verify
 * Verify vehicle information through Creditinfo API
 */
router.post('/verify', validateVehicleVerification, async (req, res) => {
  const requestId = uuidv4().substring(0, 8);
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  const { plate, mileage } = req.body;
  
  logger.info(`[${requestId}] Vehicle verification request - IP: ${clientIp}, Plate: ${plate}`);
  
  try {
    // Rate limiting
    if (isRateLimited(clientIp)) {
      logger.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIp}`);
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }
    
    // Call Creditinfo API
    const apiResult = await creditinfoService.getVehicleInfo(plate);
    
    if (apiResult.success) {
      // Vehicle found
      const vehicle = apiResult.vehicle;
      
      logger.info(`[${requestId}] Vehicle found - Plate: ${plate}, Make: ${vehicle.make}`);
      
      // Log successful verification to database (if available)
      try {
        const verificationLog = {
          id: requestId,
          plate: plate,
          mileage: mileage,
          found: true,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          ip: clientIp,
          timestamp: new Date().toISOString()
        };
        
        // Note: In PostgreSQL, we might want to create a verification_logs table
        // For now, we'll just log to application logs
        logger.info(`[${requestId}] Verification logged:`, verificationLog);
      } catch (logError) {
        logger.error(`[${requestId}] Failed to log verification:`, logError.message);
      }
      
      return res.status(200).json({
        success: true,
        message: 'Vehicle found',
        data: {
          registrationNumber: vehicle.registrationNumber,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          vin: vehicle.vin,
          fuel: vehicle.fuel,
          engineSize: vehicle.engineSize,
          mileage: mileage
        }
      });
      
    } else {
      // Vehicle not found or API error
      const reason = apiResult.reason || 'unknown';
      
      logger.info(`[${requestId}] Vehicle not found - Plate: ${plate}, Reason: ${reason}`);
      
      // Log failed verification
      try {
        const verificationLog = {
          id: requestId,
          plate: plate,
          mileage: mileage,
          found: false,
          reason: reason,
          ip: clientIp,
          timestamp: new Date().toISOString()
        };
        
        logger.info(`[${requestId}] Failed verification logged:`, verificationLog);
      } catch (logError) {
        logger.error(`[${requestId}] Failed to log verification:`, logError.message);
      }
      
      if (reason === 'not_found') {
        return res.status(200).json({
          success: false,
          message: 'Vehicle not found',
          error: 'not_found'
        });
      } else {
        return res.status(500).json({
          success: false,
          message: 'Vehicle lookup service temporarily unavailable',
          error: 'api_unavailable'
        });
      }
    }
    
  } catch (error) {
    logger.error(`[${requestId}] Vehicle verification error:`, error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error during vehicle verification',
      error: error.message
    });
  }
});

module.exports = router;