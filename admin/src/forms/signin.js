import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/loading';

class SigninForm extends Component {
  displayName = 'Signin form';

  static propTypes = {
    signingIn: PropTypes.bool,
    signout: PropTypes.func.isRequired,
    signin: PropTypes.func.isRequired,
    type: PropTypes.string,
    message: PropTypes.string,
  };

  static defaultProps = {
    signingIn: false,
    type: '',
    message: '',
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
    const { signingIn, type, message } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <div>
        <div>{message && <div className={`alert ${type}`}>{message}</div>}</div>

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
            <button className="btn btn-primary" type="submit">
              Signin
            </button>
            {signingIn && (
              <div>
                {' '}
                <Loading text="" />{' '}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default SigninForm;
