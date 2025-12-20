/**
 * API Services Index
 * Centralized export of all API services
 */

export { default as axiosInstance } from './axiosInstance';
export { default as AuthService } from './authService';
export { default as ApplicationService } from './applicationService';

export * from './authService';
export * from './applicationService';

export type {
  // Auth types
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '../types/user';

export type {
  // Application types
  Application,
  CreateApplicationDTO,
  UpdateApplicationDTO,
  ApplicationFilters,
  ApplicationStats,
} from '../types/application';