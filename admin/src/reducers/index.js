import { DELETE_INFO } from '../actions';

export default function (state = {}, action) {
  if (action.type === DELETE_INFO) {
    
    return {
      ...state,
    };
  }
  
  return state;
}
