import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

const initialState = Immutable({
  today: moment().format("YYYY-MM-DD"),
  selectionDate: moment().format("YYYY-MM-DD"),
  selectionTime: moment().format("HH:mm"),
  lastDay: moment().add(2, 'weeks').format("YYYY-MM-DD"),
});


export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_TIMES: {
      return {
        ...state
      }
    }
    default:
      return state;
  }
}

