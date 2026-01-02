import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import * as authService from '../services/authService';
import { validationResult } from 'express-validator';
import Session from '../models/Session';

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const result = await authService.registerUser(req.body);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const userAgent = req.get('User-Agent') || '';
    const deviceType = userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone') ? 'mobile' : 'desktop';
    Session.create({
      userId: result.user.id,
      expiresAt,
      ip: req.ip,
      userAgent,
      deviceType,
      geo: { country: 'Unknown', city: 'Unknown' },
    }).catch(err => console.error('Session creation failed', err));
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const result = await authService.loginUser(req.body);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const userAgent = req.get('User-Agent') || '';
    const deviceType = userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone') ? 'mobile' : 'desktop';
    Session.create({
      userId: result.user.id,
      expiresAt,
      ip: req.ip,
      userAgent,
      deviceType,
      geo: { country: 'Unknown', city: 'Unknown' },
    }).catch(err => console.error('Session creation failed', err));
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const googleAuth = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { googleId, name, email } = req.body;
    const result = await authService.googleAuth({ googleId, name, email });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    Session.create({
      userId: result.user.id,
      expiresAt,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    }).catch(err => console.error('Session creation failed', err));
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const updateData = { ...req.body };
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files.resume && files.resume[0]) {
        updateData.resume = files.resume[0].filename;
      }
      if (files.profileImage && files.profileImage[0]) {
        updateData.profileImage = files.profileImage[0].filename;
      }
    } else if (req.file) {
      // Fallback for single file upload
      updateData.resume = req.file.filename;
    }

    const result = await authService.updateProfile(req.user!.id, updateData);
    res.status(200).json({
      user: {
        id: result._id.toString(),
        name: result.name,
        email: result.email,
        role: result.role,
        address: result.address,
        phone: result.phone,
        currentRole: result.currentRole,
        currentCompany: result.currentCompany,
        currentState: result.currentState,
        resume: result.resume,
        profileImage: result.profileImage,
        skills: result.skills,
        experience: result.experience,
        education: result.education,
      },
    });
  } catch (error: any) {
    // Handle multer errors specifically
    if (error.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
      return;
    }
    if (error.message && error.message.includes('Only')) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(400).json({ message: error.message || 'Failed to update profile' });
  }
};

