import express from 'express';
import { getMonitoringData, deleteSession } from '../controllers/adminController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/monitoring', protect as any, admin as any, getMonitoringData as any);
router.delete('/monitoring/:sessionId', protect as any, admin as any, deleteSession as any);

export default router;