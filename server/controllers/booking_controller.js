const Booking = require('../models/booking');
const Day = require('../models/day');

function getBookings(req, res, next) {
  Booking.find()
    .then(bookings => res.json(bookings))
    .catch(e => res.json('404'));
}

function createBooking(req, res, next) {
  const { bookerName, bookerSurname, date } = req.body;

  Day.findOne({ date: date })
    .then(foundDay => {
      if (!foundDay) {
        const newDay = new Day({ date })
        newDay.save()
          .then(savedDate => {
            const booking = new Booking({
              dayId: savedDate._id,
              bookerName, bookerSurname
            });
            booking.save()
              .then(savedBooking => res.json(savedBooking))
              .catch(e => res.json('404'));
          })
          .catch(e => console.log(e));
      } else {
        const booking = new Booking({
          dayId: foundDay._id,
          bookerName, bookerSurname
        });
        booking.save()
          .then(savedBooking => res.json(savedBooking))
          .catch(e => res.json('404'));
      }
    })

}

module.exports = {
  getBookings,
  createBooking
}