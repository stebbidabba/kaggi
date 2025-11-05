const express = require('express');
const router = express.Router();
const { validateSMSCode, validateSMSVerify } = require('../utils/validators');
const twilioService = require('../services/twilioService');
const logger = require('../utils/logger');

/**
 * POST /api/send-verification-code
 * Send SMS verification code
 */
router.post('/send-verification-code', validateSMSCode, async (req, res) => {
  const { phone } = req.body;
  
  try {
    logger.info(`Sending SMS verification code to: ${phone}`);
    
    const result = await twilioService.sendVerificationCode(phone);
    
    return res.status(200).json({
      success: result.success,
      message: result.message,
      status: result.status || undefined,
      error: result.error || undefined
    });
    
  } catch (error) {
    logger.error(`SMS verification error for ${phone}:`, error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to send verification code',
      error: error.message
    });
  }
});

/**
 * POST /api/verify-code
 * Verify SMS verification code
 */
router.post('/verify-code', validateSMSVerify, async (req, res) => {
  const { phone, code } = req.body;
  
  try {
    logger.info(`Verifying SMS code for: ${phone}`);
    
    const result = await twilioService.verifyCode(phone, code);
    
    return res.status(200).json({
      success: result.success,
      valid: result.valid || false,
      message: result.message,
      status: result.status || undefined,
      error: result.error || undefined
    });
    
  } catch (error) {
    logger.error(`SMS verification error for ${phone}:`, error.message);
    
    return res.status(500).json({
      success: false,
      valid: false,
      message: 'Failed to verify code',
      error: error.message
    });
  }
});

/**
 * GET /api/sms-service-info
 * Get Twilio service information for debugging
 */
router.get('/sms-service-info', async (req, res) => {
  try {
    const result = await twilioService.getServiceInfo();
    
    return res.status(200).json(result);
    
  } catch (error) {
    logger.error('SMS service info error:', error.message);
    
    return res.status(500).json({
      configured: false,
      error: error.message
    });
  }
});

module.exports = router;