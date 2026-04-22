import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({
                name: 'Super Admin',
                email: 'admin@event.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Admin account seeded. Email: admin@event.com, Password: admin123');
        }
    } catch (err) {
        console.error('Error seeding admin:', err);
    }
};

export default seedAdmin;
