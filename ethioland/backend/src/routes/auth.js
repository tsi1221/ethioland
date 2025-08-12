const express = require('express');
const { body } = require('express-validator');
const { 
  register, 
  login, 
  getMe, 
  updateProfile, 
  changePassword, 
  logout 
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .optional()
    .isIn(['BUYER', 'SELLER', 'AGENT'])
    .withMessage('Role must be BUYER, SELLER, or AGENT'),
  body('language')
    .optional()
    .isIn(['en', 'am', 'om', 'ti'])
    .withMessage('Language must be en, am, om, or ti')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
];

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must be less than 100 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters'),
  body('language')
    .optional()
    .isIn(['en', 'am', 'om', 'ti'])
    .withMessage('Language must be en, am, om, or ti'),
  body('experience')
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  body('commission')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Commission must be between 0 and 100 percent')
];

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfileValidation, validate, updateProfile);
router.put('/change-password', authenticate, changePasswordValidation, validate, changePassword);
router.post('/logout', authenticate, logout);

module.exports = router;