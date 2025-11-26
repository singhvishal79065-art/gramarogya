import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <h2 className="text-xl mb-4">Welcome, {user.name}</h2>
            <p>Admin features coming soon...</p>
        </div>
    );
};

export default AdminDashboard;
