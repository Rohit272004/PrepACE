import { Response } from 'express';
import { JobDrive } from '../models/JobDrive';
import { ApiResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const createJobDrive = async (req: AuthRequest, res: Response) => {
  try {
    const { company, role, minCGPA, deadline, description } = req.body;

    if (!company || !role || minCGPA === undefined || !deadline) {
      return ApiResponse.error(res, 400, 'Please provide all required fields');
    }

    const jobDrive = await JobDrive.create({
      company,
      role,
      minCGPA,
      deadline: new Date(deadline),
      description,
      status: 'Active',
    });

    ApiResponse.success(res, 201, 'Job drive created successfully', jobDrive);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to create job drive', error.message);
  }
};

export const getJobDrives = async (req: AuthRequest, res: Response) => {
  try {
    const { status, company } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (company) filter.company = company;

    const jobDrives = await JobDrive.find(filter)
      .populate('applicants', 'name email cgpa')
      .sort({ deadline: 1 });

    ApiResponse.success(res, 200, 'Job drives retrieved successfully', jobDrives);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve job drives', error.message);
  }
};

export const getJobDriveById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const jobDrive = await JobDrive.findById(id).populate(
      'applicants',
      'name email cgpa'
    );

    if (!jobDrive) {
      return ApiResponse.error(res, 404, 'Job drive not found');
    }

    ApiResponse.success(res, 200, 'Job drive retrieved successfully', jobDrive);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to retrieve job drive', error.message);
  }
};

export const applyForJobDrive = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const jobDrive = await JobDrive.findById(id);
    if (!jobDrive) {
      return ApiResponse.error(res, 404, 'Job drive not found');
    }

    if (jobDrive.applicants.includes(req.userId as any)) {
      return ApiResponse.error(res, 400, 'Already applied for this job drive');
    }

    jobDrive.applicants.push(req.userId as any);
    await jobDrive.save();

    ApiResponse.success(res, 200, 'Applied successfully', jobDrive);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to apply', error.message);
  }
};

export const updateJobDrive = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { company, role, minCGPA, deadline, description, status } = req.body;

    const jobDrive = await JobDrive.findByIdAndUpdate(
      id,
      {
        ...(company && { company }),
        ...(role && { role }),
        ...(minCGPA !== undefined && { minCGPA }),
        ...(deadline && { deadline: new Date(deadline) }),
        ...(description && { description }),
        ...(status && { status }),
      },
      { new: true, runValidators: true }
    );

    if (!jobDrive) {
      return ApiResponse.error(res, 404, 'Job drive not found');
    }

    ApiResponse.success(res, 200, 'Job drive updated successfully', jobDrive);
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to update job drive', error.message);
  }
};

export const deleteJobDrive = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const jobDrive = await JobDrive.findByIdAndDelete(id);
    if (!jobDrive) {
      return ApiResponse.error(res, 404, 'Job drive not found');
    }

    ApiResponse.success(res, 200, 'Job drive deleted successfully');
  } catch (error: any) {
    ApiResponse.error(res, 500, 'Failed to delete job drive', error.message);
  }
};
