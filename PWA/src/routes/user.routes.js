import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { isAuthenticated } from '../services/auth/authUser';
import Logon from '../pages/user/Logon';
import Dashboard from '../pages/user/Dashboard';

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
      <Route path={`${match.path}/login`}>
        {isAuthenticated() ? (
          <Redirect to={`${match.path}/dashboard/dados`} />
        ) : (
          <Logon />
        )}
      </Route>
      <PrivateRoute
        path={`${match.path}/dashboard/:page`}
        component={Dashboard}
      />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default UserRoutes;
