const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Import routes
const workOrdersRouter = require('./api/workOrders');

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure uploads directory exists at startup
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory at startup:', uploadsDir);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/work-orders', workOrdersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Restaurant Maintenance API is running',
    uploadsDir: uploadsDir,
    uploadsDirExists: fs.existsSync(uploadsDir)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Restaurant Maintenance server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
});

module.exports = app;
