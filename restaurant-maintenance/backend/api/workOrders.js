const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const workOrdersDB = require('./database');

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
  try {
    const workOrders = workOrdersDB.getAll();
    res.json({ 
      message: 'Work orders retrieved successfully',
      count: workOrders.length,
      workOrders 
    });
  } catch (error) {
    console.error('Error getting work orders:', error);
    res.status(500).json({ error: 'Failed to retrieve work orders', message: error.message });
  }
});

// POST create work order with file upload
router.post('/', upload.single('attachment'), (req, res) => {
  try {
    // Validate required fields
    if (!req.body.title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const workOrderData = {
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'pending',
      attachment: req.file ? {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size
      } : null
    };
    
    // Save to database
    const workOrderId = workOrdersDB.create(workOrderData);
    const savedWorkOrder = workOrdersDB.getById(workOrderId);
    
    res.status(201).json({ 
      message: 'Work order created successfully',
      workOrder: savedWorkOrder
    });
  } catch (error) {
    console.error('Error creating work order:', error);
    res.status(500).json({ error: 'Failed to create work order', message: error.message });
  }
});

// GET work order by ID
router.get('/:id', (req, res) => {
  try {
    const workOrder = workOrdersDB.getById(req.params.id);
    
    if (!workOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    
    res.json({ 
      message: 'Work order retrieved successfully',
      workOrder 
    });
  } catch (error) {
    console.error('Error getting work order:', error);
    res.status(500).json({ error: 'Failed to retrieve work order', message: error.message });
  }
});

// PUT update work order
router.put('/:id', upload.single('attachment'), (req, res) => {
  try {
    // Check if work order exists
    const existingWorkOrder = workOrdersDB.getById(req.params.id);
    if (!existingWorkOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    const workOrderData = {
      title: req.body.title || existingWorkOrder.title,
      description: req.body.description !== undefined ? req.body.description : existingWorkOrder.description,
      status: req.body.status || existingWorkOrder.status,
      attachment: req.file ? {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size
      } : (existingWorkOrder.attachment_filename ? {
        filename: existingWorkOrder.attachment_filename,
        originalname: existingWorkOrder.attachment_originalname,
        path: existingWorkOrder.attachment_path,
        size: existingWorkOrder.attachment_size
      } : null)
    };
    
    // Update in database
    const changes = workOrdersDB.update(req.params.id, workOrderData);
    
    if (changes === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    
    const updatedWorkOrder = workOrdersDB.getById(req.params.id);
    
    res.json({ 
      message: 'Work order updated successfully',
      workOrder: updatedWorkOrder
    });
  } catch (error) {
    console.error('Error updating work order:', error);
    res.status(500).json({ error: 'Failed to update work order', message: error.message });
  }
});

// DELETE work order
router.delete('/:id', (req, res) => {
  try {
    // Get work order to check if it has an attachment to delete
    const workOrder = workOrdersDB.getById(req.params.id);
    
    if (!workOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    
    // Delete file attachment if exists
    if (workOrder.attachment_path && fs.existsSync(workOrder.attachment_path)) {
      fs.unlinkSync(workOrder.attachment_path);
      console.log('Deleted attachment file:', workOrder.attachment_path);
    }
    
    // Delete from database
    const changes = workOrdersDB.delete(req.params.id);
    
    if (changes === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    
    res.json({ 
      message: 'Work order deleted successfully',
      id: req.params.id 
    });
  } catch (error) {
    console.error('Error deleting work order:', error);
    res.status(500).json({ error: 'Failed to delete work order', message: error.message });
  }
});

module.exports = router;
