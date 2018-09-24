// SurveyFormReview show users their form inputs for review
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label className="survey-title">{label}</label>
        <div className="survey-value">{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div className="container">
      <h5>Please confirm your entries</h5>
      <div className="push-bottom">{reviewFields}</div>
      <button
        className="yellow darken-2 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="btn blue accent-3 btn-flat right white-text"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  // gives all of our the values a user entered in
  // and puts them in the formValues object
  return {
    formValues: state.form.surveyForm.values
  };
}
// Making redux connect to our redux state and allowing it to use actions and then connect it the component

// Adding withRouter function to gain access to the history object and redirect after send
export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
