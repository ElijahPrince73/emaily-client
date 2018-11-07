import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Payment = props => (
  <StripeCheckout
    name="Emaily"
    description="$5 for 5 email credits"
    amount={500}
    token={token => props.handleToken(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
    <button className="btn blue accent-3" type="button">Add Credits</button>
  </StripeCheckout>
);

Payment.propTypes = {
  handleToken: PropTypes.func.isRequired,
};

export default connect(
  null,
  actions,
)(Payment);
