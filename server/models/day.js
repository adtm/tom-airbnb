const mongoose = require('mongoose');

const Booking = {
  bookerName: String,
  bookerSurname: String,
  bookerTime: String,
}

const daySchema = new mongoose.Schema({
  date: String,
  bookings: [Booking]
});

module.exports = mongoose.model('Day', daySchema);