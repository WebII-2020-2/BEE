import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CardsList from './CardsList';
import CardsNew from './CardsNew';
import CardsPage from './CardsPage';

function Cards(props) {
  const { path } = props;

  return (
    <Switch>
      <Route path={`${path}/novo`} component={CardsNew} />
      <Route path={`${path}/:id`} component={CardsPage} />
      <Route path={path} component={CardsList} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default Cards;
