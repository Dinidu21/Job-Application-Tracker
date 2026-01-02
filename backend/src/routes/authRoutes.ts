import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { body } from 'express-validator';
import { register, login, getMe, googleAuth, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import passport from '../config/passport';
import Session from '../models/Session';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    if (file.fieldname === 'profileImage') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for profile pictures'));
      }
    } else if (file.fieldname === 'resume') {
      if (file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF and Word documents are allowed for resumes'));
      }
    } else {
      cb(null, true);
    }
  }
});

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  register as any
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login as any
);

router.get('/me', protect as any, getMe as any);

router.put(
  '/profile',
  protect as any,
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
  ]),
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
  ],
  updateProfile as any
);

// Alternative route for testing - single file upload
router.put(
  '/profile/single',
  protect as any,
  upload.single('file'),
  updateProfile as any
);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: any, res: any) => {
    // Create session
    Session.create({
      userId: req.user.user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    }).catch(err => console.error('Session creation failed', err));

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
  googleAuth as any
);

export default router;

