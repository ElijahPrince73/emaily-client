// SurveyFormReview show users their form inputs for review
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class SurveyFormReview extends Component {
  renderValues() {
    let { formValues } = this.props
    let recipients;

    if (Array.isArray(formValues.recipients)) {
      recipients = formValues.recipients.join(', ');
    } else {
      recipients = formValues.recipients.split(',').join(', ');
    }

    return (
      <div>
        <h5>Title</h5>
        <p>{formValues.title}</p>
        <h5>Subject</h5>
        <p>{formValues.subject}</p>
        <h5>Body</h5>
        <p>{formValues.body}</p>
        <h5>Recipients</h5>
        <p>{recipients}</p>
      </div>
    );
  }

  render() {
    const {
      onCancel,
      formValues,
      submitSurvey,
      history,
    } = this.props;

    return (
      <div className="container">
        <h4>Please confirm your entries</h4>
        <div className="push-bottom" />
        {this.renderValues()}
        <button
          className="yellow darken-2 white-text btn-flat"
          onClick={onCancel}
          type="button"
        >
          Back
        </button>
        <button
          className="btn blue accent-3 btn-flat right white-text"
          onClick={() => submitSurvey(formValues, history)}
          type="button"
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  if (state.form.surveyForm) {
    return {
      formValues: state.form.surveyForm.values,
    };
  }
  return {
    formValues: state.form.surveyCreate.values,
  };
}
export default connect(
  mapStateToProps,
  actions,
)(withRouter(SurveyFormReview));
