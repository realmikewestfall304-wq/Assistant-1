# Restaurant Maintenance Work Order System

A backend API for managing restaurant maintenance work orders with file upload support.

## Features

- Create, read, update, and delete work orders
- File attachment support for work orders
- Automatic creation of uploads directory
- RESTful API design

## Installation

```bash
cd restaurant-maintenance/backend
npm install
```

## Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5001` by default.

## API Endpoints

### Health Check
- **GET** `/api/health` - Check server status and uploads directory

### Work Orders
- **GET** `/api/work-orders` - List all work orders
- **POST** `/api/work-orders` - Create a new work order (with optional file attachment)
- **GET** `/api/work-orders/:id` - Get a specific work order
- **PUT** `/api/work-orders/:id` - Update a work order (with optional file attachment)
- **DELETE** `/api/work-orders/:id` - Delete a work order

### File Uploads

Work orders support file attachments via multipart form data. Use the `attachment` field to upload a file:

```bash
curl -X POST http://localhost:5001/api/work-orders \
  -F "title=Fix ice machine" \
  -F "description=Not cooling properly" \
  -F "status=pending" \
  -F "attachment=@/path/to/file.pdf"
```

## Uploads Directory

The system automatically creates the `uploads/` directory on server startup if it doesn't exist. This ensures that file uploads work correctly from the first request without manual directory creation.

The directory creation is:
- **Idempotent**: Safe to run multiple times
- **Recursive**: Creates parent directories if needed
- **Automatic**: No manual setup required

## Environment Variables

- `PORT` - Server port (default: 5001)

## Security

- Uploaded files are stored in the `uploads/` directory
- Files are given unique names to prevent conflicts
- The `uploads/` directory contents are ignored by git (tracked by `.gitignore`)
