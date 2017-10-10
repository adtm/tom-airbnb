const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookerName: String,
  bookerSurname: String,
  bookerTime: { type: Date },
  requests: [],
});

module.exports = mongoose.model('Booking', bookingSchema);