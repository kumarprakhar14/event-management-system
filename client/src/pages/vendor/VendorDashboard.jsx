import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const VendorDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">EMS Vendor</div>
        <div className="nav-links">
          <Link to="/vendor/items" className="nav-link">Your Item</Link>
          <Link to="/vendor/product-status" className="nav-link">Transaction</Link>
          <Link to="/vendor/requests" className="nav-link">Requests</Link>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </nav>

      <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '3rem', textAlign: 'center' }}>Welcome {user?.name}</h1>
        
        <div className="grid-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link to="/vendor/items" className="card glass-panel" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>Your Items / Add New</h2>
            </div>
          </Link>
          
          <Link to="/vendor/product-status" className="card glass-panel" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-secondary)' }}>Transactions & Status</h2>
            </div>
          </Link>

          <Link to="/vendor/requests" className="card glass-panel" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--warning)' }}>Item Requests</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
