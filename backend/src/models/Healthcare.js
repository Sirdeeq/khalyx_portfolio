const mongoose = require('mongoose');

const healthcareSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  period: { type: String, default: '' },
  brief: { type: String, default: '' },
  responsibilities: [{ type: String, trim: true }],
  highlight: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

healthcareSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Healthcare', healthcareSchema);
