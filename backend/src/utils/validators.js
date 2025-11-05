const { body, param, query, validationResult } = require('express-validator');

// Validation helper to handle results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

// Vehicle validation rules
const validateVehicleVerification = [
  body('plate')
    .trim()
    .notEmpty()
    .withMessage('License plate is required')
    .isLength({ min: 2, max: 10 })
    .withMessage('License plate must be between 2 and 10 characters')
    .matches(/^[A-Z0-9-]+$/i)
    .withMessage('License plate can only contain letters, numbers, and hyphens'),
  body('mileage')
    .isInt({ min: 0, max: 9999999 })
    .withMessage('Mileage must be a positive integer up to 9,999,999'),
  handleValidationErrors
];

// Email validation rules
const validateWelcomeEmail = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Invalid phone number format'),
  handleValidationErrors
];

// Brevo list validation
const validateBrevoList = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim(),
  handleValidationErrors
];

// SMS validation rules
const validateSMSCode = [
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^(\+354|354|)?\s*\d{7}$/)
    .withMessage('Invalid Icelandic phone number format'),
  handleValidationErrors
];

const validateSMSVerify = [
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^(\+354|354|)?\s*\d{7}$/)
    .withMessage('Invalid Icelandic phone number format'),
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Verification code is required')
    .isLength({ min: 4, max: 8 })
    .withMessage('Invalid verification code format'),
  handleValidationErrors
];

// Company validation rules
const validateCompany = [
  body('kennitala')
    .trim()
    .notEmpty()
    .withMessage('Kennitala is required')
    .matches(/^\d{10}$/)
    .withMessage('Kennitala must be exactly 10 digits'),
  handleValidationErrors
];

// Car registration validation
const validateCarRegistration = [
  body('seller_name')
    .trim()
    .notEmpty()
    .withMessage('Seller name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Seller name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Invalid phone number format'),
  body('postal_code')
    .optional()
    .trim()
    .matches(/^\d{3,5}$/)
    .withMessage('Invalid postal code format'),
  body('car_make')
    .trim()
    .notEmpty()
    .withMessage('Car make is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Car make must be between 1 and 50 characters'),
  body('car_model')
    .trim()
    .notEmpty()
    .withMessage('Car model is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Car model must be between 1 and 50 characters'),
  body('car_plate')
    .trim()
    .notEmpty()
    .withMessage('Car plate is required')
    .matches(/^[A-Z0-9-]+$/i)
    .withMessage('Invalid car plate format'),
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage(`Year must be between 1900 and ${new Date().getFullYear() + 1}`),
  body('mileage')
    .optional()
    .isInt({ min: 0, max: 9999999 })
    .withMessage('Mileage must be a positive integer up to 9,999,999'),
  handleValidationErrors
];

// Bid creation validation
const validateBidCreation = [
  body('car_id')
    .trim()
    .notEmpty()
    .withMessage('Car ID is required')
    .isUUID()
    .withMessage('Invalid car ID format'),
  body('dealer_name')
    .trim()
    .notEmpty()
    .withMessage('Dealer name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Dealer name must be between 1 and 100 characters'),
  body('dealer_email')
    .isEmail()
    .withMessage('Valid dealer email is required')
    .normalizeEmail(),
  body('bid_amount')
    .isInt({ min: 1 })
    .withMessage('Bid amount must be a positive integer'),
  handleValidationErrors
];

// Favorites validation
const validateFavorite = [
  body('car_id')
    .trim()
    .notEmpty()
    .withMessage('Car ID is required')
    .isUUID()
    .withMessage('Invalid car ID format'),
  body('dealer_email')
    .isEmail()
    .withMessage('Valid dealer email is required')
    .normalizeEmail(),
  handleValidationErrors
];

// UUID parameter validation
const validateUUIDParam = (paramName) => [
  param(paramName)
    .isUUID()
    .withMessage(`Invalid ${paramName} format`),
  handleValidationErrors
];

// Email parameter validation
const validateEmailParam = (paramName) => [
  param(paramName)
    .isEmail()
    .withMessage(`Invalid ${paramName} format`),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateVehicleVerification,
  validateWelcomeEmail,
  validateBrevoList,
  validateSMSCode,
  validateSMSVerify,
  validateCompany,
  validateCarRegistration,
  validateBidCreation,
  validateFavorite,
  validateUUIDParam,
  validateEmailParam
};