import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Gram Arogya</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name} ({user.role})</span>
              {user.role === 'patient' && (
                <>
                  <Link to="/patient-dashboard" className="mr-4 hover:underline">Dashboard</Link>
                  <Link to="/book-appointment" className="mr-4 hover:underline">Book Appointment</Link>
                  <Link to="/shop" className="mr-4 hover:underline">Shop</Link>
                  <Link to="/cart" className="mr-4 hover:underline">Cart</Link>
                  <Link to="/my-consultant" className="mr-4 hover:underline">My Consultant</Link>
                </>
              )}
              {user.role === 'doctor' && (
                <Link to="/doctor-dashboard" className="mr-4 hover:underline">Dashboard</Link>
              )}
              {user.role === 'shopkeeper' && (
                <Link to="/shopkeeper-dashboard" className="mr-4 hover:underline">Dashboard</Link>
              )}
              {user.role === 'admin' && (
                <Link to="/admin-dashboard" className="mr-4 hover:underline">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
