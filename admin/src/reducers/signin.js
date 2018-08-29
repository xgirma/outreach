import initialState from '../store/initialState';

export default function authentication(state = initialState, action) {
  if (action.type === 'SIGNIN_REQUEST') {
    return {
      signingIn: true,
      username: action.username,
    };
  }

  if (action.type === 'SIGNIN_SUCCESS') {
    return {
      signedIn: true,
      username: action.username,
    };
  }

  if (action.type === 'SIGNIN_FAILURE') {
    return {
      signingIn: false,
    };
  }

  if (action.type === 'SIGNOUT') {
    return {};
  }

  return state;
}
