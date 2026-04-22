import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    navigate('/user');
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '600px', width: '100%', textAlign: 'center', background: 'var(--bg-darker)' }}>
        <h1 style={{ color: 'var(--success)', marginBottom: '1rem', fontSize: '3rem' }}>THANK YOU</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your order has been placed successfully.</p>
        
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '8px', textAlign: 'left', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Order Summary</h3>
          <p><strong>Total Amount:</strong> Rs. {order.totalAmount}/-</p>
          <p><strong>Name:</strong> {order.shippingDetails.name}</p>
          <p><strong>Email:</strong> {order.shippingDetails.email}</p>
          <p><strong>Phone:</strong> {order.shippingDetails.phone}</p>
          <p><strong>Address:</strong> {order.shippingDetails.address}</p>
          <p><strong>City:</strong> {order.shippingDetails.city}</p>
          <p><strong>State:</strong> {order.shippingDetails.state}</p>
          <p><strong>Pin Code:</strong> {order.shippingDetails.pinCode}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        </div>

        <button className="btn btn-primary" onClick={() => navigate('/user')} style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
