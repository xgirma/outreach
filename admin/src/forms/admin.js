import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AdminForm extends Component {
  displayName = 'admin';
  
  static propTypes = {};
  
  static defaultProps = {};
  
  state = {};
  
  render() {
    return (
      <div>
        {"Hello admin"}
      </div>
    )
  }
}

export default AdminForm;
