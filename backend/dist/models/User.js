"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mockDb_1 = __importDefault(require("../config/mockDb"));
exports.User = {
    async create(user) {
        return mockDb_1.default.user.create(user);
    },
    async findByEmail(email) {
        return mockDb_1.default.user.findByEmail(email);
    },
    async findById(id) {
        return mockDb_1.default.user.findById(id);
    },
    async verifyPassword(plainPassword, hashedPassword) {
        return mockDb_1.default.user.verifyPassword(plainPassword, hashedPassword);
    },
    async getWithPassword(email) {
        return mockDb_1.default.user.findByEmailWithPassword(email);
    },
    async updateVerificationStatus(userId, status) {
        mockDb_1.default.user.updateVerificationStatus(userId, status);
    },
};
