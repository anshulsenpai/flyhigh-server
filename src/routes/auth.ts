import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../interfaces/interfaces';
import hashPass from '../middlewares/hashPass';


const router = express.Router();

// Register endpoint
router.post('/register', hashPass,async (req: Request, res: Response) => {
  try {
    // Destructure the user properties from the request body
    const { name, email, phoneNumber, password, address, userType, isAdmin} = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user object with the hashed password
    const newUser: IUser = new User({
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
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
router.post('/login' ,async (req: Request, res: Response) => {
  try {
    // Destructure the user properties from the request body
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token for the user
    const JWT_SECRET = `${process.env.JWT_SECRET}` 
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({ ...user, token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
