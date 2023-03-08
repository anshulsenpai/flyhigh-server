"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, minlength: 2 },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: 'Invalid email address',
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isMobilePhone(value, 'any'),
            message: 'Invalid phone number',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isStrongPassword(value),
            message: 'Password is not strong enough',
        },
    },
    address: { type: String, required: true },
    cart: [{ type: String }],
    userType: {
        type: String,
        default: "member"
    },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
