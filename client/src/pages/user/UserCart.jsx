import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const UserCart = () => {
  const { logout } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get('/user/cart');
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await api.put(`/user/cart/${itemId}`, { quantity: newQuantity });
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating quantity');
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await api.delete(`/user/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || 'Error removing item');
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Clear your entire cart?')) {
      try {
        await api.delete('/user/cart');
        fetchCart();
      } catch (err) {
        alert(err.response?.data?.message || 'Error clearing cart');
      }
    }
  };

  const grandTotal = cart.items ? cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">EMS User</div>
        <div className="nav-links">
          <Link to="/user" className="nav-link">Home</Link>
          <Link to="/user/vendors" className="nav-link">View Product</Link>
          <Link to="/user/request-item" className="nav-link">Request Item</Link>
          <Link to="/user/order-status" className="nav-link">Product Status</Link>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </nav>

      <div className="container animate-fade-in" style={{ maxWidth: '1000px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Your Cart</h1>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.items && cart.items.map(item => (
                  <tr key={item._id}>
                    <td>
                      {item.productId?.imageUrl ? (
                        <img src={item.productId.imageUrl.startsWith('http') ? item.productId.imageUrl : `${import.meta.env.VITE_SERVER_URL}${item.productId.imageUrl}`} alt={item.productId?.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : 'No Image'}
                    </td>
                    <td>{item.productId?.name || 'Unknown'}</td>
                    <td>Rs. {item.price}/-</td>
                    <td>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                        style={{ width: '60px', padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-glass)', background: 'transparent', color: 'var(--text-main)' }}
                      />
                    </td>
                    <td>Rs. {item.price * item.quantity}/-</td>
                    <td>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleRemove(item._id)}>Remove</button>
                    </td>
                  </tr>
                ))}
                {(!cart.items || cart.items.length === 0) && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Your cart is empty.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {cart.items && cart.items.length > 0 && (
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
              <button className="btn btn-danger" onClick={handleDeleteAll}>Delete All</button>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                  Grand Total: Rs. {grandTotal}/-
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/user/checkout')}>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCart;
