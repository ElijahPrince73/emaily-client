import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from '../components/surveys/SurveyDraft';
import SurveyFormReview from '../components/surveys/SurveyFormReview';

class SurveyNew extends Component {
  state = {
    showFormReview: false,
  };

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
          isDraft
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        handleDraft={this.handleDraft.bind(this)}
        onSurveySubmit={() => this.setState({ showFormReview: true })}
        surveyId={this.props.match.params}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
