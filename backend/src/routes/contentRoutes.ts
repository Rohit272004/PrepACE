import { Router } from 'express';
import {
  createContent,
  getPublishedContent,
  getUserContent,
  updateContent,
  deleteContent,
} from '../controllers/contentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createContent);
router.get('/published', authMiddleware, getPublishedContent);
router.get('/user/my-content', authMiddleware, getUserContent);
router.put('/:id', authMiddleware, updateContent);
router.delete('/:id', authMiddleware, deleteContent);

export default router;
