import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Category from '../pages/public/Category';
import Campaign from '../pages/public/Campaign';
import Search from '../pages/public/Search';
import Cart from '../pages/public/Cart';
import Product from '../pages/public/Product';
import NotFound from '../pages/public/NotFound';
import ResetPassword from '../pages/public/ResetPassword';
import Products from '../pages/public/Products';

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/sobre" component={About} />
      <Route path="/categoria/:id" component={Category} />
      <Route path="/produtos" component={Products} />
      <Route path="/produto/:id" component={Product} />
      <Route path="/campanhas/:id" component={Campaign} />
      <Route path="/pesquisar/:name" component={Search} />
      <Route path="/carrinho" component={Cart} />
      <Route path="/alterar-senha/:token" component={ResetPassword} />
      <Route path="/not-found" component={NotFound} />
      <Route path="/" exact component={Home} />
      <Redirect path="*" to="/not-found" />
    </Switch>
  );
}

export default PublicRoutes;
