"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const mockDb_1 = __importDefault(require("../config/mockDb"));
exports.Document = {
    async create(doc) {
        return mockDb_1.default.document.create(doc);
    },
    async findByUserId(userId) {
        return mockDb_1.default.document.findByUserId(userId);
    },
    async findById(id) {
        return mockDb_1.default.document.findById(id);
    },
    async updateVerificationStatus(id, status, verifiedBy) {
        mockDb_1.default.document.updateVerificationStatus(id, status, verifiedBy);
    },
};
