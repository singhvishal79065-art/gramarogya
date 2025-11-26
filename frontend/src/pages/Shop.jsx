import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Shop = () => {
    const [medicines, setMedicines] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/medicines');
            const data = await response.json();
            setMedicines(data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Medicine Shop</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {medicines.map((med) => (
                    <div key={med._id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
                        {med.image && <img src={med.image} alt={med.name} className="w-full h-40 object-cover mb-4 rounded" />}
                        <div>
                            <h3 className="text-lg font-semibold">{med.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{med.description}</p>
                            <p className="text-blue-600 font-bold">₹{med.price}</p>
                        </div>
                        <button
                            onClick={() => {
                                addToCart(med);
                                alert('Added to cart!');
                            }}
                            className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
