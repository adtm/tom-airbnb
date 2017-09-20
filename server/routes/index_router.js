const express = require('express');
const router = express.Router();

const booking_router = require('./booking_router');
const day_router = require('./day_router');

router.use('/days', day_router);

module.exports = router;