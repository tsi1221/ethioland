// middlewares/auth.js

import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// ✅ Middleware to authenticate user based on JWT token (from cookie or header)
export const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header ("Bearer <token>") or cookie
    const token =
      req.headers.authorization?.split(' ')[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify JWT token and decode payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user from database by ID from token payload
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

    // Attach user info to request object for downstream middleware/controllers
    req.user = user;

    // Proceed to next middleware/route
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ✅ Middleware to authorize user based on allowed roles
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    // Check if user is authenticated and has an allowed role
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // User is authorized, proceed
    next();
  };
};
