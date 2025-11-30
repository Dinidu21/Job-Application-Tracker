import Application, { IApplication } from '../models/Application';
import mongoose from 'mongoose';

export interface CreateApplicationDTO {
  company: string;
  position: string;
  status?: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  appliedDate?: Date;
  notes?: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  contactEmail?: string;
  contactName?: string;
}

export interface UpdateApplicationDTO extends Partial<CreateApplicationDTO> {}

export interface ApplicationFilters {
  status?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

export const createApplication = async (
  userId: string,
  data: CreateApplicationDTO
): Promise<IApplication> => {
  const application = await Application.create({
    ...data,
    user: userId,
  });
  return application;
};

export const getApplications = async (
  userId: string,
  filters: ApplicationFilters = {}
): Promise<IApplication[]> => {
  const query: any = { user: userId };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.startDate || filters.endDate) {
    query.appliedDate = {};
    if (filters.startDate) {
      query.appliedDate.$gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      query.appliedDate.$lte = new Date(filters.endDate);
    }
  }

  if (filters.search) {
    query.$or = [
      { company: { $regex: filters.search, $options: 'i' } },
      { position: { $regex: filters.search, $options: 'i' } },
    ];
  }

  const applications = await Application.find(query)
    .sort({ appliedDate: -1 })
    .exec();
  return applications;
};

export const getApplicationById = async (
  applicationId: string,
  userId: string
): Promise<IApplication | null> => {
  const application = await Application.findOne({
    _id: applicationId,
    user: userId,
  });
  return application;
};

export const updateApplication = async (
  applicationId: string,
  userId: string,
  data: UpdateApplicationDTO
): Promise<IApplication | null> => {
  const application = await Application.findOneAndUpdate(
    { _id: applicationId, user: userId },
    data,
    { new: true, runValidators: true }
  );
  return application;
};

export const deleteApplication = async (
  applicationId: string,
  userId: string
): Promise<boolean> => {
  const result = await Application.deleteOne({
    _id: applicationId,
    user: userId,
  });
  return result.deletedCount > 0;
};

export const getApplicationStats = async (userId: string) => {
  const stats = await Application.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const total = await Application.countDocuments({ user: userId });
  const recent = await Application.countDocuments({
    user: userId,
    appliedDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });

  const statsMap: Record<string, number> = {
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    withdrawn: 0,
  };

  stats.forEach((stat) => {
    statsMap[stat._id] = stat.count;
  });

  return {
    total,
    recent,
    byStatus: statsMap,
  };
};

