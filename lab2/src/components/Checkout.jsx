import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartProvider';

const API = 'http://localhost:9999';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError('');
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    if (!address.trim()) {
      setError('Please enter shipping address.');
      return;
    }

    const order = {
      id: Math.random().toString(16).slice(2, 6),
      orderDate: new Date().toISOString(),
      products: cart.map((c) => ({
        id: c.productId,
        name: c.title,
        price: c.price,
        quantity: c.quantity,
      })),
      shipAddress: address,
    };

    await axios.post(`${API}/orders`, order);
    await clearCart();

    setSuccess('Order confirmed successfully!');
    setAddress('');
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div>
      <h2 className="section-title">Checkout</h2>

      {error && <div className="alert-danger">{error}</div>}
      {success && <div className="alert-success">{success}</div>}

      <form className="checkout-form" onSubmit={handleConfirm}>
        <label><strong>Shipping Address</strong></label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address"
        />
        <button type="submit" className="btn btn-primary">
          Confirm Checkout
        </button>
      </form>
    </div>
  );
};

export default Checkout;
