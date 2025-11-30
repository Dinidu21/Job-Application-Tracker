import express from 'express';
import { improveText, generateFollowUpEmail } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.post('/improve-text', improveText);
router.post('/follow-up-email', generateFollowUpEmail);

export default router;

