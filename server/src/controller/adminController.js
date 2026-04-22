import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';

// Manage Users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPassword, role: 'user' });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manage Vendors
export const getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('userId', 'name email isActive');
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVendor = async (req, res) => {
    const { name, email, password, businessName, category, contactDetails } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPassword, role: 'vendor' });
        const vendor = await Vendor.create({ userId: user._id, businessName, category, contactDetails });
        res.status(201).json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateVendor = async (req, res) => {
    const { businessName, category, contactDetails } = req.body;
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, { businessName, category, contactDetails }, { new: true });
        res.json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (vendor) {
            await User.findByIdAndDelete(vendor.userId);
            await Vendor.findByIdAndDelete(req.params.id);
            res.json({ message: 'Vendor removed' });
        } else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculateMembershipDates = (type) => {
    const start = new Date();
    const end = new Date();
    if (type === '6months') end.setMonth(end.getMonth() + 6);
    if (type === '1year') end.setFullYear(end.getFullYear() + 1);
    if (type === '2years') end.setFullYear(end.getFullYear() + 2);
    return { start, end };
};

// Membership User
export const addUserMembership = async (req, res) => {
    const { userId, membershipType } = req.body;
    try {
        const { start, end } = calculateMembershipDates(membershipType);
        const user = await User.findByIdAndUpdate(userId, {
            membershipType,
            membershipStart: start,
            membershipEnd: end,
            isActive: true
        }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUserMembership = async (req, res) => {
    const { membershipType, action } = req.body;
    try {
        if (action === 'extend') {
            const { start, end } = calculateMembershipDates(membershipType);
            const user = await User.findByIdAndUpdate(req.params.id, {
                membershipType,
                membershipStart: start,
                membershipEnd: end,
                isActive: true
            }, { new: true });
            res.json(user);
        } else if (action === 'cancel') {
            const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
            res.json(user);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Membership Vendor
export const addVendorMembership = async (req, res) => {
    const { vendorId, membershipType } = req.body;
    try {
        const { start, end } = calculateMembershipDates(membershipType);
        const vendor = await Vendor.findByIdAndUpdate(vendorId, {
            membershipType,
            membershipStart: start,
            membershipEnd: end,
            isActive: true
        }, { new: true });
        res.json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateVendorMembership = async (req, res) => {
    const { membershipType, action } = req.body;
    try {
        if (action === 'extend') {
            const { start, end } = calculateMembershipDates(membershipType);
            const vendor = await Vendor.findByIdAndUpdate(req.params.id, {
                membershipType,
                membershipStart: start,
                membershipEnd: end,
                isActive: true
            }, { new: true });
            res.json(vendor);
        } else if (action === 'cancel') {
            const vendor = await Vendor.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
            res.json(vendor);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
