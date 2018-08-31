import { combineReducers } from 'redux';

import alert from './alert';
import authentication from './signin';
import introduction from './introduction';
import navigation from './navigation';

export default combineReducers({
  alert,
  authentication,
  introduction,
  navigation,
});
