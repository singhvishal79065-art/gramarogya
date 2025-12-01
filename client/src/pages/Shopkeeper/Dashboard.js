import React from 'react';
import Navbar from '../../components/Navbar';

const ShopkeeperDashboard = () => {
  return (
    <div>
      <Navbar role="shopkeeper" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Shopkeeper Dashboard</h1>
        
        <div className="grid grid-2">
          <div className="card">
            <h3>Inventory Management</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>Add and manage your medicines and products.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/shopkeeper/inventory'}>Manage Inventory</button>
          </div>
          
          <div className="card">
            <h3>Order Management</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>View and process customer orders.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/shopkeeper/orders'}>View Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
