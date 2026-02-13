import React from 'react';
import './WorkOrderCard.css';

const WorkOrderCard = ({ workOrder, onClick }) => {
  const getPriorityClass = (priority) => {
    const classes = {
      critical: 'priority-critical',
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return classes[priority] || 'priority-medium';
  };

  const getStatusClass = (status) => {
    const classes = {
      pending: 'status-pending',
      assigned: 'status-assigned',
      in_progress: 'status-in-progress',
      completed: 'status-completed',
      closed: 'status-closed'
    };
    return classes[status] || 'status-pending';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="work-order-card" onClick={onClick}>
      <div className="card-header">
        <div className="card-badges">
          <span className={`priority-badge ${getPriorityClass(workOrder.priority)}`}>
            {workOrder.priority.toUpperCase()}
          </span>
          <span className={`status-badge ${getStatusClass(workOrder.status)}`}>
            {formatStatus(workOrder.status)}
          </span>
        </div>
        <div className="card-id">#{workOrder.id}</div>
      </div>

      <h3 className="card-title">{workOrder.title}</h3>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-icon">🏪</span>
          <span>{workOrder.store_name}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📍</span>
          <span>{workOrder.location_details}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🔧</span>
          <span>{workOrder.category}</span>
        </div>
      </div>

      <p className="card-description">
        {workOrder.description.substring(0, 100)}
        {workOrder.description.length > 100 ? '...' : ''}
      </p>

      <div className="card-footer">
        <div className="footer-item">
          <small>Submitted: {formatDate(workOrder.created_at)}</small>
        </div>
        {workOrder.assigned_to_username && (
          <div className="footer-item">
            <small>Assigned to: {workOrder.assigned_to_username}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkOrderCard;
