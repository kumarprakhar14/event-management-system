import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';
import config from '../config/env.js';

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'admin' });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                token: generateToken(user._id),
                user: { id: user._id, name: user.name, role: user.role }
            });
        } else {
            res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'vendor', isActive: true });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                token: generateToken(user._id),
                user: { id: user._id, name: user.name, role: user.role }
            });
        } else {
            res.status(401).json({ message: 'Invalid vendor credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const vendorSignup = async (req, res) => {
    const { name, email, password, category, businessName, contactDetails } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'vendor'
        });

        if (user) {
            await Vendor.create({
                userId: user._id,
                businessName: businessName || name,
                category,
                contactDetails
            });
            res.status(201).json({ message: 'Vendor registered successfully' });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'user', isActive: true });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                token: generateToken(user._id),
                user: { id: user._id, name: user.name, role: user.role }
            });
        } else {
            res.status(401).json({ message: 'Invalid user credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        if (user) {
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
