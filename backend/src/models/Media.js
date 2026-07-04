const mongoose = require('mongoose');

const mediaTimelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  period: { type: String, default: '' },
  detail: { type: String, default: '' },
}, { _id: false });

const mediaSchema = new mongoose.Schema({
  title: { type: String, default: 'Media Portfolio' },
  timeline: [mediaTimelineSchema],
  services: [{ type: String, trim: true }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

mediaSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Media', mediaSchema);
