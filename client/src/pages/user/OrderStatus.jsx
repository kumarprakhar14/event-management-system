import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const OrderStatus = () => {
  const { logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/user/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">EMS User</div>
        <div className="nav-links">
          <Link to="/user" className="nav-link">Home</Link>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </nav>

      <div className="container animate-fade-in" style={{ maxWidth: '1000px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Your Orders</h1>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id}>
                    <td>{o._id.substring(o._id.length - 6)}</td>
                    <td>{o.shippingDetails?.name}</td>
                    <td>{o.shippingDetails?.email}</td>
                    <td>{o.shippingDetails?.address}</td>
                    <td>
                      <span className={`badge badge-${o.status === 'Delivered' ? 'success' : o.status === 'Out for Delivery' ? 'info' : 'warning'}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No orders placed yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
