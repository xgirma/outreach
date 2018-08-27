import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
  static propTypes = {};
  
  static defaultProps = {};
  
  displayName = 'home';
  
  state = {};
  
  render() {
    return (
      <div className="container-home">
        {"Hello home"}
      </div>
    )
  }
}

export default Home;
