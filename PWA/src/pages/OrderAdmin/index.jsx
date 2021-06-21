import React from 'react';
import { Route, Switch } from 'react-router-dom';

// PAGES
import OrderList from './OrderList';
import OrderPage from './OrderPage';

function Order(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/page/:number`} component={OrderList} />
      <Route path={`${match.path}/:id`} component={OrderPage} />
      <Route path={`${match.path}`} exact component={OrderList} />
    </Switch>
  );
}

export default Order;
