import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import StoreContainer from '../../../components/Shared/StoreContainer';
import CategoryAdminApiService from '../../../services/api/CategoryAdminApiService';

function CategoryPage(props) {
  const { match } = props;
  const [categoryData, setCategoryData] = useState({
    name: '',
  });
  const [loadingData, setLoadingData] = useState(true);

  const getCategoryData = async () => {
    setLoadingData(true);
    try {
      const resp = await CategoryAdminApiService.getById(match.params.id)
        .then((r) => r.data)
        .catch((r) => r.response.data);

      if (resp.success) {
        setCategoryData(resp.data);
      } else {
        throw resp.error;
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <StoreContainer title={categoryData.name}>
      <Container className="products-container">
        <div className="actions">Ações</div>
        <div className="products">Produtos</div>
        {loadingData ? (
          <Spinner
            variant="secondary"
            animation="border"
            style={{
              height: 64,
              width: 64,
              alignSelf: 'center',
              margin: '1rem',
            }}
          />
        ) : (
          <>
            <h1>{categoryData.name}</h1>
            <p>{categoryData.description}</p>
          </>
        )}
      </Container>
    </StoreContainer>
  );
}

export default CategoryPage;
