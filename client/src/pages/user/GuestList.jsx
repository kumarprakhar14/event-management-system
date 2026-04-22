import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const GuestList = () => {
  const { logout } = useContext(AuthContext);
  const [eventName, setEventName] = useState('');
  const [guests, setGuests] = useState([]);
  const [guestForm, setGuestForm] = useState({ name: '', email: '', phone: '', rsvp: 'Invited' });

  useEffect(() => {
    fetchGuestList();
  }, []);

  const fetchGuestList = async () => {
    try {
      const res = await api.get('/user/guests');
      if (res.data) {
        setEventName(res.data.eventName || '');
        setGuests(res.data.guests || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGuest = (e) => {
    e.preventDefault();
    if (!guestForm.name) return;
    setGuests([...guests, guestForm]);
    setGuestForm({ name: '', email: '', phone: '', rsvp: 'Invited' });
  };

  const handleSaveList = async () => {
    try {
      await api.post('/user/guests', { eventName, guests });
      alert('Guest list saved successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving guest list');
    }
  };

  const removeGuest = (index) => {
    const updated = [...guests];
    updated.splice(index, 1);
    setGuests(updated);
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

      <div className="container animate-fade-in" style={{ maxWidth: '1000px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Guest List</h1>

        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div className="input-group">
            <label>Event Name</label>
            <input type="text" className="input-field" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="E.g., My Wedding, John's Birthday" />
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Add Guest</h3>
          <form onSubmit={handleAddGuest} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Name</label>
              <input type="text" required className="input-field" value={guestForm.name} onChange={(e) => setGuestForm({...guestForm, name: e.target.value})} />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Email</label>
              <input type="email" className="input-field" value={guestForm.email} onChange={(e) => setGuestForm({...guestForm, email: e.target.value})} />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Phone</label>
              <input type="text" className="input-field" value={guestForm.phone} onChange={(e) => setGuestForm({...guestForm, phone: e.target.value})} />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>RSVP</label>
              <select className="input-field" value={guestForm.rsvp} onChange={(e) => setGuestForm({...guestForm, rsvp: e.target.value})}>
                <option value="Invited">Invited</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
            <button type="submit" className="btn btn-secondary" style={{ marginBottom: '2px' }}>Add</button>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Guests ({guests.length})</h2>
            <button className="btn btn-primary" onClick={handleSaveList}>Save Guest List</button>
          </div>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>RSVP Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((g, idx) => (
                  <tr key={idx}>
                    <td>{g.name}</td>
                    <td>{g.email}</td>
                    <td>{g.phone}</td>
                    <td>
                      <span className={`badge badge-${g.rsvp === 'Confirmed' ? 'success' : g.rsvp === 'Declined' ? 'danger' : 'info'}`}>
                        {g.rsvp}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => removeGuest(idx)}>Remove</button>
                    </td>
                  </tr>
                ))}
                {guests.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No guests added yet.</td>
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

export default GuestList;
