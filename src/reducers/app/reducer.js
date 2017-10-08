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

  items: {},
  erorr: ''
});


export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.CREATE_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
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
    // @TODO does not work correctly - FIX URGENT
    case types.CREATE_BOOKING: {
      const newBookings = state.bookings;
      return {
        ...state,
        bookings: newBookings.map(b => {
          if (b.date == moment(action.booking.date).format('YYYY-MM-DD')) {
            b.bookings = action.booking.bookings;
            console.log('hit');
            b.booking.sort((a,b) => {
              console.log(moment(a.bookerTime).format('HH:mm'));
              return moment(a.bookerTime).format('HH:mm') - moment(b.bookerTime).format('HH:mm');
            })
          }
          console.log(b)
          return b;
        })
      }
    }
    default:
      return state;
  }
}

