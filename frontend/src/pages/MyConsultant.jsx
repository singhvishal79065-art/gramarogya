import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const MyConsultant = () => {
    const { user } = useAuth();
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        fetchConsultations();
    }, []);

    const fetchConsultations = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/consultations?userId=${user._id}&role=patient`);
            const data = await response.json();
            setConsultations(data);
        } catch (error) {
            console.error('Error fetching consultations:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Consultant History</h1>
            {consultations.length === 0 ? (
                <p>No consultation history found.</p>
            ) : (
                <div className="grid gap-6">
                    {consultations.map((consult) => (
                        <div key={consult._id} className="bg-white p-6 rounded shadow">
                            <h3 className="text-lg font-semibold mb-2">Doctor: {consult.doctor.name}</h3>
                            <p className="text-gray-600 mb-2">Date: {new Date(consult.createdAt).toLocaleDateString()}</p>
                            <div className="mb-4">
                                <h4 className="font-bold">Prescription:</h4>
                                <p>{consult.prescription}</p>
                            </div>
                            {consult.suggestedMedicines && consult.suggestedMedicines.length > 0 && (
                                <div>
                                    <h4 className="font-bold">Suggested Medicines:</h4>
                                    <ul className="list-disc list-inside">
                                        {consult.suggestedMedicines.map((med, index) => (
                                            <li key={index}>{med}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyConsultant;
