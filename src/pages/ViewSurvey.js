import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs';
import * as actions from '../actions';
import Loader from '../components/Loader';

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

    // Need to make this use actual data
    const data = [
      {
        value: 10,
        color: '#F7464A',
        highlight: '#FF5A5E',
        label: 'Responses No',
      },
      {
        value: 20,
        color: '#46BFBD',
        highlight: '#5AD3D1',
        label: 'Responses Yes',
      },
    ];

    return (
      <div className="row container push-top">
        <Link className="btn btn-blue push-bottom-xs" to="/surveys">
          <i className="material-icons left">chevron_left</i>
            Go Back
        </Link>
        <div className="card custom-card-size">
          <div className="center">
            <h4>Survey Responses</h4>
            <Pie data={data} />
          </div>
          <div className="card-content">
            <ul className="with-header">
              <li className="collection-header">
                <h4>
                  Title:
                  {' '}
                  {survey.title}
                </h4>
                <p>
                  Date Sent:
                  {' '}
                  {survey.dateSent}
                </p>
              </li>
              <li className="collection-header">
                <h5> Survey Recipients: </h5>
              </li>
              {survey.recipients.map(item => (
                <li
                  className="collection-item"
                  key={item._id}
                >
                  {' '}
                  {item.email}
                </li>
              ))
              }
            </ul>
            <button
              onClick={() => this.deleteSurvey(survey._id)}
              className="btn red darken-2"
              type="button"
            >
            Delete Survey
            </button>
          </div>
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
    survey,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(ViewSurvey);
