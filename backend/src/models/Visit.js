const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  ips: [String],
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);
