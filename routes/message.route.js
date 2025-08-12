import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { 
  sendMessage, 
  getMessages, 
  getConversations,
  markAsRead,
  deleteMessage
} from '../controllers/message.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Message routes
router.post('/', sendMessage);
router.get('/conversations', getConversations);
router.get('/:userId', getMessages);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);

export default router;