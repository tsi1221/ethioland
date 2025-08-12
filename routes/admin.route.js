import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';
import { 
  getAllUsers, 
  verifyUser, 
  getAllPosts, 
  approvePost, 
  rejectPost,
  verifyDocument,
  getDashboardStats,
  getPendingVerifications
} from '../controllers/admin.controller.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('ADMIN'));

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/verify', verifyUser);

// Post management
router.get('/posts', getAllPosts);
router.put('/posts/:id/approve', approvePost);
router.put('/posts/:id/reject', rejectPost);

// Document verification
router.get('/documents/pending', getPendingVerifications);
router.put('/documents/:id/verify', verifyDocument);

// Dashboard
router.get('/dashboard', getDashboardStats);

export default router;