import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div className="container-signin">
        {"Hello signin"}
      </div>
    )
  }
}

export default Signin;
