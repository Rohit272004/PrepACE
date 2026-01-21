# API Documentation - Prepace Backend

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints marked with 🔒 require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`
- **Description**: Create a new user account
- **Auth Required**: No
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "Student",
  "cgpa": 8.5
}
```
- **Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Student",
      "cgpa": 8.5
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### 2. Login User
**POST** `/auth/login`
- **Description**: Authenticate user and receive JWT token
- **Auth Required**: No
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response** (200): Same as register

### 3. Get User Profile 🔒
**GET** `/auth/profile`
- **Description**: Retrieve authenticated user's profile
- **Auth Required**: Yes
- **Response** (200):
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student",
    "cgpa": 8.5,
    "preparationStatus": {
      "Google": 75,
      "Amazon": 60
    },
    "createdAt": "2024-01-21T10:30:00Z",
    "updatedAt": "2024-01-21T10:30:00Z"
  }
}
```

### 4. Update User Profile 🔒
**PUT** `/auth/profile`
- **Description**: Update user profile information
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "cgpa": 9.0,
  "preparationStatus": {
    "Google": 80
  }
}
```
- **Response** (200): Updated user object

---

## Quiz Endpoints

### 1. Create Quiz 🔒
**POST** `/quizzes`
- **Description**: Create a new practice quiz
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "title": "Data Structures Basics",
  "subject": "DSA",
  "description": "Basic data structures concepts",
  "questions": [
    {
      "question": "What is a stack?",
      "options": ["LIFO", "FIFO", "LILO", "FILO"],
      "correctAnswer": "LIFO"
    }
  ]
}
```
- **Response** (201): Created quiz object with ID

### 2. Get All Quizzes 🔒
**GET** `/quizzes`
- **Description**: Retrieve all quizzes, optionally filtered by subject
- **Auth Required**: Yes
- **Query Parameters**:
  - `subject` (optional): Filter by subject
- **Response** (200): Array of quiz objects

### 3. Get Quiz by ID 🔒
**GET** `/quizzes/:id`
- **Description**: Retrieve specific quiz with all questions
- **Auth Required**: Yes
- **Response** (200): Quiz object with populated questions

### 4. Update Quiz 🔒
**PUT** `/quizzes/:id`
- **Description**: Update quiz details
- **Auth Required**: Yes
- **Request Body**: Any updatable fields (title, subject, description, questions)
- **Response** (200): Updated quiz object

### 5. Delete Quiz 🔒
**DELETE** `/quizzes/:id`
- **Description**: Delete a quiz
- **Auth Required**: Yes
- **Response** (200): Success message

---

## Interview Experience Endpoints

### 1. Submit Experience 🔒
**POST** `/experiences`
- **Description**: Submit interview experience
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "company": "Google",
  "role": "SDE-1",
  "content": "Round 1: DS & Algo questions...",
  "rating": 4
}
```
- **Response** (201): Created experience object

### 2. Get All Approved Experiences 🔒
**GET** `/experiences`
- **Description**: Retrieve approved interview experiences
- **Auth Required**: Yes
- **Query Parameters**:
  - `company` (optional): Filter by company
  - `status` (optional): Filter by status
- **Response** (200): Array of experience objects

### 3. Get User's Experiences 🔒
**GET** `/experiences/user/my-experiences`
- **Description**: Retrieve all experiences submitted by current user
- **Auth Required**: Yes
- **Response** (200): Array of user's experience objects

### 4. Approve Experience 🔒
**PUT** `/experiences/:id/approve`
- **Description**: Approve a pending experience (Admin only)
- **Auth Required**: Yes
- **Response** (200): Updated experience with status "Approved"

### 5. Reject Experience 🔒
**PUT** `/experiences/:id/reject`
- **Description**: Reject a pending experience (Admin only)
- **Auth Required**: Yes
- **Response** (200): Updated experience with status "Rejected"

### 6. Delete Experience 🔒
**DELETE** `/experiences/:id`
- **Description**: Delete an experience
- **Auth Required**: Yes
- **Response** (200): Success message

---

## Job Drive Endpoints

### 1. Create Job Drive 🔒
**POST** `/job-drives`
- **Description**: Create a new job drive/placement
- **Auth Required**: Yes (Admin)
- **Request Body**:
```json
{
  "company": "Microsoft",
  "role": "Software Engineer",
  "minCGPA": 7.5,
  "deadline": "2024-02-28T23:59:59Z",
  "description": "Internship + PPO opportunity",
  "status": "Active"
}
```
- **Response** (201): Created job drive object

### 2. Get All Job Drives 🔒
**GET** `/job-drives`
- **Description**: Retrieve all job drives
- **Auth Required**: Yes
- **Query Parameters**:
  - `status` (optional): Active, Closed, Completed
  - `company` (optional): Filter by company
- **Response** (200): Array of job drive objects with applicants

### 3. Get Job Drive Details 🔒
**GET** `/job-drives/:id`
- **Description**: Get detailed information about a job drive
- **Auth Required**: Yes
- **Response** (200): Job drive object with all applicants

### 4. Apply for Job Drive 🔒
**POST** `/job-drives/:id/apply`
- **Description**: Apply for a job drive
- **Auth Required**: Yes
- **Response** (200): Updated job drive with user added to applicants

### 5. Update Job Drive 🔒
**PUT** `/job-drives/:id`
- **Description**: Update job drive details
- **Auth Required**: Yes (Admin)
- **Request Body**: Any updatable fields
- **Response** (200): Updated job drive object

### 6. Delete Job Drive 🔒
**DELETE** `/job-drives/:id`
- **Description**: Delete a job drive
- **Auth Required**: Yes (Admin)
- **Response** (200): Success message

---

## Content Management Endpoints

### 1. Create Content 🔒
**POST** `/content`
- **Description**: Create new learning content
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "title": "Introduction to Recursion",
  "category": "DSA",
  "content": "Recursion is a programming technique...",
  "tags": ["recursion", "dsa", "basics"],
  "status": "Draft"
}
```
- **Response** (201): Created content object

### 2. Get Published Content 🔒
**GET** `/content/published`
- **Description**: Retrieve all published content
- **Auth Required**: Yes
- **Query Parameters**:
  - `category` (optional): Filter by category
  - `tags` (optional): Filter by tags (comma-separated)
- **Response** (200): Array of published content

### 3. Get User's Content 🔒
**GET** `/content/user/my-content`
- **Description**: Retrieve all content created by user
- **Auth Required**: Yes
- **Response** (200): Array of user's content objects

### 4. Update Content 🔒
**PUT** `/content/:id`
- **Description**: Update content
- **Auth Required**: Yes
- **Request Body**: Any updatable fields
- **Response** (200): Updated content object

### 5. Delete Content 🔒
**DELETE** `/content/:id`
- **Description**: Delete content
- **Auth Required**: Yes
- **Response** (200): Success message

---

## Resume Management Endpoints

### 1. Create Resume 🔒
**POST** `/resumes`
- **Description**: Create a new resume
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "title": "Software Engineer Resume",
  "content": "## John Doe\n### Skills\n- Python\n- JavaScript..."
}
```
- **Response** (201): Created resume object

### 2. Get All User Resumes 🔒
**GET** `/resumes`
- **Description**: Retrieve all resumes of current user
- **Auth Required**: Yes
- **Response** (200): Array of resume objects

### 3. Get Resume by ID 🔒
**GET** `/resumes/:id`
- **Description**: Retrieve specific resume
- **Auth Required**: Yes
- **Response** (200): Resume object with content

### 4. Update Resume 🔒
**PUT** `/resumes/:id`
- **Description**: Update resume or add ATS score
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "title": "Updated Resume",
  "content": "...",
  "scoreResult": "85% match - Great fit for role"
}
```
- **Response** (200): Updated resume object

### 5. Delete Resume 🔒
**DELETE** `/resumes/:id`
- **Description**: Delete a resume
- **Auth Required**: Yes
- **Response** (200): Success message

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": { ... }
}
```

### Common Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

### Example Error Responses

**Validation Error (400)**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["Email is required", "Password must be at least 6 characters"]
}
```

**Authentication Error (401)**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Not Found (404)**
```json
{
  "success": false,
  "message": "Quiz not found"
}
```

---

## Rate Limiting
Currently no rate limiting is implemented. Consider adding in production.

## Pagination
Currently no pagination is implemented. Limit results in frontend or add pagination endpoints.

## Sorting
Results are sorted by creation date (newest first) by default.
