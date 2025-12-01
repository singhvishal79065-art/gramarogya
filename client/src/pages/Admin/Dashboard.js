import React from 'react';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  return (
    <div>
      <Navbar role="admin" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
        
        <div className="grid grid-2">
          <div className="card">
            <h3>User Approvals</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>Approve new doctors and shopkeepers.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/admin/users'}>Manage Users</button>
          </div>
          
          <div className="card">
            <h3>Reports & Issues</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>View and resolve user complaints.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/admin/reports'}>View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
