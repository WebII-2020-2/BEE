import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import CampaignList from './CampaignsList';
import CampaignNew from './CampaignNew';
import CampaignPage from './CampaignPage';

function Campaign(props) {
  const { match } = props;
  return (
    <Switch>
      <Route path={`${match.path}/page/:number`} component={CampaignList} />
      <Route path={`${match.path}/novo`} component={CampaignNew} />
      <Route path={`${match.path}/:id`} component={CampaignPage} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Campaign;
