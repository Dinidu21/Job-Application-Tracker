import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import * as applicationService from '../services/applicationService';
import * as pdfService from '../services/pdfService';

export const exportPDF = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filters: applicationService.ApplicationFilters = {
      status: req.query.status as string,
      startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
      endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
      search: req.query.search as string,
    };

    const applications = await applicationService.getApplications(req.user!.id, filters);
    const pdfBuffer = await pdfService.generateApplicationsPDF(applications);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=applications.pdf');
    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

