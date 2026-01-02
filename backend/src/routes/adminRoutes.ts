import express from 'express';
import { getMonitoringData } from '../controllers/adminController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/monitoring', protect as any, admin as any, getMonitoringData as any);

export default router;