const async = require('async');
const Booking = require('../models/booking');
const Day = require('../models/day');
const moment = require('moment');

function errorResponse(phrase, err) {
  return {
    info: `Error in reseting data: ${phrase}`,
    err
  }
}

function resetDays(req, res) {

  Day
    .remove()
    .then(() => console.log('Day data deleted!'))
    .catch(err => console.log(err));

  Booking
    .remove()
    .then(() => console.log('Booking data deleted!'))
    .catch(err => console.log(err));

  var createUser = function(respose, callback) {
    callback(null, {
        date: response
    });
  };

  async.times(50, function(n, next) {
    var m = moment
      .utc()
      .set({hour:0, minute:0, second:0, millisecond:0})
      .add(n, 'days')
      .toISOString();

    const date = moment(m).format();
    Day
      .create({date, bookings: []})
      .then(response => next(null, response))
      .catch(err => next(err, null)) 

  }, (err, response) => {
    if (err)
      res.status(404).send(errorResponse('creating', err));
    res.status(200).send(response);
  });
}

module.exports = {
  resetDays
}
