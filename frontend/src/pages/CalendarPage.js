import React from 'react';
import './CommonPages.css';

const CalendarPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Calendar & Scheduling</h2>
        <button className="btn-primary">+ New Event</button>
      </div>
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <div className="empty-state-text">Calendar Module</div>
          <div className="empty-state-subtext">
            Schedule appointments, manage events, and organize your time effectively
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
