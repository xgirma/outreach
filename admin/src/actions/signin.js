import { signinService } from '../services';
import { History, setUser, removeUser } from '../helper';
import { alertError, alertClear } from './alert';

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
    History.push('/home');
    dispatch(alertClear());
  }

  if (status === 'fail') {
    dispatch(signinFailure());
    dispatch(alertError('Incorrect username or password'));
  }
};

export const signout = () => (dispatch) => {
  removeUser();
  History.push('/signin');
  dispatch(logout());
};
