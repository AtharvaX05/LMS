// Mock database for development (no PostgreSQL required)
// This stores data in memory - data will be lost on server restart

import bcryptjs from 'bcryptjs';

interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: string;
  status: string;
  verification_status: string;
  profile_completed: boolean;
  created_at: string;
}

interface Document {
  id: number;
  user_id: number;
  document_type: string;
  file_name: string;
  file_path: string;
  verification_status: string;
  notes?: string;
  uploaded_at: string;
}

interface LSFIScore {
  id: number;
  user_id: number;
  score: number;
  status: string;
  debt_to_income: number;
  payment_history: number;
  loan_diversity: number;
  credit_utilization: number;
  income_stability: number;
  updated_at: string;
}

// In-memory storage
const users: Map<number, User> = new Map();
const documents: Map<number, Document> = new Map();
const lsfiScores: Map<number, LSFIScore> = new Map();

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
    const hashedPassword = await bcryptjs.hash(user.password, 10);
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
export const mockDb = {
  // User operations
  user: {
    create: async (user: Omit<User, 'id' | 'created_at' | 'profile_completed'> & { profile_completed?: boolean }) => {
      const hashedPassword = await bcryptjs.hash(user.password || '', 10);
      const id = userIdCounter++;
      const newUser: User = {
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
      return userWithoutPassword as any;
    },

    findByEmail: (email: string) => {
      for (const user of users.values()) {
        if (user.email === email) {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword as any;
        }
      }
      return null;
    },

    findByEmailWithPassword: (email: string) => {
      for (const user of users.values()) {
        if (user.email === email) {
          return user;
        }
      }
      return null;
    },

    findById: (id: number) => {
      const user = users.get(id);
      if (!user) return null;
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as any;
    },

    verifyPassword: async (plainPassword: string, hashedPassword: string) => {
      return bcryptjs.compare(plainPassword, hashedPassword);
    },

    updateVerificationStatus: (userId: number, status: string) => {
      const user = users.get(userId);
      if (user) {
        user.verification_status = status;
      }
    },
  },

  // Document operations
  document: {
    create: (doc: Omit<Document, 'id' | 'uploaded_at'>) => {
      const id = docIdCounter++;
      const newDoc: Document = {
        ...doc,
        id,
        uploaded_at: new Date().toISOString(),
      };
      documents.set(id, newDoc);
      return newDoc;
    },

    findByUserId: (userId: number) => {
      return Array.from(documents.values())
        .filter((doc) => doc.user_id === userId)
        .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
    },

    findById: (id: number) => {
      return documents.get(id) || null;
    },

    updateVerificationStatus: (id: number, status: string, verifiedBy?: string) => {
      const doc = documents.get(id);
      if (doc) {
        doc.verification_status = status;
        doc.notes = verifiedBy ? `Verified by ${verifiedBy}` : undefined;
      }
    },
  },

  // LSFI Score operations
  lsfiScore: {
    create: (lsfi: Omit<LSFIScore, 'id' | 'updated_at'>) => {
      const id = lsfiIdCounter++;
      const newScore: LSFIScore = {
        ...lsfi,
        id,
        updated_at: new Date().toISOString(),
      };
      lsfiScores.set(id, newScore);
      return newScore;
    },

    findByUserId: (userId: number) => {
      for (const score of lsfiScores.values()) {
        if (score.user_id === userId) {
          return score;
        }
      }
      return null;
    },

    updateScore: (userId: number, updates: Partial<LSFIScore>) => {
      for (const score of lsfiScores.values()) {
        if (score.user_id === userId) {
          Object.assign(score, updates, { updated_at: new Date().toISOString() });
          break;
        }
      }
    },
  },
};

export default mockDb;
