"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const LSFIScore_1 = require("../models/LSFIScore");
const jwt_1 = require("../utils/jwt");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Signup endpoint
router.post('/signup', async (req, res) => {
    try {
        const { email, password, first_name, last_name, phone } = req.body;
        // Validate input
        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Check if user exists
        const existingUser = await User_1.User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        // Create user
        const newUser = await User_1.User.create({
            email,
            password,
            first_name,
            last_name,
            phone,
            role: 'borrower',
            status: 'active',
            verification_status: 'pending',
            profile_completed: false,
        });
        // Don't create LSFI score yet - wait for user to complete profile
        // Generate token
        const token = (0, jwt_1.generateToken)(newUser.id, newUser.email);
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                role: newUser.role,
                verification_status: newUser.verification_status,
                profile_completed: newUser.profile_completed,
            },
            token,
        });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error during signup' });
    }
});
// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        // Find user by email (includes password field)
        const user = await User_1.User.getWithPassword(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Verify password
        const isPasswordValid = await User_1.User.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate token
        const token = (0, jwt_1.generateToken)(user.id, user.email);
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                verification_status: user.verification_status,
                profile_completed: user.profile_completed,
            },
            token,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});
// Get current user
router.get('/me', auth_1.authMiddleware, async (req, res) => {
    try {
        const user = await User_1.User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Get user's LSFI score
        const lsfiScore = await LSFIScore_1.LSFIScore.findByUserId(req.userId);
        res.json({
            user,
            lsfiScore,
        });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Server error fetching user' });
    }
});
// Logout endpoint
router.post('/logout', auth_1.authMiddleware, (req, res) => {
    // Token is invalidated on client side by deleting it
    res.json({ message: 'Logged out successfully' });
});
exports.default = router;
