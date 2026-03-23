# LSFI Platform - Loan Stability & Fairness Index

A comprehensive web-based platform for monitoring loan health and fairness metrics. The LSFI Platform provides role-based interfaces for borrowers, bank officers, and compliance personnel with real-time LSFI score monitoring and document verification.

## ✨ Key Features

### 🏦 For Borrowers
- **Real-time LSFI Score**: Monitor your Loan Stability & Fairness Index
- **Loan Dashboard**: View loan details, status, and metrics
- **Document Verification**: Upload and verify identity, income, and address documents
- **Repayment Schedule**: Track payment history and upcoming payments
- **Risk Analysis**: Understand affordability metrics and risk factors
- **User Account**: Create personal account with email verification

### 👔 For Bank Officers
- **Portfolio Management**: Monitor all loans and risk distribution
- **Risk Heatmap**: Visual analysis of portfolio risk levels
- **Scenario Testing**: Test impact of interest rate changes
- **Approval Workflow**: Manage pending loan approvals
- **Detailed Analytics**: In-depth LSFI factor analysis

### ✅ For Compliance Officers
- **Audit Trail**: Track all system actions and data changes
- **Governance Controls**: Monitor regulatory compliance
- **Data Security**: Verify encryption and protection standards

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 3.2** - Styling
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Express.js** - Server framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **bcryptjs** - Password hashing
- **JWT** - Authentication
- **Multer** - File uploads
- **CORS** - Cross-origin requests

## 📋 Prerequisites

- Node.js 18+
- npm 10+
- PostgreSQL 12+

## 🚀 Quick Start

### 1. Setup Frontend

```bash
# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
EOF
```

### 2. Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lsfi_db
JWT_SECRET=lsfi-super-secret-key-change-in-production
NODE_ENV=development
UPLOAD_FOLDER=./uploads
EOF

# Back to root
cd ..
```

### 3. Setup PostgreSQL Database

```bash
# Create database
createdb lsfi_db

# Optional: Verify connection
psql -U postgres -d lsfi_db
```

### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
# Server running on http://localhost:3001
```

**Terminal 2 - Start Frontend:**
```bash
npm start
# Application opens on http://localhost:3000
```

## 📝 Demo Accounts

The following demo accounts are pre-configured in the database (created automatically on first backend startup):

| Role | Email | Password |
|------|-------|----------|
| Borrower | borrower@lsfi.com | password123 |
| Bank Officer | officer@lsfi.com | password123 |
| Compliance | compliance@lsfi.com | password123 |

## 🔐 User Registration

You can also create a new borrower account directly through the signup page:

1. Click "Create one now" on the login page
2. Fill in your details (Name, Email, Phone, Password)
3. Submit the form
4. You'll be logged in and taken to the borrower dashboard
5. Upload documents for verification

## 📂 Project Structure

```
lsfi-platform/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── borrower/            # Borrower-specific components
│   │   ├── bank-officer/        # Bank officer components
│   │   ├── compliance/          # Compliance components
│   │   └── common/              # Shared components
│   ├── pages/                   # Page components
│   │   ├── Login.tsx            # Login page
│   │   ├── Signup.tsx           # Signup page
│   │   ├── BorrowerDashboard.tsx
│   │   ├── BankDashboard.tsx
│   │   └── ComplianceDashboard.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   └── useLSFI.ts           # LSFI data hook
│   ├── services/                # API services
│   │   ├── api.ts               # Axios configuration
│   │   ├── authService.ts       # Auth API calls
│   │   ├── loanService.ts       # Loan data API
│   │   └── lsfiService.ts       # LSFI calculations
│   ├── store/                   # Context providers
│   │   ├── AuthContext.tsx      # Auth context
│   │   └── LSFIStateContext.tsx # LSFI state context
│   ├── assets/                  # Static assets
│   │   ├── images/
│   │   └── styles/
│   └── utils/                   # Utility functions
│
├── backend/                      # Backend source code
│   ├── src/
│   │   ├── config/              # Configuration
│   │   │   └── database.ts      # PostgreSQL connection
│   │   ├── database/            # Database setup
│   │   │   └── init.ts          # Initialize tables
│   │   ├── models/              # Database models
│   │   │   ├── User.ts
│   │   │   ├── Document.ts
│   │   │   └── LSFIScore.ts
│   │   ├── routes/              # API routes
│   │   │   ├── auth.ts          # Auth endpoints
│   │   │   └── documents.ts     # Document endpoints
│   │   ├── middleware/          # Express middleware
│   │   │   └── auth.ts          # JWT auth
│   │   ├── utils/               # Utilities
│   │   │   └── jwt.ts           # JWT helpers
│   │   └── server.ts            # Express app
│   ├── uploads/                 # Uploaded files
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── BACKEND_SETUP.md
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md
└── SETUP.sh
```

## 🔄 Key Workflows

### Borrower Login & Dashboard
1. User logs in with email and password
2. Authentication via JWT token
3. Dashboard loads with personalized LSFI score
4. User can upload documents for verification
5. LSFI score updates based on verification status

### Document Upload
1. Borrower clicks "Document Verification" tab
2. Selects document type and file
3. Uploads document (PDF/JPEG/PNG/DOC)
4. System stores file and sets verification status to "pending"
5. Compliance officer reviews and updates status

### LSFI Score Calculation
The LSFI score is based on 5 factors:
- **Debt-to-Income Ratio**: Measures affordability
- **Payment History**: Tracks on-time payments
- **Loan Diversity**: Number of different loan types
- **Credit Utilization**: Credit usage ratio
- **Income Stability**: Employment consistency

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/me` - Get current user data
- `POST /api/auth/logout` - Logout

### Documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/my-documents` - List user documents
- `GET /api/documents/:id` - Get document details
- `GET /api/documents/:id/download` - Download document

See [Backend Setup Guide](./backend/BACKEND_SETUP.md) for detailed API documentation.

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS**: Enabled for localhost:3000
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **File Upload Validation**: Size and type checking
- **HTTPS Ready**: Environment-specific configurations

## 📊 Database Schema

### users
- id (Primary Key)
- email (Unique)
- password (Hashed)
- first_name, last_name
- phone
- role (borrower, bank-officer, compliance)
- status, verification_status
- created_at, updated_at

### documents
- id (Primary Key)
- user_id (Foreign Key → users)
- document_type
- file_name, file_path
- verification_status (pending, verified, rejected)
- uploaded_at, verified_at
- verified_by, notes

### lsfi_scores
- id (Primary Key)
- user_id (Foreign Key → users)
- score, status
- debt_to_income, payment_history, loan_diversity
- credit_utilization, income_stability
- updated_at

### audit_trail
- id (Primary Key)
- user_id (Foreign Key → users)
- action, details
- ip_address
- created_at

## 🧪 Testing

### Frontend
```bash
npm test
```

### Backend
```bash
cd backend
npm test
```

## 📈 Performance

- Frontend build: ~73KB (JS) + 4.6KB (CSS)
- Database queries optimized with indexes
- Document uploads stored on server filesystem
- JWT tokens for stateless authentication

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill process if needed
kill -9 <PID>
```

### Database Connection Error
```bash
# Verify PostgreSQL is running
psql -U postgres

# Check DATABASE_URL in backend/.env
# Default: postgresql://postgres:postgres@localhost:5432/lsfi_db
```

### File Upload Issues
- Maximum file size: 10MB
- Allowed formats: PDF, JPEG, PNG, DOC, DOCX
- Check `uploads/` folder has write permissions

## 📖 Documentation

- [Backend Setup Guide](./backend/BACKEND_SETUP.md)
- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy build/ folder
```

### Backend (Heroku/Railway/Digital Ocean)
```bash
npm run build
npm start
```

Set environment variables in deployment platform:
- DATABASE_URL
- JWT_SECRET
- NODE_ENV

## 📄 License

MIT License - See LICENSE file

## 👥 Support

For issues or questions:
1. Check the [Backend Setup Guide](./backend/BACKEND_SETUP.md)
2. Review API documentation
3. Check browser console for errors
4. Verify PostgreSQL is running
5. Ensure all dependencies are installed

## 🎯 Next Steps

1. ✅ Install and run the application
2. 📝 Create a borrower account via signup
3. 📄 Upload verification documents
4. 👀 View LSFI dashboard
5. 🏦 Explore bank officer portal
6. ✅ Review compliance audit trail

---

**Last Updated**: January 2026
**Version**: 1.0.0
