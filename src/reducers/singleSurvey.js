import { FETCH_SURVEY, REQUESTING } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case REQUESTING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SURVEY:
      return {
        loading: false,
        ...action.payload,
      };
    default:
      return state;
  }
}
