import Vendor from '../models/Vendor.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import RequestItem from '../models/RequestItem.js';
import GuestList from '../models/GuestList.js';

// Vendor Listing for Users
export const getVendors = async (req, res) => {
    try {
        const query = { isActive: true };
        if (req.query.category) {
            query.category = req.query.category;
        }
        const vendors = await Vendor.find(query).populate('userId', 'name');
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVendorProducts = async (req, res) => {
    try {
        const products = await Product.find({ vendorId: req.params.id, isAvailable: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cart
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: product.price });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Orders
export const createOrder = async (req, res) => {
    const { shippingDetails, paymentMethod } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Determine vendorId from the first item
        const vendorId = cart.items[0].productId.vendorId;

        let totalAmount = 0;
        const items = cart.items.map(item => {
            totalAmount += item.price * item.quantity;
            return {
                productId: item.productId._id,
                name: item.productId.name,
                price: item.price,
                quantity: item.quantity
            };
        });

        const order = await Order.create({
            userId: req.user._id,
            vendorId,
            items,
            totalAmount,
            shippingDetails,
            paymentMethod,
            status: 'Received'
        });

        // Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Requests
export const createRequest = async (req, res) => {
    const { itemDescription, vendorId } = req.body;
    try {
        const request = await RequestItem.create({
            userId: req.user._id,
            vendorId,
            itemDescription,
            status: 'Pending'
        });
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getRequests = async (req, res) => {
    try {
        const requests = await RequestItem.find({ userId: req.user._id });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Guest List
export const getGuestList = async (req, res) => {
    try {
        let guestList = await GuestList.findOne({ userId: req.user._id });
        if (!guestList) {
            guestList = { eventName: '', guests: [] };
        }
        res.json(guestList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateGuestList = async (req, res) => {
    const { eventName, guests } = req.body;
    try {
        let guestList = await GuestList.findOne({ userId: req.user._id });
        if (guestList) {
            guestList.eventName = eventName;
            guestList.guests = guests;
            await guestList.save();
        } else {
            guestList = await GuestList.create({ userId: req.user._id, eventName, guests });
        }
        res.json(guestList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
