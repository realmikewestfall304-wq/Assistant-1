import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WorkOrderDetails.css';

const WorkOrderDetails = ({ workOrderId, token, user, onBack }) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateText, setUpdateText] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    fetchWorkOrderDetails();
    if (user.role === 'maintenance_provider' || user.role === 'admin') {
      fetchTechnicians();
    }
  }, [workOrderId, user.role]);

  const fetchWorkOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/work-orders/${workOrderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkOrder(response.data.workOrder);
      setAttachments(response.data.attachments);
      setUpdates(response.data.updates);
      setNewStatus(response.data.workOrder.status);
      setAssignedTo(response.data.workOrder.assigned_to || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching work order details:', error);
      setLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('/api/users/technicians', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTechnicians(response.data.technicians);
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  };

  const handleAddUpdate = async (e) => {
    e.preventDefault();
    if (!updateText.trim()) return;

    try {
      await axios.post(
        `/api/work-orders/${workOrderId}/updates`,
        { update_text: updateText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUpdateText('');
      fetchWorkOrderDetails();
    } catch (error) {
      console.error('Error adding update:', error);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(
        `/api/work-orders/${workOrderId}`,
        { status: newStatus, assigned_to: assignedTo || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWorkOrderDetails();
    } catch (error) {
      console.error('Error updating work order:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return <div className="loading">Loading work order details...</div>;
  }

  if (!workOrder) {
    return <div className="error">Work order not found</div>;
  }

  const canManage = user.role === 'maintenance_provider' || user.role === 'admin';

  return (
    <div className="work-order-details">
      <button onClick={onBack} className="btn-back">← Back to List</button>

      <div className="details-header">
        <div>
          <h2>Work Order #{workOrder.id}</h2>
          <div className="header-badges">
            <span className={`priority-badge ${getPriorityClass(workOrder.priority)}`}>
              {workOrder.priority.toUpperCase()}
            </span>
            <span className={`status-badge ${getStatusClass(workOrder.status)}`}>
              {formatStatus(workOrder.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-main">
          <div className="info-section">
            <h3>{workOrder.title}</h3>
            <p className="description">{workOrder.description}</p>

            <div className="info-grid">
              <div className="info-item">
                <label>Store:</label>
                <span>{workOrder.store_name}</span>
              </div>
              <div className="info-item">
                <label>Address:</label>
                <span>{workOrder.store_address || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Location:</label>
                <span>{workOrder.location_details}</span>
              </div>
              <div className="info-item">
                <label>Category:</label>
                <span>{workOrder.category}</span>
              </div>
              <div className="info-item">
                <label>Submitted By:</label>
                <span>{workOrder.submitted_by_username}</span>
              </div>
              <div className="info-item">
                <label>Submitted:</label>
                <span>{formatDate(workOrder.created_at)}</span>
              </div>
              <div className="info-item">
                <label>Last Updated:</label>
                <span>{formatDate(workOrder.updated_at)}</span>
              </div>
              {workOrder.assigned_to_username && (
                <div className="info-item">
                  <label>Assigned To:</label>
                  <span>{workOrder.assigned_to_username}</span>
                </div>
              )}
              {workOrder.completed_at && (
                <div className="info-item">
                  <label>Completed:</label>
                  <span>{formatDate(workOrder.completed_at)}</span>
                </div>
              )}
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="attachments-section">
              <h3>Attachments</h3>
              <div className="attachments-grid">
                {attachments.map(att => (
                  <div key={att.id} className="attachment-item">
                    <img src={`/${att.file_path}`} alt={att.file_name} />
                    <p>{att.file_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="updates-section">
            <h3>Updates & Notes</h3>
            {updates.length === 0 ? (
              <p className="no-updates">No updates yet</p>
            ) : (
              <div className="updates-timeline">
                {updates.map(update => (
                  <div key={update.id} className="update-item">
                    <div className="update-header">
                      <strong>{update.username}</strong>
                      <span className="update-date">{formatDate(update.created_at)}</span>
                    </div>
                    <p className="update-text">{update.update_text}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAddUpdate} className="add-update-form">
              <textarea
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                placeholder="Add a note or update..."
                rows="3"
              />
              <button type="submit" className="btn-add-update">Add Update</button>
            </form>
          </div>
        </div>

        {canManage && (
          <div className="details-sidebar">
            <div className="management-section">
              <h3>Manage Work Order</h3>

              <div className="form-group">
                <label>Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Assign To</label>
                <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                  <option value="">Unassigned</option>
                  {technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>
                      {tech.username}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleUpdateStatus} className="btn-update-status">
                Update Work Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkOrderDetails;
