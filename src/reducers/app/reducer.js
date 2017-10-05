import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

const initialState = Immutable({
  today: moment().format("YYYY-MM-DD"),
  lastDay: moment().add(2, 'weeks').format("YYYY-MM-DD"),

  selectionDate: moment().format("YYYY-MM-DD"),
  selectionTime: moment().format("HH:mm"),

  name: '',
  surname: '',

  items: {}
});


export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.CLEAR_CREATION: {
      return {
        ...state,
        name: '',
        surname: '',
        selectionDate: moment().format("YYYY-MM-DD"),
        selectionTime: moment().format("HH:mm"),
      }
    }
    case types.SET_SELECTION_DATE: {
      return {
        ...state,
        selectionDate: action.date
      }
    }
    case types.SET_SELECTION_TIME: {
      return {
        ...state,
        selectionTime: action.time
      }
    }
    case types.SET_NAME: {
      return {
        ...state,
        name: action.name
      }
    }
    case types.SET_SURNAME: {
      return {
        ...state,
        surname: action.surname
      }
    }
    case types.GET_BOOKINGS: {
      return {
        ...state,
       bookings: action.bookings
      }; 
    }
    case types.CREATE_BOOKING: {
      const newBookings = state.bookings;
      return {
        ...state,
        bookings: newBookings.map(b => {
          if (b.date == action.booking.date) {
            b.bookings = action.booking.bookings;
          }
          return b;
        })
      }
    }
    default:
      return state;
  }
}

