import express from 'express';
import postroute from './routes/post.route.js';
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


// ✅ Start the server on localhost:5000
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
