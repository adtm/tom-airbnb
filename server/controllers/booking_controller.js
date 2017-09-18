const Booking = require('../models/booking');

function getBookings(req, res, next) {
  Booking.find()
    .then( bookings => res.json(bookings))
    .catch( e => res.json('404'));
}

module.exports = {
  getBookings
}