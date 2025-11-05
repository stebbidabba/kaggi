const express = require('express');
const router = express.Router();
const { validateCarRegistration, validateUUIDParam } = require('../utils/validators');
const supabaseService = require('../services/supabaseService');
const logger = require('../utils/logger');

/**
 * POST /api/cars/register
 * Register a new car
 */
router.post('/register', validateCarRegistration, async (req, res) => {
  try {
    const carData = req.body;
    
    logger.info(`Car registration request for plate: ${carData.car_plate}`);
    
    const result = await supabaseService.registerCar(carData);
    
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: result.message,
        car_id: result.car_id,
        car: result.car
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message,
        error: result.error
      });
    }
    
  } catch (error) {
    logger.error('Car registration error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to register car',
      error: error.message
    });
  }
});

/**
 * GET /api/cars
 * Get all cars
 */
router.get('/', async (req, res) => {
  try {
    logger.info('Getting all cars - API call received');
    
    const result = await supabaseService.getAllCars();
    
    logger.info(`Cars API: Retrieved ${result.cars?.length || 0} cars, success: ${result.success}`);
    
    return res.status(200).json({
      success: result.success,
      cars: result.cars,
      message: result.message,
      error: result.error || undefined,
      timestamp: new Date().toISOString(),
      count: result.cars?.length || 0
    });
    
  } catch (error) {
    logger.error('Get cars error:', error.message);
    
    return res.status(500).json({
      success: false,
      cars: [],
      message: 'Failed to retrieve cars',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/cars/:car_id
 * Get a specific car by ID
 */
router.get('/:car_id', validateUUIDParam('car_id'), async (req, res) => {
  const { car_id } = req.params;
  
  try {
    logger.info(`Getting car: ${car_id}`);
    
    const result = await supabaseService.getCarById(car_id);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        car: result.car,
        message: result.message
      });
    } else {
      const statusCode = result.message === 'Car not found' ? 404 : 500;
      return res.status(statusCode).json({
        success: false,
        message: result.message,
        error: result.error || undefined
      });
    }
    
  } catch (error) {
    logger.error(`Get car error for ${car_id}:`, error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve car',
      error: error.message
    });
  }
});

/**
 * PUT /api/cars/:car_id/status
 * Update car status
 */
router.put('/:car_id/status', validateUUIDParam('car_id'), async (req, res) => {
  const { car_id } = req.params;
  const { status } = req.body;
  
  try {
    // Validate status
    const validStatuses = ['active', 'pending', 'sold'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: active, pending, sold'
      });
    }
    
    logger.info(`Updating car status: ${car_id} -> ${status}`);
    
    const result = await supabaseService.updateCarStatus(car_id, status);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        car: result.car
      });
    } else {
      const statusCode = result.message === 'Car not found' ? 404 : 
                        result.message.includes('Invalid status') ? 400 : 500;
      return res.status(statusCode).json({
        success: false,
        message: result.message,
        error: result.error || undefined
      });
    }
    
  } catch (error) {
    logger.error(`Update car status error for ${car_id}:`, error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to update car status',
      error: error.message
    });
  }
});

module.exports = router;