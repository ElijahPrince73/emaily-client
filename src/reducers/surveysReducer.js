import { FETCH_SURVEYS, REQUESTING } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case REQUESTING:
      return { isFetching: true };
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
