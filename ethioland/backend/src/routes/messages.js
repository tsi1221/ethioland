const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get user messages
router.get('/', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Messages endpoint - Coming soon',
    data: []
  });
});

// Send message
router.post('/', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Send message - Coming soon',
    data: null
  });
});

// Mark message as read
router.patch('/:id/read', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Mark message as read - Coming soon'
  });
});

module.exports = router;