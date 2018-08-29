import { signinService } from '../services';
import { History, setUser, removeUser } from '../helper';
import { alertError, alertClear } from './alert';
import { navigateTo } from "./navigation";

const signinRequest = (username) => ({
  type: 'SIGNIN_REQUEST',
  username,
});

const signinSuccess = (username) => ({
  type: 'SIGNIN_SUCCESS',
  username,
});

const signinFailure = () => ({
  type: 'SIGNIN_FAILURE',
});

const logout = () => ({ type: 'SIGNOUT' });

export const signin = (username, password) => async (dispatch) => {
  dispatch(signinRequest(username));
  const result = await signinService(username, password);
  const { status, data } = result;

  if (status === 'success') {
    setUser(data, username);
    dispatch(signinSuccess(username));
    dispatch(navigateTo('home'));
    dispatch(alertClear());
  }

  if (status === 'fail') {
    dispatch(signinFailure());
    dispatch(alertError('Incorrect username or password'));
  }
};

export const signout = () => (dispatch) => {
  removeUser();
  dispatch(navigateTo('signin'));
  dispatch(logout());
};
