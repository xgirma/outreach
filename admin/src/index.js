import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import store from './store/index';
import Routes from './routes';

const History = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={History}>
          <Routes />
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
