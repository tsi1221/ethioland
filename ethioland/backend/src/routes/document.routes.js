const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Placeholder routes
router.post('/upload', (req, res) => {
  res.json({ message: 'Document upload endpoint' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get document endpoint' });
});

module.exports = router;