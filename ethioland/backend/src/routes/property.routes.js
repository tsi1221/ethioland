const express = require('express');
const { body } = require('express-validator');
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
  toggleFavorite,
  getFavorites,
  getFeaturedProperties,
} = require('../controllers/property.controller');
const { verifyToken, authorize, optionalAuth } = require('../middleware/auth');
const { searchLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Property validation
const propertyValidation = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('description').notEmpty().trim().withMessage('Description is required'),
  body('type')
    .isIn(['LAND', 'HOUSE', 'APARTMENT', 'COMMERCIAL', 'VILLA', 'CONDO'])
    .withMessage('Invalid property type'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('address').notEmpty().trim().withMessage('Address is required'),
  body('city').notEmpty().trim().withMessage('City is required'),
  body('region').notEmpty().trim().withMessage('Region is required'),
  body('size').optional().isNumeric().withMessage('Size must be a number'),
  body('bedrooms').optional().isInt({ min: 0 }).withMessage('Bedrooms must be a positive integer'),
  body('bathrooms').optional().isInt({ min: 0 }).withMessage('Bathrooms must be a positive integer'),
  body('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
  body('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
];

// Public routes (with optional auth for favorites)
router.get('/', searchLimiter, optionalAuth, getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:id', optionalAuth, getPropertyById);

// Protected routes - require authentication
router.use(verifyToken);

// User routes
router.post('/', authorize('SELLER', 'AGENT', 'ADMIN'), propertyValidation, createProperty);
router.put('/:id', authorize('SELLER', 'AGENT', 'ADMIN'), updateProperty);
router.delete('/:id', authorize('SELLER', 'AGENT', 'ADMIN'), deleteProperty);
router.get('/user/my-properties', authorize('SELLER', 'AGENT', 'ADMIN'), getMyProperties);

// Favorites
router.post('/:id/favorite', toggleFavorite);
router.get('/user/favorites', getFavorites);

module.exports = router;