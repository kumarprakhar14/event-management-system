import Product from '../models/Product.js';
import Order from '../models/Order.js';
import RequestItem from '../models/RequestItem.js';
import Vendor from '../models/Vendor.js';

// Helper to get vendor ID for logged in user
const getVendorId = async (userId) => {
    const vendor = await Vendor.findOne({ userId });
    return vendor ? vendor._id : null;
};

// Manage Products
export const getProducts = async (req, res) => {
    try {
        const vendorId = await getVendorId(req.user._id);
        const products = await Product.find({ vendorId });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        const vendorId = await getVendorId(req.user._id);
        const imageUrl = req.file ? req.file.path : null;
        const product = await Product.create({ vendorId, name, price, imageUrl });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { name, price }, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage Orders
export const getOrders = async (req, res) => {
    try {
        const vendorId = await getVendorId(req.user._id);
        const orders = await Order.find({ vendorId }).populate('userId', 'name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        if (!['Received', 'Ready for Shipping', 'Out for Delivery'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage Requests
export const getRequests = async (req, res) => {
    try {
        const vendorId = await getVendorId(req.user._id);
        const requests = await RequestItem.find({ vendorId }).populate('userId', 'name email');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
