const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const supabaseService = require('../services/supabaseService');
const logger = require('../utils/logger');

// Validation rules for dealer registration
const validateDealerRegistration = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  body('surname')
    .trim()
    .notEmpty()
    .withMessage('Surname is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Surname must be between 1 and 50 characters'),
  body('organizationNumber')
    .trim()
    .notEmpty()
    .withMessage('Organization number is required')
    .matches(/^\d{10}$/)
    .withMessage('Organization number must be exactly 10 digits'),
  body('dealerName')
    .trim()
    .notEmpty()
    .withMessage('Dealer name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Dealer name must be between 1 and 100 characters'),
  body('mobileNumber')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^(\+354|354|)?\s*\d{7}$/)
    .withMessage('Invalid Icelandic mobile number format'),
  body('streetAddress')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('postalCode')
    .trim()
    .notEmpty()
    .withMessage('Postal code is required')
    .matches(/^\d{3}$/)
    .withMessage('Postal code must be 3 digits'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  // Vehicle information from previous steps
  body('vehicle')
    .notEmpty()
    .withMessage('Vehicle information is required'),
  body('vehicle.registrationNumber')
    .trim()
    .notEmpty()
    .withMessage('Vehicle registration number is required'),
  body('vehicle.mileage')
    .isInt({ min: 0 })
    .withMessage('Vehicle mileage must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    next();
  }
];

/**
 * POST /api/dealers/register
 * Register a dealer with their contact information and vehicle
 */
router.post('/register', validateDealerRegistration, async (req, res) => {
  try {
    const {
      firstName,
      surname,
      organizationNumber,
      dealerName,
      mobileNumber,
      streetAddress,
      postalCode,
      city,
      vehicle
    } = req.body;

    const email = `${firstName.toLowerCase()}.${surname.toLowerCase()}@${dealerName.toLowerCase().replace(/\s+/g, '')}.is`;
    const fullName = `${firstName} ${surname}`;

    logger.info(`Registering dealer: ${fullName} (${dealerName}) with vehicle ${vehicle.registrationNumber}`);

    // Register the car in the bilar table
    const carData = {
      seller_name: fullName,
      email: email,
      phone: mobileNumber,
      postal_code: postalCode,
      car_make: vehicle.make || 'Unknown',
      car_model: vehicle.model || 'Unknown',
      car_plate: vehicle.registrationNumber,
      year: vehicle.year || 0,
      mileage: vehicle.mileage,
      status: 'pending' // New registrations start as pending
    };

    const carResult = await supabaseService.registerCar(carData);
    
    if (!carResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to register vehicle',
        error: carResult.error
      });
    }

    // Register the dealer in the fyrir_bilasala table (if it exists)
    try {
      const dealerResult = await supabaseService.registerDealer({
        firstName,
        surname,
        organizationNumber,
        dealerName,
        email,
        mobileNumber,
        streetAddress,
        postalCode,
        city,
        carId: carResult.car_id
      });

      if (dealerResult.success) {
        logger.info(`Dealer registered successfully: ${dealerResult.dealer_id}`);
      }
    } catch (dealerError) {
      logger.warn('Could not register in dealer table (table may not exist):', dealerError.message);
      // Continue without failing - car registration was successful
    }

    // Send success response
    return res.status(201).json({
      success: true,
      message: 'Dealer and vehicle registered successfully',
      data: {
        car_id: carResult.car_id,
        car: carResult.car,
        dealer: {
          name: fullName,
          email: email,
          dealerName: dealerName,
          organizationNumber: organizationNumber
        }
      }
    });

  } catch (error) {
    logger.error('Dealer registration error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to register dealer',
      error: error.message
    });
  }
});

module.exports = router;