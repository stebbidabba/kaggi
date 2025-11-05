const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

// In-memory storage for status checks (in production use database)
const statusChecks = [];

/**
 * Status check model equivalent
 */
class StatusCheck {
  constructor({ message, details }) {
    this.id = uuidv4();
    this.message = message;
    this.details = details || '';
    this.timestamp = new Date().toISOString();
  }
}

/**
 * POST /api/status
 * Create a new status check
 */
router.post('/', async (req, res) => {
  try {
    const { message, details } = req.body;
    
    if (!message) {
      return res.status(422).json({
        success: false,
        message: 'Validation error',
        errors: [{ field: 'message', message: 'Message is required' }]
      });
    }
    
    const statusCheck = new StatusCheck({ message, details });
    statusChecks.push(statusCheck);
    
    logger.info(`Status check created: ${statusCheck.id} - ${message}`);
    
    return res.status(201).json(statusCheck);
    
  } catch (error) {
    logger.error('Create status check error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to create status check',
      error: error.message
    });
  }
});

/**
 * GET /api/status
 * Get all status checks
 */
router.get('/', async (req, res) => {
  try {
    logger.info('Getting all status checks');
    
    // Return latest 1000 status checks
    const recentStatusChecks = statusChecks
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 1000);
    
    return res.status(200).json(recentStatusChecks);
    
  } catch (error) {
    logger.error('Get status checks error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve status checks',
      error: error.message
    });
  }
});

module.exports = router;