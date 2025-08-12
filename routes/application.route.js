import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { 
  createApplication, 
  getApplications, 
  updateApplicationStatus,
  getMyApplications,
  withdrawApplication
} from '../controllers/application.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Application routes
router.post('/', createApplication);
router.get('/my', getMyApplications);
router.get('/post/:postId', getApplications);
router.put('/:id/status', updateApplicationStatus);
router.delete('/:id', withdrawApplication);

export default router;