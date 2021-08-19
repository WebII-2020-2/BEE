import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import OrdersList from './OrdersList';
import OrdersPage from './OrdersPage';
import './Orders.css';

function Orders(props) {
  const { path } = props;

  return (
    <Switch>
      <Route path={`${path}/:invoice`} component={OrdersPage} />
      <Route path={path} component={OrdersList} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Orders;
