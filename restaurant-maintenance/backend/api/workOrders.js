const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Define uploads directory path
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists before configuring multer
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory:', uploadsDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// GET all work orders
router.get('/', (req, res) => {
  res.json({ message: 'Get all work orders', workOrders: [] });
});

// POST create work order with file upload
router.post('/', upload.single('attachment'), (req, res) => {
  try {
    const workOrder = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'pending',
      attachment: req.file ? {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size
      } : null,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({ 
      message: 'Work order created successfully',
      workOrder 
    });
  } catch (error) {
    console.error('Error creating work order:', error);
    res.status(500).json({ error: 'Failed to create work order' });
  }
});

// GET work order by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get work order ${req.params.id}` });
});

// PUT update work order
router.put('/:id', upload.single('attachment'), (req, res) => {
  try {
    const workOrder = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      attachment: req.file ? {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size
      } : null,
      updatedAt: new Date().toISOString()
    };
    
    res.json({ 
      message: 'Work order updated successfully',
      workOrder 
    });
  } catch (error) {
    console.error('Error updating work order:', error);
    res.status(500).json({ error: 'Failed to update work order' });
  }
});

// DELETE work order
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete work order ${req.params.id}` });
});

module.exports = router;
