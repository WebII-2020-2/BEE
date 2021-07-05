import React from 'react';
import StoreContainer from '../../../../components/Shared/StoreContainer';

function CategoryPage(props) {
  const { match } = props;
  return (
    <StoreContainer title={match.params.name}>
      <h1>{match.params.name}</h1>
    </StoreContainer>
  );
}

export default CategoryPage;
