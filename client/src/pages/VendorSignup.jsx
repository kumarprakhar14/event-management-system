import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    category: 'Catering'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/vendor/signup', formData);
      navigate('/vendor/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Vendor Signup</h2>
        {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem', padding: '0.75rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="name" required className="input-field" value={formData.name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Business Name</label>
            <input type="text" name="businessName" required className="input-field" value={formData.businessName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" required className="input-field" value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" required className="input-field" value={formData.password} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Category</label>
            <select name="category" required className="input-field" value={formData.category} onChange={handleChange}>
              <option value="Catering">Catering</option>
              <option value="Florist">Florist</option>
              <option value="Decoration">Decoration</option>
              <option value="Lighting">Lighting</option>
            </select>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
          </div>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <Link to="/vendor/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
