# Quick Start Guide - Backend Setup

## 📋 Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
The `.env.local` file is already set up for local development. If you need to change settings:
```bash
cp .env.example .env.local
# Edit .env.local with your settings
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Update `MONGODB_URI` in `.env.local` with your connection string
- Example: `mongodb+srv://username:password@cluster0.mongodb.net/prepace`

### 4. Start the Server
```bash
npm run dev
```

✅ Server will start at `http://localhost:5000`

Health check: Visit `http://localhost:5000/api/health`

## 📡 Testing the API

### Using curl:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "cgpa": 8.5
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Profile (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman:
1. Import the API collection (see API.md for endpoints)
2. Set base URL: `http://localhost:5000/api`
3. Use the provided examples to test endpoints

### Using VS Code REST Client:
Create a `test.http` file:
```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "cgpa": 8.5
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🔧 Available Scripts

```bash
# Development mode (with hot reload)
npm run dev

# Build TypeScript
npm run build

# Production mode
npm start

# Linting (setup required)
npm run lint
```

## 📚 API Endpoints Summary

| Feature | Endpoint | Method |
|---------|----------|--------|
| Register | `/auth/register` | POST |
| Login | `/auth/login` | POST |
| Profile | `/auth/profile` | GET/PUT |
| Quizzes | `/quizzes` | GET/POST/PUT/DELETE |
| Experiences | `/experiences` | GET/POST |
| Job Drives | `/job-drives` | GET/POST |
| Content | `/content` | GET/POST |
| Resumes | `/resumes` | GET/POST |

See `API.md` for complete documentation.

## 🐛 Troubleshooting

### Port 5000 already in use?
```bash
# Change PORT in .env.local to 5001 or similar
PORT=5001
```

### MongoDB connection error?
- Verify MongoDB is running: `mongod`
- Check MONGODB_URI in .env.local
- Test connection: `mongo` (MongoDB CLI)

### Module not found?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear database
```bash
# Connect to MongoDB
mongo

# In MongoDB shell
use prepace
db.dropDatabase()
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Business logic
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth, error handling
│   ├── config/           # Config files
│   ├── utils/            # Helper functions
│   └── server.ts         # Entry point
├── dist/                 # Compiled JS
├── .env.local           # Local config
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── README.md            # Full documentation
└── API.md               # API documentation
```

## 🔐 Security Notes

- Never commit `.env.local` to git (it's in .gitignore)
- Change `JWT_SECRET` in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Add rate limiting for production
- Validate all inputs

## 🚀 Next Steps

1. **Connect Frontend**: Update frontend API calls to `http://localhost:5000/api`
2. **Add Tests**: Create unit/integration tests
3. **Database Indexing**: Add indexes for frequently queried fields
4. **Caching**: Implement Redis for caching
5. **Logging**: Add logging system (Winston, Pino)
6. **Deployment**: Deploy to Heroku, AWS, or similar

## 📖 Further Reading

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💬 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review `README.md` for detailed documentation
3. Check MongoDB logs: `mongod`
4. Check server logs in terminal
5. Use browser DevTools for frontend issues

Happy coding! 🎉
