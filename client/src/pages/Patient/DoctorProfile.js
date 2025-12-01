import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    date: '',
    notes: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/doctors/${id}`);
      setDoctor(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.post('http://localhost:5000/api/patients/appointments', {
        doctorId: id,
        date: bookingData.date,
        notes: bookingData.notes
      }, config);

      setMessage('Appointment request sent successfully!');
      setTimeout(() => navigate('/patient/dashboard'), 2000);
    } catch (err) {
      setMessage('Failed to book appointment.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!doctor) return <div>Doctor not found</div>;

  return (
    <div>
      <Navbar role="patient" />
      <div className="container">
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#e2e8f0' }}></div>
            <div>
              <h1>Dr. {doctor.name}</h1>
              <p style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{doctor.specialization}</p>
              <p>{doctor.experience || 0} years experience</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem' }}>₹{doctor.fees || 500} Consultation Fee</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
            <h3>Book Appointment</h3>
            {message && <div style={{ padding: '1rem', background: message.includes('success') ? '#dcfce7' : '#fee2e2', color: message.includes('success') ? '#166534' : '#991b1b', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}
            
            <form onSubmit={handleBooking} className="grid">
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date</label>
                <input 
                  type="date" 
                  className="input" 
                  required
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Notes (Optional)</label>
                <textarea 
                  className="input" 
                  rows="3"
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Request Appointment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
