import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import StoreContainer from '../../../components/Shared/StoreContainer';
import ProductApiService from '../../../services/api/ProductAdminApiService';
import ListProducts from '../../../components/Shared/ListProducts';

function Search(props) {
  const { match } = props;
  const [productsSeach, setProductsSeach] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const getProducts = async () => {
    setLoadingData(true);
    try {
      const resp = await ProductApiService.getByName({
        name: match.params.name,
      })
        .then((r) => r.data)
        .catch((r) => {
          throw r.response.data.error;
        });

      if (resp.success) {
        setProductsSeach(resp.data);
      }
    } catch (err) {
      console.error(`ERRO ${err.code}: ${err.error_message}`);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [match]);

  return (
    <StoreContainer title={`Pesquisar produto: ${match.params.name}`}>
      <Container className="products-container">
        <div className="category-info">
          <h1>Nome pesquisado: {match.params.name}</h1>
          <hr />
        </div>
        <ListProducts productsData={productsSeach} loadingData={loadingData} />
      </Container>
    </StoreContainer>
  );
}

export default Search;
