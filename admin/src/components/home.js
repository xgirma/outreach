import React, { Component } from 'react';
import { History } from '../helper';

class Home extends Component {
  displayName = 'home';

  componentDidMount() {
    History.push('/home');
  }

  render() {
    return <div>{'Hello home'}</div>;
  }
}

export default Home;
