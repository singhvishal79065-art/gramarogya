import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [prescription, setPrescription] = useState('');
    const [suggestedMedicines, setSuggestedMedicines] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/appointments?userId=${user._id}&role=doctor`);
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleConsultation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/consultations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctor: user._id,
                    patient: selectedAppointment.patient._id,
                    appointment: selectedAppointment._id,
                    prescription,
                    suggestedMedicines: suggestedMedicines.split(',').map(m => m.trim())
                }),
            });
            if (response.ok) {
                alert('Consultation added successfully');
                setSelectedAppointment(null);
                setPrescription('');
                setSuggestedMedicines('');
            } else {
                alert('Failed to add consultation');
            }
        } catch (error) {
            console.error('Error adding consultation:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
            <h2 className="text-xl mb-4">Welcome, Dr. {user.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Appointments</h3>
                    {appointments.length === 0 ? (
                        <p>No appointments found.</p>
                    ) : (
                        <ul className="bg-white rounded shadow p-4">
                            {appointments.map(app => (
                                <li key={app._id} className="border-b py-2 flex justify-between items-center">
                                    <div>
                                        <p><strong>Patient:</strong> {app.patient.name}</p>
                                        <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedAppointment(app)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Consult
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {selectedAppointment && (
                    <div className="bg-white rounded shadow p-4">
                        <h3 className="text-lg font-semibold mb-4">Consultation for {selectedAppointment.patient.name}</h3>
                        <form onSubmit={handleConsultation}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Prescription</label>
                                <textarea
                                    className="w-full p-2 border rounded mt-1"
                                    rows="4"
                                    value={prescription}
                                    onChange={(e) => setPrescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Suggested Medicines (comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded mt-1"
                                    value={suggestedMedicines}
                                    onChange={(e) => setSuggestedMedicines(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                Submit Consultation
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedAppointment(null)}
                                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
