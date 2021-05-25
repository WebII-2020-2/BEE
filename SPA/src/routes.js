import React from 'react';
import {
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LoginAdmin from './pages/LoginAdmin';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/login-admin">
      <LoginAdmin />
    </Route>
    <Route path="/not-found">
      <NotFound />
    </Route>
    <Route path="*">
      <Redirect to="/not-found" />
    </Route>
  </Switch>
);

export default Routes;
