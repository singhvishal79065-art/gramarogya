const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    prescription: {
        type: String,
        required: true
    },
    suggestedMedicines: [{
        type: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
