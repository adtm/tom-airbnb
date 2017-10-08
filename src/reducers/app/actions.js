import * as types from './actionTypes';
import axios from 'axios';

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

function clearStateCreation() {
  return {
    type: types.CLEAR_CREATION,
  }
}

function postBooking(saved) { 
  return {
    type: types.CREATE_BOOKING,
    booking: saved.data
  }
}

function receiveBookings(response) {
  return {
    type: types.GET_BOOKINGS,
    bookings: response.data
  }
}

export function fetchBookings() {
  return function (dispatch) {
    return axios.get('http://localhost:3000/api/bookings/get')
      .then(
      response => dispatch(receiveBookings(response)),
      error => console.log('An error occured.', error)
      );
  }
}

export function createBooking(
  name, surname,
  selectionTime, selectionDate
) {
  return function (dispatch) {
    return axios.post('http://localhost:3000/api/bookings/create', {
      bookerName: name,
      bookerSurname: surname,
      bookerTime: selectionTime,
      date: selectionDate
    }).then(response => {
      if (response.status == 400)
        dispatch(errorResponse(respose))
      else {
        dispatch(postBooking(response));
        dispatch(clearStateCreation())
      }
    }).catch(error => dispatch(errorResponse(error)));
  }
}

function errorResponse(err) {
  return {
    type: types.CREATE_ERROR,
    payload: err
  };
}