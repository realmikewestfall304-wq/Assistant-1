import React from 'react';
import './CommonPages.css';

const ManagementPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Management Tools</h2>
        <button className="btn-primary">+ New Note</button>
      </div>
      
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <div className="empty-state-text">Management Tools</div>
          <div className="empty-state-subtext">
            Organize your knowledge base, documents, and important information
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
