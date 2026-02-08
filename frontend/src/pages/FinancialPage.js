import React from 'react';
import './CommonPages.css';

const FinancialPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Financial Management</h2>
        <button className="btn-primary">+ New Transaction</button>
      </div>
      
      <div className="card">
        <h3>Financial Overview</h3>
        <div className="empty-state">
          <div className="empty-state-icon">💰</div>
          <div className="empty-state-text">Financial Management Module</div>
          <div className="empty-state-subtext">
            Track income, expenses, budgets, and financial goals
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPage;
