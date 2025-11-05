const express = require('express');
const router = express.Router();
const { validateFavorite, validateEmailParam } = require('../utils/validators');
const supabaseService = require('../services/supabaseService');
const logger = require('../utils/logger');

/**
 * POST /api/favorites/add
 * Add car to favorites
 */
router.post('/add', validateFavorite, async (req, res) => {
  const { car_id, dealer_email } = req.body;
  
  try {
    logger.info(`Adding car ${car_id} to favorites for dealer: ${dealer_email}`);
    
    const result = await supabaseService.addToFavorites(car_id, dealer_email);
    
    return res.status(200).json({
      success: result.success,
      message: result.message,
      favorite: result.favorite || undefined,
      error: result.error || undefined
    });
    
  } catch (error) {
    logger.error(`Add to favorites error for car ${car_id}:`, error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to add to favorites',
      error: error.message
    });
  }
});

/**
 * DELETE /api/favorites/remove
 * Remove car from favorites
 */
router.delete('/remove', validateFavorite, async (req, res) => {
  const { car_id, dealer_email } = req.body;
  
  try {
    logger.info(`Removing car ${car_id} from favorites for dealer: ${dealer_email}`);
    
    const result = await supabaseService.removeFromFavorites(car_id, dealer_email);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } else {
      const statusCode = result.message === 'Favorite not found' ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: result.message,
        error: result.error || undefined
      });
    }
    
  } catch (error) {
    logger.error(`Remove from favorites error for car ${car_id}:`, error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to remove from favorites',
      error: error.message
    });
  }
});

/**
 * GET /api/favorites/:dealer_email
 * Get all favorites for a dealer
 */
router.get('/:dealer_email', validateEmailParam('dealer_email'), async (req, res) => {
  const { dealer_email } = req.params;
  
  try {
    logger.info(`Getting favorites for dealer: ${dealer_email}`);
    
    const result = await supabaseService.getFavorites(dealer_email);
    
    return res.status(200).json({
      success: result.success,
      favorites: result.favorites,
      message: result.message,
      error: result.error || undefined
    });
    
  } catch (error) {
    logger.error(`Get favorites error for dealer ${dealer_email}:`, error.message);
    
    return res.status(500).json({
      success: false,
      favorites: [],
      message: 'Failed to retrieve favorites',
      error: error.message
    });
  }
});

module.exports = router;