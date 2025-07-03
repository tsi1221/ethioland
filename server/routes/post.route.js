import express from 'express';

const router = express.Router();

// Define your post routes here
router.get('/', (req, res) => {
  res.send('Get all posts');
});

router.get('/test', (req, res) => {
  res.send('Create a new get');
});

router.post('/test', (req, res) => {
  res.send('Create a new post');
});


router.put('/test', (req, res) => {
  res.send('Update a post');
});


router.delete('/test', (req, res) => {
  res.send('Delete a post');
});


export default router;
