import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe, googleAuth } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import passport from '../config/passport';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.get('/me', protect, getMe);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: any, res: any) => {
    // Redirect to frontend with token
    const token = req.user.token;
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
  }
);

// Alternative: Direct API endpoint for Google auth (for mobile apps, etc.)
router.post(
  '/google',
  [
    body('googleId').notEmpty().withMessage('Google ID is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  googleAuth
);

export default router;

