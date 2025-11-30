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

router.use(protect);

router.get('/stats', getStats);

router
  .route('/')
  .get(getApplications)
  .post(
    [
      body('company').trim().notEmpty().withMessage('Company is required'),
      body('position').trim().notEmpty().withMessage('Position is required'),
      body('status').optional().isIn(['applied', 'interview', 'offer', 'rejected', 'withdrawn']),
    ],
    createApplication
  );

router
  .route('/:id')
  .get(getApplication)
  .put(
    [
      body('status').optional().isIn(['applied', 'interview', 'offer', 'rejected', 'withdrawn']),
    ],
    updateApplication
  )
  .delete(deleteApplication);

export default router;

