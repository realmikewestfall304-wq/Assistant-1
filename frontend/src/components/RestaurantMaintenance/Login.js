import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'store_manager',
    store_name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      onLogin(response.data.user, token);
    } catch (error) {
      localStorage.removeItem('token');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
      const payload = isLoginMode
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(endpoint, payload);
      
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user, response.data.token);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🏪 Restaurant Maintenance System</h2>
        <h3>{isLoginMode ? 'Login' : 'Register'}</h3>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLoginMode && (
            <>
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="store_manager">Store Manager</option>
                  <option value="maintenance_provider">Maintenance Provider</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label>Store/Company Name</label>
                <input
                  type="text"
                  name="store_name"
                  value={formData.store_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Please wait...' : (isLoginMode ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="toggle-mode">
          {isLoginMode ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLoginMode(false)} className="link-button">
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLoginMode(true)} className="link-button">
                Login here
              </button>
            </p>
          )}
        </div>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>Store Manager:</strong> store1 / password123</p>
          <p><strong>Maintenance:</strong> maintenance1 / password123</p>
          <p><strong>Admin:</strong> admin / password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
