/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import * as actions from '../actions';

class Header extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  handleLogout() {
    const { logoutUser } = this.props;
    logoutUser();
  }

  renderContent() {
    if (this.props.auth) {
      return (
        <div className="nav-items-container">
          <div>
            <Payments />
          </div>
          <div>
            Credits:
            {' '}
            {this.props.auth.credits}
          </div>
          <div>
            <button 
              type="button"
              className='logout'
              onClick={this.handleLogout.bind(this)}
            >
            Logout
            </button>
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
            to={this.props.auth ? '/surveys' : '/'}
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

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions,
)(Header);
