import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, [specialization]);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      let url = 'http://localhost:5000/api/doctors';
      if (specialization) {
        url += `?specialization=${specialization}`;
      }

      const res = await axios.get(url, config);
      setDoctors(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar role="patient" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Find Doctors</h1>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Filter by Specialization (e.g. Dentist)" 
              className="input"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchDoctors}>Search</button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-3">
            {doctors.map(doctor => (
              <div key={doctor._id} className="card">
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e2e8f0', marginBottom: '1rem' }}></div>
                <h3>Dr. {doctor.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '500' }}>{doctor.specialization}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: '0.5rem 0' }}>{doctor.experience || 0} years experience</p>
                <p style={{ fontWeight: 'bold' }}>₹{doctor.fees || 500}</p>
                <Link to={`/patient/doctors/${doctor._id}`} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>View Profile</Link>
              </div>
            ))}
            {doctors.length === 0 && <p>No doctors found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;
