import React from 'react';
import {
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import HomeAdmin from './pages/HomeAdmin';
import NotFound from './pages/NotFound';
import LoginAdmin from './pages/LoginAdmin';
import ProductsAdmin from './pages/ProductsAdmin';
import CategoriesAdmin from './pages/CategoriesAdmin';
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
    <PrivateRouteAdmin path="/admin/home" component={HomeAdmin} />
    <PrivateRouteAdmin path="/admin/produtos" component={ProductsAdmin} />
    <PrivateRouteAdmin path="/admin/categorias" component={CategoriesAdmin} />
    <Route path="/login-admin" component={LoginAdmin} />
    <Route path="/not-found" component={NotFound} />
    <Redirect path="*" to="/not-found" />
  </Switch>
);

export default Routes;
