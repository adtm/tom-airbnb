const Booking = require('../models/booking');
const Day = require('../models/day');
const moment = require('moment');

function getBookings(req, res, next) {
  Day.find().sort('date')
    .then(bookings => res.json(bookings))
    .catch(e => res.json('404'));
}

function createBooking(req, res, next) {
  const { bookerName, bookerSurname, bookerTime, date } = req.body;
  const year = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
  const time = moment(bookerTime, 'HH:mm').format('HH:mm')
  const datef = moment(year + ' ' + time, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');

  Day.findOne({ date: date })
    .then(foundDay => {
      if (!foundDay) {
        const booking = new Booking({
          bookerName, bookerSurname, bookerTime:datef
        });
        booking.save()
          .then(savedBooking => {
            const newDay = new Day({ date });
            newDay.bookings.push(savedBooking);
            newDay.save()
              .then(savedDate => {
                res.json(savedDate);
              })
              .catch(e => console.log(e));
          })
          .catch(e => res.json('404'));
      } else { 
        const booking = new Booking({
          bookerName, bookerSurname, bookerTime:datef
        });

        booking.save()
          .then(savedBooking => {
            foundDay.bookings.push(savedBooking);
            foundDay.bookings.sort((a, b) => {
              return moment(a.bookerTime).valueOf() - moment(b.bookerTime).valueOf();
            })
            foundDay.save()
              .then(savedDate => {
                res.json(savedDate);
              })
              .catch(e => console.log(e));
          })
          .catch(e => res.json('404'));
      }
    })
}



module.exports = {
  getBookings,
  createBooking
}