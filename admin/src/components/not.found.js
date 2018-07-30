import React, { Component } from 'react';

class NotFound extends Component {
  static propTypes = {};
  
  static defaultProps = {};
  
  displayName = 'NotFound';
  
  render() {
    return (
      <div className="NotFound">
        <div className="NotFound-bar">
          {''}
        </div>
        <h1> Page Not Found</h1>
        {'Some beautiful paths can not be discovered without getting lost. Erol Ozan'}
      </div>
    );
  }
}

export default NotFound;
