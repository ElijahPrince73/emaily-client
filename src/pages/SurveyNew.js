import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SurveyForm from '../components/surveys/SurveyForms';
import SurveyFormReview from '../components/surveys/SurveyFormReview';
import * as actions from '../actions';

class SurveyNew extends Component {
  state = { showFormReview: false };

  handleDraft(values) {
    const {
      submitSurveyDraft,
    } = this.props;
    submitSurveyDraft(values);
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        handleDraft={this.handleDraft.bind(this)}
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}


export default reduxForm({
  form: 'surveyForm',
})(connect(null, actions)(SurveyNew));
