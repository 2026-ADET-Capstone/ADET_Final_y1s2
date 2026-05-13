const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
require('./src/config/database');

// Import routes
const movieRoutes = require('./src/routes/movies');
const authRoutes = require('./auth');
const staffRoutes = require('./src/routes/staff');
const concessionsRoutes = require('./src/routes/concessions');

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
app.use('/auth', authRoutes);
app.use('/staff', staffRoutes);
app.use('/concessions', concessionsRoutes);

// 404 handler (must come AFTER all routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎬 Moonlight Motion API running on http://localhost:${PORT}`);
});