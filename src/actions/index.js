import axios from "axios";
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_SURVEY,
  POST_USER,
  DELETE,
  ERROR,
  REQUESTING
} from "./types";
const header = localStorage.getItem("header");

// Gets current user
export const fetchUser = () => async dispatch => {
  const res = await axios.get(process.env.REACT_APP_GET_CURRENT_USER, {
    headers: { "x-auth": header }
  });

  dispatch({ type: FETCH_USER, payload: res.data });
};

// Gets surveys
export const fetchSurveys = () => async dispatch => {
  dispatch({ type: REQUESTING });
  await axios
    .get(process.env.REACT_APP_SURVEYS, {
      headers: { "x-auth": header }
    })
    .then(res => {
      dispatch({ type: FETCH_SURVEYS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ERROR });
    });
};

// Gets a single survey
export const fetchSingleSurvey = value => async dispatch => {
  const res = await axios.get(`${process.env.REACT_APP_SURVEYS}/${value.id}`, {
    headers: { "x-auth": header }
  });

  dispatch({ type: FETCH_SURVEY, payload: res.data });
};

// POST Used in SurveyFormReview.js
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post(process.env.REACT_APP_SURVEYS, values, {
    headers: { "x-auth": header }
  });
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteSurvey = value => async dispatch => {
  const res = await axios
    .delete(`${process.env.REACT_APP_SURVEYS}/${value}`, {
      headers: { "x-auth": header }
    })
    .then(res => {
      window.location.href = "/surveys";
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data.errorMessage });
    });
};

export const loginUser = values => async dispatch => {
  await axios
    .post(process.env.REACT_APP_LOGIN_USER, values)
    .then(res => {
      if (res.data.tokens[0].token) {
        dispatch({ type: POST_USER, payload: res.data });
        localStorage.setItem("header", res.data.tokens[0].token);
        window.location.href = "/surveys";
      }
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data.errorMessage });
    });
};

export const logoutUser = values => async dispatch => {
  await axios
    .delete(process.env.REACT_APP_LOGOUT_USER, {
      headers: { "x-auth": header }
    })
    .then(() => {
      localStorage.removeItem("header");
      window.location.href = "/";
    });
};

export const registerUser = values => async dispatch => {
  await axios
    .post(process.env.REACT_APP_REGISTER_USER, values)
    .then(res => {
      if (res.data.tokens[0].token) {
        dispatch({ type: POST_USER, payload: res.data });
        localStorage.setItem("header", res.data.tokens[0].token);
        window.location.href = "/surveys";
      }
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err.response.data.errorMessage });
    });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post(process.env.REACT_APP_HANDLE_TOKEN, token, {
    headers: { "x-auth": header }
  });
  dispatch({ type: FETCH_USER, payload: res.data });
};
