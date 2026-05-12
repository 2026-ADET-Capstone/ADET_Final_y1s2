const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
require('./src/config/database');

// Import routes
const movieRoutes = require('./src/routes/movies');
// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: '🚀 API running' });
});

// Routes
app.use('/movies', movieRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎬 Moonlight Motion API running on http://localhost:${PORT}`);
});

// Admin authentication route
const authRoutes = require('./src/routes/auth');
app.use('/auth', authRoutes);