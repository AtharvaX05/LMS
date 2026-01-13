import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Document } from '../models/Document';
import { User } from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

interface AuthRequest extends Request {
  userId?: number;
  userEmail?: string;
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const uploadDir = process.env.UPLOAD_FOLDER || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(uploadDir, `user_${(req as AuthRequest).userId}`);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allow common document types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Upload document
router.post('/upload', authMiddleware, upload.single('document'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { document_type } = req.body;
    if (!document_type) {
      return res.status(400).json({ error: 'Document type required' });
    }

    const filePath = path.relative(process.cwd(), req.file.path);

    const doc = await Document.create({
      user_id: req.userId!,
      document_type,
      file_name: req.file.originalname,
      file_path: filePath,
    });

    res.status(201).json({
      message: 'Document uploaded successfully',
      document: doc,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Server error during upload' });
  }
});

// Get user's documents
router.get('/my-documents', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const documents = await Document.findByUserId(req.userId!);
    res.json({ documents });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Server error fetching documents' });
  }
});

// Get document by ID
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const doc = await Document.findById(parseInt(req.params.id));
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    if (doc.user_id !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({ document: doc });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({ error: 'Server error fetching document' });
  }
});

// Download document
router.get('/:id/download', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const doc = await Document.findById(parseInt(req.params.id));
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    if (doc.user_id !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const filePath = path.join(process.cwd(), doc.file_path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Server error downloading document' });
  }
});

export default router;
