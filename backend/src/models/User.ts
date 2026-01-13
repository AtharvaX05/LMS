import mockDb from '../config/mockDb';

export interface User {
  id?: number;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: string;
  status: string;
  verification_status: string;
  profile_completed?: boolean;
  created_at?: string;
}

export const User = {
  async create(user: User): Promise<User> {
    return mockDb.user.create(user as any);
  },

  async findByEmail(email: string): Promise<User | null> {
    return mockDb.user.findByEmail(email);
  },

  async findById(id: number): Promise<User | null> {
    return mockDb.user.findById(id);
  },

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return mockDb.user.verifyPassword(plainPassword, hashedPassword);
  },

  async getWithPassword(email: string): Promise<any> {
    return mockDb.user.findByEmailWithPassword(email);
  },

  async updateVerificationStatus(userId: number, status: string): Promise<void> {
    mockDb.user.updateVerificationStatus(userId, status);
  },
};
