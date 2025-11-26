import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ShopkeeperDashboard = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [newMedicine, setNewMedicine] = useState({ name: '', description: '', price: '', stock: '', image: '' });

    useEffect(() => {
        fetchOrders();
        fetchMedicines();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchMedicines = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/medicines');
            const data = await response.json();
            setMedicines(data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    const handleAddMedicine = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/medicines', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMedicine),
            });
            if (response.ok) {
                alert('Medicine added successfully');
                setNewMedicine({ name: '', description: '', price: '', stock: '', image: '' });
                fetchMedicines();
            } else {
                alert('Failed to add medicine');
            }
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Shopkeeper Dashboard</h1>
            <h2 className="text-xl mb-4">Welcome, {user.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Add New Medicine</h3>
                    <form onSubmit={handleAddMedicine} className="bg-white rounded shadow p-4">
                        <div className="mb-2">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-2 border rounded"
                                value={newMedicine.name}
                                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="text"
                                placeholder="Description"
                                className="w-full p-2 border rounded"
                                value={newMedicine.description}
                                onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="number"
                                placeholder="Price"
                                className="w-full p-2 border rounded"
                                value={newMedicine.price}
                                onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="number"
                                placeholder="Stock"
                                className="w-full p-2 border rounded"
                                value={newMedicine.stock}
                                onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-full p-2 border rounded"
                                value={newMedicine.image}
                                onChange={(e) => setNewMedicine({ ...newMedicine, image: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Add Medicine
                        </button>
                    </form>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                    <ul className="bg-white rounded shadow p-4 h-96 overflow-y-auto">
                        {orders.map(order => (
                            <li key={order._id} className="border-b py-2">
                                <p><strong>Order ID:</strong> {order._id}</p>
                                <p><strong>User:</strong> {order.user?.name || 'Unknown'}</p>
                                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShopkeeperDashboard;
