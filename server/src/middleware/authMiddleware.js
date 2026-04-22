import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/env.js';

const authMiddleware = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user || !req.user.isActive) {
            return res.status(401).json({ message: 'User not found or inactive' });
        }

        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ message: 'Not authorized' });
    }
};

export default authMiddleware;
