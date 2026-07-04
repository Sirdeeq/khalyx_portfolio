const mongoose = require('mongoose');

const techStackSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  items: [{ type: String, trim: true }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

techStackSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('TechStack', techStackSchema);
