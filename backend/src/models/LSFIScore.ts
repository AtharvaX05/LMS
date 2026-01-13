import mockDb from '../config/mockDb';

export interface LSFIScore {
  id?: number;
  user_id: number;
  score: number;
  status: string;
  debt_to_income: number;
  payment_history: number;
  loan_diversity: number;
  credit_utilization: number;
  income_stability: number;
  updated_at?: string;
}

export const LSFIScore = {
  async create(lsfi: Omit<LSFIScore, 'id' | 'updated_at'>): Promise<LSFIScore> {
    return mockDb.lsfiScore.create(lsfi as any);
  },

  async findByUserId(userId: number): Promise<LSFIScore | null> {
    return mockDb.lsfiScore.findByUserId(userId);
  },

  async updateScore(userId: number, lsfi: Partial<LSFIScore>): Promise<void> {
    mockDb.lsfiScore.updateScore(userId, lsfi);
  },
};
