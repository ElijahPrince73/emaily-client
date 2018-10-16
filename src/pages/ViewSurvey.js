import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs';
import Loader from  '../components/Loader'
import * as actions from '../actions';

class ViewSurvey extends Component {
  state = {
    data: [{
      value: null,
      color: '#F7464A',
      highlight: '#FF5A5E',
      label: 'Responses No',
    }, {
      value: null,
      color: '#46BFBD',
      highlight: '#5AD3D1',
      label: 'Responses Yes',
    }],
  }

  componentDidMount() {
    const { survey } = this.props;
    // Grabs survey Id off url and fetches the survey
    const surveyId = this.props.match.params;
    this.props.fetchSingleSurvey(surveyId);

    const data = this.state.data;
    data[0].value = survey.no;
    data[1].value = survey.yes;
    this.setState({
      data,
    });
  }

  deleteSurvey(surveyId) {
    const { deleteSurvey } = this.props;
    deleteSurvey(surveyId);
  }

  renderContent() {
    const { survey } = this.props;
    const surveyId = this.props.match.params;

    const date = new Date(survey.dateSent).toDateString();
    return (
      <div className="row container push-top">
        <h4>{survey.title}</h4>
        <div className="card custom-card-size">
          <div className="card-content">
            <h5>
              {survey.recipients.length}
              {' '}
              Recipients
            </h5>
            <div className="row">
              <div className="col s6">
                <p>
                  Subject:
                  {' '}
                  {survey.subject}
                </p>
              </div>
              <div className="col s6">
                <p>
                  Delivered:
                  {' '}
                  {date}
                </p>
              </div>
            </div>
            <h5>Survey Responses</h5>
            {this.state.data.length
              ? <p>No responses yet</p>
              : <Pie data={this.state.data} />
            }
            <h5>Survey Recipients</h5>
            <ul className="collection">
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

            <Link
              className="btn blue accent-3 right"
              to={`/draft/${surveyId.id}`}
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { survey } = this.props;
    if (survey.loading) {
      return <Loader />
    }
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
