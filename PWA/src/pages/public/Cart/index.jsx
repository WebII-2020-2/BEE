import React from 'react';
import { useSelector } from 'react-redux';
import StoreContainer from '../../../components/Shared/StoreContainer';

function Search() {
  const quantity = useSelector((state) => state.cart.count);
  return (
    <StoreContainer title="Carrinho de compras">
      Quantidade de produtos = {quantity}
    </StoreContainer>
  );
}

export default Search;
