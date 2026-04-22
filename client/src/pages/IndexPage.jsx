import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className="container">
      <h1>Event Management System</h1>
      <div className="glass-panel" style={{ marginTop: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
          <Link to="/admin/login" className="btn btn-primary" style={{ width: '200px' }}>
            Admin Login
          </Link>
          <Link to="/vendor/login" className="btn btn-secondary" style={{ width: '200px' }}>
            Vendor Login
          </Link>
          <Link to="/user/login" className="btn btn-secondary" style={{ width: '200px' }}>
            User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
