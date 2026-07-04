const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  bio: { type: String, default: '' },
  passion: { type: String, default: '' },
  values: [{ type: String, trim: true }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

aboutSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('About', aboutSchema);
