import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Logon from '../pages/user/Logon';

function UserRoutes(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/login`} component={Logon} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default UserRoutes;
