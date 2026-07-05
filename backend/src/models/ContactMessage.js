const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, default: '', trim: true },
  reason: { type: String, default: '' },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  reply: { type: String, default: '' },
}, { timestamps: true });

contactMessageSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
