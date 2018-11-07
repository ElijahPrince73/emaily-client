/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class SurveyCreate extends Component {
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
                handleSubmit(values => handleDraft({
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

SurveyCreate.propTypes = {
  onSurveySubmit: PropTypes.func.isRequired,
  handleDraft: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    survey: state.survey,
  };
}

SurveyCreate = reduxForm({
  form: 'surveyCreate',
  destroyOnUnmount: false,
})(SurveyCreate);

SurveyCreate = connect(
  mapStateToProps,
  actions,
)(SurveyCreate);

export default SurveyCreate;
