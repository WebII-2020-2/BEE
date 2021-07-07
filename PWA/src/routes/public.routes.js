import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Categories from '../pages/public/Categories';
import Promotions from '../pages/public/Promotions';
import Search from '../pages/public/Search';
import Cart from '../pages/public/Cart';
import NotFound from '../pages/public/NotFound';

function UserRoutes() {
  return (
    <Switch>
      <Route path="/sobre" component={About} />
      <Route path="/categorias" component={Categories} />
      <Route path="/promocoes" component={Promotions} />
      <Route path="/pesquisar/:name" component={Search} />
      <Route path="/carrinho" component={Cart} />
      <Route path="/not-found" component={NotFound} />
      <Route path="/" exact component={Home} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default UserRoutes;
