import React from 'react';
import {
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LoginAdmin from './pages/LoginAdmin';
import { isAuthenticated } from './services/validation/auth';

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login-admin" {...props} />
    ))}
  />
);

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <PrivateRouteAdmin path="/admin/dashboard" component={Dashboard} />
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
