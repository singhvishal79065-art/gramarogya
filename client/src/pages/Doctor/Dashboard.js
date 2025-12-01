import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'doctor') {
      window.location.href = '/login';
      return;
    }
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      console.log(config)
      const res = await axios.get('http://localhost:5000/api/doctors/appointments', config);
      setAppointments(res.data.slice(0, 5)); // Show recent 5
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar role="doctor" />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Doctor Dashboard</h1>
          <button className="btn btn-primary" onClick={() => window.location.href='/chat'}>
            Open Chat
          </button>
        </div>
        
        <div className="grid grid-3">
          <div className="card">
            <h3>Appointments</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>Manage your upcoming appointments and requests.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/doctor/appointments'}>View All Appointments</button>
          </div>
          
          <div className="card">
            <h3>My Patients</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>View patient history and records.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/doctor/patients'}>View Patients</button>
          </div>
          
          <div className="card">
            <h3>Profile Settings</h3>
            <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>Update your profile and availability.</p>
            <button className="btn btn-primary" onClick={() => window.location.href='/doctor/profile'}>Edit Profile</button>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h2>Recent Appointment Requests</h2>
          <div className="grid" style={{ marginTop: '1rem' }}>
            {appointments.length > 0 ? (
              appointments.map(apt => (
                <div key={apt._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4>{apt.patient ? apt.patient.name : 'Unknown Patient'}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                      {new Date(apt.date).toLocaleDateString()}
                      {apt.notes && <span style={{ display: 'block', fontStyle: 'italic' }}>Note: {apt.notes}</span>}
                    </p>
                  </div>
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
              ))
            ) : (
              <p style={{ color: 'var(--text-light)' }}>No recent appointments.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
