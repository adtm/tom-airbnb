const express = require('express');
const router = express.Router();

const day_controller = require('../controllers/day_controller');

router.route('/create')
  .post(day_controller.resetDays);

module.exports = router;