const item = localStorage.getItem('orusername');
const username = item ? item.username : null;
const initialState = item ? { signedIn: true, username } : {};

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
    return {};
  }
  
  if (action.type === 'SIGNOUT'){
    return {};
  }

  return state;
}
