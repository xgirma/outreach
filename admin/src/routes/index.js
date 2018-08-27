import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Application from '../application';
import Signin from '../components/signin';
import Home from '../components/home';
import NotFound from "../components/not-found";

const Routes = () => {
  return (
    <Application>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signin" component={Signin}/>
        <Route component={NotFound}/>
      </Switch>
    </Application>
  );
};

export default Routes;
