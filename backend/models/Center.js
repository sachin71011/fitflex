const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  type: { type: String, required: true },
  img: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
  distance: { type: Number, default: 1.2 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Center', centerSchema);
