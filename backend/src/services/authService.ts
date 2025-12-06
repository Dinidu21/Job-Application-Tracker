import User, { IUser } from '../models/User';
import { generateToken } from '../utils/generateToken';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface GoogleAuthData {
  googleId: string;
  name: string;
  email: string;
}

export const registerUser = async (data: RegisterDTO): Promise<AuthResponse> => {
  const { name, email, password } = data;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Create user
  const user = await User.create({ name, email, password });

  // Generate token
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async (data: LoginDTO): Promise<AuthResponse> => {
  const { email, password } = data;

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const googleAuth = async (data: GoogleAuthData): Promise<AuthResponse> => {
  const { googleId, name, email } = data;

  // Check if user exists with this Google ID
  let user = await User.findOne({ googleId });

  if (!user) {
    // Check if user exists with this email
    user = await User.findOne({ email });

    if (user) {
      // Link Google account to existing user
      user.googleId = googleId;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
      });
    }
  }

  // Generate token
  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

