import React, { Component } from "react";
import LoginRegister from "../components/LoginRegister";
import { connect } from "react-redux";
import * as actions from "../actions";

class Landing extends Component {
  state = {
    loading: false,
    hidden: false,
    isError: false,
    errorMessage: ""
  };

  handleLogin(values) {
    const { loginUser, auth } = this.props;

    loginUser(values);

    if (auth === "Invalid Request" || auth === null || auth === "") {
      this.setState({
        isError: true,
        errorMessage: "Invalid Request"
      });
    } else {
      this.setState({
        loading: true,
        hidden: true
      });
    }
  }

  handleRegister(values) {
    const { registerUser, auth } = this.props;

    registerUser(values);

    if (auth === "Invalid Request" || auth === null || auth === "") {
      this.setState({
        isError: true,
        errorMessage: "Invalid Request"
      });
    } else {
      this.setState({
        loading: true,
        hidden: true
      });
    }
  }

  render() {
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
              loading={this.state.loading}
              hidden={this.state.hidden}
              isError={this.state.isError}
              errorMessage={this.state.errorMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(Landing);
