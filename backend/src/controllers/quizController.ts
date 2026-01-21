import { Response } from 'express';
import { Quiz } from '../models/Quiz';
import { ApiResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const createQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { title, subject, description, questions } = req.body;

    if (!title || !subject || !questions || questions.length === 0) {
      return ApiResponse.error(res, 400, 'Please provide all required fields');
    }

    const quiz = await Quiz.create({
      title,
      subject,
      description,
      questions,
      createdBy: req.userId,
    });

    ApiResponse.success(res, 201, 'Quiz created successfully', quiz);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to create quiz', error.message);
  }
};

export const getQuizzes = async (req: AuthRequest, res: Response) => {
  try {
    const { subject } = req.query;
    const filter = subject ? { subject } : {};

    const quizzes = await Quiz.find(filter).populate('createdBy', 'name email');

    ApiResponse.success(res, 200, 'Quizzes retrieved successfully', quizzes);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve quizzes', error.message);
  }
};

export const getQuizById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id).populate('createdBy', 'name email');
    if (!quiz) {
      return ApiResponse.error(res, 404, 'Quiz not found');
    }

    ApiResponse.success(res, 200, 'Quiz retrieved successfully', quiz);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve quiz', error.message);
  }
};

export const updateQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, subject, description, questions } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(subject && { subject }),
        ...(description && { description }),
        ...(questions && { questions }),
      },
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return ApiResponse.error(res, 404, 'Quiz not found');
    }

    ApiResponse.success(res, 200, 'Quiz updated successfully', quiz);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to update quiz', error.message);
  }
};

export const deleteQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return ApiResponse.error(res, 404, 'Quiz not found');
    }

    ApiResponse.success(res, 200, 'Quiz deleted successfully');
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to delete quiz', error.message);
  }
};
