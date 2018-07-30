import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { deleteInfo } from '../actions';
import reducers from '../reducers';
import initialState from './initial';

const middleware = [thunk];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers),
);

store.dispatch(deleteInfo());

export default store;
