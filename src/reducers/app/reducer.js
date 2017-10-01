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
    case types.GET_TIMES: {
      return {
        ...state
      }
    }
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
      data.map(booking => {
        const strTime = booking.date;
        if (!state.items[strTime]) {
          state.items[strTime] = [];
          booking.bookings.map(oneBooking => {
            state.items[strTime].push({
              name: oneBooking.bookerName,
              surname: oneBooking.bookerSurname,
              time: oneBooking.bookerTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          })
        }
        Object.assign({}, state, {
          itmes: state.items
        });
      });
      return {
        ...state
      }
    }
    default:
      return state;
  }
}

