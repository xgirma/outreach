import { signin } from '../services/index';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

const requestSignin = (credentials) => ({
  type: SIGNIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  credentials,
});

const receiveSignin = (result) => ({
  type: SIGNIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: result.data.token,
});

const signinError = (result) => ({
  type: SIGNIN_FAILURE,
  isFetching: false,
  isAuthenticated: true,
  message: result.data.message,
});

export const signinUser = (credential) => (dispatch) => {
  dispatch(requestSignin(credential));
  signin(credential)
    .then((result) => {
      const { token } = result.data;
      localStorage.setItem('id_token', token);
      dispatch(receiveSignin(result));
    })
    .catch((error) => {
      dispatch(signinError(error));
    });
};
