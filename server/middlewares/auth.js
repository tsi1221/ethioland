// middlewares/auth.js

import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

const JWT_SECRET = process.env.JWT_SECRET ; // fallback for local dev

// ✅ Authenticate middleware - checks JWT in cookie or header
export const authenticate = async (req, res, next) => {
  try {
    // Get token from either header or cookie
    const token =
      req.headers.authorization?.split(' ')[1] || req.cookies?.token;

    // If no token provided
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

    // Attach user info to the request
    req.user = user;
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ✅ Authorize middleware - checks if user has allowed role(s)
export const authorize = (roles = []) => {
  return (req, res, next) => {
    // Check if user exists and has a role
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    next(); // User has access, proceed
  };
};
