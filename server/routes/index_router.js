const express = require('express');
const router = express.Router();

const booking_router = require('./booking_router');
const day_router = require('./day_router');
const request_router = require('./request_routes');

router.use('/bookings', booking_router);
router.use('/days', day_router);
router.use('/request', request_router);

module.exports = router;