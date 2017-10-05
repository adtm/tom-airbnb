const mongoose = require('mongoose');

const Booking = {
  bookerName: String,
  bookerSurname: String,
  bookerTime: String,
}

const daySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  bookings: [Booking]
});

module.exports = mongoose.model('Day', daySchema);