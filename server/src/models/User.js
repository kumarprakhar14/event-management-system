import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'vendor', 'user'], required: true },
    membershipType: { type: String, enum: ['6months', '1year', '2years'] },
    membershipStart: Date,
    membershipEnd: Date,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
