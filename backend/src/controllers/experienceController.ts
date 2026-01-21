import { Response } from 'express';
import { InterviewExperience } from '../models/InterviewExperience';
import { ApiResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const createExperience = async (req: AuthRequest, res: Response) => {
  try {
    const { company, role, content, rating } = req.body;

    if (!company || !role || !content) {
      return ApiResponse.error(res, 400, 'Please provide all required fields');
    }

    const experience = await InterviewExperience.create({
      author: req.userId,
      company,
      role,
      content,
      rating: rating || undefined,
      status: 'Pending',
    });

    ApiResponse.success(res, 201, 'Experience submitted successfully', experience);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to submit experience', error.message);
  }
};

export const getExperiences = async (req: AuthRequest, res: Response) => {
  try {
    const { company, status } = req.query;
    const filter: any = { status: 'Approved' };

    if (company) filter.company = company;
    if (status) filter.status = status;

    const experiences = await InterviewExperience.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    ApiResponse.success(res, 200, 'Experiences retrieved successfully', experiences);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve experiences', error.message);
  }
};

export const getUserExperiences = async (req: AuthRequest, res: Response) => {
  try {
    const experiences = await InterviewExperience.find({ author: req.userId })
      .sort({ createdAt: -1 });

    ApiResponse.success(res, 200, 'User experiences retrieved successfully', experiences);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve experiences', error.message);
  }
};

export const approveExperience = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const experience = await InterviewExperience.findByIdAndUpdate(
      id,
      { status: 'Approved' },
      { new: true }
    );

    if (!experience) {
      return ApiResponse.error(res, 404, 'Experience not found');
    }

    ApiResponse.success(res, 200, 'Experience approved successfully', experience);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to approve experience', error.message);
  }
};

export const rejectExperience = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const experience = await InterviewExperience.findByIdAndUpdate(
      id,
      { status: 'Rejected' },
      { new: true }
    );

    if (!experience) {
      return ApiResponse.error(res, 404, 'Experience not found');
    }

    ApiResponse.success(res, 200, 'Experience rejected', experience);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to reject experience', error.message);
  }
};

export const deleteExperience = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const experience = await InterviewExperience.findByIdAndDelete(id);
    if (!experience) {
      return ApiResponse.error(res, 404, 'Experience not found');
    }

    ApiResponse.success(res, 200, 'Experience deleted successfully');
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to delete experience', error.message);
  }
};
