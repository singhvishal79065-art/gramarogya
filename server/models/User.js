const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'shopkeeper', 'admin'],
        default: 'patient'
    },
    // Common fields
    phone: { type: String },
    address: { type: String },
    
    // Doctor specific fields
    specialization: { type: String },
    experience: { type: Number },
    fees: { type: Number },
    isApproved: { type: Boolean, default: false }, // For doctor/shopkeeper approval
    
    // Shopkeeper specific fields
    shopName: { type: String },
    licenseNumber: { type: String },

    // Patient specific fields
    medicalHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
