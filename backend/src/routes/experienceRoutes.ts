import { Router } from 'express';
import {
  createExperience,
  getExperiences,
  getUserExperiences,
  approveExperience,
  rejectExperience,
  deleteExperience,
} from '../controllers/experienceController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createExperience);
router.get('/', authMiddleware, getExperiences);
router.get('/user/my-experiences', authMiddleware, getUserExperiences);
router.put('/:id/approve', authMiddleware, approveExperience);
router.put('/:id/reject', authMiddleware, rejectExperience);
router.delete('/:id', authMiddleware, deleteExperience);

export default router;
