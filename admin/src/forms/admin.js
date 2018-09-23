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
  LinearProgress,
} from '@material-ui/core';
import { VisibilityOff, Visibility, Delete } from '@material-ui/icons';
import { getRole, dateFormat } from '../helper';
import withRoot from '../withRoot';
import styles from '../styles';
import Failed from '../components/failed';

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
    admin: PropTypes.object.isRequired,
    deleteAdmin: PropTypes.func.isRequired,
    addNewAdmin: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    password: {
      currentPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    error: blankError,
    showPassword: false,
    username: '',
  };

  async componentDidMount() {
    await this.props.getAdmin();
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
    const { password } = this.state;
    await this.props.changePassword(password);
    this.setState((prevState) => ({
      ...prevState,
      password: blankPassword,
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
    const { username } = this.state;
    await this.props.addNewAdmin({ username });
    this.setState((prevState) => ({
      ...prevState,
      username: '',
    }));
    await this.props.getAdmin();
  };

  handlePasswordReset = async (_id) => {
    await this.props.changePassword({ _id });
  };

  handleDelete = async (id) => {
    await this.props.deleteAdmin(id);
    await this.props.getAdmin();
  };

  render() {
    const { classes } = this.props;

    if (this.props.admin.getFailed) {
      return <Failed name="event" />;
    }

    if (this.props.admin.isLoading) {
      return <LinearProgress />;
    }

    if (this.props.admin.admins) {
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
                    Change
                  </Button>
                </CardActions>
              </form>
            </CardContent>

            <CardContent>
              <Typography color="error" id="ser-17">
                {Object.keys(this.props.admin.error).length !== 0 &&
                  `Name: ${this.props.admin.error.name} Message: ${this.props.admin.error.message}`}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="title" component="h2">
                Add New Admin
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  required
                  fullWidth
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
                    Add Admin
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
                    <TableCell>Temporary password</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.admin.admins.map((admin) => (
                    <TableRow key={admin._id}>
                      <TableCell component="th" scope="row">
                        {moment(admin.createdAt).format(dateFormat)}
                      </TableCell>
                      <TableCell>
                        <Typography
                          color={
                            admin.username === this.props.admin.newUsername ||
                            admin._id === this.props.admin.id
                              ? 'primary'
                              : 'inherit'
                          }
                        >
                          {admin.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color={
                            admin.username === this.props.admin.newUsername ||
                            admin._id === this.props.admin.id
                              ? 'primary'
                              : 'inherit'
                          }
                        >
                          {admin.username === this.props.admin.newUsername ||
                          admin._id === this.props.admin.id
                            ? this.props.admin.temporaryPassword
                            : ''}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color={
                            admin.username === this.props.admin.newUsername ||
                            admin._id === this.props.admin.id
                              ? 'primary'
                              : 'inherit'
                          }
                        >
                          {admin.role == 0 ? 'super-admin' : 'admin'}
                        </Typography>
                      </TableCell>
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

    return null;
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(AdminForm));
