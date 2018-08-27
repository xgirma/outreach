import { combineReducers } from 'redux';

import alert from './alert';
import authentication from './signin';

export default combineReducers({
  alert,
  authentication,
});
