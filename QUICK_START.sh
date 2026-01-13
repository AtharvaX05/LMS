#!/bin/bash

# LSFI Platform - Quick Start Guide
# ====================================
# Complete setup with backend PostgreSQL and document upload

echo "╔════════════════════════════════════════════════════════════╗"
echo "║      LSFI Platform - Quick Start & Setup Guide             ║"
echo "║   Loan Stability & Fairness Index with Document Upload     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Prerequisites
echo "📋 Step 1: Check Prerequisites"
echo "──────────────────────────────"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js required. Download from: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js $(node -v)"
echo "✅ npm $(npm -v)"

if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Download from: https://www.postgresql.org/download/"
fi

# Install dependencies
echo ""
echo "📦 Step 2: Install Dependencies"
echo "───────────────────────────────"

echo "Installing frontend..."
npm install

echo "Installing backend..."
cd backend
npm install
cd ..

# Database setup
echo ""
echo "🗄️  Step 3: Create Database"
echo "────────────────────────────"
echo "Run this command if not already done:"
echo "  createdb lsfi_db"
echo ""

# Environment setup
echo "⚙️  Step 4: Configure .env Files"
echo "────────────────────────────────"

if [ ! -f ".env" ]; then
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
EOF
    echo "✅ Created .env"
fi

if [ ! -f "backend/.env" ]; then
    cat > backend/.env << EOF
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lsfi_db
JWT_SECRET=lsfi-super-secret-key-change-in-production
NODE_ENV=development
UPLOAD_FOLDER=./uploads
EOF
    echo "✅ Created backend/.env"
fi

# Start instructions
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  🚀 READY TO START                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "STEP 1: Start Backend (Terminal 1)"
echo "──────────────────────────────────"
echo "  $ cd backend && npm run dev"
echo "  Backend runs on: http://localhost:3001"
echo ""

echo "STEP 2: Start Frontend (Terminal 2)"  
echo "───────────────────────────────────"
echo "  $ npm start"
echo "  Frontend opens at: http://localhost:3000"
echo ""

echo "STEP 3: Login or Sign Up"
echo "────────────────────────"
echo "Choose one:"
echo ""
echo "  Demo Accounts:"
echo "    • Borrower:  borrower@lsfi.com / password123"
echo "    • Officer:   officer@lsfi.com / password123"
echo "    • Compliance: compliance@lsfi.com / password123"
echo ""
echo "  OR Create Your Own:"
echo "    • Click 'Create one now' on login page"
echo "    • Fill in your details"
echo "    • Submit to register"
echo ""

echo "## ✅ Production Build

# Create production build
npm run build

# The build folder is ready to be deployed
# To test the production build locally:
npm install -g serve
serve -s build

## ✅ Login Credentials for Testing

# Role: Borrower
# Email: borrower@lsfi.com
# Password: password123

# Role: Bank Officer  
# Email: officer@lsfi.com
# Password: password123

# Role: Compliance Officer
# Email: compliance@lsfi.com
# Password: password123

## ✅ Available npm Scripts

- npm start          → Start development server (port 3000)
- npm build          → Build for production
- npm test           → Run tests
- npm eject          → Expose CRA configuration (irreversible)

## ✅ Project Features

### Borrower Dashboard
- View LSFI Score with visual gauge
- Monitor loan status and details
- Access document verification
- Track repayment schedule
- View risk analysis metrics

### Bank Officer Dashboard
- Portfolio health overview
- Risk distribution heatmap
- Scenario testing capabilities
- Loan approval workflow
- Risk metrics monitoring

### Compliance Dashboard
- Audit trail tracking
- Governance controls
- Regulatory compliance status
- Data security verification

## ✅ Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Axios
- Context API

## ✅ File Structure

```
lsfi-platform/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom hooks
│   ├── services/        # API services
│   ├── store/           # Context providers
│   ├── utils/           # Utilities
│   ├── assets/          # Images and styles
│   ├── App.tsx
│   ├── index.tsx
│   └── routes.tsx       # Route definitions
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md

```

## ✅ Next Steps

1. Start the development server: `npm start`
2. Login with demo credentials
3. Explore each role's dashboard
4. Test interactions and features
5. Review the codebase
6. Integrate with a backend API
7. Deploy to production

## ✅ Support

For issues or questions:
- Check README.md for detailed documentation
- Review COMPLETION_SUMMARY.md for implementation details
- Check console for error messages
- Verify all dependencies are installed

## ✅ Deployment

### To Vercel
```bash
npm install -g vercel
vercel
```

### To Netlify
```bash
npm run build
# Then drag and drop the build folder to Netlify
```

### To Traditional Server
```bash
npm run build
# Copy the contents of build/ folder to your web server
```

---
Project Status: ✅ COMPLETE AND READY FOR USE
