import { Router } from 'express';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createQuiz);
router.get('/', authMiddleware, getQuizzes);
router.get('/:id', authMiddleware, getQuizById);
router.put('/:id', authMiddleware, updateQuiz);
router.delete('/:id', authMiddleware, deleteQuiz);

export default router;
