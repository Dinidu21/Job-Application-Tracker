/**
 * Error Handler Utility
 *
 * Centralized error handling for API calls and application errors.
 * Provides consistent error message formatting and type-safe error handling.
 *
 * Features:
 * - Axios error handling with proper type guards
 * - Network error detection
 * - Authentication error handling
 * - Form validation error processing
 * - Consistent error message formatting
 */
import { AxiosError } from 'axios';

/**
 * Handle API errors
 * @param error - Error to handle
 * @param defaultMessage - Default error message
 * @returns Formatted error message
 */
export const handleApiError = (error: unknown, defaultMessage: string = 'An error occurred'): string => {
    if (error instanceof Error) {
        if (isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                // Server responded with a status code outside 2xx
                const responseData = error.response.data;
                if (typeof responseData === 'string') {
                    return responseData;
                } else if (responseData && typeof responseData === 'object' && 'message' in responseData) {
                    return (responseData as { message: string }).message;
                } else if (error.response.status === 401) {
                    return 'Unauthorized: Please login again';
                } else if (error.response.status === 404) {
                    return 'Resource not found';
                } else if (error.response.status >= 500) {
                    return 'Server error: Please try again later';
                }
            } else if (error.request) {
                // Request was made but no response received
                return 'Network error: Please check your connection';
            }
            // Other Axios errors
            return error.message || defaultMessage;
        }
        // Regular errors
        return error.message || defaultMessage;
    }

    // Unknown error type
    return defaultMessage;
};

/**
 * Type guard for AxiosError
 * @param error - Error to check
 * @returns True if error is AxiosError
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
    return (error as AxiosError).isAxiosError !== undefined;
};

/**
 * Handle form validation errors
 * @param error - Error to handle
 * @returns Object with field-specific errors
 */
export const handleFormErrors = (error: unknown): Record<string, string> => {
    if (isAxiosError(error) && error.response?.data && typeof error.response.data === 'object' && 'errors' in error.response.data) {
        return (error.response.data as { errors: Record<string, string> }).errors;
    }
    return {};
};

/**
 * Handle network errors
 * @param error - Error to handle
 * @returns True if error is network-related
 */
export const isNetworkError = (error: unknown): boolean => {
    return isAxiosError(error) && !error.response && error.request;
};

/**
 * Handle authentication errors
 * @param error - Error to handle
 * @returns True if error is authentication-related
 */
export const isAuthError = (error: unknown): boolean => {
    return isAxiosError(error) && error.response?.status === 401;
};