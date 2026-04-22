import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: { type: Number, required: true },
    shippingDetails: {
        name: String,
        email: String,
        address: String,
        city: String,
        state: String,
        pinCode: String,
        phone: String
    },
    paymentMethod: { type: String, enum: ['Cash', 'UPI'], required: true },
    status: {
        type: String,
        enum: ['Received', 'Ready for Shipping', 'Out for Delivery', 'Delivered'],
        default: 'Received'
    }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
