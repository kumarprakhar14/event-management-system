import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const VendorItems = () => {
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', price: '', image: null });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/vendor/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        await api.put(`/vendor/products/${form.id}`, { name: form.name, price: form.price });
      } else {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        if (form.image) formData.append('image', form.image);
        
        await api.post('/vendor/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setForm({ id: '', name: '', price: '', image: null });
      setIsUpdating(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await api.delete(`/vendor/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEditClick = (product) => {
    setIsUpdating(true);
    setForm({ id: product._id, name: product.name, price: product.price, image: null });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">EMS Vendor</div>
        <div className="nav-links">
          <Link to="/vendor" className="nav-link">Home</Link>
          <Link to="/vendor/items" className="nav-link active">View Product</Link>
          <Link to="/vendor/product-status" className="nav-link">Product Status</Link>
          <Link to="/vendor/requests" className="nav-link">Request Item</Link>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Log Out</button>
        </div>
      </nav>

      <div className="container animate-fade-in" style={{ maxWidth: '1000px' }}>
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>{isUpdating ? 'Update Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Product Name</label>
              <input type="text" required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Product Price (Rs/-)</label>
              <input type="number" required className="input-field" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
            </div>
            {!isUpdating && (
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label>Product Image</label>
                <input type="file" accept="image/*" required className="input-field" onChange={handleFileChange} />
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary">{isUpdating ? 'Update' : 'Add The Product'}</button>
              {isUpdating && <button type="button" className="btn btn-secondary" onClick={() => { setIsUpdating(false); setForm({ id: '', name: '', price: '', image: null }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2>Your Products</h2>
          <div className="table-container" style={{ marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price (Rs/-)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>
                      {p.imageUrl ? (
                        <img src={p.imageUrl.startsWith('http') ? p.imageUrl : `${import.meta.env.VITE_SERVER_URL}${p.imageUrl}`} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : 'No Image'}
                    </td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }} onClick={() => handleEditClick(p)}>Update</button>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleDelete(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorItems;
