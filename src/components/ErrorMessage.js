import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = props => (
  <div className="push-top">
    <span className="red-text text-darken-3">{props.errorMessage}</span>
  </div>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
