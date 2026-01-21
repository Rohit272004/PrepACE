import { Response } from 'express';
import { Content } from '../models/Content';
import { ApiResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const createContent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, content, tags, status } = req.body;

    if (!title || !category || !content) {
      return ApiResponse.error(res, 400, 'Please provide all required fields');
    }

    const newContent = await Content.create({
      title,
      category,
      content,
      tags: tags || [],
      status: status || 'Draft',
      author: req.userId,
    });

    ApiResponse.success(res, 201, 'Content created successfully', newContent);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to create content', error.message);
  }
};

export const getPublishedContent = async (req: AuthRequest, res: Response) => {
  try {
    const { category, tags } = req.query;
    const filter: any = { status: 'Published' };

    if (category) filter.category = category;
    if (tags) {
      filter.tags = { $in: (tags as string).split(',') };
    }

    const contents = await Content.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    ApiResponse.success(res, 200, 'Content retrieved successfully', contents);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve content', error.message);
  }
};

export const getUserContent = async (req: AuthRequest, res: Response) => {
  try {
    const contents = await Content.find({ author: req.userId }).sort({
      createdAt: -1,
    });

    ApiResponse.success(res, 200, 'User content retrieved successfully', contents);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve content', error.message);
  }
};

export const updateContent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, category, content, tags, status } = req.body;

    const updatedContent = await Content.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(category && { category }),
        ...(content && { content }),
        ...(tags && { tags }),
        ...(status && { status }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return ApiResponse.error(res, 404, 'Content not found');
    }

    ApiResponse.success(res, 200, 'Content updated successfully', updatedContent);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to update content', error.message);
  }
};

export const deleteContent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const content = await Content.findByIdAndDelete(id);
    if (!content) {
      return ApiResponse.error(res, 404, 'Content not found');
    }

    ApiResponse.success(res, 200, 'Content deleted successfully');
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to delete content', error.message);
  }
};
