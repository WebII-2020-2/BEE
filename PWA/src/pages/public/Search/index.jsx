import React from 'react';
import StoreContainer from '../../../components/Shared/StoreContainer';

function Search(props) {
  const { match } = props;
  return (
    <StoreContainer title={`Pesquisar produto: ${match.params.name}`}>
      {match.params.name}
    </StoreContainer>
  );
}

export default Search;
