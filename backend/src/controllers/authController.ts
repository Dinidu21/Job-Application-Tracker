import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import * as authService from '../services/authService';
import { validationResult } from 'express-validator';

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const result = await authService.registerUser(req.body);
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
    if (req.file) {
      updateData.resume = req.file.path;
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
        skills: result.skills,
        experience: result.experience,
        education: result.education,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

