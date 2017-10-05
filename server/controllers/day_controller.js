const async = require('async');
const Day = require('../models/day');
const moment = require('moment');

function resetDays(req, res) {
  var createUser = function(respose, callback) {
    callback(null, {
        date: response
    });
  };
  async.times(50, function(n, next) {
    const date = moment().add(n, 'days').format();
    const day = new Day({ date, bookings: [] });
      day.save(n, function(err, user) {
          next(err, user);
      });
  }, function(err, dates) {
      res.json(dates)
  });

}

module.exports = {
  resetDays
}
