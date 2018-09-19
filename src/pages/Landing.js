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
    console.log(this.props);
    return (
      <div className="row blue darken-4 landing padding-bottom">
        <div className="container">
          <div className="col m6 ">
            <h3 className="white-text">Collect feedback from your users</h3>
            <p className="white-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled
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
