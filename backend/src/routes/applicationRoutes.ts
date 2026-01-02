import express from 'express';
import { body } from 'express-validator';
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getStats,
} from '../controllers/applicationController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect as any);

router.get('/stats', getStats as any);

router
  .route('/')
  .get(getApplications as any)
  .post(
    [
      body('company').trim().notEmpty().withMessage('Company is required'),
      body('position').trim().notEmpty().withMessage('Position is required'),
      body('status').optional().isIn(['applied', 'interview', 'offer', 'rejected', 'withdrawn']),
    ],
    createApplication as any
  );

router
  .route('/:id')
  .get(getApplication as any)
  .put(
    [
      body('status').optional().isIn(['applied', 'interview', 'offer', 'rejected', 'withdrawn']),
    ],
    updateApplication as any
  )
  .delete(deleteApplication as any);

export default router;

