import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import prisma from './prisma.js';

import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import  testRoute from './routes/test.route.js'
const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// 📦 Middleware
// ======================
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ======================
// 🛣️ Routes
// ======================
app.get('/', (req, res) => {
  res.send('🌍 Welcome to EthioLand API');
});

app.use("/api/test", testRoute);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ======================
// ❗ Global Error Handler
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ======================
// 🚀 Start Server
// ======================
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ======================
// 💥 Graceful Shutdown
// ======================
const shutdown = async (signal) => {
  console.log(`⚠️ ${signal} received. Closing server...`);
  await prisma.$disconnect();
  server.close(() => {
    console.log('✅ Server closed gracefully');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('uncaughtException', (err) => {
  console.error('❗ Uncaught Exception:', err);
  process.exit(1);
});