const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(verifyToken, authorize('ADMIN'));

// Placeholder routes
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard endpoint' });
});

router.get('/properties/pending', (req, res) => {
  res.json({ message: 'Pending properties endpoint' });
});

router.put('/properties/:id/approve', (req, res) => {
  res.json({ message: 'Approve property endpoint' });
});

router.put('/properties/:id/reject', (req, res) => {
  res.json({ message: 'Reject property endpoint' });
});

module.exports = router;