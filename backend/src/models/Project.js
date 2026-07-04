const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  num: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  features: { type: String, default: '' },
  role: { type: String, default: '' },
  url: { type: String, default: '' },
  col1_img1: { type: String, default: '' },
  col1_img2: { type: String, default: '' },
  col2_img: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

projectSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Project', projectSchema);
