/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Card,
  CardActions,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import { getRole } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';

const blankPassword = {
  password: {
    currentPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  },
};

const blankError = {
  message: '',
  name: '',
};

class AdminForm extends Component {
  displayName = 'admin-form';

  static propTypes = {
    changePassword: PropTypes.func.isRequired,
    getAdmin: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    password: {
      currentPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    error: blankError,
    admins: [],
    showPassword: false,
  };

  async componentDidMount() {
    const { getAdmin } = this.props;
    const result = await getAdmin();
    const { status, data } = result;
    if (status === 'success' && data.admins.length > 0) {
      const { admins } = data;
      this.setState({
        admins,
        error: blankError,
      });
    }

    if (status === 'fail' || status === 'error') {
      this.setState({
        error: { ...data },
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      password: {
        ...prevState.password,
        [name]: value,
      },
    }));
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handlePasswordUpdate = async (event) => {
    event.preventDefault();
    const { changePassword } = this.props;
    const { password } = this.state;
    const result = await changePassword(password);
    const { status, data } = result;

    const error = status === 'error' || status === 'fail' ? data : blankError;

    this.setState((prevState) => ({
      ...prevState,
      password: blankPassword,
      error,
    }));

    const currentPassword = document.getElementById('adornment-currentPassword');
    currentPassword != null ? (currentPassword.value = '') : null;

    const newPassword = document.getElementById('adornment-newPassword');
    newPassword != null ? (newPassword.value = '') : null;

    const newPasswordAgain = document.getElementById('adornment-newPasswordAgain');
    newPasswordAgain != null ? (newPasswordAgain.value = '') : null;
  };

  handlePasswordReset = async (admin) => {};

  handleDelete = async (admin) => {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Active
            </Typography>
            <Typography variant="headline" component="h2">
              Change Password
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Enter existing and new password
            </Typography>
          </CardContent>

          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Current password</InputLabel>
                <Input
                  id="adornment-currentPassword"
                  name="currentPassword"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password.currentPassword}
                  onChange={this.handleChange}
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

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="adornment-newPassword"
                  name="newPassword"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password.newPassword}
                  onChange={this.handleChange}
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

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm password</InputLabel>
                <Input
                  id="adornment-newPasswordAgain"
                  name="newPasswordAgain"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password.newPasswordAgain}
                  onChange={this.handleChange}
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

              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handlePasswordUpdate}
                >
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>

          <CardContent>
            <Typography color="error">
              {this.state.error.name !== '' &&
                `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
            </Typography>
          </CardContent>

          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Database
            </Typography>
            <Typography variant="headline" component="h2">
              Account management
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              List of existing admins
            </Typography>

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Created on</TableCell>
                  <TableCell>Admin name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.admins.map((admin) => (
                  <TableRow key={admin._id}>
                    <TableCell component="th" scope="row">
                      {moment(admin.createdAt).format('L')}
                    </TableCell>
                    <TableCell>{admin.username}</TableCell>
                    <TableCell>{admin.role == 0 ? 'super-admin' : 'admin'}</TableCell>
                    <TableCell>
                      {getRole() == 0 &&
                        admin.role != 0 && (
                          <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => this.handlePasswordReset(admin)}
                          >
                            Reset Password
                          </Button>
                        )}
                    </TableCell>
                    <TableCell>
                      {
                        <Button
                          variant="contained"
                          className={classes.button}
                          onClick={() => this.handleDelete(admin._id)}
                        >
                          Delete
                        </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(AdminForm));
