const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Admin dashboard stats
router.get('/dashboard', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard - Coming soon',
    data: {}
  });
});

// Pending properties for approval
router.get('/properties/pending', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({
    success: true,
    message: 'Pending properties - Coming soon',
    data: []
  });
});

// Approve property
router.patch('/properties/:id/approve', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({
    success: true,
    message: 'Approve property - Coming soon'
  });
});

// Reject property
router.patch('/properties/:id/reject', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({
    success: true,
    message: 'Reject property - Coming soon'
  });
});

// Get all users
router.get('/users', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({
    success: true,
    message: 'All users - Coming soon',
    data: []
  });
});

module.exports = router;