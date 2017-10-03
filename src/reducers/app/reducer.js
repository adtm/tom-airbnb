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
    case types.CREATE_BOOKING: {
      const { date } = action.savedBookings.data;
      let dateArr = state.items;
      Object.keys(dateArr).forEach(key => {
        if (key == date) {
          dateArr[key] = action.savedBookings.data.bookings;
        }
      });
      return {
        ...state,
        items: dateArr
      }
    }
    default:
      return state;
  }
}

