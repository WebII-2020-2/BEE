import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminRoutes from './admin.routes';
import UserRoutes from './user.routes';
import PublicRoutes from './public.routes';

function Routes() {
  return (
    <Switch>
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/user" component={UserRoutes} />
      <Route path="/" component={PublicRoutes} />
    </Switch>
  );
}

export default Routes;
