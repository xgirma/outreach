import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import store from './store/index';
import { History } from './helper';
import SigninForm from './containers/signin';
import PrivateRoute from './routes/private-route';
import Home from './containers/home';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={History}>
        <Switch>
          <Route exact path="/signin" component={SigninForm} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
