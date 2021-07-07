import React from 'react';
import { Container } from 'react-bootstrap';
import StoreContainer from '../../../components/Shared/StoreContainer';
import CategoryAdminApiService from '../../../services/api/CategoryAdminApiService';

function CategoryPage(props) {
  const { match } = props;

  const getProducts = async () => {
    try {
      const resp = CategoryAdminApiService.getById(match.params.id).
    }
  }
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
