const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  dayId: String, 
  bookerName: String,
  bookerSurname: String,
});

module.exports = mongoose.model('booking', bookingSchema);