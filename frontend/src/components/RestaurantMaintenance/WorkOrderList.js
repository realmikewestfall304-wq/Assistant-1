import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkOrderCard from './WorkOrderCard';
import './WorkOrderList.css';

const WorkOrderList = ({ token, onSelectWorkOrder }) => {
  const [workOrders, setWorkOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: ''
  });

  useEffect(() => {
    fetchWorkOrders();
  }, [token]);

  useEffect(() => {
    applyFilters();
  }, [workOrders, filters]);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get('/api/work-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkOrders(response.data.workOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching work orders:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...workOrders];

    if (filters.status) {
      filtered = filtered.filter(wo => wo.status === filters.status);
    }

    if (filters.priority) {
      filtered = filtered.filter(wo => wo.priority === filters.priority);
    }

    if (filters.category) {
      filtered = filtered.filter(wo => wo.category === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(wo =>
        wo.title.toLowerCase().includes(searchLower) ||
        wo.description.toLowerCase().includes(searchLower) ||
        wo.store_name.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      category: '',
      search: ''
    });
  };

  if (loading) {
    return <div className="loading">Loading work orders...</div>;
  }

  return (
    <div className="work-order-list">
      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option value="">All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All</option>
              <option value="Lighting">Lighting</option>
              <option value="Equipment">Equipment</option>
              <option value="HVAC">HVAC</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Upkeep">Upkeep</option>
              <option value="Safety">Safety</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        <button onClick={clearFilters} className="btn-clear-filters">
          Clear Filters
        </button>
      </div>

      <div className="results-header">
        <h3>Work Orders ({filteredOrders.length})</h3>
        <button onClick={fetchWorkOrders} className="btn-refresh">
          🔄 Refresh
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-results">
          No work orders found. Try adjusting your filters.
        </div>
      ) : (
        <div className="work-orders-grid">
          {filteredOrders.map(workOrder => (
            <WorkOrderCard
              key={workOrder.id}
              workOrder={workOrder}
              onClick={() => onSelectWorkOrder(workOrder)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkOrderList;
