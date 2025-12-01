import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ShopOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const res = await axios.get('http://localhost:5000/api/shop/orders', config);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar role="shopkeeper" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Orders</h1>
        
        {loading ? <p>Loading...</p> : (
          <div className="grid">
            {orders.map(order => (
              <div key={order._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>₹{order.totalAmount}</span>
                </div>
                <p><strong>Customer:</strong> {order.patient.name}</p>
                <p><strong>Address:</strong> {order.patient.address || 'N/A'}</p>
                <div style={{ margin: '1rem 0' }}>
                  {order.products.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                      <span>{item.product?.name || 'Unknown Product'} x {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <p>Status: <span style={{ fontWeight: 'bold' }}>{order.status}</span></p>
              </div>
            ))}
            {orders.length === 0 && <p>No orders found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopOrders;
