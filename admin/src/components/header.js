import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {};
  
  static defaultProps = {};
  
  displayName = 'Header';
  
  state = {};
  
  render() {
    return (
      <div className="container-Header">
        {"Hello Header ..."}
      </div>
    )
  }
}

export default Header;
