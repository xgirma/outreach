import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { signinUser } from '../actions';

class Signin extends Component {
  static propTypes = {};

  static defaultProps = {};

  displayName = 'Signin';

  state = {
    isFetching: false,
    isAuthenticated: false,
    user: {},
    errorMessage: '',
  };

  render() {
    return <div className="Signin" />;
  }
}

export default Signin;
