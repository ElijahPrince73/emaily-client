// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyFields';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => (
      <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
        data={this.props.data}
      />
    ));
  }

  render() {
    const {
      onSurveySubmit,
      handleDraft,
      handleSubmit,
    } = this.props;

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

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You Must Provide a Value';
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
