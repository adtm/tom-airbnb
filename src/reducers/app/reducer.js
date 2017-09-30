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
    default:
      return state;
  }
}

