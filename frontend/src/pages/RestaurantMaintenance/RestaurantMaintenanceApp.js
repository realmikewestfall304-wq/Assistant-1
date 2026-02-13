import React, { useState } from 'react';
import Login from '../../components/RestaurantMaintenance/Login';
import StoreDashboard from './StoreDashboard';
import MaintenanceDashboard from './MaintenanceDashboard';

const RestaurantMaintenanceApp = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  if (!user || !token) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role === 'store_manager') {
    return <StoreDashboard user={user} token={token} onLogout={handleLogout} />;
  }

  if (user.role === 'maintenance_provider' || user.role === 'admin') {
    return <MaintenanceDashboard user={user} token={token} onLogout={handleLogout} />;
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Unknown user role</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RestaurantMaintenanceApp;
