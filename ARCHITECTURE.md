# Backend Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                            │
│                  http://localhost:5173                               │
└────────────────────────────────┬──────────────────────────────────────┘
                                 │
                        HTTP Requests/Responses
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND SERVER                               │
│                    http://localhost:5000                             │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                       Express Server                         │  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │         MIDDLEWARE LAYER                           │   │  │
│  │  │  • CORS handling                                   │   │  │
│  │  │  • JSON parsing                                    │   │  │
│  │  │  • Authentication (JWT)                            │   │  │
│  │  │  • Error handling                                  │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  │                                                               │  │
│  │  ┌──────────────────────────────────────────────────────┐   │  │
│  │  │            ROUTING LAYER                            │   │  │
│  │  │  ┌─────────────┬──────────────┬──────────────┐    │   │  │
│  │  │  │ Auth Routes │ Quiz Routes  │ Exp Routes   │    │   │  │
│  │  │  ├─────────────┼──────────────┼──────────────┤    │   │  │
│  │  │  │ Job Drives  │ Content Routes │ Resume Routes │    │   │  │
│  │  │  └─────────────┴──────────────┴──────────────┘    │   │  │
│  │  │                                                      │   │  │
│  │  └──────────────────────────────────────────────────────┘   │  │
│  │                                                               │  │
│  │  ┌──────────────────────────────────────────────────────┐   │  │
│  │  │          CONTROLLER LAYER                           │   │  │
│  │  │  • Business logic                                   │   │  │
│  │  │  • Request validation                               │   │  │
│  │  │  • Database operations                              │   │  │
│  │  │  • Response formatting                              │   │  │
│  │  └──────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │           DATABASE LAYER (Mongoose Models)                  │  │
│  │  ┌─────────┬─────────┬──────────┬──────────┬──────────┬────┐ │  │
│  │  │  User   │  Quiz   │  Exp     │ JobDrive │ Content  │Res │ │  │
│  │  │ Schema  │ Schema  │ Schema   │ Schema   │ Schema   │Sch │ │  │
│  │  └─────────┴─────────┴──────────┴──────────┴──────────┴────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                        MongoDB Connection
                                 │
                                 ▼
        ┌─────────────────────────────────────────┐
        │         MONGODB DATABASE                │
        │      mongodb://localhost:27017/prepace  │
        │                                         │
        │  • Collections for all models           │
        │  • Indexes for performance              │
        │  • Data persistence                     │
        └─────────────────────────────────────────┘
```

## Request-Response Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                           REQUEST FLOW                               │
└─────────────────────────────────────────────────────────────────────┘

1. CLIENT REQUEST
   └─> POST /api/auth/login
       ├─ Headers: Content-Type: application/json
       └─ Body: { email, password }

2. SERVER RECEIVES REQUEST
   └─> Express captures request

3. MIDDLEWARE PROCESSING
   ├─ CORS Middleware: Check origin
   ├─ Body Parser: Parse JSON
   ├─ Auth Middleware: Verify JWT (if needed)
   └─ Error Handler: Catch errors

4. ROUTING
   └─> Route matches /api/auth/login
       └─> Calls loginController

5. CONTROLLER LOGIC
   ├─ Validate input
   ├─ Find user in database
   ├─ Compare password
   ├─ Generate JWT token
   └─ Prepare response

6. DATABASE INTERACTION
   ├─> Mongoose query User model
   ├─> Execute MongoDB operation
   └─> Return user document

7. RESPONSE GENERATION
   ├─ Format response data
   ├─ Set HTTP status code
   └─ Add headers

8. CLIENT RECEIVES RESPONSE
   └─> 200 OK
       ├─ Content-Type: application/json
       └─ Body: { success, message, data, token }
```

## API Request Flow - Example

```
Register New User:

Frontend                          Backend                      Database
   │                                │                              │
   │─── POST /api/auth/register ──>│                              │
   │     { name, email, pw... }    │                              │
   │                                │─ Validate input              │
   │                                │─ Check duplicate email       │
   │                                │─> Query User collection      │
   │                                │<─ No existing user           │
   │                                │─ Hash password               │
   │                                │─> Insert new user            │
   │                                │<─ User created (with ID)     │
   │                                │─ Generate JWT token          │
   │                                │─ Format response             │
   │<── 201 Created ────────────────│                              │
   │    { user, token }             │                              │
   │                                │                              │
```

## Data Model Relationships

```
                          ┌─────────────────┐
                          │      User       │
                          │  (auth, profile)│
                          └────────┬────────┘
                                   │
                 ┌─────────────────┼─────────────────┐
                 │                 │                 │
                 ▼                 ▼                 ▼
          ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
          │   Quiz      │   │ Exp          │   │ JobDrive     │
          │ (created by)│   │ (submitted   │   │ (applies to) │
          └─────────────┘   │  by)         │   └──────────────┘
                             └──────────────┘
                                   │
                        ┌──────────┴──────────┐
                        │                     │
                        ▼                     ▼
                    ┌─────────┐          ┌──────────┐
                    │ Content │          │  Resume  │
                    │(authored)          │ (owned)  │
                    └─────────┘          └──────────┘
```

## API Endpoint Organization

```
Authentication Routes
├── POST   /api/auth/register        (public)
├── POST   /api/auth/login           (public)
├── GET    /api/auth/profile         (protected)
└── PUT    /api/auth/profile         (protected)

Quiz Routes
├── POST   /api/quizzes              (protected)
├── GET    /api/quizzes              (protected)
├── GET    /api/quizzes/:id          (protected)
├── PUT    /api/quizzes/:id          (protected)
└── DELETE /api/quizzes/:id          (protected)

Experience Routes
├── POST   /api/experiences          (protected)
├── GET    /api/experiences          (protected)
├── GET    /api/experiences/user/my-experiences  (protected)
├── PUT    /api/experiences/:id/approve          (protected/admin)
├── PUT    /api/experiences/:id/reject           (protected/admin)
└── DELETE /api/experiences/:id      (protected)

Job Drive Routes
├── POST   /api/job-drives           (protected/admin)
├── GET    /api/job-drives           (protected)
├── GET    /api/job-drives/:id       (protected)
├── POST   /api/job-drives/:id/apply (protected)
├── PUT    /api/job-drives/:id       (protected/admin)
└── DELETE /api/job-drives/:id       (protected/admin)

Content Routes
├── POST   /api/content              (protected)
├── GET    /api/content/published    (protected)
├── GET    /api/content/user/my-content  (protected)
├── PUT    /api/content/:id          (protected)
└── DELETE /api/content/:id          (protected)

Resume Routes
├── POST   /api/resumes              (protected)
├── GET    /api/resumes              (protected)
├── GET    /api/resumes/:id          (protected)
├── PUT    /api/resumes/:id          (protected)
└── DELETE /api/resumes/:id          (protected)
```

## Authentication Flow

```
                    NO TOKEN              WITH TOKEN
                        │                      │
        POST /login ────►│                      │
           │             │                      │
           ├─ Validate   │                      │
           ├─ Hash check │                      │◄──── GET /profile
           ├─ Generate   │                      │        │
           │  JWT        │                      │        └─ Check token
           │             │                      │           │
        ◄──────────────────────────────────────────────────────┘
          │ Token                             │ Valid
          │ Returned                          │ Token
          │                                   │
          └──────────────────────────────────►│
                                              │
                                    Store in localStorage
                                              │
                              Include in Authorization header
                              for all subsequent requests
```

## Error Handling Flow

```
Request Received
   │
   ├─ Input Validation
   │  ├─ Valid     ──> Continue
   │  └─ Invalid   ──> 400 Bad Request
   │
   ├─ Authentication Check
   │  ├─ Token OK  ──> Continue
   │  └─ Token Bad ──> 401 Unauthorized
   │
   ├─ Database Operation
   │  ├─ Success  ──> Continue
   │  └─ Error    ──> Handle (400/404/500)
   │
   ├─ Authorization Check
   │  ├─ Allowed  ──> Continue
   │  └─ Denied   ──> 403 Forbidden
   │
   └─ Response Formation
      └─> Send formatted response
          { success, message, data/errors }
```

## Deployment Architecture (Example)

```
┌────────────────────────────────────────────────────────┐
│                  PRODUCTION ENVIRONMENT               │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────────────────────────────────────────┐│
│  │         FRONTEND (Next.js/Vite)                 ││
│  │    Deployed to Vercel/Netlify/AWS S3            ││
│  └──────────────────────────────────────────────────┘│
│                      │                                 │
│             HTTPS/REST API Calls                      │
│                      │                                 │
│  ┌──────────────────────────────────────────────────┐│
│  │   BACKEND (Node.js/Express on AWS/Heroku)       ││
│  │  ├─ Load Balancer (for scaling)                 ││
│  │  ├─ API Server (PM2 process manager)            ││
│  │  ├─ Rate Limiter (redis)                        ││
│  │  └─ Logger (Winston/Pino)                       ││
│  └──────────────────────────────────────────────────┘│
│                      │                                 │
│          Secure MongoDB Connection                    │
│                      │                                 │
│  ┌──────────────────────────────────────────────────┐│
│  │   DATABASE (MongoDB Atlas Cloud)                 ││
│  │  ├─ Replication (high availability)              ││
│  │  ├─ Automated backups                            ││
│  │  ├─ Monitoring & alerts                          ││
│  │  └─ Performance indexing                         ││
│  └──────────────────────────────────────────────────┘│
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Technology Stack

```
┌──────────────────────────────────────────┐
│         PREPACE BACKEND STACK             │
├──────────────────────────────────────────┤
│                                          │
│  Runtime Environment                     │
│  └─ Node.js v16+                         │
│                                          │
│  Web Framework                           │
│  └─ Express.js v4.18                     │
│                                          │
│  Database                                │
│  ├─ MongoDB (Document database)          │
│  └─ Mongoose (ODM)                       │
│                                          │
│  Authentication                          │
│  ├─ JWT (jsonwebtoken)                   │
│  └─ bcryptjs (Password hashing)          │
│                                          │
│  Development                             │
│  ├─ TypeScript (Type safety)             │
│  ├─ tsx (TS execution)                   │
│  └─ ts-node (TS node runner)             │
│                                          │
│  Utilities                               │
│  ├─ cors (Cross-origin)                  │
│  ├─ dotenv (Environment vars)            │
│  ├─ validator (Input validation)         │
│  └─ express (Additional middleware)      │
│                                          │
└──────────────────────────────────────────┘
```

---

**This architecture is:**
- ✅ Scalable - Modular structure
- ✅ Secure - JWT auth, password hashing
- ✅ Maintainable - TypeScript, clear separation of concerns
- ✅ Testable - Controller-based logic
- ✅ Production-ready - Error handling, logging support
