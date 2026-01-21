import { Response } from 'express';
import { Resume } from '../models/Resume';
import { ApiResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const createResume = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return ApiResponse.error(res, 400, 'Please provide title and content');
    }

    const resume = await Resume.create({
      userId: req.userId,
      title,
      content,
    });

    ApiResponse.success(res, 201, 'Resume created successfully', resume);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to create resume', error.message);
  }
};

export const getResumes = async (req: AuthRequest, res: Response) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    ApiResponse.success(res, 200, 'Resumes retrieved successfully', resumes);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve resumes', error.message);
  }
};

export const getResumeById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);
    if (!resume) {
      return ApiResponse.error(res, 404, 'Resume not found');
    }

    if (resume.userId.toString() !== req.userId) {
      return ApiResponse.error(res, 403, 'Unauthorized to access this resume');
    }

    ApiResponse.success(res, 200, 'Resume retrieved successfully', resume);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve resume', error.message);
  }
};

export const updateResume = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, scoreResult } = req.body;

    const resume = await Resume.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(content && { content }),
        ...(scoreResult && { scoreResult, lastScored: new Date() }),
      },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return ApiResponse.error(res, 404, 'Resume not found');
    }

    if (resume.userId.toString() !== req.userId) {
      return ApiResponse.error(res, 403, 'Unauthorized to update this resume');
    }

    ApiResponse.success(res, 200, 'Resume updated successfully', resume);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to update resume', error.message);
  }
};

export const deleteResume = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findByIdAndDelete(id);
    if (!resume) {
      return ApiResponse.error(res, 404, 'Resume not found');
    }

    if (resume.userId.toString() !== req.userId) {
      return ApiResponse.error(res, 403, 'Unauthorized to delete this resume');
    }

    ApiResponse.success(res, 200, 'Resume deleted successfully');
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to delete resume', error.message);
  }
};
