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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const hashPass_1 = __importDefault(require("../middlewares/hashPass"));
const router = express_1.default.Router();
// Register endpoint
router.post('/register', hashPass_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure the user properties from the request body
        const { name, email, phoneNumber, password, address, userType, isAdmin } = req.body;
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create a new user object with the hashed password
        const newUser = new User_1.default({
            name,
            email,
            phoneNumber,
            password,
            address,
            cart: [],
            userType,
            isAdmin,
        });
        // Save the user to the database
        const savedUser = yield newUser.save();
        res.status(201).json({ message: 'User created', user: savedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// Login endpoint
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure the user properties from the request body
        const { email, password } = req.body;
        // Check if the user exists
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Compare the password with the hashed password
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate a token for the user
        const JWT_SECRET = `${process.env.JWT_SECRET}`;
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json(Object.assign(Object.assign({}, user), { token, message: 'Login successful' }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
