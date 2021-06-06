import React from 'react';
import { Route, Switch } from 'react-router-dom';

// PAGES
import ProductsList from './ProductsList';
import ProductsNew from './ProductsNew';
import ProductsPage from './ProductsPage';

function Products(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={match.path} exact component={ProductsList} />
      <Route path={`${match.path}/novo`} component={ProductsNew} />
      <Route path={`${match.path}/:id`} component={ProductsPage} />
    </Switch>
  );
}

export default Products;
