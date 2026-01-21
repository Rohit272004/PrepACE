import { Router } from 'express';
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from '../controllers/resumeController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createResume);
router.get('/', authMiddleware, getResumes);
router.get('/:id', authMiddleware, getResumeById);
router.put('/:id', authMiddleware, updateResume);
router.delete('/:id', authMiddleware, deleteResume);

export default router;
