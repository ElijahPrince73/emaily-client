import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import * as actions from "../actions";

class Header extends Component {
  handleLogout() {
    const { logoutUser } = this.props;
    logoutUser();
  }

  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  renderContent() {
    if (this.props.auth) {
      return (
        <div className="nav-items-container">
          <div>
            <Payments />
          </div>
          <div>Credits: {this.props.auth.credits}</div>
          <div>
            <a onClick={this.handleLogout.bind(this)}>Logout</a>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-background navigation">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="nav-logo center"
          >
            <i className="material-icons">mail_outline</i>
            <p className="nav-name">Emaily</p>
          </Link>
          <div className="nav-setter">{this.renderContent()}</div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(Header);
