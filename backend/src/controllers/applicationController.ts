import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import * as applicationService from '../services/applicationService';
import { validationResult } from 'express-validator';

export const getApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filters: applicationService.ApplicationFilters = {
      status: req.query.status as string,
      startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
      endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
      search: req.query.search as string,
    };

    const applications = await applicationService.getApplications(req.user!.id, filters);
    res.status(200).json(applications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplication = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await applicationService.getApplicationById(
      req.params.id,
      req.user!.id
    );

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.status(200).json(application);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createApplication = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const application = await applicationService.createApplication(req.user!.id, req.body);
    res.status(201).json(application);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateApplication = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const application = await applicationService.updateApplication(
      req.params.id,
      req.user!.id,
      req.body
    );

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.status(200).json(application);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteApplication = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const deleted = await applicationService.deleteApplication(req.params.id, req.user!.id);

    if (!deleted) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const stats = await applicationService.getApplicationStats(req.user!.id);
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

