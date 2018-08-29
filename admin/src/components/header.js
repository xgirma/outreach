import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends PureComponent {
  displayName = 'Header';

  static propTypes = {
    signedIn: PropTypes.bool,
    username: PropTypes.string,
    path: PropTypes.string.isRequired,
    navigateTo: PropTypes.func.isRequired,
  };

  static defaultProps = {
    signedIn: false,
    username: '',
  };

  /* eslint-disable */
  state = {
    value: this.props.path,
  };
  /* eslint-enable */

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    const { navigateTo } = this.props;
    navigateTo(value);
  };

  render() {
    const { signedIn, username } = this.props;
    const { value } = this.state;

    return (
      <div>
        <h3>
          Outreach:
          {signedIn && ` ${username}`}
        </h3>
        <div>
          {signedIn && (
            <form onSubmit={this.handleSubmit}>
              <label>
                Menu:
                <select value={value} onChange={this.handleChange}>
                  <option value="home">Home</option>
                  <option value="information">Information</option>
                  <option value="introduction">Introduction</option>
                  <option value="events">Events</option>
                  <option value="services">Services</option>
                  <option value="blog">Blog</option>
                  <option value="media">Media</option>
                  <option value="account">Account</option>
                </select>
              </label>
              <input type="submit" value="Go" />
            </form>
          )}
        </div>
        <div>{signedIn && <Link to="/signin">Signout</Link>}</div>
      </div>
    );
  }
}

export default Header;
