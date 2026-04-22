import express from 'express';
import * as vendorController from '../controllers/vendorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('vendor'));

// Manage Products
router.get('/products', vendorController.getProducts);
router.post('/products', upload.single('image'), vendorController.createProduct);
router.put('/products/:id', vendorController.updateProduct);
router.delete('/products/:id', vendorController.deleteProduct);

// Manage Orders
router.get('/orders', vendorController.getOrders);
router.put('/orders/:id/status', vendorController.updateOrderStatus);
router.delete('/orders/:id', vendorController.deleteOrder);

// Manage Requests
router.get('/requests', vendorController.getRequests);

export default router;
