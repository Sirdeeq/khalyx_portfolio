const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  excerpt: { type: String, default: '' },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  images: [{ type: String }],
  author: { type: String, default: 'Sadiq Baba Idris' },
  tags: [{ type: String, trim: true }],
  readTime: { type: String, default: '' },
  isPublished: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

blogSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Blog', blogSchema);
