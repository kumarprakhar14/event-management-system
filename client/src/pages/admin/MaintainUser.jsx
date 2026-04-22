import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const MaintainUser = () => {
    const { logout } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [userForm, setUserForm] = useState({ id: '', name: '', email: '', password: '' });
    const [membershipForm, setMembershipForm] = useState({ userId: '', membershipType: '6months', action: 'extend' });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdating) {
                await api.put(`/admin/users/${userForm.id}`, { name: userForm.name, email: userForm.email });
            } else {
                await api.post('/admin/users', { name: userForm.name, email: userForm.email, password: userForm.password });
            }
            setUserForm({ id: '', name: '', email: '', password: '' });
            setIsUpdating(false);
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving user');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this user?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                fetchUsers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEditClick = (user) => {
        setIsUpdating(true);
        setUserForm({ id: user._id, name: user.name, email: user.email, password: '' });
    };

    const handleMembershipAdd = async (e) => {
        e.preventDefault();
        if (!membershipForm.userId) return alert('Select user first');
        try {
            await api.post('/admin/membership/user', {
                userId: membershipForm.userId,
                membershipType: membershipForm.membershipType
            });
            alert('Membership added');
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Error adding membership');
        }
    };

    const handleMembershipUpdate = async (e) => {
        e.preventDefault();
        if (!membershipForm.userId) return alert('Enter user ID');
        try {
            await api.put(`/admin/membership/user/${membershipForm.userId}`, {
                membershipType: membershipForm.membershipType,
                action: membershipForm.action
            });
            alert('Membership updated');
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Error updating membership');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-brand">EMS Admin</div>
                <div className="nav-links">
                    <Link to="/admin" className="nav-link">Home</Link>
                    <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
                </div>
            </nav>

            <div className="container animate-fade-in">
                <h1 style={{ marginBottom: '2rem' }}>Maintain User</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* User Management Section */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2>User Management</h2>
                        <form onSubmit={handleUserSubmit} style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" required className="input-field" value={userForm.name} onChange={e => setUserForm({ ...userForm, name: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" required className="input-field" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} />
                            </div>
                            {!isUpdating && (
                                <div className="input-group">
                                    <label>Password</label>
                                    <input type="password" required className="input-field" value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} />
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary">{isUpdating ? 'Update User' : 'Add User'}</button>
                                {isUpdating && <button type="button" className="btn btn-secondary" onClick={() => { setIsUpdating(false); setUserForm({ id: '', name: '', email: '', password: '' }); }}>Cancel</button>}
                            </div>
                        </form>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Membership</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u._id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>{u.isActive && u.membershipType ? `${u.membershipType}` : 'None'}</td>
                                            <td>
                                                <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }} onClick={() => handleEditClick(u)}>Edit</button>
                                                <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleDelete(u._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Membership Section */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2>Membership Management</h2>

                        <div style={{ marginTop: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1.5rem' }}>
                            <h3>Add Membership</h3>
                            <form onSubmit={handleMembershipAdd} style={{ marginTop: '1rem' }}>
                                <div className="input-group">
                                    <label>Select User</label>
                                    <select className="input-field" value={membershipForm.userId} onChange={e => setMembershipForm({ ...membershipForm, userId: e.target.value })}>
                                        <option value="">-- Select User --</option>
                                        {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Membership Type</label>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <label><input type="radio" name="memType" value="6months" checked={membershipForm.membershipType === '6months'} onChange={e => setMembershipForm({ ...membershipForm, membershipType: e.target.value })} /> 6 Months</label>
                                        <label><input type="radio" name="memType" value="1year" checked={membershipForm.membershipType === '1year'} onChange={e => setMembershipForm({ ...membershipForm, membershipType: e.target.value })} /> 1 Year</label>
                                        <label><input type="radio" name="memType" value="2years" checked={membershipForm.membershipType === '2years'} onChange={e => setMembershipForm({ ...membershipForm, membershipType: e.target.value })} /> 2 Years</label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Add Membership</button>
                            </form>
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                            <h3>Update/Cancel Membership</h3>
                            <form onSubmit={handleMembershipUpdate} style={{ marginTop: '1rem' }}>
                                <div className="input-group">
                                    <label>User ID</label>
                                    <input type="text" required className="input-field" value={membershipForm.userId} onChange={e => setMembershipForm({ ...membershipForm, userId: e.target.value })} placeholder="Paste User ID here" />
                                </div>
                                <div className="input-group">
                                    <label>Action</label>
                                    <select className="input-field" value={membershipForm.action} onChange={e => setMembershipForm({ ...membershipForm, action: e.target.value })}>
                                        <option value="extend">Extend</option>
                                        <option value="cancel">Cancel</option>
                                    </select>
                                </div>
                                {membershipForm.action === 'extend' && (
                                    <div className="input-group">
                                        <label>Membership Type</label>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <label><input type="radio" name="updateMemType" value="6months" checked={membershipForm.membershipType === '6months'} onChange={e => setMembershipForm({ ...membershipForm, membershipType: e.target.value })} /> 6 Months</label>
                                            <label><input type="radio" name="updateMemType" value="1year" checked={membershipForm.membershipType === '1year'} onChange={e => setMembershipForm({ ...membershipForm, membershipType: e.target.value })} /> 1 Year</label>
                                            <label><input type="radio" name="updateMemType" value="2years" checked={membershipForm.membershipType === '2years'} onChange={e => setMembershipForm({ ...membershipForm, membershipType: e.target.value })} /> 2 Years</label>
                                        </div>
                                    </div>
                                )}
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintainUser;
