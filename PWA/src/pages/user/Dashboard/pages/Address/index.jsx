import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddressList from './AddressList';
import AddressNew from './AddressNew';
import AddressPage from './AddressPage';

function Cards(props) {
  const { path } = props;

  return (
    <Switch>
      <Route path={`${path}/novo`} component={AddressNew} />
      <Route path={`${path}/:id`} component={AddressPage} />
      <Route path={path} component={AddressList} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Cards;
