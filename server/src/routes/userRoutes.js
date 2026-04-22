import express from 'express';
import * as userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('user'));

// Vendor Listing for Users
router.get('/vendors', userController.getVendors);
router.get('/vendors/:id/products', userController.getVendorProducts);

// Cart
router.get('/user/cart', userController.getCart);
router.post('/user/cart', userController.addToCart);
router.put('/user/cart/:itemId', userController.updateCartItem);
router.delete('/user/cart/:itemId', userController.removeCartItem);
router.delete('/user/cart', userController.clearCart);

// Orders
router.post('/user/orders', userController.createOrder);
router.get('/user/orders', userController.getOrders);

// Requests
router.post('/user/requests', userController.createRequest);
router.get('/user/requests', userController.getRequests);

// Guest List
router.get('/user/guests', userController.getGuestList);
router.post('/user/guests', userController.updateGuestList);

export default router;
