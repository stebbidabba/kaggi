const express = require('express');
const router = express.Router();
const { validateBidCreation, validateUUIDParam, validateEmailParam } = require('../utils/validators');
const supabaseService = require('../services/supabaseService');
const logger = require('../utils/logger');

/**
 * POST /api/bids/create
 * Create a new bid
 */
router.post('/create', validateBidCreation, async (req, res) => {
  try {
    const bidData = req.body;
    
    logger.info(`Bid creation request: ${bidData.bid_amount} for car ${bidData.car_id} by ${bidData.dealer_email}`);
    
    const result = await supabaseService.createBid(bidData);
    
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: result.message,
        bid_id: result.bid_id,
        bid: result.bid
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message,
        error: result.error
      });
    }
    
  } catch (error) {
    logger.error('Bid creation error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to create bid',
      error: error.message
    });
  }
});

/**
 * GET /api/bids/car/:car_id
 * Get all bids for a specific car
 */
router.get('/car/:car_id', validateUUIDParam('car_id'), async (req, res) => {
  const { car_id } = req.params;
  
  try {
    logger.info(`Getting bids for car: ${car_id}`);
    
    const result = await supabaseService.getBidsForCar(car_id);
    
    return res.status(200).json({
      success: result.success,
      bids: result.bids,
      message: result.message,
      error: result.error || undefined
    });
    
  } catch (error) {
    logger.error(`Get car bids error for ${car_id}:`, error.message);
    
    return res.status(500).json({
      success: false,
      bids: [],
      message: 'Failed to retrieve bids for car',
      error: error.message
    });
  }
});

/**
 * GET /api/bids/dealer/:dealer_email
 * Get all bids by a specific dealer
 */
router.get('/dealer/:dealer_email', validateEmailParam('dealer_email'), async (req, res) => {
  const { dealer_email } = req.params;
  
  try {
    logger.info(`Getting bids for dealer: ${dealer_email}`);
    
    const result = await supabaseService.getBidsByDealer(dealer_email);
    
    return res.status(200).json({
      success: result.success,
      bids: result.bids,
      message: result.message,
      error: result.error || undefined
    });
    
  } catch (error) {
    logger.error(`Get dealer bids error for ${dealer_email}:`, error.message);
    
    return res.status(500).json({
      success: false,
      bids: [],
      message: 'Failed to retrieve dealer bids',
      error: error.message
    });
  }
});

module.exports = router;