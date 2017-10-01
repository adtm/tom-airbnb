import * as types from './actionTypes';

export function getDates() {
  return {
    type: types.GET_TIMES,
    data
  }
}

export function setName(name) {
  return {
    type: types.SET_NAME,
    name
  }
}

export function setSurname(surname) {
  return {
    type: types.SET_SURNAME,
    surname
  }
}

export function setSelectionDate(date) {
  return {
    type: types.SET_SELECTION_DATE,
    date
  }
}

export function setSelectionTime(time) {
  return {
    type: types.SET_SELECTION_TIME,
    time
  }
}

export function getBookings(foundBookings) {
  return {
    type: types.GET_BOOKINGS,
    foundBookings
  }
}