import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const UserProducts = () => {
  const { logout } = useContext(AuthContext);
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const [vendorName, setVendorName] = useState('Vendor');

  useEffect(() => {
    fetchProducts();
  }, [vendorId]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/vendors/${vendorId}/products`);
      setProducts(res.data);
      // Optional: you could fetch vendor details here to get the real name if needed.
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await api.post('/user/cart', { productId, quantity: 1 });
      alert('Added to cart!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding to cart');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">EMS User</div>
        <div className="nav-links">
          <Link to="/user" className="nav-link">Home</Link>
          <Link to="/user/cart" className="nav-link">Cart</Link>
          <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </nav>

      <div className="container animate-fade-in">
        <h1 style={{ marginBottom: '2rem' }}>Products</h1>
        
        <div className="grid-container">
          {products.map(p => (
            <div key={p._id} className="card glass-panel">
              {p.imageUrl ? (
                <img src={p.imageUrl.startsWith('http') ? p.imageUrl : `${import.meta.env.VITE_SERVER_URL}${p.imageUrl}`} alt={p.name} className="card-image" />
              ) : (
                <div className="card-image" style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  No Image
                </div>
              )}
              <div className="card-content">
                <h2 className="card-title">{p.name}</h2>
                <div className="card-price">Rs. {p.price}/-</div>
                <div style={{ marginTop: 'auto' }}>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleAddToCart(p._id)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }} className="glass-panel">
              <p>No products available from this vendor right now.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
