import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const VendorUpdateOrder = () => {
  const { logout } = useContext(AuthContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Received');

  useEffect(() => {
    // In a real app we might fetch the specific order details here, 
    // but for now we just need to update the status.
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/vendor/orders/${orderId}/status`, { status });
      navigate('/vendor/product-status');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">EMS Vendor</div>
        <div className="nav-links">
          <Link to="/vendor" className="nav-link">Home</Link>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </nav>

      <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '500px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Update Order Status</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Order ID</label>
              <input type="text" className="input-field" value={orderId} disabled style={{ opacity: 0.7 }} />
            </div>
            <div className="input-group">
              <label>New Status</label>
              <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Received">Received</option>
                <option value="Ready for Shipping">Ready for Shipping</option>
                <option value="Out for Delivery">Out for Delivery</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Update</button>
              <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/vendor/product-status')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorUpdateOrder;
