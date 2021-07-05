import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// PAGES
import PromotionsList from './PromotionsList';
import PromotionPage from './PromotionPage';

function Promotions(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={PromotionPage} />
      <Route exact path={`${match.path}`} component={PromotionsList} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Promotions;
