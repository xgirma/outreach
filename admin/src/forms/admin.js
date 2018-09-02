/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { Input, Button } from '../components';
import { getRole } from '../helper';

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

function TableRow({ admin, onDelete, onPasswordReset }) {
  const role = getRole() == 0 && admin.role != 0;
  return (
    <tr>
      <td>{moment(admin.createdAt).format('L')}</td>
      <td>{admin.username}</td>
      <td>{admin.role == 0 ? 'super-admin' : 'admin'}</td>
      <td>{<Button action={() => onDelete(admin._id)} title="Delete" />}</td>
      {role && (
        <td>
          <Button action={() => onPasswordReset} title="Reset Password" />
        </td>
      )}
    </tr>
  );
}

TableRow.propTypes = {
  admin: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPasswordReset: PropTypes.func.isRequired,
};

class AdminForm extends Component {
  displayName = 'admin-form';

  static propTypes = {
    changePassword: PropTypes.func.isRequired,
  };

  state = {
    password: {
      currentPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    error: blankError,
    admins: [],
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

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handlePasswordUpdate = async (event) => {
    event.preventDefault();
    const { changePassword } = this.props;
    const { password } = this.state;
    const result = await changePassword(password);
    const { status, data } = result;

    if (status === 'error' || status === 'fail') {
      this.setState((prevState) => ({
        ...prevState,
        password: blankPassword,
        error: data,
      }));
    }
  };

  handlePasswordReset = async (admin) => {};

  handleDelete = async (admin) => {};

  render() {
    const { currentPassword, newPassword, newPasswordAgain } = this.state.password;
    return (
      <div>
        <div>
          {this.state.error.name !== '' &&
            `Name: ${this.state.error.name} Message: ${this.state.error.message}`}
        </div>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="password"
            title="Password"
            name="currentPassword"
            value={currentPassword}
            placeholder="Enter your current password"
            onChange={this.handleChange}
          />
          <Input
            type="password"
            title="New Password"
            name="newPassword"
            value={newPassword}
            placeholder="Enter your new password"
            onChange={this.handleChange}
          />
          <Input
            type="password"
            title="New Password Again"
            name="newPasswordAgain"
            value={newPasswordAgain}
            placeholder="Enter your new password again"
            onChange={this.handleChange}
          />
          <Button action={this.handlePasswordUpdate} title="Submit" />
        </form>
        <table>
          <thead>
            <tr>
              <th>Created on</th>
              <th>By</th>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.admins.map((admin) => (
              <TableRow
                key={admin._id}
                admin={admin}
                onDelete={this.handleDelete}
                onPasswordReset={this.handlePasswordReset}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminForm;
