const express = require('express');
const { authenticate, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all properties (public)
router.get('/', optionalAuth, (req, res) => {
  res.json({
    success: true,
    message: 'Properties endpoint - Coming soon',
    data: []
  });
});

// Create property
router.post('/', authenticate, authorize(['SELLER', 'AGENT']), (req, res) => {
  res.json({
    success: true,
    message: 'Create property - Coming soon',
    data: null
  });
});

// Get property by ID
router.get('/:id', optionalAuth, (req, res) => {
  res.json({
    success: true,
    message: 'Get property by ID - Coming soon',
    data: null
  });
});

// Update property
router.put('/:id', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Update property - Coming soon',
    data: null
  });
});

// Delete property
router.delete('/:id', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Delete property - Coming soon'
  });
});

module.exports = router;