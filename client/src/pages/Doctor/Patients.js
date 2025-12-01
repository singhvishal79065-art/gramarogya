import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const DoctorPatients = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      // Reusing appointments endpoint to get unique patients for now
      const res = await axios.get('http://localhost:5000/api/doctors/appointments', config);
      
      // Filter unique patients
      const uniquePatients = [];
      const map = new Map();
      for (const item of res.data) {
          if(!map.has(item.patient._id)){
              map.set(item.patient._id, true);    // set any value to Map
              uniquePatients.push({
                ...item.patient,
                lastVisit: item.date
              });
          }
      }
      
      setAppointments(uniquePatients);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar role="doctor" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>My Patients</h1>
        
        {loading ? <p>Loading...</p> : (
          <div className="grid grid-3">
            {appointments.map(patient => (
              <div key={patient._id} className="card">
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e2e8f0', marginBottom: '1rem' }}></div>
                <h3>{patient.name}</h3>
                <p style={{ color: 'var(--text-light)' }}>{patient.email}</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>View History</button>
              </div>
            ))}
            {appointments.length === 0 && <p>No patients found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;
