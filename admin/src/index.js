/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import store from './store/index';
import Routes from './routes/index';
import { History } from './helper';

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
