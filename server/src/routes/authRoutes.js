import express from 'express';
import * as authController from '../controller/authController.js';

const router = express.Router();

// Admin Auth
router.post('/admin/login', authController.adminLogin);

// Vendor Auth
router.post('/vendor/login', authController.vendorLogin);
router.post('/vendor/signup', authController.vendorSignup);

// User Auth
router.post('/user/login', authController.userLogin);
router.post('/user/signup', authController.userSignup);

export default router;
