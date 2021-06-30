import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Categories from '../pages/admin/Categories';
import Home from '../pages/admin/Home';
import Login from '../pages/admin/Login';
import Order from '../pages/admin/Order';
import Products from '../pages/admin/Products';
import Promotions from '../pages/admin/Promotions';
import Reports from '../pages/admin/Reports';
import { isAuthenticated } from '../services/auth/authAdmin';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/login" {...props} />
      )
    }
  />
);

function AdminRoutes(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/login`} component={Login} />
      <PrivateRoute path={`${match.path}/inicio`} component={Home} />
      <PrivateRoute path={`${match.path}/categorias`} component={Categories} />
      <PrivateRoute path={`${match.path}/produtos`} component={Products} />
      <PrivateRoute path={`${match.path}/promocoes`} component={Promotions} />
      <PrivateRoute path={`${match.path}/relatorios`} component={Reports} />
      <PrivateRoute path={`${match.path}/vendas`} component={Order} />
    </Switch>
  );
}

export default AdminRoutes;
