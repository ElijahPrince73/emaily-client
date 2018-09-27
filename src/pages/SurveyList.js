import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../actions";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

class SurveyList extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    const { surveys } = this.props;

    if (surveys.length === 0) {
      return (
        <h4 className="center">
          No Surveys Found Please Add Credits and Create a Survey
        </h4>
      );
    }
    if (surveys.error) {
      return <h4 className="center">An Error has occured</h4>;
    }
    return (
      <div>
        {surveys.map(survey => {
          return (
            <Link to={`/view-survey/${survey._id}`} key={survey._id}>
              <div className="card grey lighten-2">
                <div className="card-content">
                  <span className="card-title">{survey.title}</span>
                  <p>{survey.body}</p>
                  <p className="right">
                    Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                  </p>
                </div>
                <div className="card-action">
                  <span className="light-green-text darken-4">
                    Yes: {survey.yes}
                  </span>
                  <span className="light-green-text darken-4">
                    No: {survey.no}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  render() {
    const { surveys } = this.props;
    return (
      <div>
        {surveys.isFetching ? (
          <Loader />
        ) : (
          <div className="surveys-page container">{this.renderSurveys()}</div>
        )}
      </div>
    );
  }
}
function mapStateToProps({ surveys, auth }) {
  return { surveys, auth };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
