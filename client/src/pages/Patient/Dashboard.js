import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'patient') {
      window.location.href = '/login';
      return;
    }
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get('http://localhost:5000/api/patients/appointments', config);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar role="patient" />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Welcome Back, Patient</h1>
          <button className="btn btn-primary" onClick={() => window.location.href='/chat'}>
            Open Chat
          </button>
        </div>
        
        <div className="grid grid-3">
          <div className="card">
            <h3>Find a Doctor</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>Search for specialists and book appointments.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/patient/doctors'}>Search Now</button>
          </div>
          
          <div className="card">
            <h3>Buy Medicines</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>Order medicines from local shops.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/patient/medicines'}>Shop Now</button>
          </div>
          
          <div className="card">
            <h3>Medical History</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>View your past prescriptions and reports.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/patient/history'}>View History</button>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h2>Upcoming Appointments</h2>
          <div className="grid" style={{ marginTop: '1rem' }}>
            {appointments.length > 0 ? (
              appointments.map(apt => (
                <div key={apt._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4>Dr. {apt.doctor ? apt.doctor.name : 'Unknown'}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{apt.doctor ? apt.doctor.specialization : ''}</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Date: {new Date(apt.date).toLocaleDateString()}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem',
                      background: apt.status === 'approved' ? '#dcfce7' : apt.status === 'rejected' ? '#fee2e2' : '#fef9c3',
                      color: apt.status === 'approved' ? '#166534' : apt.status === 'rejected' ? '#991b1b' : '#854d0e'
                    }}>
                      {apt.status.toUpperCase()}
                    </span>
                    {apt.status === 'approved' && (
                      <button 
                        className="btn" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        onClick={() => window.location.href='/chat'}
                      >
                        Chat
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="card" style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                No upcoming appointments.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
