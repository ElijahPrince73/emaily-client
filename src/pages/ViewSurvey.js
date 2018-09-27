import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

class ViewSurvey extends Component {
  componentWillMount() {
    const surveyId = this.props.match.params;
    this.props.fetchSingleSurvey(surveyId);
  }

  deleteSurvey(surveyId) {
    const { deleteSurvey } = this.props;
    deleteSurvey(surveyId);
  }
  renderContent() {
    const { survey } = this.props;
    console.log(survey);
    return (
      <div>
        <div className="container push-top">
          <Link className="btn btn-blue push-bottom-xs" to="/surveys">
            <i className="material-icons left">chevron_left</i>Go Back
          </Link>
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>Survey Title: {survey.title}</h4>
              <p>Date Sent: {survey.dateSent}</p>
            </li>
            <li className="collection-header">
              <h5>Survey Recipients:</h5>
            </li>
            {survey.recipients.map(item => {
              return (
                <li className="collection-item" key={item._id}>
                  {item.email}
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => this.deleteSurvey(survey._id)}
            className="btn red darken-2"
          >
            Delete Survey
          </button>
        </div>
      </div>
    );
  }
  render() {
    const { survey } = this.props;

    return <div>{survey.length === 0 ? <Loader /> : this.renderContent()}</div>;
  }
}

function mapStateToProps({ survey }) {
  return {
    survey
  };
}

export default connect(
  mapStateToProps,
  actions
)(ViewSurvey);
