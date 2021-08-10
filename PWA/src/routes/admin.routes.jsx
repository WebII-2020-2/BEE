import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Campaign from '../pages/admin/Campaigns';
import Categories from '../pages/admin/Categories';
import Home from '../pages/admin/Home';
import Login from '../pages/admin/Login';
import Order from '../pages/admin/Orders';
import Products from '../pages/admin/Products';
import Promotions from '../pages/admin/Promotions';
import Reports from '../pages/admin/Reports';
import { isAuthenticated } from '../services/local-storage/authAdmin';

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
      <Route path={`${match.path}/login`}>
        {isAuthenticated() ? (
          <Redirect to={`${match.path}/inicio`} />
        ) : (
          <Login />
        )}
      </Route>
      <PrivateRoute path={`${match.path}/inicio`} component={Home} />
      <PrivateRoute path={`${match.path}/categorias`} component={Categories} />
      <PrivateRoute path={`${match.path}/produtos`} component={Products} />
      <PrivateRoute path={`${match.path}/promocoes`} component={Promotions} />
      <PrivateRoute path={`${match.path}/relatorios`} component={Reports} />
      <PrivateRoute path={`${match.path}/vendas`} component={Order} />
      <PrivateRoute path={`${match.path}/campanhas`} component={Campaign} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default AdminRoutes;
