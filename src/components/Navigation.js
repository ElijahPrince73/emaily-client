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

  renderContent() {
    if (this.props.auth) {
      return (
        <div>
          <li>
            <Payments />
          </li>
          <li style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>
          <li>
            <a onClick={this.handleLogout.bind(this)}>Logout</a>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue darken-4">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
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
