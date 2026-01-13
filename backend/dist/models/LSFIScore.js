"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LSFIScore = void 0;
const mockDb_1 = __importDefault(require("../config/mockDb"));
exports.LSFIScore = {
    async create(lsfi) {
        return mockDb_1.default.lsfiScore.create(lsfi);
    },
    async findByUserId(userId) {
        return mockDb_1.default.lsfiScore.findByUserId(userId);
    },
    async updateScore(userId, lsfi) {
        mockDb_1.default.lsfiScore.updateScore(userId, lsfi);
    },
};
