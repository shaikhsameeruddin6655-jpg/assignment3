const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/students');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const result = await db.query('SELECT 1 as test');
    res.json({ message: 'Database connected successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Student Management System API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
