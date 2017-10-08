const Booking = require('../models/booking');
const Day = require('../models/day');
const moment = require('moment');

function errorResponse(phrase, err) {
  return {
    info: `Error in booking: ${phrase}`,
    err
  }
}

function getBookings(req, res) {
  Day
    .find()
    .sort('date')
    .then(response => res.status(200).send(response))
    .catch(err => errorResponse('day', err));
}

function createBooking(req, res, next) {

  // @TODO change moment things
  const { bookerName, bookerSurname, bookerTime, date } = req.body;
  const year = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
  const time = moment(bookerTime, 'HH:mm').format('HH:mm')
  const datef = moment(year + ' ' + time, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');

  Day
    .findOne({ date: date })
    .then(foundDay => {
      if (!foundDay) {
        Booking
          .create({ bookerName, bookerSurname, bookerTime: datef })
          .then(
          response => {
            Day
              .create({ bookings: bookings.concat(response) })
              .then(response => res.status(200).send(response))
              .catch(err => errorResponse('day', err));
          }).catch(err => errorResponse('booking', err));
      } 

      Booking
        .create({ bookerName, bookerSurname, bookerTime: datef })
        .then(
        response => {
          // @TODO change later to a regular map
          foundDay.bookings.push(response);
          foundDay.bookings.sort((a, b) => {
            return moment(a.bookerTime).valueOf() - moment(b.bookerTime).valueOf();
          })
          foundDay
            .save()
            .then(response => res.status(200).send(response))
            .catch(err => errorResponse('booking', err));
        }).catch(err => errorResponse('booking', err));
    })
}

module.exports = {
  getBookings,
  createBooking
}