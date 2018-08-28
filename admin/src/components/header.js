import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends PureComponent {
  displayName = 'Header';

  static propTypes = {
    signedIn: PropTypes.bool,
    username: PropTypes.string,
  };

  static defaultProps = {
    signedIn: false,
    username: '',
  };

  render() {
    const { signedIn, username } = this.props;

    return (
      <div>
        <h3>
          Outreach Administration:
          {signedIn && `${username}`}
        </h3>
        {signedIn && <Link to="/signin">Signout</Link>}
      </div>
    );
  }
}

export default Header;
