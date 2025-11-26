const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  prescriptionRequired: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medicine', MedicineSchema);
