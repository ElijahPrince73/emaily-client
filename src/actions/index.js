import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

// Gets current user
export const fetchUser = () => async dispatch => {
  const res = await axios.get(`${process.env.REACT_APP_GET_CURRENT_USER}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Gets surveys
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get(`${process.env.REACT_APP_SURVEYS}`);

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

// Post with token
export const handleToken = token => async dispatch => {
  const res = await axios.post(
    `${process.env.REACT_APP_POST_STRIPE_TOKEN}`,
    token
  );

  dispatch({ type: FETCH_USER, payload: res.data });
};

// POST Used in SurveyFormReview.js
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post(`${process.env.REACT_APP_SURVEYS}`, values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};
