const mongoose = require('mongoose');

const Booking = {
  bookerName: String,
  bookerSurname: String,
  bookerTime: { type: Date },
  requests: []
}

const daySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  bookings: [Booking]
});

module.exports = mongoose.model('Day', daySchema);