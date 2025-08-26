const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  coming: { type: Boolean, required: true },
  initedBy: { type: String, default: "Abdullah"}
});

module.exports = mongoose.model('Rsvp', rsvpSchema);
