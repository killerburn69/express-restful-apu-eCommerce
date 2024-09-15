import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
// import { JWT_SECRET_KEY } from '../config';

export const authMiddleware = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.header('Authorization')?.split(" ")[2];
  
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
  
      try {
        if (!process.env.JWT_SECRET) {
          throw new Error('JWT secret key not defined in environment variables');
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;  // Decoded JWT token will contain user info
        const user = await UserModel.findById(decoded.userId)  // Attach decoded user info to req object
  
        // Check if the user has one of the required roles
        if(user){
          if (!roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
          }
          next();  // Pass control to the next middleware or route handler
        }else{
          res.status(400).json({ message: 'User not found' });
        }
      } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
      }
    };
  };
  
