import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ListProducts from '../../../components/Shared/ListProducts';
import StoreContainer from '../../../components/Shared/StoreContainer';
import ProductApiService from '../../../services/api/ProductApiService';

function Products() {
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const getProducts = async () => {
    setLoadingData(true);
    try {
      const resp = await ProductApiService.getAll()
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });
      if (resp.success) {
        setProducts(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <StoreContainer title="Produtos">
      <Container className="products-container">
        <div className="category-info">
          <h1>Produtos</h1>
          <hr />
        </div>
        <ListProducts productsData={products} loadingData={loadingData} />
      </Container>
    </StoreContainer>
  );
}

export default Products;
