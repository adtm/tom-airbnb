const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookerName: String,
  bookerSurname: String,
});

module.exports = mongoose.model('Booking', bookingSchema);