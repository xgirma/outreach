import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import NotFound from './components/not.found';

const App = () => (
  <div className="App">
    <div className="App-header">
      <p>Header</p>
    </div>
    <div className="App-body">
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </div>
  </div>
);

export default App;