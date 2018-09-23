/* eslint-disable eqeqeq */
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
  TextField,
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
import { VisibilityOff, Visibility, Delete } from '@material-ui/icons';
import { getRole, dateFormat } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';

const blankPassword = {
  currentPassword: '',
  newPassword: '',
  newPasswordAgain: '',
};

const blankError = {
  message: '',
  name: '',
};

class AdminForm extends Component {
  static displayName = 'admin-form';

  static propTypes = {
    changePassword: PropTypes.func.isRequired,
    getAdmin: PropTypes.func.isRequired,
    deleteAdmin: PropTypes.func.isRequired,
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
    username: '',
    tempPassword: '',
  };

  async componentDidMount() {
    const { getAdmin } = this.props;
    const result = await getAdmin();
    const { status, data } = result;
    if (status === 'success') {
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

  handleUsernameChange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
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
    if (currentPassword != null) {
      currentPassword.value = '';
    }

    const newPassword = document.getElementById('adornment-newPassword');
    if (newPassword != null) {
      newPassword.value = '';
    }

    const newPasswordAgain = document.getElementById('adornment-newPasswordAgain');
    if (newPasswordAgain != null) {
      newPasswordAgain.value = '';
    }
  };

  handleCreateNewAdmin = async (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      tempPassword: '',
    }));

    const { addNewAdmin } = this.props;
    const { username } = this.state;
    const result = await addNewAdmin({ username });
    const { status, data } = result;
    const error = status === 'error' || status === 'fail' ? data : blankError;

    this.setState((prevState) => ({
      ...prevState,
      tempPassword: data.temporaryPassword,
      username: '',
      error,
    }));
    // TODO fetch date at this point. instead of refreshing
  };

  handlePasswordReset = async (_id) => {
    const result = await this.props.changePassword({ _id });
    const { status, data } = result;
    const error = status === 'error' || status === 'fail' ? data : blankError;

    this.setState((prevState) => ({
      ...prevState,
      tempPassword: data.temporaryPassword,
      username: '',
      error,
    }));
  };

  handleDelete = async (id) => {
    await this.props.deleteAdmin(id);
    // TODO get admins
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <Typography variant="title" component="h2">
                Change Password
              </Typography>
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
                  color="primary"
                  onClick={this.handlePasswordUpdate}
                >
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>

          <CardContent>
            <Typography variant="title" component="h2">
              Add New Admin
            </Typography>
            <Typography color="error">
              {this.state.error.name !== '' &&
                `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
            </Typography>
            <Typography color="primary">
              {this.state.tempPassword !== '' &&
                this.state.tempPassword !== undefined &&
                `Temporary password: ${this.state.tempPassword}`}
            </Typography>
          </CardContent>

          <CardContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                required
                name="username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                label="Username"
                id="margin-none"
                className={classes.textField}
                helperText="e.g. Jane.Joe"
              />

              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={this.handleCreateNewAdmin}
                >
                  Create New Admin
                </Button>
              </CardActions>
            </form>
          </CardContent>

          <CardContent>
            <Typography variant="headline" component="h2">
              Manage Accounts
            </Typography>

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Created on</TableCell>
                  <TableCell>Admin name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.admins.map((admin) => (
                  <TableRow key={admin._id}>
                    <TableCell component="th" scope="row">
                      {moment(admin.createdAt).format(dateFormat)}
                    </TableCell>
                    <TableCell>{admin.username}</TableCell>
                    <TableCell>{admin.role == 0 ? 'super-admin' : 'admin'}</TableCell>
                    <TableCell>
                      {getRole() == 0 &&
                        admin.role != 0 && (
                          <Button
                            variant="contained"
                            className={classes.button}
                            color="secondary"
                            onClick={() => this.handlePasswordReset(admin._id)}
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
                          aria-label="Delete"
                          color="secondary"
                          onClick={() => this.handleDelete(admin._id)}
                        >
                          <Delete />
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
