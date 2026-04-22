import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const MaintainVendor = () => {
    const { logout } = useContext(AuthContext);
    const [vendors, setVendors] = useState([]);
    const [vendorForm, setVendorForm] = useState({ id: '', name: '', email: '', password: '', businessName: '', category: 'Catering', contactDetails: '' });
    const [membershipForm, setMembershipForm] = useState({ vendorId: '', membershipType: '6months', action: 'extend' });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const res = await api.get('/admin/vendors');
            setVendors(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleVendorSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdating) {
                await api.put(`/admin/vendors/${vendorForm.id}`, {
                    businessName: vendorForm.businessName,
                    category: vendorForm.category,
                    contactDetails: vendorForm.contactDetails
                });
            } else {
                await api.post('/admin/vendors', vendorForm);
            }
            setVendorForm({ id: '', name: '', email: '', password: '', businessName: '', category: 'Catering', contactDetails: '' });
            setIsUpdating(false);
            fetchVendors();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving vendor');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this vendor?')) {
            try {
                await api.delete(`/admin/vendors/${id}`);
                fetchVendors();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEditClick = (vendor) => {
        setIsUpdating(true);
        setVendorForm({
            id: vendor._id,
            name: vendor.userId?.name || '',
            email: vendor.userId?.email || '',
            password: '',
            businessName: vendor.businessName,
            category: vendor.category,
            contactDetails: vendor.contactDetails || ''
        });
    };

    const handleMembershipAdd = async (e) => {
        e.preventDefault();
        if (!membershipForm.vendorId) return alert('Select vendor first');
        try {
            await api.post('/admin/membership/vendor', {
                vendorId: membershipForm.vendorId,
                membershipType: membershipForm.membershipType
            });
            alert('Membership added');
            fetchVendors();
        } catch (err) {
            alert(err.response?.data?.message || 'Error adding membership');
        }
    };

    const handleMembershipUpdate = async (e) => {
        e.preventDefault();
        if (!membershipForm.vendorId) return alert('Enter vendor ID');
        try {
            await api.put(`/admin/membership/vendor/${membershipForm.vendorId}`, {
                membershipType: membershipForm.membershipType,
                action: membershipForm.action
            });
            alert('Membership updated');
            fetchVendors();
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

            <div className="container animate-fade-in" style={{ maxWidth: '1400px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Maintain Vendor</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Vendor Management Section */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2>Vendor Management</h2>
                        <form onSubmit={handleVendorSubmit} style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                            {!isUpdating && (
                                <>
                                    <div className="input-group">
                                        <label>Owner Name</label>
                                        <input type="text" required className="input-field" value={vendorForm.name} onChange={e => setVendorForm({ ...vendorForm, name: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Email</label>
                                        <input type="email" required className="input-field" value={vendorForm.email} onChange={e => setVendorForm({ ...vendorForm, email: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Password</label>
                                        <input type="password" required className="input-field" value={vendorForm.password} onChange={e => setVendorForm({ ...vendorForm, password: e.target.value })} />
                                    </div>
                                </>
                            )}
                            <div className="input-group">
                                <label>Business Name</label>
                                <input type="text" required className="input-field" value={vendorForm.businessName} onChange={e => setVendorForm({ ...vendorForm, businessName: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>Category</label>
                                <select className="input-field" required value={vendorForm.category} onChange={e => setVendorForm({ ...vendorForm, category: e.target.value })}>
                                    <option value="Catering">Catering</option>
                                    <option value="Florist">Florist</option>
                                    <option value="Decoration">Decoration</option>
                                    <option value="Lighting">Lighting</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Contact Details</label>
                                <input type="text" className="input-field" value={vendorForm.contactDetails} onChange={e => setVendorForm({ ...vendorForm, contactDetails: e.target.value })} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary">{isUpdating ? 'Update Vendor' : 'Add Vendor'}</button>
                                {isUpdating && <button type="button" className="btn btn-secondary" onClick={() => { setIsUpdating(false); setVendorForm({ id: '', name: '', email: '', password: '', businessName: '', category: 'Catering', contactDetails: '' }); }}>Cancel</button>}
                            </div>
                        </form>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Business</th>
                                        <th>Category</th>
                                        <th>Membership</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendors.map(v => (
                                        <tr key={v._id}>
                                            <td>{v.businessName}</td>
                                            <td>{v.category}</td>
                                            <td>{v.isActive && v.membershipType ? `${v.membershipType}` : 'None'}</td>
                                            <td>
                                                <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }} onClick={() => handleEditClick(v)}>Edit</button>
                                                <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleDelete(v._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Membership Section */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2>Membership for Vendor</h2>

                        <div style={{ marginTop: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1.5rem' }}>
                            <h3>Add Membership</h3>
                            <form onSubmit={handleMembershipAdd} style={{ marginTop: '1rem' }}>
                                <div className="input-group">
                                    <label>Select Vendor</label>
                                    <select className="input-field" value={membershipForm.vendorId} onChange={e => setMembershipForm({ ...membershipForm, vendorId: e.target.value })}>
                                        <option value="">-- Select Vendor --</option>
                                        {vendors.map(v => <option key={v._id} value={v._id}>{v.businessName} ({v.category})</option>)}
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
                                    <label>Vendor ID</label>
                                    <input type="text" required className="input-field" value={membershipForm.vendorId} onChange={e => setMembershipForm({ ...membershipForm, vendorId: e.target.value })} placeholder="Paste Vendor ID here" />
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

export default MaintainVendor;
