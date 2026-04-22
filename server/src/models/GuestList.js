import mongoose from 'mongoose';

const guestListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventName: { type: String },
    guests: [
        {
            name: String,
            email: String,
            phone: String,
            rsvp: { type: String, enum: ['Invited', 'Confirmed', 'Declined'], default: 'Invited' }
        }
    ]
}, { timestamps: true });

export default mongoose.model('GuestList', guestListSchema);
