import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Signin extends Component {
  static propTypes = {};

  static defaultProps = {};

  displayName = 'Signin';
  
  state = {
    username: '',
    password: '',
  };
  
  handleChange = (event) => {
  
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        {"Hello signin"}
      </div>
    )
  }
}

export default Signin;
