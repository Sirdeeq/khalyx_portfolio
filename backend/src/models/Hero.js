const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  roles: [{ type: String, trim: true }],
  tagline: { type: String, default: '' },
  portrait: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

heroSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Hero', heroSchema);
