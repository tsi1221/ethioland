const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({
    success: true,
    message: 'Users endpoint - Coming soon',
    data: []
  });
});

// Get user by ID
router.get('/:id', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Get user by ID - Coming soon',
    data: null
  });
});

module.exports = router;