const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  src: { type: String, default: '' },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  thumbnail: { type: String, default: '' },
  label: { type: String, required: true, trim: true },
  aspect: { type: String, default: 'aspect-[3/4]' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

gallerySchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Gallery', gallerySchema);
