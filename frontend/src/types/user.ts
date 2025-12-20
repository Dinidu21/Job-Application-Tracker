export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  address?: string;
  phone?: string;
  currentRole?: string;
  currentCompany?: string;
  currentState?: string;
  resume?: string;
  skills?: string;
  experience?: string;
  education?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  currentRole?: string;
  currentCompany?: string;
  currentState?: string;
  resume?: string;
  skills?: string;
  experience?: string;
  education?: string;
}

export interface UpdateProfileResponse {
  user: User;
}

