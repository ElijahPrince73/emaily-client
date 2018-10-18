import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SurveyCreate from '../components/surveys/SurveyCreate';
import SurveyFormReview from '../components/surveys/SurveyFormReview';
import * as actions from '../actions';

class SurveyCreatePage extends Component {
    state = {
      showFormReview: false,
    };

    handleDraft(values) {
      const { submitSurveyDraft } = this.props;
      submitSurveyDraft(values);
    }

    renderContent() {
      if (this.state.showFormReview) {
        return (
          <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
        );
      }

      return (
        <SurveyCreate
          handleDraft={this.handleDraft.bind(this)}
          onSurveySubmit={() => this.setState({ showFormReview: true })}
        />
      );
    }

    render() {
      return <div>{this.renderContent()}</div>;
    }
}

SurveyCreatePage = connect(
  null, actions,
)(SurveyCreatePage);

export default reduxForm({
  form: 'surveyCreate',
})(SurveyCreatePage);
