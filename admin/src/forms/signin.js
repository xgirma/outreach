/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  Button,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core';
import { LockOutlined, VisibilityOff, Visibility } from '@material-ui/icons';
import withRoot from '../withRoot';
import styles from '../styles';

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
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="adornment-username">Username</InputLabel>
                <Input
                  id="adornment-username"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                  autoComplete="username"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="adornment-password"
                  name="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  autoComplete="current-password"
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
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={this.handleClick}
              >
                Sign in
              </Button>
              <Typography variant="caption" gutterBottom align="center">
                {message && <div className={`alert ${type}`}>{message}</div>}
              </Typography>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(SigninForm));
