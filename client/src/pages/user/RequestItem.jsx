import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const RequestItem = () => {
  const { logout } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [requests, setRequests] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchVendors();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/user/requests');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await api.get('/vendors');
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorId) {
      alert('Please select a vendor');
      return;
    }
    try {
      await api.post('/user/requests', { itemDescription: description, vendorId });
      setDescription('');
      setVendorId('');
      fetchRequests();
      alert('Request submitted successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting request');
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

      <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Request Item</h1>

        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>Submit a Request</h2>
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <div className="input-group">
              <label>Select Vendor</label>
              <select className="input-field" value={vendorId} onChange={(e) => setVendorId(e.target.value)} required>
                <option value="" disabled>-- Select a Vendor --</option>
                {vendors.map(v => (
                  <option key={v._id} value={v._id}>{v.businessName} ({v.category})</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Item Description</label>
              <textarea 
                required 
                className="input-field" 
                rows="4" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the item you are looking for..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Request</button>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2>Your Previous Requests</h2>
          <div className="table-container" style={{ marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(r => {
                  const assignedVendor = vendors.find(v => v._id === r.vendorId);
                  return (
                    <tr key={r._id}>
                      <td>{assignedVendor ? assignedVendor.businessName : 'Unknown Vendor'}</td>
                      <td>{r.itemDescription}</td>
                      <td>
                        <span className={`badge badge-${r.status === 'Fulfilled' ? 'success' : r.status === 'Pending' ? 'warning' : 'info'}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No requests submitted yet.</td>
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

export default RequestItem;
