const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true } // snapshot price at order time
});

const OrderSchema = new mongoose.Schema({
  items: [OrderItemSchema],
  customerName: { type: String, required: true },
  customerPhone: { type: String },
  address: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
