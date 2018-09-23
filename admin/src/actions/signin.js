import { addService } from '../services';
import { setUser, removeUser } from '../helper';
import { alertError, alertClear } from './alert';
import { navigateTo } from './navigation';

const resource = 'signin';

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
  const body = { username, password };
  try {
    const result = await addService(resource, body);
    if (result && result.status === 'success') {
      await setUser(result.data, username);
      dispatch(signinSuccess(username));
      dispatch(navigateTo('information'));
      dispatch(alertClear());
    } else {
      dispatch(signinFailure());
      dispatch(alertError('Incorrect username or password'));
    }
  } catch (error) {
    dispatch(signinFailure());
  }
};

export const signout = () => async (dispatch) => {
  await removeUser();
  dispatch(navigateTo('signin'));
  dispatch(logout());
};
