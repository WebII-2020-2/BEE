import React from 'react';
import { Container } from 'react-bootstrap';
import StoreContainer from '../../../components/Shared/StoreContainer';

function CategoryPage(props) {
  const { match } = props;

  return (
    <StoreContainer title={match.params.id}>
      <Container className="products-container">
        <div className="actions">Ações</div>
        <div className="products">Produtos</div>
      </Container>
    </StoreContainer>
  );
}

export default CategoryPage;
