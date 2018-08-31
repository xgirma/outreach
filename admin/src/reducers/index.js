import { combineReducers } from 'redux';

import alert from './alert';
import event from './event';
import authentication from './signin';
import introduction from './introduction';
import navigation from './navigation';

export default combineReducers({
  alert,
  event,
  authentication,
  introduction,
  navigation,
});
