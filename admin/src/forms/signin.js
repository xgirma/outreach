/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withRoot from '../withRoot';
import styles from '../style';

class SigninForm extends Component {
  static displayName = 'Signin form';

  static propTypes = {
    signout: PropTypes.func.isRequired,
    signin: PropTypes.func.isRequired,
    type: PropTypes.string,
    message: PropTypes.string,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    type: '',
    message: '',
  };

  state = {
    username: '',
    password: '',
    showPassword: false,
  };

  componentDidMount() {
    const { signout } = this.props;
    signout();
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleClick = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { signin } = this.props;
    if (username && password) {
      signin(username, password);
    }
  };

  render() {
    const { type, message, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} alignContent="center">
          <Grid item xs={12}>
            <div>{message && <div className={`alert ${type}`}>{message}</div>}</div>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={this.handleSubmit}>
              {/* username */}
              <Grid item xs={12}>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="adornment-username">Username</InputLabel>
                  <Input
                    id="adornment-username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                  />
                </FormControl>
              </Grid>
              {/* password */}
              <Grid item xs={12}>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              {/* button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleClick}
                >
                  Signin
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(SigninForm));
