import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/shop/products');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.post('http://localhost:5000/api/shop/products', formData, config);
      setFormData({ name: '', description: '', price: '', quantity: '', image: '' });
      fetchProducts();
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <Navbar role="shopkeeper" />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Inventory</h1>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Add New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-2" style={{ marginTop: '1rem' }}>
            <input 
              type="text" placeholder="Product Name" className="input" required
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="number" placeholder="Price" className="input" required
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
            />
            <input 
              type="number" placeholder="Quantity" className="input" required
              value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})}
            />
            <input 
              type="text" placeholder="Image URL (Optional)" className="input"
              value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
            />
            <textarea 
              placeholder="Description" className="input" style={{ gridColumn: 'span 2' }}
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>

        <div className="grid grid-3">
          {products.map(product => (
            <div key={product._id} className="card">
              {product.image && <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />}
              <h3 style={{ marginTop: '0.5rem' }}>{product.name}</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: 'bold' }}>
                <span>₹{product.price}</span>
                <span>Qty: {product.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
