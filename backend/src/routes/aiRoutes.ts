import express from 'express';
import { improveText, generateFollowUpEmail } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect as any);

router.post('/improve-text', improveText as any);
router.post('/follow-up-email', generateFollowUpEmail as any);

export default router;

