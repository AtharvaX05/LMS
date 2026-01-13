# LSFI Platform - Backend Setup

## Overview

The backend is built with Express.js, TypeScript, PostgreSQL, and provides authentication, document management, and LSFI data APIs.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- Git

## Installation

### 1. Setup PostgreSQL Database

```bash
# Create a new PostgreSQL database
createdb lsfi_db

# Or using psql:
psql
CREATE DATABASE lsfi_db;
\q
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Update `backend/.env` with your PostgreSQL credentials:

```env
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lsfi_db
JWT_SECRET=lsfi-super-secret-key-change-in-production
NODE_ENV=development
UPLOAD_FOLDER=./uploads
```

### 4. Initialize Database Tables

The database will be initialized automatically when the server starts. The following tables are created:

- **users** - User accounts with authentication
- **documents** - Uploaded documents for verification
- **lsfi_scores** - LSFI scores and factors for each user
- **audit_trail** - Activity log

## Running the Backend

### Development Mode

```bash
npm run dev
```

This starts the server on `http://localhost:3001` with hot reload.

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Create a new user account

Request:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1-555-000-0000"
}
```

Response:
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "borrower",
    "verification_status": "pending"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/auth/login`
Login with credentials

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "borrower",
    "verification_status": "pending"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/api/auth/me`
Get current user info (requires authentication)

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "borrower",
    "verification_status": "pending"
  },
  "lsfiScore": {
    "id": 1,
    "user_id": 1,
    "score": 75,
    "status": "Pending",
    "debt_to_income": 40,
    "payment_history": 85,
    "loan_diversity": 70,
    "credit_utilization": 60,
    "income_stability": 80
  }
}
```

#### POST `/api/auth/logout`
Logout (requires authentication)

Headers:
```
Authorization: Bearer <token>
```

### Documents

#### POST `/api/documents/upload`
Upload a document (requires authentication)

Form Data:
- `document` (file) - The document file (PDF, JPEG, PNG, DOC)
- `document_type` (string) - Type of document (identity, income, address, bank_statement, employment, other)

Headers:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

Response:
```json
{
  "message": "Document uploaded successfully",
  "document": {
    "id": 1,
    "user_id": 1,
    "document_type": "identity",
    "file_name": "passport.pdf",
    "file_path": "backend/uploads/user_1/1234567890_passport.pdf",
    "verification_status": "pending",
    "uploaded_at": "2024-01-13T10:30:00Z"
  }
}
```

#### GET `/api/documents/my-documents`
Get all documents for current user (requires authentication)

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "documents": [
    {
      "id": 1,
      "user_id": 1,
      "document_type": "identity",
      "file_name": "passport.pdf",
      "file_path": "backend/uploads/user_1/1234567890_passport.pdf",
      "verification_status": "pending",
      "uploaded_at": "2024-01-13T10:30:00Z"
    }
  ]
}
```

#### GET `/api/documents/:id/download`
Download a document (requires authentication)

Headers:
```
Authorization: Bearer <token>
```

## Database Schema

### users table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'borrower',
  status VARCHAR(50) DEFAULT 'active',
  verification_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### documents table
```sql
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  verification_status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP,
  verified_by VARCHAR(100)
);
```

### lsfi_scores table
```sql
CREATE TABLE lsfi_scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  score DECIMAL(5,2) DEFAULT 85.00,
  status VARCHAR(50) DEFAULT 'Stable',
  debt_to_income DECIMAL(5,2) DEFAULT 35.5,
  payment_history DECIMAL(5,2) DEFAULT 92.3,
  loan_diversity DECIMAL(5,2) DEFAULT 78.5,
  credit_utilization DECIMAL(5,2) DEFAULT 65.0,
  income_stability DECIMAL(5,2) DEFAULT 88.2,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts           # PostgreSQL connection
│   ├── database/
│   │   └── init.ts               # Database initialization
│   ├── models/
│   │   ├── User.ts               # User model and queries
│   │   ├── Document.ts           # Document model and queries
│   │   └── LSFIScore.ts           # LSFI score model and queries
│   ├── middleware/
│   │   └── auth.ts               # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.ts               # Authentication endpoints
│   │   └── documents.ts          # Document endpoints
│   ├── utils/
│   │   └── jwt.ts                # JWT token generation/verification
│   └── server.ts                 # Express app setup
├── uploads/                      # Uploaded documents storage
├── package.json
├── tsconfig.json
├── .env
└── .env.example
```

## Features

### Authentication
- User signup with email, password, name, and phone
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Automatic LSFI score initialization for new borrowers

### Document Management
- Upload documents with type classification
- File validation (size, type)
- Automatic document verification status tracking
- Download uploaded documents
- User-specific document listing

### LSFI Scoring
- Automatic LSFI score creation for new borrowers
- Track 5 LSFI factors:
  - Debt-to-Income Ratio
  - Payment History
  - Loan Diversity
  - Credit Utilization
  - Income Stability

### Security
- CORS enabled for frontend on `http://localhost:3000`
- JWT authentication on protected endpoints
- Password hashing with bcryptjs
- Request validation
- SQL injection prevention with parameterized queries

## Development

### Hot Reload
The development server uses `ts-node` for automatic reloading on file changes.

```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env` matches your PostgreSQL credentials
- Try connecting with `psql -U postgres -h localhost`

### Port Already in Use
- Change `PORT` in `.env` to an available port
- Or kill the process using port 3001: `lsof -ti:3001 | xargs kill -9`

### File Upload Errors
- Check `UPLOAD_FOLDER` exists and has write permissions
- Verify file size is under 10MB
- Supported formats: PDF, JPEG, PNG, DOC, DOCX

## Next Steps

1. [Run the Frontend](../README.md#running-the-application)
2. [Create User Accounts](#api-endpoints)
3. [Upload Documents](#documents)
4. [Monitor LSFI Scores](#database-schema)

## Support

For issues or questions, refer to:
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
