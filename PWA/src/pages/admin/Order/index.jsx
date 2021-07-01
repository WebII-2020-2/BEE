import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// PAGES
import OrderList from './OrderList';
import OrderPage from './OrderPage';

function Order(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/page/:number`} component={OrderList} />
      <Route path={`${match.path}/:id`} component={OrderPage} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Order;
