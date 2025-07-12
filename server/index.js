import express from 'express';
import postroute from './routes/post.route.js'; // Routes for posts
import authroute from './routes/auth.route.js'; 
// import testroute from './routes/test.route.js';
 // Routes for authentication
import prisma from './prisma.js'; // Prisma ORM for database operations
import cors from 'cors'; // Middleware for enabling CORS
import cookieParser from 'cookie-parser'; // Middleware for parsing cookies

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; // Use environment port or default to 5000

// ======================
// 🛠️ Middleware Setup
// ======================

// Parse JSON requests (e.g., for POST/PUT requests)
app.use(express.json());

// Configure CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: 'http://localhost:3000', // Only allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Enable cookies/auth headers in CORS
  })
);

// Parse cookies from incoming requests
app.use(cookieParser());

// ======================
// 🚦 Route Handlers
// ======================

// Test route (API homepage)
app.get('/', (req, res) => {
  res.send('Welcome to EthioLand API!');
});

// Mount routes
app.use('/api/posts', postroute); // All post-related routes
app.use('/api/auth', authroute); // All authentication-related routes
// app.use('/api/test', testroute); // All test-related routes
// ======================
// ⚠️ Error Handling
// ======================

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace
  res.status(500).json({ message: 'Something broke!' }); // Send user-friendly error
});

// ======================
// 🚀 Start Server
// ======================

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// ======================
// ♻️ Graceful Shutdown
// ======================

// Handle termination signals (e.g., Ctrl+C or Docker stop)
const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  await prisma.$disconnect(); // Close Prisma connection
  server.close(() => {
    console.log('Process terminated');
    process.exit(0); // Exit cleanly
  });
};

// Listen for termination signals
process.on('SIGTERM', shutdown); // For Kubernetes/docker stop
process.on('SIGINT', shutdown);  // For Ctrl+C