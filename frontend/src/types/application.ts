export type ApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';

export interface Application {
  _id: string;
  user: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  contactEmail?: string;
  contactName?: string;
  companyLogo?: string;
  isFavorite?: boolean;
  interviewStage?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationDTO {
  company: string;
  position: string;
  status?: ApplicationStatus;
  appliedDate?: string;
  notes?: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  contactEmail?: string;
  contactName?: string;
  companyLogo?: string;
}

export interface UpdateApplicationDTO extends Partial<CreateApplicationDTO> { }

export interface ApplicationFilters {
  status?: ApplicationStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface ApplicationStats {
  total: number;
  recent: number;
  byStatus: {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
    withdrawn: number;
  };
}

