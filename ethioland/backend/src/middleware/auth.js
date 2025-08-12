const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../utils/auth');

const prisma = new PrismaClient();

/**
 * Authentication middleware to protect routes
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.'
      });
    }

    try {
      const decoded = verifyToken(token);
      
      // Get user from database to ensure they still exist and are active
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isVerified: true,
          isActive: true,
          profileImage: true,
          language: true
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. User not found.'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Account is deactivated.'
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token.'
      });
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

/**
 * Authorization middleware to check user roles
 * @param {string[]} allowedRoles - Array of allowed roles
 */
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
      });
    }

    next();
  };
};

/**
 * Middleware to check if user is verified
 */
const requireVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication required.'
    });
  }

  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Account verification required.'
    });
  }

  next();
};

/**
 * Middleware to check if user owns the resource
 * @param {string} resourceIdParam - Parameter name for resource ID
 * @param {string} resourceModel - Prisma model name
 * @param {string} ownerField - Field name that contains owner ID
 */
const requireOwnership = (resourceIdParam, resourceModel, ownerField = 'ownerId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Authentication required.'
        });
      }

      const resourceId = req.params[resourceIdParam];
      
      if (!resourceId) {
        return res.status(400).json({
          success: false,
          message: 'Resource ID is required.'
        });
      }

      const resource = await prisma[resourceModel].findUnique({
        where: { id: resourceId },
        select: { [ownerField]: true }
      });

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found.'
        });
      }

      if (resource[ownerField] !== req.user.id && req.user.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only access your own resources.'
        });
      }

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during ownership verification'
      });
    }
  };
};

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    try {
      const decoded = verifyToken(token);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isVerified: true,
          isActive: true,
          profileImage: true,
          language: true
        }
      });

      if (user && user.isActive) {
        req.user = user;
      }
    } catch (jwtError) {
      // Ignore JWT errors for optional auth
    }

    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    next();
  }
};

module.exports = {
  authenticate,
  authorize,
  requireVerification,
  requireOwnership,
  optionalAuth
};