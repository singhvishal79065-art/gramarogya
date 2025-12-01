import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="glass" style={{ padding: '1rem 2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>🏥</span> Gramarogya
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {role === 'patient' && (
          <>
            <Link to="/patient/dashboard">Dashboard</Link>
            <Link to="/patient/doctors">Find Doctors</Link>
            <Link to="/patient/medicines">Medicines</Link>
            <Link to="/patient/history">History</Link>
          </>
        )}
        
        {role === 'doctor' && (
          <>
            <Link to="/doctor/dashboard">Dashboard</Link>
            <Link to="/doctor/appointments">Appointments</Link>
            <Link to="/doctor/patients">My Patients</Link>
          </>
        )}

        {role === 'shopkeeper' && (
          <>
            <Link to="/shopkeeper/dashboard">Dashboard</Link>
            <Link to="/shopkeeper/inventory">Inventory</Link>
            <Link to="/shopkeeper/orders">Orders</Link>
          </>
        )}

        {role === 'admin' && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/reports">Reports</Link>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: '500' }}>{user?.name}</span>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
