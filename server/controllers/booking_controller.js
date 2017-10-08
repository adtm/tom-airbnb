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

  const { bookerName, bookerSurname, bookerTime, date } = req.body;
  const datef = dateConcatanateTime(date, bookerTime);

  const year_limit = moment(date).year();
  const month_limit = moment(date).month();

  const lower_date = moment({year: year_limit, month: month_limit, day: 1})
  const upper_date = moment({year: year_limit, month: month_limit + 1, day: 1})

  Day
    .find({ date: { $gte: lower_date, $lte: upper_date } })
    .then(response => {
      const bookings = [];
      response.map(date => {
        date.bookings.map(booking => {
          bookings.push(booking);
        })
      });

      if (bookings.length > 8) {
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
                });
                foundDay
                  .save()
                  .then(response => res.status(200).send(response))
                  .catch(err => errorResponse('booking', err));
              }).catch(err => errorResponse('booking', err));
          })
      }
    });
}

function dateConcatanateTime(date, time) {
  return moment(
    moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD') +
    moment(time, 'HH:mm').format('HH:mm'),
    'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
}

module.exports = {
  getBookings,
  createBooking
}