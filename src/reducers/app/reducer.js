import { GET_SELECTED_DAY, UPDATE_SELECTED_DAY } from "./actionTypes";
import moment from "moment";

const initialStore = {
  selectedDay: moment()
};

export default function app(state = initialStore, action = {}) {
  switch (action.type) {
    case GET_SELECTED_DAY:
      return { ...state };
    case UPDATE_SELECTED_DAY:
      return { ...state, selectedDay: action.payload };
    default:
      return { ...state };
  }
}
