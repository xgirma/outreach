import { combineReducers } from 'redux';

import alert from './alert';
import authentication from './signin';
import navigation from './navigation';

export default combineReducers({
  alert,
  authentication,
  navigation,
});
