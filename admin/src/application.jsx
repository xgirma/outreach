import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './containers/header';

class Application extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Header />
        <div>
          { children }
        </div>
      </Fragment>
    );
  }
}

export default Application;
