import express from 'express';
import * as adminController from '../controller/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// Manage Users
router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Manage Vendors
router.get('/vendors', adminController.getVendors);
router.post('/vendors', adminController.createVendor);
router.put('/vendors/:id', adminController.updateVendor);
router.delete('/vendors/:id', adminController.deleteVendor);

// Membership User
router.post('/membership/user', adminController.addUserMembership);
router.put('/membership/user/:id', adminController.updateUserMembership);

// Membership Vendor
router.post('/membership/vendor', adminController.addVendorMembership);
router.put('/membership/vendor/:id', adminController.updateVendorMembership);

export default router;