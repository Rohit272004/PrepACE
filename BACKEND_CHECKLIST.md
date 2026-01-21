# Backend Setup Checklist

## Pre-Setup Requirements
- [ ] Node.js (v16 or higher) installed
- [ ] npm or yarn package manager
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Git configured
- [ ] Code editor (VS Code recommended)

## Installation Steps

### Step 1: Navigate to Backend Directory
- [ ] Open terminal/command prompt
- [ ] Run: `cd backend`
- [ ] Verify you're in the backend folder

### Step 2: Install Dependencies
- [ ] Run: `npm install`
- [ ] Wait for installation to complete
- [ ] Check for any warnings or errors
- [ ] Verify `node_modules` folder created

### Step 3: Environment Configuration
- [ ] Ensure `.env.local` file exists in backend folder
- [ ] Review settings in `.env.local`:
  - [ ] PORT=5000 (or your preferred port)
  - [ ] NODE_ENV=development
  - [ ] MONGODB_URI set correctly
  - [ ] JWT_SECRET defined
  - [ ] CORS_ORIGIN points to frontend (http://localhost:5173)

### Step 4: MongoDB Setup
**Option A: Local MongoDB**
- [ ] Install MongoDB Community Edition
- [ ] MongoDB service running
- [ ] Test connection: `mongo` command works
- [ ] Database will auto-create on first connection

**Option B: MongoDB Atlas (Cloud)**
- [ ] Create MongoDB Atlas account
- [ ] Create a cluster
- [ ] Get connection string
- [ ] Update MONGODB_URI in `.env.local`
- [ ] Add current IP to whitelist
- [ ] Database credentials stored securely

### Step 5: Start the Development Server
- [ ] In backend folder, run: `npm run dev`
- [ ] Watch for startup messages:
  - [ ] "✓ MongoDB connected successfully"
  - [ ] "✓ Server running on http://localhost:5000"
  - [ ] "✓ Environment: development"

### Step 6: Verify Server is Running
- [ ] Open browser to http://localhost:5000/api/health
- [ ] Should see: `{"status":"OK","message":"Server is running"}`
- [ ] Check terminal for any errors

## Testing the API

### Using curl
- [ ] Open new terminal window
- [ ] Test register endpoint (see QUICKSTART.md for full command)
- [ ] Test login endpoint
- [ ] Test protected endpoints with token

### Using Postman
- [ ] Install Postman
- [ ] Import API collection (if available)
- [ ] Set base URL to http://localhost:5000/api
- [ ] Test each endpoint group

### Using VS Code REST Client Extension
- [ ] Install REST Client extension
- [ ] Create `test.http` file
- [ ] Add test requests
- [ ] Use "Send Request" button to test

## Project Structure Verification
- [ ] Verify backend folder structure:
  - [ ] src/models/ folder with 6 files
  - [ ] src/controllers/ folder with 6 files
  - [ ] src/routes/ folder with 6 files
  - [ ] src/middleware/ folder with 2 files
  - [ ] src/config/ folder with 2 files
  - [ ] src/utils/ folder with 2 files
  - [ ] src/server.ts exists
- [ ] Configuration files present:
  - [ ] package.json
  - [ ] tsconfig.json
  - [ ] .env.local
  - [ ] .gitignore

## First API Calls to Try

### 1. Register User
- [ ] Test endpoint: POST /api/auth/register
- [ ] Include: name, email, password, cgpa
- [ ] Verify: User created, token returned

### 2. Login User
- [ ] Test endpoint: POST /api/auth/login
- [ ] Include: email, password
- [ ] Verify: Token received
- [ ] Save token for next tests

### 3. Get Profile
- [ ] Test endpoint: GET /api/auth/profile
- [ ] Include: Authorization header with token
- [ ] Verify: User data returned

### 4. Create Quiz
- [ ] Test endpoint: POST /api/quizzes
- [ ] Include: title, subject, questions
- [ ] Verify: Quiz created with ID

### 5. Get Quizzes
- [ ] Test endpoint: GET /api/quizzes
- [ ] Include: Authorization header
- [ ] Verify: Quizzes returned

## Database Verification

### Check MongoDB Collections
```bash
# Connect to MongoDB
mongo

# Select database
use prepace

# List collections
show collections

# Verify data
db.users.find().pretty()
db.quizzes.find().pretty()
```

### Check if Collections Auto-Created
- [ ] Users collection created after first registration
- [ ] Other collections auto-create on first insert
- [ ] Indexes created for performance
- [ ] No errors in MongoDB logs

## Frontend Integration Setup

### Update Frontend API Configuration
- [ ] Locate frontend API configuration file
- [ ] Set API base URL to http://localhost:5000/api
- [ ] Update authentication headers to include token
- [ ] Test API calls from frontend

### Common Frontend Updates Needed
```typescript
// Update API endpoint
const API_BASE_URL = 'http://localhost:5000/api';

// Update fetch calls
const response = await fetch(`${API_BASE_URL}/auth/login`, {...});

// Store and use token
localStorage.setItem('authToken', data.token);

// Include in requests
headers: {
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
}
```

## Troubleshooting Checklist

### Server Won't Start
- [ ] Check if port 5000 is already in use
- [ ] Verify Node.js is installed: `node --version`
- [ ] Check for syntax errors: `npm run build`
- [ ] Review .env.local settings
- [ ] Check MongoDB connection string

### MongoDB Connection Error
- [ ] Verify MongoDB is running
- [ ] Check MONGODB_URI in .env.local
- [ ] Test connection manually: `mongo`
- [ ] Verify database name: `prepace`
- [ ] Check MongoDB Atlas whitelist (if cloud)

### Module Not Found Error
- [ ] Delete node_modules: `rm -rf node_modules`
- [ ] Clear cache: `npm cache clean --force`
- [ ] Reinstall: `npm install`
- [ ] Check for typos in imports

### API Returns 401 Unauthorized
- [ ] Check token format in header
- [ ] Verify token not expired
- [ ] Check JWT_SECRET in .env.local
- [ ] Ensure Authorization header is correct

### CORS Error
- [ ] Check CORS_ORIGIN in .env.local
- [ ] Verify frontend URL matches exactly
- [ ] Check browser console for details
- [ ] Ensure credentials not blocking

## Performance Optimization (Optional)

### Enable Compression
- [ ] Install compression: `npm install compression`
- [ ] Add to server.ts
- [ ] Test with browser DevTools

### Add Request Logging
- [ ] Install morgan: `npm install morgan @types/morgan`
- [ ] Add request logging middleware
- [ ] Check /logs directory for logs

### Optimize Database Queries
- [ ] Review slow queries in MongoDB
- [ ] Add indexes for frequently queried fields
- [ ] Consider pagination for large results
- [ ] Use projections to limit returned fields

## Security Checklist

### Development (Current)
- [ ] ✅ JWT authentication implemented
- [ ] ✅ Password hashing with bcryptjs
- [ ] ✅ Environment variables protected
- [ ] ✅ CORS configured
- [ ] ✅ Input validation via Mongoose

### Before Production
- [ ] Change JWT_SECRET to strong random value
- [ ] Use HTTPS instead of HTTP
- [ ] Enable rate limiting
- [ ] Add request validation middleware
- [ ] Set up logging and monitoring
- [ ] Configure MongoDB with authentication
- [ ] Use environment-specific configs
- [ ] Add security headers middleware
- [ ] Implement API versioning
- [ ] Set up automated backups

## Deployment Checklist (When Ready)

### Prerequisites
- [ ] All development tests pass
- [ ] No console errors
- [ ] API endpoints documented
- [ ] Frontend integrated and tested
- [ ] Database properly configured

### Deployment Steps
- [ ] Choose hosting platform (Heroku, AWS, DigitalOcean, etc.)
- [ ] Set production environment variables
- [ ] Configure MongoDB Atlas for production
- [ ] Build project: `npm run build`
- [ ] Test build locally: `npm start`
- [ ] Deploy code to hosting
- [ ] Monitor application
- [ ] Set up automated restarts (PM2)
- [ ] Configure custom domain
- [ ] Set up SSL certificate

## Documentation Review

- [ ] Read README.md for full documentation
- [ ] Review API.md for endpoint details
- [ ] Check QUICKSTART.md for setup help
- [ ] Understand ARCHITECTURE.md for design
- [ ] Review BACKEND_SUMMARY.md for overview

## Next Steps After Setup

1. **Immediate**
   - [ ] Run development server
   - [ ] Test basic API endpoints
   - [ ] Verify database connectivity

2. **Short Term**
   - [ ] Connect frontend to backend
   - [ ] Test full user registration flow
   - [ ] Test all CRUD operations

3. **Medium Term**
   - [ ] Add input validation improvements
   - [ ] Implement rate limiting
   - [ ] Set up logging system
   - [ ] Add automated tests

4. **Long Term**
   - [ ] Deploy to production
   - [ ] Set up monitoring & alerts
   - [ ] Implement caching
   - [ ] Scale infrastructure as needed

## Quick Command Reference

```bash
# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for TypeScript errors
npm run build

# List installed packages
npm list

# Update packages
npm update

# Clean cache
npm cache clean --force
```

## Support Resources

- 📖 [Express.js Documentation](https://expressjs.com/)
- 📖 [MongoDB Documentation](https://docs.mongodb.com/)
- 📖 [Mongoose Documentation](https://mongoosejs.com/)
- 📖 [JWT Introduction](https://jwt.io/introduction)
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 💬 GitHub Issues (if in repository)
- 🐛 Check browser console for client-side errors
- 🔍 Check terminal for server-side errors

---

## Completion Status

- [ ] All prerequisites installed
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] MongoDB running
- [ ] Server started successfully
- [ ] Health check passed
- [ ] Basic API tests passed
- [ ] Frontend integrated
- [ ] Ready for development!

**Backend is ready to use! 🎉**

For quick start: See QUICKSTART.md
For detailed docs: See README.md
For API details: See API.md
