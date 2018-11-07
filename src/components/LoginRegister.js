import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import LoaderSm from './LoaderSm';
import ErrorMessage from './ErrorMessage';

class LoginRegister extends Component {
  state = {
    activeTab: true,
  };

  showFormLogin() {
    this.setState({
      activeTab: true,
    });
  }

  showFormRegister() {
    this.setState({
      activeTab: false,
    });
  }

  render() {
    const {
      handleLogin,
      handleRegister,
      handleSubmit,
      errorMessage,
      loading,
    } = this.props;

    return (
      // Tab Bar
      <div>
        <div className="switcher">
          <div
            className={
              this.state.activeTab
                ? 'col s6 login center-align box-left box active-tab'
                : 'col s6 login center-align box-left box white-text'
            }
            onClick={this.showFormLogin.bind(this)}
          >
            Login
          </div>
          <div
            className={
              !this.state.activeTab
                ? 'col s6 login center-align box-right box active-tab'
                : 'col s6 login center-align box-right box white-text'
            }
            onClick={this.showFormRegister.bind(this)}
          >
            Register
          </div>
        </div>

        {/* Forms */}
        {this.state.activeTab ? (
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="form-container grey lighten-5 center-align"
          >
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="email"
                  type="email"
                  className="validate"
                  component="input"
                  placeholder="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="password"
                  type="password"
                  className="validate"
                  component="input"
                  placeholder="password"
                />
              </div>
            </div>
            {loading ? <LoaderSm /> : null}
            <button
              className="btn waves-effect waves-light blue darken-3"
              type="submit"
              name="action"
            >
              Submit
            </button>
            {typeof errorMessage === 'string'
            || errorMessage instanceof String ? (
              <ErrorMessage errorMessage={errorMessage} />
              ) : null}
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="form-container grey lighten-5 center-align"
          >
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="email"
                  className="validate"
                  component="input"
                  placeholder="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  type="password"
                  name="password"
                  className="validate"
                  component="input"
                  placeholder="password"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="passwordConf"
                  type="password"
                  className="validate"
                  component="input"
                  placeholder="password confirmation"
                />
              </div>
            </div>
            {loading ? <LoaderSm /> : null}
            <button
              className="btn waves-effect waves-light blue darken-3"
              type="submit"
              name="action"
            >
              Submit
            </button>
            {typeof errorMessage === 'string'
            || errorMessage instanceof String ? (
              <ErrorMessage errorMessage={errorMessage} />
              ) : null}
          </form>
        )}
      </div>
    );
  }
}
export default reduxForm({
  form: 'loginRegister',
})(LoginRegister);
