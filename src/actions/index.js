import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, POST_USER } from "./types";

// Gets current user
export const fetchUser = () => async dispatch => {
  const header = localStorage.getItem("header");
  const res = await axios.get(`${process.env.REACT_APP_GET_CURRENT_USER}`, {
    headers: { "x-auth": header }
  });
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Gets surveys
export const fetchSurveys = () => async dispatch => {
  const header = localStorage.getItem("header");
  const res = await axios.get(`${process.env.REACT_APP_SURVEYS}`, {
    headers: { "x-auth": header }
  });

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};


// POST Used in SurveyFormReview.js
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post(`${process.env.REACT_APP_SURVEYS}`, values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const registerUser = values => async dispatch => {
  const res = await axios.post(
    `${process.env.REACT_APP_REGISTER_USER}`,
    values
  );
  if (res.data.tokens[0].token) {
    localStorage.setItem("header", res.data.tokens[0].token);
    window.location.href = "/surveys";
  }
  dispatch({ type: POST_USER, payload: res.data });
};
