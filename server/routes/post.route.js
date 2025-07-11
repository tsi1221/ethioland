import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';
import prisma from '../prisma.js';

const router = express.Router();

// Create post (authenticated users only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        userId: req.user.id
      }
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// Update post (only by owner)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id }
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }
    
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: req.body
    });
    
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
});

// Add other routes...

// Export the router
export default router;