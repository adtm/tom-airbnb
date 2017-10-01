import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

const initialState =  {
  today: moment().format("YYYY-MM-DD"),
  lastDay: moment().add(2, 'weeks').format("YYYY-MM-DD"),

  selectionDate: moment().format("YYYY-MM-DD"),
  selectionTime: moment().format("HH:mm"),

  name: '',
  surname: '',

  items: {}
};


export default function app(state = initialState, action = {}) {
  switch (action.type) {
    // case types.GET_TIMES: {
    //   return {
    //     ...state
    //   }
    // }
    case types.SET_SELECTION_DATE: {
      return Object.assign({}, state, {
        selectionDate: action.date,
      });
    }
    case types.SET_SELECTION_TIME: {
      return Object.assign({}, state, {
        selectionTime: action.time,
      });
    }
    case types.SET_NAME: {
      return Object.assign({}, state, {
        name: action.name
      });
    }
    case types.SET_SURNAME: {
      return Object.assign({}, state, {
        surname: action.surname
      });
    }
    case types.GET_BOOKINGS: {
      const { data } = action.foundBookings;
      let dateArr = {};
      data.map(booking => {
        const strTime = booking.date;
        if (!state.items[strTime]) {
          dateArr[strTime] = [];
          booking.bookings.map(oneBooking => {
            dateArr[strTime].push({
              name: oneBooking.bookerName,
              surname: oneBooking.bookerSurname,
              time: oneBooking.bookerTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          })
        }
      });
      return Object.assign({}, state, {
        items: dateArr
      }); 
    }
    // case types.CREATE_BOOKING: {
    //   const { date } = action.savedBookings;
    //   Object.keys(state.items).forEach(key => {
    //     if (key == date) {
    //       let arr = [];
    //       action.savedBookings.data.bookings.map(booking => {
    //         arr.push({
    //           name: booking.bookerName,
    //           surname: booking.bookerSurname,
    //           time: booking.bookerTime,
    //           height: Math.max(50, Math.floor(Math.random() * 150))
    //         })
    //       });
    //       state.items[key] = arr;
    //     }
    //     Object.assign({}, state, {
    //       items: state.items
    //     });
    //   });
    //   return {
    //     ...state
    //   }
    // }
    default:
      return state;
  }
}

