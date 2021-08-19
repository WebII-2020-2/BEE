import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// PAGES
import ProductsList from './ProductsList';
import ProductPage from './ProductPage';
import ProductNew from './ProductNew';

function Products(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/page/:number`} component={ProductsList} />
      <Route path={`${match.path}/novo`} component={ProductNew} />
      <Route path={`${match.path}/:id`} component={ProductPage} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Products;
