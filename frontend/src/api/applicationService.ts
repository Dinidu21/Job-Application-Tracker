import axiosInstance from './axiosInstance';
import {
    Application,
    CreateApplicationDTO,
    UpdateApplicationDTO,
    ApplicationFilters,
    ApplicationStats,
} from '../types/application';

/**
 * Application Service
 * Handles all application-related API calls
 */

class ApplicationService {
    /**
     * Get all applications with optional filters
     * @param filters - Optional filters for applications
     * @returns Promise with array of Applications
     */
    static async getApplications(filters: ApplicationFilters = {}): Promise<Application[]> {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.search) params.append('search', filters.search);

        const response = await axiosInstance.get<Application[]>(`/applications?${params.toString()}`);
        return response.data;
    }

    /**
     * Get single application by ID
     * @param id - Application ID
     * @returns Promise with Application data
     */
    static async getApplication(id: string): Promise<Application> {
        const response = await axiosInstance.get<Application>(`/applications/${id}`);
        return response.data;
    }

    /**
     * Create new application
     * @param data - Application data to create
     * @returns Promise with created Application
     */
    static async createApplication(data: CreateApplicationDTO): Promise<Application> {
        const response = await axiosInstance.post<Application>('/applications', data);
        return response.data;
    }

    /**
     * Update existing application
     * @param id - Application ID to update
     * @param data - Application data to update
     * @returns Promise with updated Application
     */
    static async updateApplication(id: string, data: UpdateApplicationDTO): Promise<Application> {
        const response = await axiosInstance.put<Application>(`/applications/${id}`, data);
        return response.data;
    }

    /**
     * Delete application
     * @param id - Application ID to delete
     * @returns Promise with deleted Application ID
     */
    static async deleteApplication(id: string): Promise<string> {
        await axiosInstance.delete(`/applications/${id}`);
        return id;
    }

    /**
     * Get application statistics
     * @returns Promise with ApplicationStats
     */
    static async getStats(): Promise<ApplicationStats> {
        const response = await axiosInstance.get<ApplicationStats>('/applications/stats');
        return response.data;
    }
}

export default ApplicationService;