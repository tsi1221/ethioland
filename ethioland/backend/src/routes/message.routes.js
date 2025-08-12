const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Placeholder routes
router.get('/', (req, res) => {
  res.json({ message: 'Get messages endpoint' });
});

router.post('/send', (req, res) => {
  res.json({ message: 'Send message endpoint' });
});

module.exports = router;