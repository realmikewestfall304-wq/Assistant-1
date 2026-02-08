import React from 'react';
import './CommonPages.css';

const RemindersPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Reminders</h2>
        <button className="btn-primary">+ New Reminder</button>
      </div>
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">🔔</div>
          <div className="empty-state-text">Reminders Module</div>
          <div className="empty-state-subtext">
            Set smart reminders to never miss important tasks or deadlines
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;
