const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const tasksRouter = require('./api/tasks');
const calendarRouter = require('./api/calendar');
const remindersRouter = require('./api/reminders');
const financialRouter = require('./api/financial');
const mentorRouter = require('./api/mentor');
const businessPlanRouter = require('./api/businessPlan');
const communicationsRouter = require('./api/communications');
const managementRouter = require('./api/management');
const authRouter = require('./api/auth');
const workOrdersRouter = require('./api/workOrders');
const usersRouter = require('./api/users');

// Initialize database
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/tasks', tasksRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/reminders', remindersRouter);
app.use('/api/financial', financialRouter);
app.use('/api/mentor', mentorRouter);
app.use('/api/business-plan', businessPlanRouter);
app.use('/api/communications', communicationsRouter);
app.use('/api/management', managementRouter);

// Restaurant Maintenance API Routes
app.use('/api/auth', authRouter);
app.use('/api/work-orders', workOrdersRouter);
app.use('/api/users', usersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Assistant-1 API is running' });
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Assistant-1 server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Database: ${process.env.DB_PATH || './database/assistant.db'}`);
});

module.exports = app;
