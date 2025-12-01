import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const res = await axios.get('http://localhost:5000/api/patients/history', config);
      setHistory(res.data);
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
        <h1 style={{ marginBottom: '2rem' }}>Medical History</h1>
        
        {loading ? <p>Loading...</p> : (
          <div className="grid">
            {history.map(record => (
              <div key={record._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>Dr. {record.doctor.name}</h3>
                  <span style={{ color: 'var(--text-light)' }}>{new Date(record.date).toLocaleDateString()}</span>
                </div>
                <p style={{ color: 'var(--primary)' }}>{record.doctor.specialization}</p>
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                  <p><strong>Notes:</strong> {record.notes || 'No notes'}</p>
                  {/* Prescription details would go here if implemented */}
                </div>
              </div>
            ))}
            {history.length === 0 && <p>No medical history found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
