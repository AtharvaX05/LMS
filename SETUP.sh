#!/bin/bash

# LSFI Platform - Complete Setup Script
# This script sets up both frontend and backend

echo "🚀 LSFI Platform - Complete Setup"
echo "=================================="

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Frontend Setup
echo -e "\n${BLUE}Step 1: Frontend Setup${NC}"
echo "---------------------"

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

# Backend Setup
echo -e "\n${BLUE}Step 2: Backend Setup${NC}"
echo "---------------------"

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

# Database Setup
echo -e "\n${BLUE}Step 3: Database Setup${NC}"
echo "----------------------"
echo "Please ensure PostgreSQL is running locally."
echo "Create database with: createdb lsfi_db"
echo -e "${GREEN}✓ Database setup instructions provided${NC}"

# Environment Variables
echo -e "\n${BLUE}Step 4: Environment Variables${NC}"
echo "------------------------------"

if [ ! -f ".env" ]; then
    echo "Creating frontend .env file..."
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
EOF
    echo -e "${GREEN}✓ Frontend .env created${NC}"
else
    echo -e "${GREEN}✓ Frontend .env already exists${NC}"
fi

if [ ! -f "backend/.env" ]; then
    echo "Creating backend .env file..."
    cat > backend/.env << EOF
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lsfi_db
JWT_SECRET=lsfi-super-secret-key-change-in-production
NODE_ENV=development
UPLOAD_FOLDER=./uploads
EOF
    echo -e "${GREEN}✓ Backend .env created${NC}"
else
    echo -e "${GREEN}✓ Backend .env already exists${NC}"
fi

# Summary
echo -e "\n${GREEN}=================================="
echo "✓ Setup Complete!"
echo "==================================${NC}"

echo -e "\n${BLUE}Next Steps:${NC}"
echo "1. Start PostgreSQL (if not running)"
echo "2. Create database: createdb lsfi_db"
echo "3. In one terminal, start backend: cd backend && npm run dev"
echo "4. In another terminal, start frontend: npm start"
echo "5. Open http://localhost:3000 in your browser"

echo -e "\n${BLUE}Demo Accounts:${NC}"
echo "  • Borrower: borrower@lsfi.com / password123"
echo "  • Officer: officer@lsfi.com / password123"
echo "  • Compliance: compliance@lsfi.com / password123"

echo -e "\n${BLUE}Or use Signup to create your own account${NC}"
