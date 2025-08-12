const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Placeholder routes
router.get('/', (req, res) => {
  res.json({ message: 'Get notifications endpoint' });
});

router.put('/:id/read', (req, res) => {
  res.json({ message: 'Mark notification as read endpoint' });
});

module.exports = router;