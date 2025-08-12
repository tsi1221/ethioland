const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  getMe,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout,
} = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
  body('firstName').notEmpty().trim().withMessage('First name is required'),
  body('lastName').notEmpty().trim().withMessage('Last name is required'),
  body('role')
    .optional()
    .isIn(['BUYER', 'SELLER', 'AGENT'])
    .withMessage('Invalid role'),
];

const loginValidation = [
  body('emailOrPhone').notEmpty().withMessage('Email or phone is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const updatePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('New password must contain at least one number'),
];

// Public routes
router.post('/register', authLimiter, registerValidation, register);
router.post('/login', authLimiter, loginValidation, login);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.get('/verify-email/:token', verifyEmail);

// Protected routes
router.get('/me', verifyToken, getMe);
router.put('/update-password', verifyToken, updatePasswordValidation, updatePassword);
router.post('/logout', verifyToken, logout);

module.exports = router;