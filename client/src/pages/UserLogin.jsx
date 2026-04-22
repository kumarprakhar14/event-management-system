import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/user/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/user');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h1>Event Management System</h1>
      <div className="glass-panel">
        <h2 style={{ display: 'none' }}>User Login</h2>
        {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fff' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>User Id</label>
            <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginTop: '40px', paddingLeft: '150px' }}>
            <Link to="/" className="btn btn-secondary" style={{ width: '140px' }}>Cancel</Link>
            <button type="submit" className="btn btn-primary" style={{ width: '140px' }}>Login</button>
          </div>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center', paddingLeft: '150px' }}>
          <span style={{ color: '#000' }}>Don't have an account? </span>
          <Link to="/user/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
