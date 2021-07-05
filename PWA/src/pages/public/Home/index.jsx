import React from 'react';
import StoreContainer from '../../../components/Shared/StoreContainer';

function Home() {
  document.title = 'BEE - Página Inicial';

  return (
    <StoreContainer>
      <h1>Página Inicial</h1>
    </StoreContainer>
  );
}

export default Home;
