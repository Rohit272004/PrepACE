import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import { config } from './config/env';
import { errorHandler } from './middleware/errorHandler';

// Routes
import authRoutes from './routes/authRoutes';
import quizRoutes from './routes/quizRoutes';
import experienceRoutes from './routes/experienceRoutes';
import jobDriveRoutes from './routes/jobDriveRoutes';
import contentRoutes from './routes/contentRoutes';
import resumeRoutes from './routes/resumeRoutes';

const app: Express = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/job-drives', jobDriveRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/resumes', resumeRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    const PORT = config.port || 5000;
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Environment: ${config.nodeEnv}`);
      console.log(`✓ CORS Origin: ${config.corsOrigin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
