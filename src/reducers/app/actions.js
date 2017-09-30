import * as types from './actionTypes';

export function getDates() {
  return {
    type: types.GET_TIMES,
    data
  }
}

export function setSelectionDate(date) {
  return {
    type: types.SET_SELECTION_DATE,
    date
  }
}