import { signinService } from '../services';
import { History } from '../helper';

const signinRequest = username => ({
  type: 'SIGNIN_REQUEST',
  username,
});

const signinSuccess = username => ({
  type: 'SIGNIN_SUCCESS',
  username,
});

const signinFailure = () => ({
  type: 'SIGNIN_FAILURE',
});

export const signin = (username, password) => async (dispatch) => {
  dispatch(signinRequest(username));
  const result = await signinService(username, password);
  const { status, data } = result;

  if (status === 'success') {
    const { token } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    dispatch(signinSuccess(username));
    History.push('/');
  }

  if (status === 'fail') {
    dispatch(signinFailure());
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  History.push('/signin');
};
