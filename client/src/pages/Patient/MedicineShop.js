import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const MedicineShop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

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

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('Cart is empty');
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Group by shopkeeper for simplicity in this demo, or just create one order per shopkeeper
      // For now, let's assume all items are from same shop or handle simply
      // This is a basic implementation
      const shopkeeperId = cart[0].shopkeeper._id; 
      const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
      const productsList = cart.map(item => ({ product: item._id, quantity: 1 }));

      await axios.post('http://localhost:5000/api/shop/orders', {
        shopkeeperId,
        products: productsList,
        totalAmount
      }, config);

      alert('Order placed successfully!');
      setCart([]);
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };

  return (
    <div>
      <Navbar role="patient" />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Medicine Shop</h1>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Cart ({cart.length}) - Checkout
          </button>
        </div>
        
        {loading ? <p>Loading...</p> : (
          <div className="grid grid-3">
            {products.map(product => (
              <div key={product._id} className="card">
                {product.image && <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />}
                <h3 style={{ marginTop: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{product.price}</span>
                  <button className="btn btn-secondary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            ))}
            {products.length === 0 && <p>No medicines available.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineShop;
