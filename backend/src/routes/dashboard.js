const express = require('express');
const router = express.Router();
const { validateEmailParam } = require('../utils/validators');
const supabaseService = require('../services/supabaseService');
const logger = require('../utils/logger');

/**
 * GET /api/dashboard/stats/:dealer_email
 * Get dashboard statistics for a dealer
 */
router.get('/stats/:dealer_email', validateEmailParam('dealer_email'), async (req, res) => {
  const { dealer_email } = req.params;
  
  try {
    logger.info(`Getting dashboard stats for dealer: ${dealer_email}`);
    
    const result = await supabaseService.getDashboardStats(dealer_email);
    
    return res.status(200).json({
      success: result.success,
      stats: result.stats,
      message: result.message,
      error: result.error || undefined
    });
    
  } catch (error) {
    logger.error(`Dashboard stats error for dealer ${dealer_email}:`, error.message);
    
    return res.status(500).json({
      success: false,
      stats: { active: 0, pending: 0, sold: 0, total: 0 },
      message: 'Failed to retrieve dashboard stats',
      error: error.message
    });
  }
});

/**
 * GET /api/dashboard/test-connection
 * Test database connection
 */
router.get('/test-connection', async (req, res) => {
  try {
    logger.info('Testing database connection');
    
    const result = await supabaseService.testConnection();
    
    return res.status(200).json(result);
    
  } catch (error) {
    logger.error('Database connection test error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Database connection test failed',
      error: error.message
    });
  }
});

module.exports = router;