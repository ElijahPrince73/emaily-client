import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SurveyForm from '../components/surveys/SurveyForm';
import SurveyFormReview from '../components/surveys/SurveyFormReview';
import * as actions from '../actions';

class SurveyNew extends Component {
  state = { showFormReview: false };

  componentDidMount() {
    // Grabs survey Id off url and fetches the survey
    const surveyId = this.props.match.params;
    this.props.fetchSingleSurvey(surveyId);

    this.setState({
      data: this.props.survey,
    });
  }

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
        data={this.state.data}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ survey }) {
  return {
    survey,
  };
}


export default reduxForm({
  form: 'surveyForm',
})(connect(mapStateToProps, actions)(SurveyNew));
