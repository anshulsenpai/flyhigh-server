import { Request } from "express";
import { Document } from "mongoose";

// User Interface 
export interface IUser extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    address: string;
    cart: string[];
    userType: string;
    isAdmin: boolean;
}

// User Request Interface 
export interface IRequestWithUserId extends Request {
    userId?: string;
}
