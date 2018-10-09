import React, { Component } from 'react';
import { connect } from "react-redux";
import LoginRegister from "../components/LoginRegister";
import * as actions from '../actions';

class Landing extends Component {
  handleLogin(values) {
    const { loginUser } = this.props;

    loginUser(values);
  }

  handleRegister(values) {
    const { registerUser } = this.props;

    registerUser(values);
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="row push-top-sm">
        <div className="container">
          <div className="col m6 ">
            <h3 className="white-text">
              The simplest survey
              <br />
              platform for
              <br />
              developers & teams
            </h3>
            <p className="white-text">
              Send, manage, and scale your surveys faster and more efficiently
              on Emaily. We make managing your surveys easy for businesses,
              whether you’re running one survey or ten thousand.
            </p>
          </div>
          <div className="col m6 s12">
            <LoginRegister
              handleLogin={this.handleLogin.bind(this)}
              handleRegister={this.handleRegister.bind(this)}
              errorMessage={auth}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(Landing);
