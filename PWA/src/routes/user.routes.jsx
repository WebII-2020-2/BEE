import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isAuthenticated } from '../services/local-storage/authUser';
import Logon from '../pages/user/Logon';
import Dashboard from '../pages/user/Dashboard';
import Purchase from '../pages/user/Purchase';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/user/login" {...props} />
      )
    }
  />
);

function UserRoutes(props) {
  const { match } = props;

  return (
    <Switch>
      <Route exact path={`${match.path}/login`}>
        {isAuthenticated() ? (
          <Redirect to={`${match.path}/dashboard/dados`} />
        ) : (
          <Logon />
        )}
      </Route>
      <Route exact path={`${match.path}/login/comprar`} component={Logon} />
      <PrivateRoute
        path={`${match.path}/dashboard/:page`}
        component={Dashboard}
      />
      <PrivateRoute path={`${match.path}/comprar`}>
        {isAuthenticated() ? (
          <Purchase />
        ) : (
          <Redirect to={`${match.path}/login/comprar`} />
        )}
      </PrivateRoute>
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default UserRoutes;
