const express = require('express');
const router = express.Router();
const { validateWelcomeEmail, validateBrevoList } = require('../utils/validators');
const brevoService = require('../services/brevoService');
const logger = require('../utils/logger');

/**
 * POST /api/send-welcome-email
 * Send welcome email using Brevo
 */
router.post('/send-welcome-email', validateWelcomeEmail, async (req, res) => {
  const { name, email, phone } = req.body;
  
  try {
    logger.info(`Sending welcome email to: ${email} (${name})`);
    
    const result = await brevoService.sendWelcomeEmail(name, email, phone);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        messageId: result.messageId
      });
    } else {
      // Email failed but don't block the user flow
      logger.warn(`Welcome email failed for ${email}:`, result.error);
      return res.status(200).json({
        success: false,
        message: result.message,
        error: result.error
      });
    }
    
  } catch (error) {
    logger.error(`Welcome email error for ${email}:`, error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to send welcome email',
      error: error.message
    });
  }
});

/**
 * POST /api/add-to-brevo-list
 * Add contact to Brevo list for automation workflows
 */
router.post('/add-to-brevo-list', validateBrevoList, async (req, res) => {
  const { name, email, phone } = req.body;
  
  try {
    logger.info(`Adding contact to Brevo list: ${email} (${name})`);
    
    const result = await brevoService.addToBrevoList(name, email, phone);
    
    return res.status(200).json({
      success: result.success,
      message: result.message,
      error: result.error || undefined
    });
    
  } catch (error) {
    logger.error(`Brevo list error for ${email}:`, error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to add contact to list',
      error: error.message
    });
  }
});

/**
 * GET /api/debug-brevo
 * Debug Brevo connection and configuration
 */
router.get('/debug-brevo', async (req, res) => {
  try {
    const result = await brevoService.debugBrevoConnection();
    
    return res.status(200).json(result);
    
  } catch (error) {
    logger.error('Brevo debug error:', error.message);
    
    return res.status(500).json({
      connected: false,
      error: error.message
    });
  }
});

/**
 * POST /api/test-brevo-list
 * Test adding a contact with unique data
 */
router.post('/test-brevo-list', async (req, res) => {
  const { name = 'Test User', email = 'test@example.com', phone = '+3547777777' } = req.body;
  
  try {
    const result = await brevoService.testAddContact(email, name, phone);
    
    return res.status(200).json(result);
    
  } catch (error) {
    logger.error('Brevo test error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message
    });
  }
});

/**
 * POST /api/test-automation-trigger
 * Test automation workflow trigger
 */
router.post('/test-automation-trigger', async (req, res) => {
  const { name = 'Test Automation User', email = 'automation@example.com', phone = '+3547777888' } = req.body;
  
  try {
    const result = await brevoService.addToBrevoList(name, email, phone, 3);
    
    return res.status(200).json({
      ...result,
      message: result.success ? 
        'Contact added to Brevo list successfully. Your welcome message #2 automation workflow should be triggered.' : 
        result.message
    });
    
  } catch (error) {
    logger.error('Automation trigger test error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Automation trigger test failed',
      error: error.message
    });
  }
});

/**
 * POST /api/test-real-email
 * Test sending real email
 */
router.post('/test-real-email', async (req, res) => {
  const { name = 'Real Test User', email, phone = '+3547777999' } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required for real email test'
    });
  }
  
  try {
    const result = await brevoService.sendWelcomeEmail(name, email, phone);
    
    return res.status(200).json(result);
    
  } catch (error) {
    logger.error('Real email test error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Real email test failed',
      error: error.message
    });
  }
});

module.exports = router;