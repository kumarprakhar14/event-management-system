import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const UserPortal = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCategorySelect = (e) => {
    if (e.target.value) {
      navigate(`/user/vendors?category=${e.target.value}`);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">EMS User</div>
        <div className="nav-links">
          <Link to="/user/cart" className="nav-link">Cart</Link>
          <Link to="/user/guest-list" className="nav-link">Guest List</Link>
          <Link to="/user/order-status" className="nav-link">Order Status</Link>
          <Link to="/user/request-item" className="nav-link">Request Item</Link>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </nav>

      <div className="container animate-fade-in" style={{ marginTop: '2rem', maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Welcome {user?.name}</h1>
        
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Find a Vendor</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Select a category to browse our premium vendors</p>
          
          <select className="input-field" style={{ maxWidth: '400px', margin: '0 auto', fontSize: '1.2rem', padding: '1rem' }} onChange={handleCategorySelect} defaultValue="">
            <option value="" disabled>-- Select Vendor Category --</option>
            <option value="Catering">Catering</option>
            <option value="Florist">Florist</option>
            <option value="Decoration">Decoration</option>
            <option value="Lighting">Lighting</option>
          </select>
        </div>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>Can't find what you need?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Submit a custom request and our vendors will help you out.</p>
          <Link to="/user/request-item" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Request Custom Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
