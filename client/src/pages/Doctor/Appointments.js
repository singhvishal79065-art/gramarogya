import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const res = await axios.get('http://localhost:5000/api/doctors/appointments', config);
      setAppointments(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.put(`http://localhost:5000/api/doctors/appointments/${id}`, { status }, config);
      fetchAppointments(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div>
      <Navbar role="doctor" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Appointments</h1>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid">
            {appointments.map(apt => (
              <div key={apt._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3>{apt.patient.name}</h3>
                  <p style={{ color: 'var(--text-light)' }}>Date: {new Date(apt.date).toLocaleDateString()}</p>
                  {apt.notes && <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Note: {apt.notes}</p>}
                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem',
                      background: apt.status === 'approved' ? '#dcfce7' : apt.status === 'rejected' ? '#fee2e2' : '#fef9c3',
                      color: apt.status === 'approved' ? '#166534' : apt.status === 'rejected' ? '#991b1b' : '#854d0e'
                    }}>
                      {apt.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                {apt.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      className="btn" 
                      style={{ background: '#22c55e', color: 'white' }}
                      onClick={() => handleStatusUpdate(apt._id, 'approved')}
                    >
                      Accept
                    </button>
                    <button 
                      className="btn" 
                      style={{ background: '#ef4444', color: 'white' }}
                      onClick={() => handleStatusUpdate(apt._id, 'rejected')}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
            {appointments.length === 0 && <p>No appointments found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
