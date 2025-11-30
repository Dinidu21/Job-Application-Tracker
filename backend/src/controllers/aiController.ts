import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import * as aiService from '../services/aiService';

export const improveText = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: 'Text is required' });
      return;
    }

    const improved = await aiService.improveResumeBullet({ text });
    res.status(200).json({ improved });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const generateFollowUpEmail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { companyName, position, appliedDate, contactName } = req.body;
    
    if (!companyName || !position || !appliedDate) {
      res.status(400).json({ message: 'Company name, position, and applied date are required' });
      return;
    }

    const email = await aiService.generateFollowUpEmail({
      companyName,
      position,
      appliedDate,
      contactName,
    });

    res.status(200).json({ email });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

