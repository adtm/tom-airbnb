const express = require('express');
const router = express.Router();

const booking_router = require('./booking_router');

router.use('/bookings', booking_router);

module.exports = router;