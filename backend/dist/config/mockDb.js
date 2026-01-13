"use strict";
// Mock database for development (no PostgreSQL required)
// This stores data in memory - data will be lost on server restart
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockDb = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// In-memory storage
const users = new Map();
const documents = new Map();
const lsfiScores = new Map();
let userIdCounter = 1;
let docIdCounter = 1;
let lsfiIdCounter = 1;
// Initialize with demo users
const initializeDemoUsers = async () => {
    const demoUsers = [
        {
            email: 'borrower@lsfi.com',
            password: 'password123',
            first_name: 'John',
            last_name: 'Borrower',
            phone: '+1-555-0001',
            role: 'borrower',
        },
        {
            email: 'officer@lsfi.com',
            password: 'password123',
            first_name: 'Jane',
            last_name: 'Officer',
            phone: '+1-555-0002',
            role: 'bank-officer',
        },
        {
            email: 'compliance@lsfi.com',
            password: 'password123',
            first_name: 'Bob',
            last_name: 'Compliance',
            phone: '+1-555-0003',
            role: 'compliance',
        },
    ];
    for (const user of demoUsers) {
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        const id = userIdCounter++;
        users.set(id, {
            id,
            email: user.email,
            password: hashedPassword,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            role: user.role,
            status: 'active',
            verification_status: 'verified',
            profile_completed: true,
            created_at: new Date().toISOString(),
        });
        // Create default LSFI score for borrower
        if (user.role === 'borrower') {
            const lsfiId = lsfiIdCounter++;
            lsfiScores.set(lsfiId, {
                id: lsfiId,
                user_id: id,
                score: 85,
                status: 'Stable',
                debt_to_income: 35.5,
                payment_history: 92.3,
                loan_diversity: 78.5,
                credit_utilization: 65.0,
                income_stability: 88.2,
                updated_at: new Date().toISOString(),
            });
        }
    }
    console.log('✅ Demo users initialized');
};
// Call initialization
initializeDemoUsers().catch(console.error);
// User operations
exports.mockDb = {
    // User operations
    user: {
        create: async (user) => {
            const hashedPassword = await bcryptjs_1.default.hash(user.password || '', 10);
            const id = userIdCounter++;
            const newUser = {
                ...user,
                id,
                password: hashedPassword,
                profile_completed: user.profile_completed ?? false,
                created_at: new Date().toISOString(),
            };
            users.set(id, newUser);
            // Create default LSFI score
            const lsfiId = lsfiIdCounter++;
            lsfiScores.set(lsfiId, {
                id: lsfiId,
                user_id: id,
                score: 75,
                status: 'Pending',
                debt_to_income: 40,
                payment_history: 85,
                loan_diversity: 70,
                credit_utilization: 60,
                income_stability: 80,
                updated_at: new Date().toISOString(),
            });
            const { password, ...userWithoutPassword } = newUser;
            return userWithoutPassword;
        },
        findByEmail: (email) => {
            for (const user of users.values()) {
                if (user.email === email) {
                    const { password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                }
            }
            return null;
        },
        findByEmailWithPassword: (email) => {
            for (const user of users.values()) {
                if (user.email === email) {
                    return user;
                }
            }
            return null;
        },
        findById: (id) => {
            const user = users.get(id);
            if (!user)
                return null;
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        },
        verifyPassword: async (plainPassword, hashedPassword) => {
            return bcryptjs_1.default.compare(plainPassword, hashedPassword);
        },
        updateVerificationStatus: (userId, status) => {
            const user = users.get(userId);
            if (user) {
                user.verification_status = status;
            }
        },
    },
    // Document operations
    document: {
        create: (doc) => {
            const id = docIdCounter++;
            const newDoc = {
                ...doc,
                id,
                uploaded_at: new Date().toISOString(),
            };
            documents.set(id, newDoc);
            return newDoc;
        },
        findByUserId: (userId) => {
            return Array.from(documents.values())
                .filter((doc) => doc.user_id === userId)
                .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
        },
        findById: (id) => {
            return documents.get(id) || null;
        },
        updateVerificationStatus: (id, status, verifiedBy) => {
            const doc = documents.get(id);
            if (doc) {
                doc.verification_status = status;
                doc.notes = verifiedBy ? `Verified by ${verifiedBy}` : undefined;
            }
        },
    },
    // LSFI Score operations
    lsfiScore: {
        create: (lsfi) => {
            const id = lsfiIdCounter++;
            const newScore = {
                ...lsfi,
                id,
                updated_at: new Date().toISOString(),
            };
            lsfiScores.set(id, newScore);
            return newScore;
        },
        findByUserId: (userId) => {
            for (const score of lsfiScores.values()) {
                if (score.user_id === userId) {
                    return score;
                }
            }
            return null;
        },
        updateScore: (userId, updates) => {
            for (const score of lsfiScores.values()) {
                if (score.user_id === userId) {
                    Object.assign(score, updates, { updated_at: new Date().toISOString() });
                    break;
                }
            }
        },
    },
};
exports.default = exports.mockDb;
