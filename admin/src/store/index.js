/* eslint-disable no-underscore-dangle */

import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import initialState from './initialState';

const logger = createLogger();
const middleware = [thunk, logger];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers),
);

export default store;
