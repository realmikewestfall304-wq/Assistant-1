import React from 'react';
import './CommonPages.css';

const CommunicationsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Communications</h2>
        <button className="btn-primary">+ New Contact</button>
      </div>
      
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">💬</div>
          <div className="empty-state-text">Communications Module</div>
          <div className="empty-state-subtext">
            Manage contacts, log communications, and track follow-ups
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationsPage;
