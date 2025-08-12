const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const propertyRoutes = require('./src/routes/property.routes');
const adminRoutes = require('./src/routes/admin.routes');
const documentRoutes = require('./src/routes/document.routes');
const messageRoutes = require('./src/routes/message.routes');
const paymentRoutes = require('./src/routes/payment.routes');
const notificationRoutes = require('./src/routes/notification.routes');

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');
const rateLimiter = require('./src/middleware/rateLimiter');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'EthioLand API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to EthioLand Real Estate API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
      properties: '/api/properties',
      admin: '/api/admin',
      documents: '/api/documents',
      messages: '/api/messages',
      payments: '/api/payments',
      notifications: '/api/notifications'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 EthioLand API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
});

module.exports = app;