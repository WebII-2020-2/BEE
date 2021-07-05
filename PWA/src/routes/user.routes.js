import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Login from '../pages/user/Login';

function UserRoutes(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/login`} component={Login} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default UserRoutes;
