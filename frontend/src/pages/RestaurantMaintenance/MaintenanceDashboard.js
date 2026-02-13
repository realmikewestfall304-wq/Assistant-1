import React, { useState } from 'react';
import WorkOrderList from '../../components/RestaurantMaintenance/WorkOrderList';
import WorkOrderDetails from './WorkOrderDetails';
import './StoreDashboard.css';

const MaintenanceDashboard = ({ user, token, onLogout }) => {
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  const handleSelectWorkOrder = (workOrder) => {
    setSelectedWorkOrder(workOrder);
  };

  const handleBack = () => {
    setSelectedWorkOrder(null);
  };

  return (
    <div className="maintenance-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🔧 Maintenance Provider Dashboard</h1>
          <p>Welcome, {user.username} ({user.store_name || 'Maintenance Provider'})</p>
        </div>
        <button onClick={onLogout} className="btn-logout">Logout</button>
      </header>

      <div className="dashboard-content">
        {!selectedWorkOrder ? (
          <WorkOrderList token={token} onSelectWorkOrder={handleSelectWorkOrder} />
        ) : (
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

export default MaintenanceDashboard;
