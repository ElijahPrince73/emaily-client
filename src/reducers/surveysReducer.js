import { FETCH_SURVEYS, REQUESTING, ERROR } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case REQUESTING:
      return { isFetching: true };
    case ERROR:
      return {
        isFetching: false,
        error: true
      };
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
