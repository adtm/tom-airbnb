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
  const datef = moment(
    moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD') +
    moment(bookerTime, 'HH:mm').format('HH:mm'),
    'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');

  // limit--checking
  const year_limit = moment(date).year();
  const month_limit = moment(date).month();

  // @TODO fix upper date
  const lower_date = moment(new Date(year_limit, month_limit, 1)).format();
  const upper_date = moment(new Date(year_limit, month_limit + 1, 0)).format();

  Day
    .find({ date: { $gte: lower_date, $lte: upper_date } })
    .then(response => {
      const bookings = [];
      response.map(date => {
        date.bookings.map(booking => {
          bookings.push(booking);
        })
      });

      if (bookings.length > 1) {
        res.status(400).send(errorResponse('limit', 'Exceeded month limit'));
      }
      else {
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
    });
}

module.exports = {
  getBookings,
  createBooking
}