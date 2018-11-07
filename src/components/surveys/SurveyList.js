/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    const { surveys } = this.props;
    console.log(surveys);
    if (surveys.length === 0) {
      return (
        <div className="row container push-top">
          <div className="col m6">
            <h4>Create beautiful email campaigns with ease.</h4>
            <p>
              Emaily helps grow teams send beautiful, optimized emails quickly
              and easily.
            </p>
          </div>
          <div className="col m6">
            <img src="/mail.png" alt="img" />
          </div>
        </div>
      );
    }
    if (surveys.error) {
      return <h4 className="center">An Error has occured</h4>;
    }
    return (
      <div>
        {surveys.map(survey => (
          <Link to={`/view-survey/${survey._id}`} key={survey._id}>
            <div className="card grey lighten-2 hoverable">
              {survey.isDraft
                ? (
                  <div className="draft">
                    Draft
                  </div>
                )
                : null
            }
              <div className="card-content">
                <span className="card-title">{survey.title}</span>
                <p>{survey.body}</p>
                <p className="right">
                  Sent On:
                  {' '}
                  {new Date(survey.dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <span className="light-green-text darken-4">
                  Yes:
                  {' '}
                  {survey.yes}
                </span>
                <span className="light-green-text darken-4">
                  No:
                  {' '}
                  {survey.no}
                </span>
              </div>
            </div>
          </Link>
        ))}
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

SurveyList.propTypes = {
  fetchSurveys: PropTypes.func.isRequired,
  surveys: PropTypes.array.isRequired,
};

function mapStateToProps({ surveys, auth }) {
  return { surveys, auth };
}

export default connect(
  mapStateToProps,
  { fetchSurveys },
)(SurveyList);
