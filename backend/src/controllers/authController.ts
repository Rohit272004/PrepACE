import { Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/jwt';
import { ApiResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, role, cgpa } = req.body;

    if (!name || !email || !password) {
      return ApiResponse.error(res, 400, 'Please provide all required fields');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(res, 400, 'Email already registered');
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Student',
      cgpa: cgpa || 0,
    });

    const token = generateToken(user._id.toString());

    ApiResponse.success(res, 201, 'User registered successfully', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cgpa: user.cgpa,
      },
      token,
    });
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Registration failed', error.message);
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, 400, 'Please provide email and password');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return ApiResponse.error(res, 401, 'Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return ApiResponse.error(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user._id.toString());

    ApiResponse.success(res, 200, 'Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        cgpa: user.cgpa,
      },
      token,
    });
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Login failed', error.message);
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return ApiResponse.error(res, 404, 'User not found');
    }

    ApiResponse.success(res, 200, 'Profile retrieved successfully', user);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve profile', error.message);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, cgpa, preparationStatus } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        ...(name && { name }),
        ...(cgpa !== undefined && { cgpa }),
        ...(preparationStatus && { preparationStatus }),
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return ApiResponse.error(res, 404, 'User not found');
    }

    ApiResponse.success(res, 200, 'Profile updated successfully', user);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to update profile', error.message);
  }
};
