import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { verifyAdmin, verifyToken } from '../middlewares/verifyUser';

const router = express.Router();

// Get all users
router.get('/', verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
