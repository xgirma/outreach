import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { History } from '../helper';

class SigninForm extends Component {
  displayName = 'Signin form';

  static propTypes = {
    signingIn: PropTypes.bool,
  };

  static defaultProps = {
    signingIn: false,
  };

  state = {
    username: '',
    password: '',
    submitted: false,
  };

  componentDidMount() {
    const { signout } = this.props;
    signout();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { signin } = this.props;
    if (username && password) {
      signin(username, password);
    }
  };

  render() {
    const { signingIn } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
            {submitted && !username && <div className="help-block">Username is required</div>}
          </div>
          <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password && <div className="help-block">Password is required</div>}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Signin</button>
            {signingIn && (
              <div>
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />{' '}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default SigninForm;
