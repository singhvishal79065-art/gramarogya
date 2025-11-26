
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patientName: { type: String, required: true },
  patientPhone: { type: String },
  date: { type: String, required: true }, // ISO date string (YYYY-MM-DD)
  timeSlot: { type: String, required: true }, // e.g. "10:00-10:15"
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Ensure uniqueness of booking per doctor+date+timeSlot
AppointmentSchema.index({ doctor: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
