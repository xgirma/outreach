import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Application from '../application';
import PrivateRoute from './private-route';
import SigninForm from '../containers/signin';
import Home from '../components/home';

const Routes = () => (
  <Application>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/signin" component={SigninForm} />
    </Switch>
  </Application>
);

export default Routes;
