import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Application from '../application';
import PrivateRoute from './private-route';
import Signin from '../components/signin';
import Home from '../components/home';

const Routes = () => {
  return (
    <Application>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </Application>
  );
};

export default Routes;
