import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../actions";
import Loader from "../components/Loader";

class SurveyList extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    if (this.props.surveys.length) {
      return this.props.surveys.reverse().map(survey => {
        return (
          <div className="card grey lighten-2" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a className="light-green-text darken-4">Yes: {survey.yes}</a>
              <a className="light-green-text darken-4">No: {survey.no}</a>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="center">
          <h4 className="">No surveys available</h4>
        </div>
      );
    }
  }

  render() {
    return <div className="surveys-page container">{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys, auth }) {
  return { surveys, auth };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
