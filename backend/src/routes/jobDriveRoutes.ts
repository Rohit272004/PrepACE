import { Router } from 'express';
import {
  createJobDrive,
  getJobDrives,
  getJobDriveById,
  applyForJobDrive,
  updateJobDrive,
  deleteJobDrive,
} from '../controllers/jobDriveController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createJobDrive);
router.get('/', authMiddleware, getJobDrives);
router.get('/:id', authMiddleware, getJobDriveById);
router.post('/:id/apply', authMiddleware, applyForJobDrive);
router.put('/:id', authMiddleware, updateJobDrive);
router.delete('/:id', authMiddleware, deleteJobDrive);

export default router;
