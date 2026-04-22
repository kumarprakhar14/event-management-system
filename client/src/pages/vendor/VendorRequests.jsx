import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const VendorRequests = () => {
  const { logout } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/vendor/requests');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
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

      <div className="container animate-fade-in" style={{ maxWidth: '1000px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Item Requests</h1>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Item Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(r => (
                  <tr key={r._id}>
                    <td>{r.userId?.name} ({r.userId?.email})</td>
                    <td>{r.itemDescription}</td>
                    <td>
                      <span className={`badge badge-${r.status === 'Fulfilled' ? 'success' : r.status === 'Pending' ? 'warning' : 'info'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No requests found.</td>
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

export default VendorRequests;
