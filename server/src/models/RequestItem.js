import mongoose from 'mongoose';

const requestItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    itemDescription: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Acknowledged', 'Fulfilled'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('RequestItem', requestItemSchema);
