const Booking = require('../models/booking');
const Day = require('../models/day');
const moment = require('moment');

function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

function resetDays(req, res, next) {
  let savedItems = [];
  for (let i = -80; i < 100; i++) {
    const time = moment().toDate().getTime() + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    const day = new Day({
      date: strTime,
      bookings: []
    });
    day.save()
      .then(savedData => {
        savedItems.push(savedData);
    }).catch(e => console.log(e));
  }
  res.json(savedItems); // change to async
}

module.exports = {
  resetDays
}
