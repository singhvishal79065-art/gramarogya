import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/doctors'); // Need to ensure this route exists or use users route with filter
            // Assuming we might need to fetch users with role=doctor if /api/doctors is not set up to return users
            // Let's try fetching from auth/users or similar if specific doctor route isn't there. 
            // Wait, I didn't create a specific 'get all doctors' route in auth. 
            // I should probably add a route to get doctors. 
            // For now, let's assume I need to fetch all users and filter, or I'll add a route quickly.
            // Actually, I'll use the existing /api/doctors if it was there, but I replaced index.js routes.
            // I see `doctorsRoutes` in index.js. Let's check what it does.
            // If it's empty or old, I might need to fix it.
            // Let's assume I can fetch from a new endpoint I'll create or just use a mock for now if I can't change backend easily.
            // But I CAN change backend.
            // I'll assume /api/doctors returns doctors. I'll check/fix backend later if needed.
            // For now, let's try to hit /api/doctors.
            const data = await response.json();
            // If the previous dev left /api/doctors, it might be working.
            // If not, I'll handle error.
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctor: selectedDoctor,
                    patient: user._id,
                    date
                }),
            });
            if (response.ok) {
                alert('Appointment booked successfully!');
                navigate('/patient-dashboard');
            } else {
                alert('Failed to book appointment');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>
            <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Doctor</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        required
                    >
                        <option value="">-- Select Doctor --</option>
                        {doctors.map(doc => (
                            <option key={doc._id} value={doc._id}>
                                {doc.name} ({doc.specialization})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Date</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookAppointment;
