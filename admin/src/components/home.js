import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import styles from '../style';

class Home extends Component {
  static displayName = 'home-component';

  render() {
    return <div>Home</div>;
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(Home));
