import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import RemindersPage from './pages/RemindersPage';
import FinancialPage from './pages/FinancialPage';
import MentorPage from './pages/MentorPage';
import BusinessPlanPage from './pages/BusinessPlanPage';
import CommunicationsPage from './pages/CommunicationsPage';
import ManagementPage from './pages/ManagementPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/financial" element={<FinancialPage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/business-plan" element={<BusinessPlanPage />} />
          <Route path="/communications" element={<CommunicationsPage />} />
          <Route path="/management" element={<ManagementPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
