import express from 'express';
import { exportPDF } from '../controllers/pdfController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.get('/export', exportPDF);

export default router;

