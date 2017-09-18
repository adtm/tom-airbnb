const mongoose = require('mongoose');
const Booking = require('./booking');

const daySchema = new mongoose.Schema({
  timestamp: Date,
  bookings: [
    Booking
  ]
});

module.exports = mongoose.model('day', daySchema);