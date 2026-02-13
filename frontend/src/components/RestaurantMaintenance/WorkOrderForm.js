import React, { useState } from 'react';
import axios from 'axios';
import './WorkOrderForm.css';

const WorkOrderForm = ({ token, onSuccess }) => {
  const [formData, setFormData] = useState({
    store_name: '',
    store_address: '',
    location_details: '',
    category: 'Equipment',
    priority: 'medium',
    title: '',
    description: ''
  });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Lighting',
    'Equipment',
    'HVAC',
    'Plumbing',
    'Upkeep',
    'Safety',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low - Non-urgent' },
    { value: 'medium', label: 'Medium - Standard' },
    { value: 'high', label: 'High - Important' },
    { value: 'critical', label: 'Critical - Immediate' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 5) {
      setError('Maximum 5 photos allowed');
      return;
    }
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      photos.forEach(photo => {
        data.append('photos', photo);
      });

      await axios.post('/api/work-orders', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form
      setFormData({
        store_name: '',
        store_address: '',
        location_details: '',
        category: 'Equipment',
        priority: 'medium',
        title: '',
        description: ''
      });
      setPhotos([]);

      if (onSuccess) onSuccess();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit work order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="work-order-form">
      <h2>Submit New Work Order</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Store Name *</label>
            <input
              type="text"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Store Address</label>
            <input
              type="text"
              name="store_address"
              value={formData.store_address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Specific Location *</label>
          <input
            type="text"
            name="location_details"
            value={formData.location_details}
            onChange={handleChange}
            placeholder="e.g., Kitchen, Dining Room, Restroom"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Priority *</label>
            <select name="priority" value={formData.priority} onChange={handleChange} required>
              {priorities.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Issue Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Brief description of the issue"
            required
          />
        </div>

        <div className="form-group">
          <label>Detailed Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Provide detailed information about the issue"
            required
          />
        </div>

        <div className="form-group">
          <label>Photos (Max 5)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          {photos.length > 0 && (
            <div className="photo-preview">
              {photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <span>{photo.name}</span>
                  <button type="button" onClick={() => removePhoto(index)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Submitting...' : 'Submit Work Order'}
        </button>
      </form>
    </div>
  );
};

export default WorkOrderForm;
