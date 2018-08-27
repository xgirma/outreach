const signinRequest = (user) => ({
  type: 'SIGNIN_REQUEST',
  user,
});

const signinSuccess = (user) => ({
  type: 'SIGNIN_SUCCESS',
  user,
});

const signinFailure = () => ({
  type: 'SIGNIN_FAILURE',
});

export const signin = (username, password) => async dispatch => {
  dispatch(signinRequest());
  try {
    // TODO: add this
    dispatch(signinSuccess());
  } catch(error){
    console.log('signin error', error); // TODO remove
    dispatch(signinFailure());
  }
};

export const signout = () => dispatch => {};
