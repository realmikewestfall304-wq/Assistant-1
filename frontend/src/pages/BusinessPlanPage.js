import React from 'react';
import './CommonPages.css';

const BusinessPlanPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Business Planning</h2>
        <button className="btn-primary">+ New Plan</button>
      </div>
      
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <div className="empty-state-text">Business Planning Module</div>
          <div className="empty-state-subtext">
            Create business plans, set goals, and track your progress toward success
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanPage;
