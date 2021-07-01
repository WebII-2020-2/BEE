import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// PAGES
import CategoriesList from './CategoriesList';
import CategoriesNew from './CategoriesNew';
import CategoriesPage from './CategoriesPage';

function Categories(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/page/:number`} component={CategoriesList} />
      <Route path={`${match.path}/novo`} component={CategoriesNew} />
      <Route path={`${match.path}/:id`} component={CategoriesPage} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Categories;
