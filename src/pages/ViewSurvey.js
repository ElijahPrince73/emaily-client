import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Loader from "../components/Loader";

class ViewSurvey extends Component {
  componentWillMount() {
    const surveyId = this.props.match.params;
    this.props.fetchSingleSurvey(surveyId);
  }

  render() {
    const { survey } = this.props;
    console.log(survey);
    return (
      <div>
        {survey.length === 0 ? (
          <Loader />
        ) : (
          <div className="container push-top">
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
          </div>
        )}
      </div>
    );
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
