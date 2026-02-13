import React, { useState } from 'react';
import WorkOrderForm from '../../components/RestaurantMaintenance/WorkOrderForm';
import WorkOrderList from '../../components/RestaurantMaintenance/WorkOrderList';
import WorkOrderDetails from './WorkOrderDetails';
import './StoreDashboard.css';

const StoreDashboard = ({ user, token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  const handleSelectWorkOrder = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setActiveTab('details');
  };

  const handleFormSuccess = () => {
    setActiveTab('list');
  };

  const handleBack = () => {
    setSelectedWorkOrder(null);
    setActiveTab('list');
  };

  return (
    <div className="store-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏪 {user.store_name || 'Store Manager'} Dashboard</h1>
          <p>Welcome, {user.username}</p>
        </div>
        <button onClick={onLogout} className="btn-logout">Logout</button>
      </header>

      <div className="dashboard-tabs">
        <button
          className={activeTab === 'list' ? 'tab-active' : 'tab'}
          onClick={() => setActiveTab('list')}
        >
          My Work Orders
        </button>
        <button
          className={activeTab === 'new' ? 'tab-active' : 'tab'}
          onClick={() => setActiveTab('new')}
        >
          Submit New Request
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'list' && (
          <WorkOrderList token={token} onSelectWorkOrder={handleSelectWorkOrder} />
        )}
        {activeTab === 'new' && (
          <WorkOrderForm token={token} onSuccess={handleFormSuccess} />
        )}
        {activeTab === 'details' && selectedWorkOrder && (
          <WorkOrderDetails
            workOrderId={selectedWorkOrder.id}
            token={token}
            user={user}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default StoreDashboard;
