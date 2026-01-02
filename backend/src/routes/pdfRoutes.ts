import express from 'express';
import { exportPDF } from '../controllers/pdfController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect as any);

router.get('/export', exportPDF as any);

export default router;

