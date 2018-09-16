import React, { Component } from "react";
import LoginRegister from "../components/LoginRegister";
import { connect } from "react-redux";
import * as actions from "../actions";

class Landing extends Component {
  state = {
    error: false,
    errorMessage: ""
  };

  handleLogin(values) {
    this.props.loginUser(values);
  }

  handleRegister(values) {
    this.props.registerUser(values);
  }

  render() {
    // const header = JSON.parse(localStorage.getItem("header"));
    return (
      <div className="row blue darken-4 landing padding-bottom">
        <div className="container">
          <div className="col s6">
            <h3 className="white-text">Collect feedback from your users</h3>
            <p className="white-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled
            </p>
          </div>
          <div className="col s6">
            <LoginRegister
              handleLogin={this.handleLogin.bind(this)}
              handleRegister={this.handleRegister.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Landing);
