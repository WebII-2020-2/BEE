import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ListProducts from '../../../components/Shared/ListProducts';
import StoreContainer from '../../../components/Shared/StoreContainer';

import CategoryAdminApiService from '../../../services/api/CategoryAdminApiService';
import './Category.css';

function CategoryPage(props) {
  const { match } = props;
  const [categoryData, setCategoryData] = useState({});
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
    <StoreContainer title={categoryData.name || ''}>
      <Container className="products-container">
        <div className="category-info">
          <h1>{categoryData.name}</h1>
          <p>{categoryData.description}</p>
          <hr />
        </div>
        <ListProducts
          productsData={categoryData.products}
          loadingData={loadingData}
        />
      </Container>
    </StoreContainer>
  );
}

export default CategoryPage;
