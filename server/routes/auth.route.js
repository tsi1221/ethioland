import express from 'express';

const router = express.Router();

// Define your post routes here
router.get('/login', (req, res) => {
  res.send('Get all posts');
});

router.get('/register', (req, res) => {
  res.send('Create a new get');
});

router.get('/update', (req, res) => {
  res.send('Create a new post');
});


router.get('logout', (req, res) => {
  res.send('Update a post');
});




export default router;
