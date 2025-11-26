import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (cart.length === 0) return;

    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: user._id,
          items: cart.map(item => ({
            medicine: item._id,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: total
        }),
      });

      if (response.ok) {
        alert('Payment Successful!');
        clearCart();
        navigate('/patient-dashboard');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between items-center border-b py-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ₹{total}</h2>
            <button
              onClick={handlePayment}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
