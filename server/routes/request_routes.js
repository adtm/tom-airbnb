const express = require('express');
const router = express.Router();

const request_controller = require('../controllers/request_controller');

router.route('/')
  .get(request_controller.getRequests)

router.route('/default')
  .post(request_controller.createDefaultRequests)

module.exports = router;