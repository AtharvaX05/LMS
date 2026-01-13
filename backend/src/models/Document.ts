import mockDb from '../config/mockDb';

export interface Document {
  id?: number;
  user_id: number;
  document_type: string;
  file_name: string;
  file_path: string;
  verification_status?: string;
  notes?: string;
  uploaded_at?: string;
}

export const Document = {
  async create(doc: Document): Promise<Document> {
    return mockDb.document.create(doc as any);
  },

  async findByUserId(userId: number): Promise<Document[]> {
    return mockDb.document.findByUserId(userId);
  },

  async findById(id: number): Promise<Document | null> {
    return mockDb.document.findById(id);
  },

  async updateVerificationStatus(id: number, status: string, verifiedBy?: string): Promise<void> {
    mockDb.document.updateVerificationStatus(id, status, verifiedBy);
  },
};
