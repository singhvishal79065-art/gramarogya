import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    specialization: '', // For doctor
    shopName: '' // For shopkeeper
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password, role, specialization, shopName } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="card glass" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Join Gramarogya</h2>
        {error && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={onSubmit} className="grid">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={name}
            onChange={onChange}
            className="input"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            className="input"
            required
          />
          <select name="role" value={role} onChange={onChange} className="input">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="shopkeeper">Shopkeeper</option>
          </select>

          {role === 'doctor' && (
            <input
              type="text"
              placeholder="Specialization (e.g. Cardiologist)"
              name="specialization"
              value={specialization}
              onChange={onChange}
              className="input"
              required
            />
          )}

          {role === 'shopkeeper' && (
            <input
              type="text"
              placeholder="Shop Name"
              name="shopName"
              value={shopName}
              onChange={onChange}
              className="input"
              required
            />
          )}

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
