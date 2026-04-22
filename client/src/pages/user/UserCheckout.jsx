import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const UserCheckout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', state: '', pinCode: '', phone: '', paymentMethod: 'Cash'
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get('/user/cart');
      if (!res.data.items || res.data.items.length === 0) {
        navigate('/user/cart');
      }
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        shippingDetails: {
          name: form.name, email: form.email, address: form.address, city: form.city, state: form.state, pinCode: form.pinCode, phone: form.phone
        },
        paymentMethod: form.paymentMethod
      };
      const res = await api.post('/user/orders', orderData);
      // Navigate to success and pass order summary
      navigate('/user/success', { state: { order: res.data } });
    } catch (err) {
      alert(err.response?.data?.message || 'Error placing order');
    }
  };

  const grandTotal = cart.items ? cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Order Summary</h2>
          {cart.items && cart.items.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
              <div>{item.productId?.name} x {item.quantity}</div>
              <div>Rs. {item.price * item.quantity}/-</div>
            </div>
          ))}
          <div style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'right', color: 'var(--accent-secondary)' }}>
            Grand Total: Rs. {grandTotal}/-
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" name="name" required className="input-field" value={form.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" required className="input-field" value={form.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="text" name="phone" required className="input-field" value={form.phone} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Address</label>
              <input type="text" name="address" required className="input-field" value={form.address} onChange={handleChange} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label>City</label>
                <input type="text" name="city" required className="input-field" value={form.city} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>State</label>
                <input type="text" name="state" required className="input-field" value={form.state} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Pin Code</label>
                <input type="text" name="pinCode" required className="input-field" value={form.pinCode} onChange={handleChange} />
              </div>
            </div>
            <div className="input-group">
              <label>Payment Method</label>
              <select name="paymentMethod" required className="input-field" value={form.paymentMethod} onChange={handleChange}>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.2rem' }}>Order Now</button>
            <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate('/user/cart')}>Back to Cart</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCheckout;
