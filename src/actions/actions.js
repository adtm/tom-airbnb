import { GET_SELECTED_DAY, UPDATE_SELECTED_DAY } from "./actionTypes";

export function getSelectedDay() {
  return {
    type: GET_SELECTED_DAY
  }
};

export function updateSelectedDay(newDay) {
  return {
    type: UPDATE_SELECTED_DAY,
    payload: newDay
  }
};
