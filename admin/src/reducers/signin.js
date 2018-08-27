let user = JSON.parse(localStorage.getItem('outreach-admin-user'));
const initialState = user ? { signedIn: true, user } : {};

export default function authentication(state = initialState, action) {
  if(action.type === 'SIGNIN_REQUEST'){
    return {
      signingIn: true,
      user: action.user
    }
  }
  
  if(action.type === 'SIGNIN_SUCCESS'){
    return {
      signedIn: true,
      user: action.user
    }
  }
  
  if(action.type === 'SIGNIN_FAILURE'){
    return {
      signingIn: false,
    }
  }
  
  return state;
}
