import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from './containers/header';

class Application extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <div>
          { children }
        </div>
      </div>
    );
  }
}

export default Application;
