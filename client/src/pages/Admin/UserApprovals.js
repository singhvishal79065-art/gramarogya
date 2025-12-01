import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const UserApprovals = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const res = await axios.get('http://localhost:5000/api/admin/users?isApproved=false', config);
      setUsers(res.data.filter(u => u.role === 'doctor' || u.role === 'shopkeeper'));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.put(`http://localhost:5000/api/admin/users/${id}/approve`, {}, config);
      fetchUsers(); // Refresh list
    } catch (err) {
      alert('Failed to approve user');
    }
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Pending Approvals</h1>
        
        {loading ? <p>Loading...</p> : (
          <div className="grid">
            {users.map(user => (
              <div key={user._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3>{user.name}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{user.role.toUpperCase()}</p>
                  <p style={{ color: 'var(--text-light)' }}>{user.email}</p>
                  {user.role === 'doctor' && <p>Specialization: {user.specialization}</p>}
                  {user.role === 'shopkeeper' && <p>Shop: {user.shopName}</p>}
                </div>
                <button className="btn btn-primary" onClick={() => handleApprove(user._id)}>Approve</button>
              </div>
            ))}
            {users.length === 0 && <p>No pending approvals.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApprovals;
