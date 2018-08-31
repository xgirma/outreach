import { combineReducers } from 'redux';

import alert from './alert';
import blog from './blog';
import event from './event';
import authentication from './signin';
import introduction from './introduction';
import navigation from './navigation';
import services from './services';

export default combineReducers({
  alert,
  blog,
  event,
  authentication,
  introduction,
  navigation,
  services,
});
