import React, { Component } from 'react';
import Header from './components/header'
class Application extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Application;
