import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">EMS Admin</div>
        <div className="nav-links">
          <Link to="/admin" className="nav-link active">Home</Link>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </nav>

      <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '3rem', textAlign: 'center' }}>Welcome Admin</h1>
        
        <div className="grid-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/admin/maintain-user" className="card glass-panel" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>Maintain User</h2>
            </div>
          </Link>
          
          <Link to="/admin/maintain-vendor" className="card glass-panel" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-secondary)' }}>Maintain Vendor</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
