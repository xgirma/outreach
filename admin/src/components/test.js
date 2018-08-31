import React, {Component} from 'react';
import PropTypes from 'prop-types';

class test extends Component {
  displayName = 'test';
  
  static propTypes = {};
  
  static defaultProps = {};
  
  state = {};
  
  render() {
    return (
      <div>
        {"Hello test"}
      </div>
    )
  }
}

export default test;
