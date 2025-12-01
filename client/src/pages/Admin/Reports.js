import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const res = await axios.get('http://localhost:5000/api/admin/reports', config);
      setReports(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.put(`http://localhost:5000/api/admin/reports/${id}`, {}, config);
      fetchReports();
    } catch (err) {
      alert('Failed to resolve report');
    }
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Reports</h1>
        
        {loading ? <p>Loading...</p> : (
          <div className="grid">
            {reports.map(report => (
              <div key={report._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>Report by {report.reporter?.name}</h3>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem',
                    background: report.status === 'resolved' ? '#dcfce7' : '#fee2e2',
                    color: report.status === 'resolved' ? '#166534' : '#991b1b'
                  }}>
                    {report.status.toUpperCase()}
                  </span>
                </div>
                <p style={{ margin: '1rem 0' }}>{report.description}</p>
                {report.status === 'pending' && (
                  <button className="btn btn-primary" onClick={() => handleResolve(report._id)}>Mark Resolved</button>
                )}
              </div>
            ))}
            {reports.length === 0 && <p>No reports found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
