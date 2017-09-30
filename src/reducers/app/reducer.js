import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

const initialState = Immutable({
  today: moment().format("YYYY-MM-DD"),
  lastDay: moment().add(2, 'weeks').format("YYYY-MM-DD"),

  selectionDate: moment().format("YYYY-MM-DD"),
  selectionTime: moment().format("HH:mm"),

  name: '',
  surname: ''
});


export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_TIMES: {
      return {
        ...state
      }
    }
    case types.SET_SELECTION_DATE: {
      return {
        selectionDate: action.date,
        ...state
      }
    }
    case types.SET_SELECTION_TIME: {
      return {
        selectionTime: action.time,
        ...state
      }
    }
    case types.SET_NAME: {
      return {
        name: action.name,
        ...state
      }
    }
    case types.SET_SURNAME: {
      return {
        surname: action.surname,
        ...state
      }
    }
    default:
      return state;
  }
}

