import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { IRequestWithUserId } from "../interfaces/interfaces";
import User from "../models/User";

// verifying token ->
export const verifyToken = (req: IRequestWithUserId, res: Response, next: NextFunction) => {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const JWT_SECRET = `${process.env.JWT_SECRET}`
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// verifying admin ->
export const verifyAdmin = async (req: IRequestWithUserId, res: Response, next: NextFunction) => {
// verifying token first 
  verifyToken(req, res, async () => {
    try {
      const user = await User.findById(req.userId)
      // verifying logged in user is admin or not
      if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  })
}
