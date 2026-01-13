"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Document_1 = require("../models/Document");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Configure multer for file uploads
const uploadDir = process.env.UPLOAD_FOLDER || './uploads';
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const userDir = path_1.default.join(uploadDir, `user_${req.userId}`);
        if (!fs_1.default.existsSync(userDir)) {
            fs_1.default.mkdirSync(userDir, { recursive: true });
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}_${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        // Allow common document types
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    },
});
// Upload document
router.post('/upload', auth_1.authMiddleware, upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }
        const { document_type } = req.body;
        if (!document_type) {
            return res.status(400).json({ error: 'Document type required' });
        }
        const filePath = path_1.default.relative(process.cwd(), req.file.path);
        const doc = await Document_1.Document.create({
            user_id: req.userId,
            document_type,
            file_name: req.file.originalname,
            file_path: filePath,
        });
        res.status(201).json({
            message: 'Document uploaded successfully',
            document: doc,
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message || 'Server error during upload' });
    }
});
// Get user's documents
router.get('/my-documents', auth_1.authMiddleware, async (req, res) => {
    try {
        const documents = await Document_1.Document.findByUserId(req.userId);
        res.json({ documents });
    }
    catch (error) {
        console.error('Get documents error:', error);
        res.status(500).json({ error: 'Server error fetching documents' });
    }
});
// Get document by ID
router.get('/:id', auth_1.authMiddleware, async (req, res) => {
    try {
        const doc = await Document_1.Document.findById(parseInt(req.params.id));
        if (!doc) {
            return res.status(404).json({ error: 'Document not found' });
        }
        if (doc.user_id !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        res.json({ document: doc });
    }
    catch (error) {
        console.error('Get document error:', error);
        res.status(500).json({ error: 'Server error fetching document' });
    }
});
// Download document
router.get('/:id/download', auth_1.authMiddleware, async (req, res) => {
    try {
        const doc = await Document_1.Document.findById(parseInt(req.params.id));
        if (!doc) {
            return res.status(404).json({ error: 'Document not found' });
        }
        if (doc.user_id !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const filePath = path_1.default.join(process.cwd(), doc.file_path);
        if (!fs_1.default.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.download(filePath);
    }
    catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Server error downloading document' });
    }
});
exports.default = router;
