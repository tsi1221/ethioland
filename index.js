import express from 'express';
import postroute from './routes/post.route.js';
import authroute from './routes/auth.route.js';
import prisma from './prisma.js';

// App and Port
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// --- Example Routes ---
app.get('/', (req, res) => {
  res.send('Welcome to EthioLand API!');
});

// Use post routes
app.use('/api/posts', postroute);
app.use('/api/auth/', authroute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// ✅ Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Process terminated');
  });
});