const express = require('express');
const router = express.Router();

const day_controller = require('../controllers/day_controller');

router.route('/reset')
  .post(day_controller.resetDays);

module.exports = router;