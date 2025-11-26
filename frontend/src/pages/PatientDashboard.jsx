import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
            <h2 className="text-xl mb-6">Welcome, {user.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/book-appointment" className="bg-blue-100 p-6 rounded shadow hover:bg-blue-200 transition">
                    <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
                    <p>Schedule a consultation with a doctor.</p>
                </Link>
                <Link to="/shop" className="bg-green-100 p-6 rounded shadow hover:bg-green-200 transition">
                    <h3 className="text-xl font-semibold mb-2">Buy Medicines</h3>
                    <p>Purchase medicines from our shop.</p>
                </Link>
                <Link to="/my-consultant" className="bg-purple-100 p-6 rounded shadow hover:bg-purple-200 transition">
                    <h3 className="text-xl font-semibold mb-2">My Consultant</h3>
                    <p>View your consultation history and prescriptions.</p>
                </Link>
            </div>
        </div>
    );
};

export default PatientDashboard;
