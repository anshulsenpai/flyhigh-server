"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
// verifying token ->
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const JWT_SECRET = `${process.env.JWT_SECRET}`;
        const decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
// verifying admin ->
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // verifying token first 
    (0, exports.verifyToken)(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findById(req.userId);
            // verifying logged in user is admin or not
            if (!user || !user.isAdmin) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid token' });
        }
    }));
});
exports.verifyAdmin = verifyAdmin;
