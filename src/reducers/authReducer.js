import { FETCH_USER, POST_USER, ERROR } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case POST_USER:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return state;
  }
}
