import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    category: { type: String, enum: ['Catering', 'Florist', 'Decoration', 'Lighting'], required: true },
    contactDetails: { type: String },
    membershipType: { type: String, enum: ['6months', '1year', '2years'] },
    membershipStart: Date,
    membershipEnd: Date,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
