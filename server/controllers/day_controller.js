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
    var m = moment.utc();
    m.set({hour:0,minute:0,second:0,millisecond:0});
    m.add(n, 'days');
    m.toISOString();
    const date = m.format();
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
