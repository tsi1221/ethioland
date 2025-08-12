const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Placeholder routes
router.post('/initiate', (req, res) => {
  res.json({ message: 'Initiate payment endpoint' });
});

router.post('/verify', (req, res) => {
  res.json({ message: 'Verify payment endpoint' });
});

module.exports = router;