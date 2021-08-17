import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// PAGES
import OrderList from './OrdersList';
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
