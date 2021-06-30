import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminRoutes from './admin.routes';
// import UserRoutes from './user.routes';
import Home from '../pages/public/Home';
import NotFound from '../pages/public/NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/admin" component={AdminRoutes} />
      {/*  <Route path="/user" component={UserRoutes} /> */}
      <Route path="/not-found" component={NotFound} />
      <Route path="/" exact component={Home} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Routes;
