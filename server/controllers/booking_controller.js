const Booking = require('../models/booking');
const Day = require('../models/day');

function getBookings(req, res, next) {
  Day.find()
    .then(bookings => res.json(bookings))
    .catch(e => res.json('404'));
}

function createBooking(req, res, next) {
  const { bookerName, bookerSurname, bookerTime, date } = req.body;

  Day.findOne({ date: date })
    .then(foundDay => {
      if (!foundDay) {
        const booking = new Booking({
          bookerName, bookerSurname, bookerTime
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
          bookerName, bookerSurname, bookerTime
        });
        booking.save()
          .then(savedBooking => {
            foundDay.bookings.push(savedBooking);
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