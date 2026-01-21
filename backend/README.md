# Prepace Backend API

A comprehensive Node.js/Express backend server for the Prepace - Placement Preparation Portal.

## Features

- **Authentication**: User registration, login, and JWT-based authentication
- **User Management**: Profile management with roles (Student, Admin, Alumni)
- **Quiz Management**: Create and manage practice quizzes with questions
- **Interview Experiences**: Submit and manage interview experience sharing
- **Job Drives**: Track and apply for job drives/placements
- **Content Management**: Create and manage learning content
- **Resume Management**: Store and score resumes with ATS compatibility

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Language**: TypeScript

## Project Structure

```
backend/
├── src/
│   ├── models/           # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Quiz.ts
│   │   ├── InterviewExperience.ts
│   │   ├── JobDrive.ts
│   │   ├── Content.ts
│   │   └── Resume.ts
│   ├── controllers/      # Route handlers
│   │   ├── authController.ts
│   │   ├── quizController.ts
│   │   ├── experienceController.ts
│   │   ├── jobDriveController.ts
│   │   ├── contentController.ts
│   │   └── resumeController.ts
│   ├── routes/          # API routes
│   │   ├── authRoutes.ts
│   │   ├── quizRoutes.ts
│   │   ├── experienceRoutes.ts
│   │   ├── jobDriveRoutes.ts
│   │   ├── contentRoutes.ts
│   │   └── resumeRoutes.ts
│   ├── middleware/      # Express middleware
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── config/          # Configuration files
│   │   ├── database.ts
│   │   └── env.ts
│   ├── utils/           # Utility functions
│   │   ├── jwt.ts
│   │   └── response.ts
│   └── server.ts        # Entry point
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/prepace
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:5173
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

## Running the Server

### Development Mode
```bash
npm run dev
```
The server will start at `http://localhost:5000` with hot-reload enabled.

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Quizzes
- `POST /api/quizzes` - Create quiz
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz

### Interview Experiences
- `POST /api/experiences` - Submit experience
- `GET /api/experiences` - Get approved experiences
- `GET /api/experiences/user/my-experiences` - Get user's experiences
- `PUT /api/experiences/:id/approve` - Approve experience (admin)
- `PUT /api/experiences/:id/reject` - Reject experience (admin)
- `DELETE /api/experiences/:id` - Delete experience

### Job Drives
- `POST /api/job-drives` - Create job drive
- `GET /api/job-drives` - Get all job drives
- `GET /api/job-drives/:id` - Get job drive details
- `POST /api/job-drives/:id/apply` - Apply for job drive
- `PUT /api/job-drives/:id` - Update job drive
- `DELETE /api/job-drives/:id` - Delete job drive

### Content Management
- `POST /api/content` - Create content
- `GET /api/content/published` - Get published content
- `GET /api/content/user/my-content` - Get user's content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Resume Management
- `POST /api/resumes` - Create resume
- `GET /api/resumes` - Get user's resumes
- `GET /api/resumes/:id` - Get resume by ID
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment (development/production) | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/prepace |
| JWT_SECRET | Secret key for JWT | change-in-production |
| JWT_EXPIRE | JWT expiration time | 7d |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:5173 |
| GEMINI_API_KEY | Google Gemini API key | - |

## Database Models

### User
- id, name, email, password, role, cgpa, preparationStatus
- Roles: Student, Admin, Alumni

### Quiz
- title, subject, description, questions, createdBy, timestamps

### InterviewExperience
- author, company, role, content, status, rating, timestamps
- Status: Pending, Approved, Rejected

### JobDrive
- company, role, minCGPA, deadline, description, applicants, status
- Status: Active, Closed, Completed

### Content
- title, category, content, author, tags, status, timestamps
- Status: Draft, Published, Archived

### Resume
- userId, title, content, lastScored, scoreResult, timestamps

## Error Handling

The backend includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

## Development

### Code Style
- TypeScript for type safety
- Async/await for asynchronous operations
- Middleware pattern for cross-cutting concerns
- MVC architecture for organization

### Testing
Currently no automated tests. You can test endpoints using:
- Postman
- curl
- Thunder Client
- VS Code REST Client

## Deployment

### To Deploy:
1. Set environment variables in production
2. Build the project: `npm run build`
3. Run: `npm start`
4. Use a process manager like PM2 for production

### Docker (Optional)
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

### Port Already in Use
- Change PORT in .env
- Or kill the process using the port

### JWT Errors
- Ensure JWT_SECRET is set in .env
- Check token format (Bearer <token>)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please contact the development team or open an issue in the repository.
