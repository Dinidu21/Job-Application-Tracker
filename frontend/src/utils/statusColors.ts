import { ApplicationStatus } from '../types/application';

export const getStatusColor = (status: ApplicationStatus): string => {
  const colors: Record<ApplicationStatus, string> = {
    applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    interview: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    offer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    withdrawn: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  };
  return colors[status];
};

export const getStatusBadgeColor = (status: ApplicationStatus): string => {
  const colors: Record<ApplicationStatus, string> = {
    applied: 'bg-blue-500',
    interview: 'bg-yellow-500',
    offer: 'bg-green-500',
    rejected: 'bg-red-500',
    withdrawn: 'bg-gray-500',
  };
  return colors[status];
};


export const getStatusGradient = (status: string): string => {
  const gradients: Record<string, string> = {
    applied: 'from-blue-500 to-cyan-500',
    interview: 'from-yellow-500 to-orange-500',
    offer: 'from-green-500 to-emerald-500',
    rejected: 'from-red-500 to-pink-500',
    withdrawn: 'from-gray-500 to-gray-700',
  };
  return gradients[status] || 'from-gray-500 to-gray-700';
};
