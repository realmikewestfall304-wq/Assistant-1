# Running Assistant-1 Application

## ✅ Verified Steps to Get the App Running

This guide provides verified step-by-step instructions to get the Assistant-1 application up and running on your local machine.

## Prerequisites

Before starting, ensure you have:
- **Node.js** version 16.x or higher installed
- **npm** version 8.x or higher installed

Check your versions:
```bash
node --version  # Should be v16.x or higher
npm --version   # Should be 8.x or higher
```

## Installation Steps

### Step 1: Navigate to the Project Directory
```bash
cd Assistant-1
```

### Step 2: Install Dependencies

You have two options:

**Option A: Install All at Once (Recommended)**
```bash
npm run install-all
```
This installs both backend and frontend dependencies automatically.

**Option B: Install Separately**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Step 3: Start the Application

**Start Both Backend and Frontend:**
```bash
npm run dev
```

This command starts:
- Backend server on **http://localhost:5000**
- Frontend React app on **http://localhost:3000**

**Alternative: Start Services Separately**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

## Verification

### 1. Check Backend Server
Open http://localhost:5000/api/health in your browser or run:
```bash
curl http://localhost:5000/api/health
```
Expected response:
```json
{"status":"OK","message":"Assistant-1 API is running"}
```

### 2. Check Frontend Application
Open http://localhost:3000 in your browser. You should see:
- Assistant-1 Dashboard
- Navigation sidebar with modules (Tasks, Calendar, Reminders, etc.)
- Main dashboard with overview cards

### 3. Test API Endpoints
```bash
# Test tasks endpoint
curl http://localhost:5000/api/tasks

# Test calendar endpoint
curl http://localhost:5000/api/calendar

# Test reminders endpoint
curl http://localhost:5000/api/reminders
```
All should return empty arrays `[]` on first run.

## Application URLs

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## Available Modules

Once running, you can access these features:

1. **Dashboard** (/) - Overview of your tasks, calendar, and finances
2. **Tasks** (/tasks) - Create and manage your tasks
3. **Calendar** (/calendar) - Schedule events and appointments
4. **Reminders** (/reminders) - Set up reminders
5. **Financial** (/financial) - Track income and expenses
6. **Mentor** (/mentor) - Get business advice and guidance
7. **Business Plan** (/business-plan) - Create business plans
8. **Communications** (/communications) - Manage contacts
9. **Management** (/management) - Knowledge base and notes

## Database

The application uses SQLite for data storage:
- **Location**: `./database/assistant.db`
- **Auto-created**: Database is automatically created when the backend starts
- **Schema**: All required tables are initialized automatically

## Troubleshooting

### Port Already in Use

If you see "Port 5000 is already in use" or "Port 3000 is already in use":

**Stop existing processes:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Or use custom ports:**
```bash
# Backend on different port
PORT=5001 npm run server

# Frontend will automatically proxy to the configured backend
```

### Dependencies Installation Fails

If npm install fails:
```bash
# Clear npm cache
npm cache clean --force

# Remove existing node_modules
rm -rf node_modules frontend/node_modules

# Reinstall
npm run install-all
```

### Database Issues

If you encounter database errors:
```bash
# Remove existing database
rm -rf database/assistant.db

# Restart the backend (database will be recreated)
npm run server
```

## Stopping the Application

To stop the application:
1. Press `Ctrl + C` in the terminal where `npm run dev` is running
2. If services are running separately, press `Ctrl + C` in each terminal

## Next Steps

After the application is running:
1. Read the [Quick Start Guide](./docs/quick-start.md) for a walkthrough
2. Check the [User Guide](./docs/user-guide.md) for detailed feature documentation
3. Explore the [Setup Guide](./docs/setup.md) for advanced configuration

## Production Build

To build for production:
```bash
# Build the frontend
npm run build

# The built files will be in frontend/build/
# In production mode, the backend serves these static files
```

To run in production mode:
```bash
NODE_ENV=production node backend/server.js
```

---

**Need Help?** Check the documentation in the `docs/` folder or open an issue on GitHub.
