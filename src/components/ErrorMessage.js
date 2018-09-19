import React from "react";

const ErrorMessage = props => {
  return (
    <div className="push-top">
      <span className="red-text text-darken-3">{props.errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;
