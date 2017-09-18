const express = require('express');
const router = express.Router();

const booking_controller = require('../controllers/booking_controller');

router.route('/get')
  .get(booking_controller.getBookings);

router.route('/create')
  .post(booking_controller.createBooking);

module.exports = router;