const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String },
  phone: { type: String },
  email: { type: String },
  experienceYears: { type: Number, default: 0 },
  fees: { type: Number, default: 0 },
  // optionally store availableSlots or clinic address
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
