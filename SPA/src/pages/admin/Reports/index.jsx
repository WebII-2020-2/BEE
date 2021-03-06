import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// PAGES
import ReportsList from './ReportsList';
import ReportsPage from './ReportsPage';

function Reports(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/page/:number`} component={ReportsList} />
      <Route path={`${match.path}/:id`} component={ReportsPage} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Reports;
