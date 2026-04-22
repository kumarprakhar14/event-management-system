import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const VendorProductStatus = () => {
  const { logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/vendor/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this order record?')) {
      try {
        await api.delete(`/vendor/orders/${id}`);
        fetchOrders();
      } catch (err) {
        console.error(err);
      }
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

      <div className="container animate-fade-in" style={{ maxWidth: '1200px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Product Status / Orders</h1>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id}>
                    <td>{o.shippingDetails?.name || o.userId?.name}</td>
                    <td>{o.shippingDetails?.email || o.userId?.email}</td>
                    <td>{o.shippingDetails?.address}</td>
                    <td>
                      <span className={`badge badge-${o.status === 'Delivered' ? 'success' : o.status === 'Out for Delivery' ? 'info' : 'warning'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => navigate(`/vendor/update/${o._id}`)}>Update</button>
                    </td>
                    <td>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleDelete(o._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No orders found.</td>
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

export default VendorProductStatus;
