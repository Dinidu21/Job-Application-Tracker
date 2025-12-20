import axiosInstance from './axiosInstance';
import { AuthResponse, LoginCredentials, RegisterCredentials, UpdateProfileRequest, UpdateProfileResponse, User } from '../types/user';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

class AuthService {
    /**
     * Login user
     * @param credentials - User login credentials
     * @returns Promise with AuthResponse
     */
    static async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    }

    /**
     * Register new user
     * @param credentials - User registration credentials
     * @returns Promise with AuthResponse
     */
    static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>('/auth/register', credentials);
        return response.data;
    }

    /**
     * Update user profile
     * @param profileData - Profile data to update
     * @returns Promise with UpdateProfileResponse
     */
    static async updateProfile(profileData: UpdateProfileRequest | FormData): Promise<UpdateProfileResponse> {
        // Don't set Content-Type for FormData - let axios set it automatically
        const config = profileData instanceof FormData ? {} : {};
        const response = await axiosInstance.put<UpdateProfileResponse>('/auth/profile', profileData, config);
        return response.data;
    }

    /**
     * Get current user profile
     * @returns Promise with User data
     */
    static async getProfile(): Promise<User> {
        const response = await axiosInstance.get<{ user: User }>('/auth/me');
        return response.data.user;
    }

    /**
     * Logout user
     * @returns Promise with success status
     */
    static async logout(): Promise<void> {
        await axiosInstance.post('/auth/logout');
    }
}

export default AuthService;