import React from 'react';
import { Route, Switch } from 'react-router-dom';

// PAGES
import PromotionsList from './PromotionsList';
import PromotionsNew from './PromotionsNew';
import PromotionsPage from './PromotionsPage';

function Promotions(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/page/:number`} component={PromotionsList} />
      <Route path={`${match.path}/novo`} component={PromotionsNew} />
      <Route path={`${match.path}/:id`} component={PromotionsPage} />
      <Route path={`${match.path}`} exact component={PromotionsList} />
    </Switch>
  );
}

export default Promotions;