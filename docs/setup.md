# Assistant-1 Installation and Setup Guide

## Overview
Assistant-1 is a comprehensive personal mentor and assistant dashboard designed to help you launch and manage your business while handling daily life tasks.

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB for application and dependencies

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Assistant-1.git
cd Assistant-1
```

### 2. Install Dependencies

#### Install Backend Dependencies
```bash
npm install
```

#### Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

Alternatively, you can use the convenience script:
```bash
npm run install-all
```

### 3. Environment Configuration

Create a `.env` file in the root directory by copying the example:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_PATH=./database/assistant.db

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Initialize the Database

The database will be automatically created when you first start the server. The SQLite database file will be created at the path specified in `DB_PATH`.

### 5. Start the Application

#### Development Mode (Runs both backend and frontend)
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

#### Production Mode

First, build the frontend:
```bash
npm run build
```

Then start the server:
```bash
NODE_ENV=production npm start
```

The application will be available at http://localhost:5000

## Verification

### Check Backend Health
Open your browser and navigate to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Assistant-1 API is running"
}
```

### Access the Dashboard
Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Assistant-1 dashboard with navigation and quick action buttons.

## Troubleshooting

### Port Already in Use
If you see an error about port 5000 or 3000 being in use:

1. Change the PORT in `.env` file
2. Update `REACT_APP_API_URL` accordingly
3. Or stop the process using the port:

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

### Database Connection Issues
If you see database errors:

1. Ensure the `database/` directory exists
2. Check write permissions for the database directory
3. Delete the existing database file and let it recreate: `rm database/assistant.db`

### Node Module Issues
If you encounter module-related errors:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json

# Reinstall
npm install
cd frontend && npm install
```

## Next Steps

After successful installation:

1. Read the [User Guide](./user-guide.md) to learn how to use the features
2. Check the [Quick Start Guide](./quick-start.md) for common tasks
3. Review [Feature Documentation](./features/) for detailed module information

## Support

For issues or questions:
- Check the [Troubleshooting Guide](./troubleshooting.md)
- Review the [FAQ](./faq.md)
- Open an issue on GitHub

## Security Notes

- Never commit your `.env` file to version control
- Change default secrets in production
- Regularly backup your database file
- Keep Node.js and dependencies updated
