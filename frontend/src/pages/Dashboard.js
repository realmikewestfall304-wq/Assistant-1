import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { managementAPI, mentorAPI } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [motivation, setMotivation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, motivationRes] = await Promise.all([
        managementAPI.getDashboardStats(),
        mentorAPI.getMotivation()
      ]);
      setStats(statsRes.data);
      setMotivation(motivationRes.data.message);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome to Your Assistant Dashboard</h1>
        <p className="subtitle">Your personal mentor and assistant for business and life management</p>
      </div>

      <div className="motivation-card">
        <div className="motivation-icon">💡</div>
        <div className="motivation-content">
          <h3>Daily Inspiration</h3>
          <p>{motivation}</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon="✓"
          title="Pending Tasks"
          value={stats?.pending_tasks || 0}
          link="/tasks"
          color="#3498db"
        />
        <StatCard
          icon="📅"
          title="Today's Events"
          value={stats?.todays_events || 0}
          link="/calendar"
          color="#9b59b6"
        />
        <StatCard
          icon="🔔"
          title="Active Reminders"
          value={stats?.active_reminders || 0}
          link="/reminders"
          color="#e74c3c"
        />
        <StatCard
          icon="🎯"
          title="Active Goals"
          value={stats?.active_goals || 0}
          link="/business-plan"
          color="#f39c12"
        />
      </div>

      <div className="financial-summary">
        <h3>This Month's Financial Overview</h3>
        <div className="financial-cards">
          <div className="financial-card income">
            <div className="financial-label">Income</div>
            <div className="financial-value">${(stats?.monthly_income || 0).toFixed(2)}</div>
          </div>
          <div className="financial-card expenses">
            <div className="financial-label">Expenses</div>
            <div className="financial-value">${(stats?.monthly_expenses || 0).toFixed(2)}</div>
          </div>
          <div className="financial-card profit">
            <div className="financial-label">Net Profit</div>
            <div className="financial-value">${(stats?.monthly_profit || 0).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <QuickActionButton icon="✓" label="Add Task" link="/tasks" />
          <QuickActionButton icon="📅" label="Schedule Event" link="/calendar" />
          <QuickActionButton icon="🔔" label="Set Reminder" link="/reminders" />
          <QuickActionButton icon="💰" label="Log Transaction" link="/financial" />
          <QuickActionButton icon="🎓" label="Get Advice" link="/mentor" />
          <QuickActionButton icon="📊" label="Business Plan" link="/business-plan" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, link, color }) => (
  <Link to={link} className="stat-card" style={{ borderTopColor: color }}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
    </div>
  </Link>
);

const QuickActionButton = ({ icon, label, link }) => (
  <Link to={link} className="quick-action-btn">
    <span className="action-icon">{icon}</span>
    <span className="action-label">{label}</span>
  </Link>
);

export default Dashboard;
