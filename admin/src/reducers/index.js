import { combineReducers } from 'redux';

import admin from './admin';
import alert from './alert';
import blog from './blog';
import event from './event';
import authentication from './signin';
import introduction from './introduction';
import media from './media';
import navigation from './navigation';
import services from './services';

export default combineReducers({
  admin,
  authentication,
  alert,
  blog,
  event,
  introduction,
  media,
  navigation,
  services,
});
