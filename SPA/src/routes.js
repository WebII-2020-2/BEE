import React from 'react';
import {
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/admin/dashboard">
      <Dashboard />
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
