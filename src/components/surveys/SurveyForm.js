// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import * as actions from '../../actions';

class SurveyForm extends Component {
  componentDidMount() {
    // Grabs survey Id off url and fetches the survey
    const { surveyId } = this.props;
    this.props.fetchSingleSurvey(surveyId);

    this.handleInitialValues();
  }

  handleInitialValues() {
    const { survey } = this.props;

    if (survey) {
      const initData = {
        title: survey.title,
        subject: survey.subject,
        body: survey.body,
        recipients: survey.recipients.map(({ email }) => email),
      };

      this.props.initialize(initData);
    }
  }

  renderFields() {
    return (
      <div>
        <label>Survey Title</label>
        <Field
          component="input"
          type="text"
          name="title"
        />
        <label>Subject Line</label>
        <Field
          component="input"
          type="text"
          name="subject"
        />
        <label>Email Body</label>
        <Field
          component="input"
          type="text"
          label="Email Body"
          name="body"
        />
        <label>Recipient List</label>
        <Field
          component="input"
          type="text"
          label="Recipient List"
          name="recipients"
        />
      </div>
    );
  }

  render() {
    const {
      onSurveySubmit,
      handleDraft,
      handleSubmit,
    } = this.props;
    console.log(this.props);
    return (
      <div className="container push-top">
        <form onSubmit={onSurveySubmit}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button
            className="btn blue accent-3 btn-flat right white-text"
            type="submit"
            onClick={
              handleSubmit(values => onSurveySubmit({
                ...values,
              }))
            }
          >
            Next
          </button>
          <button
            className="btn yellow accent-4 btn-flat right white-text push-right"
            onClick={
                handleSubmit(values => this.props.handleDraft({
                  ...values,
                  isDraft: true,
                }))}
            type="button"
          >
            Save as draft
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ survey }) {
  return {
    survey,
  };
}


export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: false,
})(connect(mapStateToProps, actions)(SurveyForm));
