import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const VendorListing = () => {
  const { logout } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      fetchVendors(category);
    }
  }, [category]);

  const fetchVendors = async (cat) => {
    try {
      const res = await api.get(`/vendors?category=${cat}`);
      setVendors(res.data);
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

      <div className="container animate-fade-in">
        <h1 style={{ marginBottom: '2rem' }}>{category} Vendors</h1>
        
        <div className="grid-container">
          {vendors.map(v => (
            <div key={v._id} className="card glass-panel">
              <div className="card-content">
                <h2 className="card-title">{v.businessName}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  {v.contactDetails || 'No contact details provided'}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate(`/user/vendors/${v._id}/products`)}>
                    Shop Item
                  </button>
                </div>
              </div>
            </div>
          ))}
          {vendors.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }} className="glass-panel">
              <p>No vendors found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorListing;
