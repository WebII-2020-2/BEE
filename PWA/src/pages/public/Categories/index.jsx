import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// PAGES
import CategoriesList from './CategoriesList';
import CategoryPage from './CategoryPage';

function Categories(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/:name`} component={CategoryPage} />
      <Route exact path={`${match.path}`} component={CategoriesList} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Categories;
