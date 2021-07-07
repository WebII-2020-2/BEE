import React from 'react';
import StoreContainer from '../../../components/Shared/StoreContainer';

function Search(props) {
  const { match } = props;
  return (
    <StoreContainer title={`Pesquisar produto: ${match.params.name}`}>
      <h1>Nome pesquisa: {match.params.name}</h1>
    </StoreContainer>
  );
}

export default Search;
