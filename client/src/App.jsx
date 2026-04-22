import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';

// Public Pages
import IndexPage from './pages/IndexPage';
import AdminLogin from './pages/AdminLogin';
import VendorLogin from './pages/VendorLogin';
import VendorSignup from './pages/VendorSignup';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MaintainUser from './pages/admin/MaintainUser';
import MaintainVendor from './pages/admin/MaintainVendor';

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorItems from './pages/vendor/VendorItems';
import VendorProductStatus from './pages/vendor/VendorProductStatus';
import VendorUpdateOrder from './pages/vendor/VendorUpdateOrder';
import VendorRequests from './pages/vendor/VendorRequests';

// User Pages
import UserPortal from './pages/user/UserPortal';
import VendorListing from './pages/user/VendorListing';
import UserProducts from './pages/user/UserProducts';
import UserCart from './pages/user/UserCart';
import UserCheckout from './pages/user/UserCheckout';
import OrderSuccess from './pages/user/OrderSuccess';
import RequestItem from './pages/user/RequestItem';
import OrderStatus from './pages/user/OrderStatus';
import GuestList from './pages/user/GuestList';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/signup" element={<VendorSignup />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute allowedRole="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/maintain-user" element={<PrivateRoute allowedRole="admin"><MaintainUser /></PrivateRoute>} />
          <Route path="/admin/maintain-vendor" element={<PrivateRoute allowedRole="admin"><MaintainVendor /></PrivateRoute>} />

          {/* Vendor Routes */}
          <Route path="/vendor" element={<PrivateRoute allowedRole="vendor"><VendorDashboard /></PrivateRoute>} />
          <Route path="/vendor/items" element={<PrivateRoute allowedRole="vendor"><VendorItems /></PrivateRoute>} />
          <Route path="/vendor/product-status" element={<PrivateRoute allowedRole="vendor"><VendorProductStatus /></PrivateRoute>} />
          <Route path="/vendor/update/:orderId" element={<PrivateRoute allowedRole="vendor"><VendorUpdateOrder /></PrivateRoute>} />
          <Route path="/vendor/requests" element={<PrivateRoute allowedRole="vendor"><VendorRequests /></PrivateRoute>} />

          {/* User Routes */}
          <Route path="/user" element={<PrivateRoute allowedRole="user"><UserPortal /></PrivateRoute>} />
          <Route path="/user/vendors" element={<PrivateRoute allowedRole="user"><VendorListing /></PrivateRoute>} />
          <Route path="/user/vendors/:vendorId/products" element={<PrivateRoute allowedRole="user"><UserProducts /></PrivateRoute>} />
          <Route path="/user/cart" element={<PrivateRoute allowedRole="user"><UserCart /></PrivateRoute>} />
          <Route path="/user/checkout" element={<PrivateRoute allowedRole="user"><UserCheckout /></PrivateRoute>} />
          <Route path="/user/success" element={<PrivateRoute allowedRole="user"><OrderSuccess /></PrivateRoute>} />
          <Route path="/user/request-item" element={<PrivateRoute allowedRole="user"><RequestItem /></PrivateRoute>} />
          <Route path="/user/order-status" element={<PrivateRoute allowedRole="user"><OrderStatus /></PrivateRoute>} />
          <Route path="/user/guest-list" element={<PrivateRoute allowedRole="user"><GuestList /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
