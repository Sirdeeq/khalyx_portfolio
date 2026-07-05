const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  src: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  thumbnail: { type: String, default: '' },
}, { _id: false });

const gallerySchema = new mongoose.Schema({
  assets: { type: [assetSchema], default: [], validate: v => v.length <= 10 },
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
