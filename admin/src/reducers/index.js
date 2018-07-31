import * as ACTIONS from '../actions';

export default function (state = {}, action) {
  if (action.type === ACTIONS.SIGNIN_REQUEST) {
    
    return {
      isFetching: true,
      isAuthenticated: false,
      user: action.credential,
    };
  }
  
  if (action.type === ACTIONS.SIGNIN_SUCCESS) {
    
    return {
      isFetching: false,
      isAuthenticated: true,
      errorMessage: '',
    };
  }
  
  if (action.type === ACTIONS.SIGNIN_FAILURE) {
    
    return {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message,
    };
  }
  
  return state;
}
