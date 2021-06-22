import React from 'react';
import { Route, Switch } from 'react-router-dom';

// PAGES
import ReportsList from './ReportsList';
import ReportsPage from './ReportsPage';

function Reports(props) {
  const { match } = props;

  return (
    <Switch>
      <Route path={`${match.path}/page/:number`} component={ReportsList} />
      <Route path={`${match.path}/:id`} component={ReportsPage} />
      <Route path={`${match.path}`} exact component={ReportsList} />
    </Switch>
  );
}

export default Reports;
